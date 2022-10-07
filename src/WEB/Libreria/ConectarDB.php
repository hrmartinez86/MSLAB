<?php

function conectarDB()
{
   $VL_ServidorBD = 'local';
   #$VL_ServidorBD = 'lis';
   $VL_UsuarioBD = 'sa';
   $VL_ContrasenaBD = '';
   $db_conn =mssql_connect($VL_ServidorBD, $VL_UsuarioBD, $VL_ContrasenaBD) or exit("no me conecte");
   #$db_conn = odbc_connect('ODBC_INFO', $VL_UsuarioBD,'') or die ("Error en conexio");
   mssql_select_db('info',$db_conn) or exit("No me conecte");
   
   return $db_conn;
}
echo conectarDB();

?>