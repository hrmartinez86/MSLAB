<?php
/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
This version of Software is free for using in non-commercial applications.
For commercial use please contact sales@dhtmlx.com to obtain license
*/

//include db connection settings
require_once("../../common/config.php");

$link = mysql_pconnect($mysql_host, $mysql_user, $mysql_pasw);
$db = mysql_select_db ($mysql_db);


//start session to build different trees for different sessions (if you set $_SESSION["id"] to some hardcoded value, this way of processing will be skipped)
session_start();
//$_SESSION = array();
if(!isset($_SESSION["id"])){
	$_SESSION["id"] = microtime();
	//add some rows to the table if user comes first time
	$sql = 	"Insert into samples_grid(sales,title,author,price,instore,shipping,bestseller,pub_date,GUID) ";
	$sql.= 	"Values(100,'Your Favotite Book','Bill Starter',23,'1','12','1',null,'".$_SESSION["id"]."')";
	$res = mysql_query ($sql);
	$sql= "Insert into samples_grid(sales,title,author,price,instore,shipping,bestseller,pub_date,GUID) ";
	$sql.= 	"Values(-50,'Good Start','Phillip Nomore',12.5,'0','12','0',null,'".$_SESSION["id"]."');";
	$res = mysql_query ($sql);
}


//FUNCTIONS TO USE IN THE CODE LATER

//print tree XML based on parent_id (function calls itself to go through the nested levels)
	function getRowsFromDB($parent_id){
		//get tree level from database taking parent id as incomming argument
		$sql = "SELECT  * from samples_grid WHERE GUID='".$_SESSION["id"]."'";
		//echo $sql;
		$res = mysql_query ($sql);
		if($res){
			while($row=mysql_fetch_array($res)){
				//create xml tag for grid row
				print("<row id='".$row['book_id']."'>");
					print("<cell><![CDATA[".$row['sales']."]]></cell>");
					print("<cell><![CDATA[".$row['title']."]]></cell>");
					print("<cell><![CDATA[".$row['author']."]]></cell>");
					print("<cell><![CDATA[".$row['price']."]]></cell>");
					print("<cell><![CDATA[".$row['instore']."]]></cell>");
					print("<cell><![CDATA[".$row['shipping']."]]></cell>");
					print("<cell><![CDATA[".$row['bestseller']."]]></cell>");
					print("<cell><![CDATA[".gmdate("m/d/Y",strtotime($row['pub_date']))."]]></cell>");
				//close xml tag for the row
				print("</row>");
			}
		}else{
			echo mysql_errno().": ".mysql_error()." at ".__LINE__." line in ".__FILE__." file<br>";
		}
	}

//XML HEADER

//include XML Header (as response will be in xml format)
if ( stristr($_SERVER["HTTP_ACCEPT"],"application/xhtml+xml") ) {
 		header("Content-type: application/xhtml+xml"); } else {
 		header("Content-type: text/xml");
}
echo("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n"); 
?>

<!-- start grid xml -->
<rows id="0">
	
<?php
	//print tree XML
	getRowsFromDB(0);
	//Close db connection
	mysql_close($link);
?>

<!-- close grid xml -->
</rows>
