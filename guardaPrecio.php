<?php
//include_once(RelativePath . "/Barra.php");
session_start();

include ('Librerias/conection.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .   
	 
	$ODBC=$_SESSION["ODBC"];
//        echo $ODBC;
    //$conection=conectar($ODBC);
	$db_conn=conectar($ODBC);        

$llaveFonasa = $_GET['llave'];
$precio = $_GET['precio'];

$sql_1="UPDATE caj_codigos_fonasa set costo_examen=".$precio." where llave_fonasa=".$llaveFonasa; 
// $sql_1="select * caj_codigos_fonasa  where llave_fonasa=" + $llaveFonasa; 
  $query_result=odbc_exec($db_conn,$sql_1) or 
die ("ERROR : No se puede ejecutar la consulta.");

?>