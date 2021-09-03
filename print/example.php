<?php
header('Content-Type: text/html; charset=utf-8');
echo '<?xml version="1.0" encoding="utf-8"?>';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="content-style-type" content="text/css" />
<meta http-equiv="content-script-type" content="text/javascript" />

<?php

require_once 'class.PrintAnything.php';

$pa = new PrintAnything();

$css = array (
    '.stylel' => 'color: blue;',
    '.style2' => 'color: red;'
);
$printData1 = <<<PDATA
<b>This text will be printed out when pressing the link...</b><br />
<span class="style1">It will not be shown in browser window!</span>
<div class="style2">Here can be a table, an image or other elements...</div>
<font color='#00ff00'>Goooogle!</font>
PDATA;
$con1 = $pa->addPrintContext($printData1, $css);

$printData2 = <<<PDATA
And here is some other output for another context...
PDATA;
$con2 = $pa->addPrintContext($printData2);

$url = (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] != 'on' ? 'http://' : 'https://');
$url .= $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);
$url = trim(str_replace('\\', '/', $url));
if (substr($url, -1) != '/') {
    $url .= '/';
}
$url .= 'test.php';
$printData3 = PrintAnything::readBody($url);
$con3 = $pa->addPrintContext($printData3);

?>

<title>Print Anything Example</title>

</head>

<body>

<h1>Print Anything Example</h1>

<p>Screen output goes here...</p>

<?php

$pa->showPrintLink($con1, 'Print Context 1');
echo '<br />';
$pa->showPrintLink($con2, 'Print Context 2');
echo '<br />';
$pa->showPrintLink($con3, 'Print URL');

echo '<form action="">';
$btnCss = 'style="background-color: #ff0000; color: yellow;"';
$pa->showPrintButton($con2, 'Print Context 2', $btnCss);
echo '</form>';

?>

</body>

</html>