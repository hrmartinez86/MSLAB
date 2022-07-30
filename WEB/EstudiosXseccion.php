<?php 

    session_start();

    include("librerias/conection.php");

    $ODBC = $_SESSION["ODBC"];

    $conection = conectar($ODBC);

    $sql="select nombre as llave_fonasa,nombre from caj_codigos_fonasa";
    $query_result=odbc_exec($conection,$sql) or 
                die ("ERROR : No se puede ejecutar la consulta.");
                while($result=odbc_fetch_array($query_result))
    {	
                $llave_fonasa=$result["llave_fonasa"]; 
                $nombre=$result["nombre"];  	
                $estudios[] = array("llave_fonasa" => $llave_fonasa, "nombre" => $nombre);
    }	
    echo json_encode($estudios);
?>