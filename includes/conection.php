<?php

function conectar()
{
$conection = odbc_connect("ODBC_infolab", "sa", "") or die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA ASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
return $conection;
}

function conect()
{
	@$conect= mssql_connect("LAP_BENISHMAIL","sa","") or die ("No se ha podido establecer la conexion con el servidor solicitado");
	mssql_select_db("info",$conect) or die ("No se pudo establecer conexion con la base de datos");
	return $conect;
	
}



?>