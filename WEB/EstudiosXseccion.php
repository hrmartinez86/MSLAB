<?php 

    session_start();

    include("librerias/conection.php");

    $ODBC = $_SESSION["ODBC"];

    $conection = conectar($ODBC);

    $cod_llave=$_GET['cod_llave'];
    $x=0;
    $sql="SELECT lrp.llave_perfil as llave,ccf.nombre as nombre from caj_codigos_fonasa  ccf INNER JOIN lab_relac_fonasa_perfil lrfp ON ccf.llave_fonasa=lrfp.llave_fonasa
    INNER JOIN lab_RLS_perfiles lrp on lrfp.llave_perfil=lrp.llave_perfil
    where cod_llave='QUIQUI'";
    $query_result=odbc_exec($conection,$sql) or 
                die ("ERROR : No se puede ejecutar la consulta.");
                while($result=odbc_fetch_array($query_result))
    {	
                $x=$x+1;
                $llave=$result["llave"]; 
                $nombre=$result["nombre"];  	
                $estudios[] = array("llave_perfil" => $llave, "nombre" => $nombre);
    }	
    echo $estudios;
?>