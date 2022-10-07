<?


echo "<h2>Response from ".$_SERVER['PHP_SELF']."</h2><br>";

foreach($_POST as $key=>$value){
	echo "POST VARIABLE <b>$key</b> got value <b>$value</b><br>";
	
}
foreach($_GET as $key=>$value){
	echo "POST VARIABLE <b>$key</b> got value <b>$value</b><br>";
	
}