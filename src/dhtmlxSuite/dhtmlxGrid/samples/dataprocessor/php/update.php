<?php
/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
This version of Software is free for using in non-commercial applications.
For commercial use please contact sales@dhtmlx.com to obtain license
*/

//start session (see get.php for details) 
session_start();
if(!isset($_SESSION["id"]))
	$_SESSION["id"] = microtime();
	
//include db connection settings
require_once("../../common/config.php");

$link = mysql_pconnect($mysql_host, $mysql_user, $mysql_pasw);
$db = mysql_select_db ($mysql_db);

//FUNCTION TO USE IN THE CODE LATER


//XML HEADER

//include XML Header (as response will be in xml format)
//if ( stristr($_SERVER["HTTP_ACCEPT"],"application/xhtml+xml") ) {
 		header("Content-type: application/xhtml+xml"); 
 		//header("Content-type: text/xml");
//}
echo("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n"); 

//PREPARE VALUES 

//date
if($_GET["pubdate"]=="" || strlen($_GET["pubdate"])<8){
	$_GET["pubdate"] = "null";
}else{
	$date = split("/",$_GET["pubdate"]);
	@$ttime=mktime(0,0,0,intval($date[0]),intval($date[1])+1,intval($date[2]));
	$_GET["pubdate"] = "'".gmdate("Y-m-d H:i:s",$ttime)."'";
}
//price
if($_GET["price"]==""){
	$_GET["price"] = "null";
}


if(isset($_GET["!nativeeditor_status"]) && trim($_GET["!nativeeditor_status"])=="inserted"){

	//INSERT
	
	$sql = 	"Insert into samples_grid(sales,title,author,price,instore,shipping,bestseller,pub_date,GUID) ";
	$sql.= 	"Values(".$_GET["sales"].",'".addslashes($_GET["title"])."','".addslashes($_GET["author"])."',".$_GET["price"].",'".$_GET["instore"]."','".$_GET["shipping"]."','".$_GET["bestseller"]."',".$_GET["pubdate"].",'".$_SESSION["id"]."')";
	$res = mysql_query($sql);
		
		
	//set value to use in response
	$newId = mysql_insert_id();
	$action = "insert";
	
	
}else if(isset($_GET["!nativeeditor_status"]) && $_GET["!nativeeditor_status"]=="deleted"){

	//DELETE
	
	$d_sql = "Delete from samples_grid where book_id=".$_GET["gr_id"]." and GUID='".$_SESSION["id"]."'";
	$resDel = mysql_query($d_sql);
	
	//set values to include in response
	$newId = $_GET["gr_id"];
	$action = "delete";
	
}else{

	//UPDATE
	
	//update row
	$sql = 	"Update samples_grid set sales=".$_GET["sales"].",title='".addslashes($_GET["title"])."',author='".addslashes($_GET["author"])."',price=".$_GET["price"].",instore='".$_GET["instore"]."',shipping='".$_GET["shipping"]."',bestseller='".$_GET["bestseller"]."',pub_date=".$_GET["pubdate"]." where book_id=".$_GET["gr_id"]." and GUID='".$_SESSION["id"]."'";
	$res = mysql_query($sql);
	
	//set values to include in response
	$newId = $_GET["gr_id"];
	$action = "update";
}
?>
<!-- response xml -->
<data>
	<?php 
	if($newId!=0){
		print("<action type='".$action."' sid='".$_GET["gr_id"]."' tid='".$newId."'/>");
	}else{
		print("<action type='error'>SQL query error</action>");
	}
	?>
</data>

