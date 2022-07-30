<?php 

    session_start();

    include("librerias/conection.php");

    $ODBC = $_SESSION["ODBC"];

    $conection = conectar($ODBC);

    $cod_llave=$_GET['cod_llave'];

    $sql="SELECT lrp.llave_perfil,ccf.nombre from caj_codigos_fonasa  ccf INNER JOIN lab_relac_fonasa_perfil lrfp ON ccf.llave_fonasa=lrfp.llave_fonasa
    INNER JOIN lab_RLS_perfiles lrp on lrfp.llave_perfil=lrp.llave_perfil
    where cod_llave='${$cod_llave}'";
    $query_result=odbc_exec($conection,$sql) or 
                die ("ERROR : No se puede ejecutar la consulta.");
                while($result=odbc_fetch_array($query_result))
    {	
                $llave_perfil=$result["llave_perfil"]; 
                $nombre=$result["nombre"];  	
                $estudios[] = array("llave_perfil" => $llave_perfil, "nombre" => $nombre);
    }	
    echo json_encode($estudios);
?>