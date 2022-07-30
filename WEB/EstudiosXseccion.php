<?php 

    session_start();

    include("librerias/conection.php");

    $ODBC = $_SESSION["ODBC"];

    $conection = conectar($ODBC);

    $sql=$_GET['sql'];
    
    $query_result=odbc_exec($conection,$sql) or 
                die ("ERROR : No se puede ejecutar la consulta.");
                while($result=odbc_fetch_array($query_result))
    {	
                $codigo=$result["codigo"]; 
                $nombre=$result["nombre"];  	
                $catalogo[] = array("codigo" => $codigo, "nombre" => $nombre);
    }	
    echo json_encode($catalogo);
?>