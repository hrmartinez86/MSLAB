<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>Untitled</title>
</head>

<body>
<style>
	.ficon, .ficon_selected{
		border:0px solid lightgrey;width:180px;float:left;margin:1px; cursor:default;vertical-align:middle;
	}
	.ficon_text, .ficon_text_gray{
		font-size:12px;
		font-family: tahoma;
		overflow:hidden;
		padding:1px;
		width:85px;
		height:18px;
	}
	.ficon_selected .ficon_text, .ficon_selected .ficon_text_gray {
		background-color:#3366ff;
		color:white;
	}
	.ficon_text_gray{
		color:gray;
	}
</style>
<?php 
	for($i=0;$i<50;$i++){
		if($i==3)
			$divclass = "ficon_selected";
		else
			$divclass = "ficon";
?>
<div class="<?=$divclass?>">
	<img src="images/jpg_b.gif" width="56" height="56" alt="" border="0" style="float:left">
	<div class="ficon_text" style="margin-top:10px;">lightspe edrac er</div>
	<div class="ficon_text_gray" >13098b</div>
</div>
<?php
	}
?>

</body>
</html>
