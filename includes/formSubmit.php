<?
echo "<h1>Form posted with Ajax</h1>";
echo "<h4>POST variables</h4>";
foreach($_POST as $key=>$value){
	
	if(is_array($value)){		
		for($no=0;$no<count($value);$no++){
			echo "<b>".$key."[$no]</b>: ".$value[$no]."<br>"; 	
		}
	}else{
		echo "<b>".$key."</b>: ".$value."<br>";
	}
	
	
}

echo "<h4>GET variables:</h4>";
foreach($_GET as $key=>$value){
	if(is_array($value)){		
		for($no=0;$no<count($value);$no++){
			echo "<b>".$key."[$no]</b>: ".$value[$no]."<br>"; 	
		}
	}else{
		echo "<b>".$key."</b>: ".$value."<br>";
	}
	
}


?>
