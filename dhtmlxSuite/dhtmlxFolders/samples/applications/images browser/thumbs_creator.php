<?php
//File name(url)
$filename 		= dirname(__FILE__)."/".$_REQUEST["img"];
if ($filename=="") return; 
list($width,$height) = getimagesize($filename);

$newWidth		= ($_REQUEST["width"]?$_REQUEST["width"]:0);
$newHeight		= ($_REQUEST["height"]?$_REQUEST["height"]:0);
$imgInfoList 	= getimagesize($filename);


//echo "<br>".
$widthRatio = ($newWidth!=0?$width/$newWidth:1);
//echo "<br>".
$heightRatio = ($newHeight!=0?$height/$newHeight:1);

//Proporcional resizing rations
if (($widthRatio<1)||($heightRatio<1)) {
	($widthRatio>$heightRatio?$heightRatio=$widthRatio:$widthRatio=$heightRatio);
	$newWidth = ($newWidth<$width/$widthRatio?$width/$widthRatio:$newWidth);
	$newHeight = ($newHeight<$height/$heightRatio?$height/$heightRatio:$newHeight);
} else { 
	($widthRatio>$heightRatio?$heightRatio=$widthRatio:$widthRatio=$heightRatio);
	$newWidth = ($newWidth<$width/$widthRatio?$width/$widthRatio:$newWidth);
	$newHeight = ($newHeight<$height/$heightRatio?$height/$heightRatio:$newHeight);
}

//Get file content type
$mime = $imgInfoList["mime"];
//Create img from file(url) based on img type
switch ($mime) {
  	case "image/gif": 
  		$img = imagecreatefromgif($filename);
  		break;
  	case "image/png";
  		$img = imagecreatefrompng($filename);
  		break;
  	case "image/jpeg";
		$img = imagecreatefromjpeg($filename);
  		break; 
  	case "image/bmp";
		$img = imagecreatefrombmp($filename);
  		break;  		
}

	$resizedImg = imagecreatetruecolor($newWidth,$newHeight);
	$bgColor = imagecolorallocate($resizedImg, 255, 255, 255);
	imagefill($resizedImg, 0, 0, $bgColor);
	
if (($mime=="image/gif")||($mime=="image/png")) {
	$colorTransparent = imagecolortransparent($img);//(imagecolortransparent($img)!=-1?imagecolortransparent($img):0);
//	imagepalettecopy($img, $resizedImg);
//	imagefill($resizedImg, 0, 0, $colorTransparent);
	imagecolortransparent($resizedImg, $colorTransparent);
//	imagetruecolortopalette($resizedImg, true, 256);
}

// File and new size
imagecopyresampled($resizedImg, $img, ($newWidth>$width/$widthRatio?($newWidth-$width/$widthRatio)/2:0), ($newHeight>$height/$heightRatio?($newHeight-$height/$heightRatio)/2:0), 0, 0, $width/$widthRatio, $height/$heightRatio, $width, $height);


//Output img
header("Content-type: ".$mime);
/*switch ($mime) {
  	case "image/gif": 
  		imagegif($resizedImg);
  		break;
  	case "image/png";
  		imagepng($resizedImg);
  		break;
  	case "image/jpeg";
		imagejpeg($resizedImg);
  		break; 
  	case "image/bmp";
		imagetmp($resizedImg);
  		break;  		
}*/

imagepng($resizedImg);	
imagedestroy($img);
?>