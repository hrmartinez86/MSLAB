<?php
    //set content type and xml tag
    header("Content-type:text/xml");
    print("<?xml version=\"1.0\"?>");
   
    //define variables from incoming values
    if(isset($_GET["posStart"]))
        $posStart = $_GET['posStart'];
    else
        $posStart = 0;
    if(isset($_GET["count"]))
        $count = $_GET['count'];
    else
        $count = 100;
   
    //connect to database
    $link = mysql_pconnect("localhost", "root", "1");
    $db = mysql_select_db ("sampleDB");
   
    //query to products table
    $sql = "SELECT  * FROM products";
	if(isset($_GET["name_mask"]))
		$sql.=" Where nm like '".$_GET["name_mask"]."%'";
   
    //if this is first query - get total number of records in query result
    if($posStart==0){
        $sqlCount = "Select count(*) as cnt from ($sql) as tbl";
        $resCount = mysql_query ($sqlCount);
        $rowCount=mysql_fetch_array($resCount);
        $totalCount = $rowCount["cnt"];
    }
   	//order by
   	$columns = array("nm","code","num_val");
   	if(isset($_GET["orderby"])){
		if($_GET["direct"]=='des')
			$direct = "DESC";
		else	
			$direct = "ASC";
		$sql.=" Order by ".$columns[$_GET["orderby"]]." ".$direct;
	}
	
    //add limits to query to get only rows necessary for output
    $sql.= " LIMIT ".$posStart.",".$count;
	
		
	$res = mysql_query ($sql);
    //output data in XML format   
    print("<rows total_count='".$totalCount."' pos='".$posStart."'>");   
    while($row=mysql_fetch_array($res)){
        print("<row id='".$row['id']."'>");
            print("<cell>");
                print($row['nm']);  //value for product name
            print("</cell>");
            print("<cell>");
                print($row['code']);  //value for internal code
            print("</cell>");
            print("<cell>");
                print($row['num_val']);    //value for price
            print("</cell>");
         print("</row>");
    }
    print("</rows>");
?>