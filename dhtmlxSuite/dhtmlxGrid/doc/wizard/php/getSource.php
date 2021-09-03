<?php
include("./ziplib.php");
//Folder/files names
	$tmpDir = "./tmp/";
	$zipFileName 	= "grid_".mktime().".zip";
	$getFileName 	= "grid.zip";
	$htmlFileName 	= "index.html";
	$xmlFileName 	= "grid.xml";
	$readmeFileName = "readme.txt";
//Get content
	$readme = "Put content of dhtmlxGrid codebase folder here.";
	$HTML 	= str_replace("\\\"","\"",str_replace("<br>","\n",str_replace("&lt;","<",$_POST["html"])));
	$XML 	= str_replace("\\\"","\"",str_replace("<br>","\n",str_replace("&lt;","<",$_POST["xml"])));

//Create zip instance
	$zip = new Ziplib;
	$zip->zl_add_file($readme,'codebase/'.$readmeFileName,"g9");
	$zip->zl_add_file($HTML,$htmlFileName,"g9");
    if ($XML!="") 
		$zip->zl_add_file($XML,$xmlFileName,"g9");

//Push file
	$outZip = $zip->zl_pack("");
	Header("Content-Type: application/octet-stream");
	Header("Content-Disposition: attachment; filename=".$getFileName);
	echo $outZip;

?> 