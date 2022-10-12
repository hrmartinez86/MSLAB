<?php

function conectar()
{
$host='localhost';
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