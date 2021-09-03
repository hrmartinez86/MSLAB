<?php
	if ( stristr($_SERVER["HTTP_ACCEPT"],"application/xhtml+xml") ) {
  		header("Content-type: application/xhtml+xml"); } else {
  		header("Content-type: text/xml");
	}
	echo("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n"); 
	if(!isset($_GET["posStart"])){
		$_GET["posStart"] = 0;
	}
?>
<rows pos="<?=$_GET['posStart']?>">
	<?php
		if($_GET["posStart"]<5000){
			$start = $_GET["posStart"]+1;
			$to = $start+50;
			for($i = $start;$i<$to;$i++){
				print("<row id='r$i'><first>index is $i</first><second>altermative xml format</second><third>xmlB</third></row>");
			}
		}
	?>
</rows>	