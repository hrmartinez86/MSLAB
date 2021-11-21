<META  charset=iso-8859-1" >

<?php
	session_start();
	$ODBC='laboratorio';
	$conection = odbc_connect($ODBC, "sa", "Kapi312") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $fecha=date("d/m/Y");
    $hora=date("H:i:s");
    $fh=$fecha." ".$hora; 
    
    $idpaciente=$_GET['id'];
    $llave=$_GET['llave'];
    $fecha_entrega='';
    $sql_1="select FECHA_RESULTADOS from caj_det_prestaciones where idpaciente='".$idpaciente."' and llave_fonasa=". $llave;
    $consultas=odbc_exec($conection,$sql_1);
   
	while ($result=odbc_fetch_array($consultas))
	{
		$fecha_entrega=$result['FECHA_RESULTADOS'];
	}
    if ($fecha_entrega=='')
    {
        $sql_="Update CAJ_DET_PRESTACIONES SET FECHA_RESULTADOS = CONVERT(varchar(10), GETDATE(), 103) Where IDPACIENTE = '".$idpaciente."' AND llave_fonasa = ".$llave;
    $eje=odbc_exec($conection,$sql_);
    }
    else
    {
//        $sql_="Update CAJ_DET_PRESTACIONES SET FECHA_RESULTADOS = CONVERT(varchar(10), GETDATE(), 103) Where IDPACIENTE = '".$idpaciente."' AND llave_fonasa = ".$llave;
//    $eje=odbc_exec($conection,$sql_);
	}
//return $sql_1;
?>