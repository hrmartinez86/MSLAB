<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>Untitled</title>
</head>

<body>
<style>
	.ficon, .ficon_selected{
		border:0px solid lightgrey;width:100px;float:left;margin:1px; cursor:default;
	}
	.ficon_text{
		font-size:12px;
		font-family: tahoma;
		overflow:hidden;
		padding:1px;
		width:85px;
		height:18px;
	}
	.ficon_selected .ficon_text{
		background-color:#3366ff;
		color:white;
	}
</style>
<?php 
	for($i=0;$i<50;$i++){
		if($i==3)
			$divclass = "ficon_selected";
		else
			$divclass = "ficon";
?>
<div class="<?=$divclass?>" align="center">
	<img src="images/jpg_m.gif" width="42" height="42" alt="" border="0">
	<div class="ficon_text">lightspe edrac er</div>
</div>
<?php
	}
?>

</body>
</html>
