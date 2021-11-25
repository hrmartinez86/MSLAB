<?php
	// Paises
session_start();
$ODBC=$_SESSION['ODBC'];
$conection = odbc_connect($ODBC, "sa", "Demo123.") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");


	$sql="select * from caj_codigos_fonasa";
	$exec=odbc_exec($conection, $sql);
	while ($res=odbc_fetch_array($exec)){
		$datos[count($datos)] = $res['codigo_fonasa'];
	}	
	
	
	$texto = $_GET["texto"];
	
	// Devuelvo el XML con la palabra que mostramos (con los '_') y si hay éxito o no
	$xml  = '<?xml version="1.0" standalone="yes"?>';
	$xml .= '<datos>';
	foreach ($datos as $dato) {
		if (strpos(strtoupper($dato), strtoupper($texto)) === 0 OR $texto == "") {
			$xml .= '<pais>'.$dato.'</pais>';
		}
	}
	$xml .= '</datos>';
	header('Content-type: text/xml');
	echo $xml;		
?>