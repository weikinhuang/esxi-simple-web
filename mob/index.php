<?php
// Error display for testing environment
error_reporting(E_ALL);
ini_set('display_errors', 'On');

function decrypt($str) {
    $ciphertext_dec = base64_decode($str);
    $iv_dec = substr($ciphertext_dec, 0, 32);
    $ciphertext_dec = substr($ciphertext_dec, 32);
    return mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($_SERVER['HTTP_HOST']), $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
}

$config = json_decode(preg_replace('!^\s*//.+$!m', '', file_get_contents(dirname(__DIR__) . '/config.json')), true);

$options = array(
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HEADER => false,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_0,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_AUTOREFERER => true,
    CURLOPT_REFERER => '',
    CURLOPT_HEADER => false,
    CURLOPT_FRESH_CONNECT => true,
);
if ($config['username']) {
    $options[CURLOPT_USERPWD] = trim(decrypt($config['username'])) . ':' . trim(decrypt($config['password']));
    $options[CURLOPT_HTTPAUTH] = CURLAUTH_ANY;
}

//initializes this curl object
$curl = curl_init();
$url = 'https://' . $config['host'] . '/mob/';
// append get parameters
if ($_GET) {
    $url .= '?' . http_build_query($_GET);
}
$options[CURLOPT_URL] = $url;
if ($_POST) {
    $options[CURLOPT_POSTFIELDS] = http_build_query($_POST);
}

// set all options
curl_setopt_array($curl, $options);
// save debugging information
echo curl_exec($curl);
