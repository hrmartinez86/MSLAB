<?php
	if ( stristr($_SERVER["HTTP_ACCEPT"],"application/xhtml+xml") ) {
  		header("Content-type: application/xhtml+xml"); } else {
  		header("Content-type: text/xml");
	}
	echo("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n");
	echo("<data>");
		$dirToScan = dirname(__FILE__);
		$files = scandir($dirToScan);
		if($files!=false && count($files)>0 && $_GET["dhx_global_page"]<3){
			$i=0;
			for($n=0;$n<2;$n++)//this is multiplicator - just for test purposes!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			foreach($files as $file) {
				//output all files which have jpg, gif or png extension
				preg_match("/(\.(jpg)|(gif)|(png))$/i",$file,$matches);
				if(count($matches)>0){
					$fileFullPath = $dirToScan."/".$file;
					$mtimeArray = getdate(filemtime($fileFullPath));
					
					//file size in bytes
					$fsize = filesize($fileFullPath);
					//format date as yyyy-m-d hh:mm:ss
					$fdate = sprintf("%04s-%02s-%02s %02s-%02s-%02s", $mtimeArray["year"],$mtimeArray["mon"],$mtimeArray["mday"],$mtimeArray["hours"],$mtimeArray["minutes"],$mtimeArray["seconds"]);
					//item ID
					$fid = $i;
					
					//output item 
					print("<item name='".$file."' id='".$fid."' type='file'>");
						print("<filesize>".$fsize."</filesize>");
						print("<modifdate>".$fdate."</modifdate>");
					print("</item>");
					$i++;
				}
			}
		}
	echo("</data>");
?>