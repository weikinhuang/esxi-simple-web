<?php
// Error display for testing environment
error_reporting(E_ALL);
ini_set('display_errors', 'On');

$iv = '';
$ciphertext = '';

if (isset($_POST['password'])) {
    // generate the key from a uuid v4
    # create a random IV to use with CBC encoding
    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_CBC);
    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    # creates a cipher text compatible with AES (Rijndael block size = 128)
    $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($_SERVER['HTTP_HOST']), utf8_encode($_POST['password']), MCRYPT_MODE_CBC, $iv);
}


?>
<!doctype html>
<html>
<body>
<form method="post">
<input type="password" name="password" style="width: 350px" />
<input type="submit" value="Encrypt!" />
</form>

<br />
Encrypted text:
<br />
<textarea rows="6" cols="80" readonly="readonly" style="width: 90%; height: 150px;">
<?= base64_encode($iv . $ciphertext); ?>
</textarea>
</body>
</html>