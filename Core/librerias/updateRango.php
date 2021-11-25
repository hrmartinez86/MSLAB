<?php
	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "Demo123.") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
 
   
	$sql_="update lab_margenes_normalidad set valor_desde=".$_GET['resd'].",valor_hasta=".$_GET['resh']." where llave_prueba=".$_GET['id']."";
	$eje=odbc_exec($conection,$sql_);

?>