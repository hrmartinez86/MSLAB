<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>Untitled</title>
</head>

<body>
<style>
	.ftablerow, .ftablerow_selected{
		cursor:default;clear:both;width:100%;margin:1px;
	}
	.ftablerow_text{
		font-size:12px;
		font-family: tahoma;
		padding:1px;
		width:85px;
	}
	.ftablerow_selected .ftablerow_text span{
		background-color:#3366ff;
		color:white;
	}
</style>
<?php 
	for($i=0;$i<50;$i++){
		if($i==3)
			$divclass = "ftablerow_selected";
		else
			$divclass = "ftablerow";
?>
<div class="<?=$divclass?>">
	<div style="float:left;width:17px;"><img src="images/jpg_s.gif" width="17" height="17" alt="" border="0"></div>
	<div class="ftablerow_text" style="float:left;width:150px;"><span style="padding-left:2px;padding-right:2px;">lightspe edrac er</span></div>
	<div class="ftablerow_text" style="float:left;width:70px;text-align:right;">200KB</div>
	<div class="ftablerow_text" style="float:left;width:150px;padding-left:10px;">2007-12-01 23:13:21</div>
</div>
<?php
	}
?>

</body>
</html>
