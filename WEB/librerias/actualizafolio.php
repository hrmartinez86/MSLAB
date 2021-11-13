<?php
	session_start();
	$ODBC="laboratorio";
	$conection = odbc_connect($ODBC, "sa", "Demo123.") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $fecha=date("d/m/Y");
    $hora=date("H:i:s");
    $fh=$fecha." ".$hora; 
    $procedencia=$_GET['procedencia'];
	$idpaciente=$_GET['folio'];

	//actualizacion de paciente
	$sql_="UPDATE DAT_PACIENTE SET sexo ='".$_GET['sex']."', 
	nombre ='".$_GET['nom']."', 
	telefono ='".$_GET['telefono']."', 
	email ='".$_GET['email']."', "
    . "fecha_nacimiento ='".$_GET['fecha']."' 
	WHERE rut=".$_GET['rut'];
	$eje=odbc_exec($conection,$sql_);
	
	//actualiza procedencias
	$sql_="update dat_dfipa set procedencia_muestra=".$procedencia." where idpaciente=".$idpaciente;
	echo $sql_;
	$eje=odbc_exec($conection,$sql_);
?>
