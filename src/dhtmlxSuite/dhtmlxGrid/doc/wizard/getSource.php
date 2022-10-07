<?php
//Folder/files names
$tmpDir = "./tmp/";
$zipFileName 	= "grid.zip";
$htmlFileName 	= "index.html";
$xmlFileName 	= "grid.xml";
$readmeFileName = "readme.txt";
//Get content
$readme = "Put content of dhtmlxGrid codebase folder here.";
$HTML 	= str_replace("\\\"","\"",str_replace("<br>","\n",str_replace("&lt;","<",$_POST["html"])));
$XML 	= str_replace("\\\"","\"",str_replace("<br>","\n",str_replace("&lt;","<",$_POST["xml"])));
//Make tmp folder if it doesn't exist
if (!file_exists($tmpDir))
	mkdir($tmpDir);
//Make files
file_put_contents($tmpDir.$readmeFileName,$readme);
file_put_contents($tmpDir.$htmlFileName,$HTML);
if ($XML!="") 
	file_put_contents($tmpDir.$xmlFileName,$XML);
//Create zip instance
$zip = new ZipArchive;
if ($zip->open($tmpDir.$zipFileName, ZIPARCHIVE::CREATE) === TRUE) {
    $zip->addFile($tmpDir.$htmlFileName,$htmlFileName);
    if ($XML!="") 
	    $zip->addFile($tmpDir.$xmlFileName,$xmlFileName);    
	$zip->addFile($tmpDir.$readmeFileName,'codebase/'.$readmeFileName);
    $zip->close();
}
//Push file
	Header("Content-Type: application/octet-stream");
	Header("Content-Length: ".filesize($tmpDir.$zipFileName));
	Header("Content-Disposition: attachment; filename=".$zipFileName);
	readfile($tmpDir.$zipFileName);
//Remove files
/*unlink($tmpDir.$zipFileName);
unlink($tmpDir.$readmeFileName);
unlink($tmpDir.$htmlFileName);

if ($XML!="") 
	unlink($tmpDir.$xmlFileName);
*/
?> 