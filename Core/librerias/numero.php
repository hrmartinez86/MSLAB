<?php
	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "123") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $fecha=date("d/m/Y");
    $hora=date("H:i:s");
    $fh=$fecha." ".$hora; 
    
  
	 
   
	$sql_="UPDATE DAT_DPCOD SET  resultado ='".$_GET['res']."', FechaDigitacion =convert(datetime,'".$fh."', 103) WHERE idpaciente = '".$_GET['pac']."' and llave_prueba = ".$_GET['id']." and llave_perfil =".$_GET['per'];
	$eje=odbc_exec($conection,$sql_);
	

?>