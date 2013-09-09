<?php
// Error display for testing environment
error_reporting(E_ALL);
ini_set('display_errors', 'On');

function encrypt($str)
{
    // generate the key from a uuid v4
    # create a random IV to use with CBC encoding
    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_CBC);
    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    # creates a cipher text compatible with AES (Rijndael block size = 128)
    $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($_SERVER['HTTP_HOST']), utf8_encode($str), MCRYPT_MODE_CBC, $iv);
    return base64_encode($iv . $ciphertext);
}

$generated = false;
if (isset($_POST['hostname'], $_POST['username'], $_POST['password'])) {
    file_put_contents(
        __DIR__ . '/config.json',
        json_encode(
            array(
                'host' => $_POST['hostname'],
                'username' => encrypt($_POST['username']),
                'password' => encrypt($_POST['password']),
            )
        )
    );
    $generated = true;
}

?>
<!doctype html>
<html>
<body>

<form method="post">

Enter your esxi host and credentials:
<br />
<br />
<code>Hostname: </code><input type="text" name="hostname" style="width: 350px" />
<br />
<code>Username: </code><input type="text" name="username" style="width: 350px" />
<br />
<code>Password: </code><input type="password" name="password" style="width: 350px" />
<br />
<input type="submit" value="Encrypt!" />

<?php if ($generated) { ?>
<br />
<br />
<span style="color:#f00;">config.json generated!</span>
<?php } ?>
</form>
</body>
</html>