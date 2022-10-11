<?php

function conectar()
{
// $conection = odbc_connect("laboratorio", "sa", "Demo123.") or die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA ASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $host='192.168.56.1';
    $dbName='laboratorio';
    $username='sa';
    $password='Demo123.';
    $puerto=1433;
    try {
        $conection=new PDO("sqlsrv:Server=$host,$puerto;Database=$dbName",$username,$password);
        echo("se conecto correctamente la base de datos");
        return $conection;
    } catch (PDOException $exp) {
        echo ("no se conecto la base de datos:$dbName,error $exp");
    }
}

?>