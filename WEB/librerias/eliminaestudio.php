<?php
	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $fecha=date("d/m/Y");
    $hora=date("H:i:s");
    $fh=$fecha." ".$hora; 
    
  
	 
   
	$sql_="select llave_fonasa from caj_codigos_fonasa where codigo_fonasa='".$_GET['est']."'";
	$eje=odbc_exec($conection,$sql_);
	while ($result=odbc_fetch_array($eje)){
	   $llave=$result['llave_fonasa'];
	}
	$sql_="SELECT     RP.llave_perfil, RP.cod_llave
FROM         lab_relac_fonasa_perfil RFP INNER JOIN
                      lab_RLS_perfiles RP ON RFP.llave_perfil = RP.llave_perfil
WHERE     (RFP.llave_fonasa = ".$llave.")";
	$eje=odbc_exec($conection,$sql_);
	while ($result=odbc_fetch_array($eje)){
	   $perfill=$result['llave_perfil'];
	}
	$sql_="DELETE CAJ_DET_PRESTACIONES WHERE IDPACIENTE = '".$_GET['idpaciente']."' AND LLAVE_FONASA =".$llave; 
	$eje=odbc_exec($conection,$sql_);
	
	$sql_="DELETE DAT_DPCOD WHERE IDPACIENTE = '".$_GET['idpaciente']."' AND LLAVE_PERFIL =".$perfill;
	$eje=odbc_exec($conection,$sql_); 
?>
