<?php
	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "Kapi312") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $fecha=date("d/m/Y");
    $hora=date("H:i:s");
    $fh=$fecha." ".$hora; 
    
  
	 
   
	$sql_="UPDATE DAT_PACIENTE SET expediente='".$_GET['exp']."',sexo ='".$_GET['sex']."', nombre ='".$_GET['nom']."', fecha_nacimiento ='".$_GET['fecha']."' WHERE rut='".$_GET['rut']."'";
	$eje=odbc_exec($conection,$sql_);
	
?>
