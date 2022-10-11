<?php 

    session_start();

    include("librerias/conection.php");

    $ODBC = $_SESSION["ODBC"];

    $llave_fonasa=$_POST['llave_fonasa'];

    $conection = conectar($ODBC);

    $sql="SISTEMA_DETALLE_ESTUDIO_WEB @LLAVE_FONASA=".$llave_fonasa;
    $query_result=odbc_exec($conection,$sql) or 
                die ("ERROR : No se puede ejecutar la consulta.");
                while($result=odbc_fetch_array($query_result))
    {	
                // $llave_fonasa=$result["LLAVE_FONASA"]; 
                // $llave_prueba=$result["LLAVE_PRUEBA"]; 
                // $curva=$result["CURVA"]; 
                // $unidades=$result["UNIDADES_MEDIDA"]; 
                // $codigo=$result["CODIGO_FONASA"]; 
                	
                // $estudios_array[] = array(
                //     "llave_fonasa" => $llave_fonasa,
                //     "llave_prueba" => $llave_prueba,
                //     "curva" => $curva,
                //     "UNIDADES" => $unidades,
                //     "codigo_fonasa" => $codigo
                // );
                $estudios_array[]=$result;
    }	
    echo json_encode($estudios_array);
?>