<META  charset=iso-8859-1" >

<?php
	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "123") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $fecha=date("d/m/Y");
    $hora=date("H:i:s");
    $fh=$fecha." ".$hora; 
    
  
	 $name = str_replace("?", "+", $_GET['res']);
   
	$sql_1="UPDATE DAT_DPCOD SET usuario ='".$_SESSION['nivel']."', resultado ='".$name."', estado ='V', FechaValidacion =convert(datetime,'".$fh."', 103), UsuarioValidacion ='".$_SESSION['nivel']."' WHERE idpaciente = '".$_GET['pac']."' and llave_prueba = ".$_GET['id']." and llave_perfil =".$_GET['per'];
	$eje=odbc_exec($conection,$sql_1);
	
	$sql_="Update CAJ_DET_PRESTACIONES SET LIBERADO = 'S', USUARIO_ULTIMA_LIBERACION = '".$_SESSION['nivel']."', FECHA_ULTIMA_LIBERACION = CONVERT(DATETIME, GETDATE(), 103) Where IDPACIENTE = '".$_GET['pac']."' AND llave_fonasa = ".$_GET['est'];
	$eje=odbc_exec($conection,$sql_);
//return $name;
?>