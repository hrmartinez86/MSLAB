<?php

	if ( stristr($_SERVER["HTTP_ACCEPT"],"application/xhtml+xml") ) {
  		header("Content-type: application/xhtml+xml"); } else {
  		header("Content-type: text/xml");
	}
	echo("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n");
    if (!isset($_GET['count']))
        $_GET['count']=50;
    else
        sleep(1);
?>
<rows pos="<?=$_GET['posStart']?>" total_count="2000">
	<?php
			for($i=0; $i<$_GET['count']; $i++){
				print("<row id='r".($i+$_GET['posStart'])."'><cell>".$i."</cell><cell>index is ".($i+$_GET['posStart'])."</cell>
                    <cell>load turn started from ".$_GET['posStart']." + ".$_GET['count']."</cell><cell></cell><cell></cell><cell></cell><cell></cell><cell></cell></row>");
			}
	?>
</rows>
