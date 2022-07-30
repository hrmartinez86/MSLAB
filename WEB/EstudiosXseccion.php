<?php 

    session_start();

    include("librerias/conection.php");

    $ODBC = $_SESSION["ODBC"];

    $conection = conectar($ODBC);

    $sql="select llave_fonasa as llave_doctor,nombre from caj_codigos_fonasa";
    $query_result=odbc_exec($conection,$sql) or 
                die ("ERROR : No se puede ejecutar la consulta.");
                while($result=odbc_fetch_array($query_result))
    {	
                $llave_doctor=$result["llave_doctor"]; 
                $nombre=$result["nombre"];  	
                $medico_arr[] = array("llave_doctor" => $llave_doctor, "nombre" => $nombre);
    }	
    echo json_encode($medico_arr);
?>