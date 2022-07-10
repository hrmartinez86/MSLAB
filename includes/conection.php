<?php

function conectar()
{
    $serverName = "localhost"; //serverName\instanceName
    $connectionInfo = array( "Database"=>"laboratorio", "UID"=>"sa", "PWD"=>"Demo123.");
    $conn = sqlsrv_connect( $serverName, $connectionInfo);
    if( $conn ) {
        echo "Connection established.<br />";
   }else{
        echo "Connection could not be established.<br />";
        die( print_r( sqlsrv_errors(), true));
   }
return $conection;
}


?>