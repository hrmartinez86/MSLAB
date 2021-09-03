<?

include($_SERVER['DOCUMENT_ROOT']."/config/connect.php");

if(isset($_GET['sortBy'])){
	$sqlAdd = "";
	if(isset($_GET['sortAscending'])){
		if($_GET['sortAscending']=='false')$sqlAdd.=" desc";	
	}
	if(isset($_GET['startIndex']) && $_GET['startIndex']){
		$sqlAdd .= " limit ".$_GET['startIndex'];	
		if(isset($_GET['numberOfRows']))
			$sqlAdd .= ",".$_GET['numberOfRows'];
		
				
	}elseif(isset($_GET['numberOfRows']) && $_GET['numberOfRows'])$sqlAdd .= " limit ".$_GET['numberOfRows'];
	
	$sql = "select * from dhtmlsuite_tableWidgetData order by ".$_GET['sortBy']."$sqlAdd";
	$res = mysql_query($sql) or die(mysql_error()."\n".$sql);
	while($inf = mysql_fetch_array($res)){		
		echo $inf["lastname"]."###";
		echo $inf["firstname"]."###";
		echo $inf["position"]."###";
		echo $inf["income"]."###";	
		echo $inf["hired"]."|||";	
		
	}
	
	
	
}

?>
