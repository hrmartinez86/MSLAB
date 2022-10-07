<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>Untitled</title>
</head>

<body>
<style>
	.dhx_folders_FTHUMBS_item, .dhx_folders_FTHUMBS_item_selected{
		width:110px;
		float:left;
	    padding:2px 5px 2px 5px;
	    margin-right:14px;
		margin-bottom:20px;
	    background-color:white;
		-moz-user-select:none;
		text-align:center;
	}
	.dhx_folders_FTHUMBS_item_selected{
		padding:0px 5px 0px 5px;
	}
	.dhx_folders_FTHUMBS_item img{
		border:1px solid #ece9d8;
	}
	.dhx_folders_FTHUMBS_item_selected img{
		border:3px solid #316ac5;
	}
	.dhx_folders_FTHUMBS_item span, .dhx_folders_FTHUMBS_item_selected span{
		height:16px;
		font-family:Tahoma;
		font-size:10pt;
		text-align:center;
		overflow:hidden;
		display:block;
		width:85px;
	}
	.dhx_folders_FTHUMBS_item_selected span{
		background-color:#3366ff;
		color:white;
	}
</style>
<?php 
	for($i=0;$i<50;$i++){
		if($i==3)
			$divclass = "dhx_folders_FTHUMBS_item_selected";
		else
			$divclass = "dhx_folders_FTHUMBS_item";
?>
<div class="<?=$divclass?>">
	<img border='0' class="fthum_img" src="" width="94" height="94">
	<div style="text-align:center;"><span>sdjhsdhfgds sd</span></div>
</div>
<?php
	}
?>

</body>
</html>
