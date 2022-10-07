<?php 

function IngresarCajDetPrestaciones($idpaciente,$fecha)
{
    $f=explode("-",$fecha);
    $fi=$f[2]."/".$f[1]."/".$f[0];
    $db_conn = conectar('laboratorio');
    $sql_1 = "INSERT INTO CAJ_DET_PRESTACIONES (cod_empresa,IDPACIENTE, ID, LLAVE_FONASA, VALOR_PARTICULAR, VALOR_PREVISION, 
    VALOR_PAGADO, USUARIO_CREACION, FECHA_ENTREGA, URGENTE, FECHA_CREACION,LIBERADO)  VALUES (1, '".$idpaciente."', 1, 51, 0, 0, 0, 'MASTER', '30/10/2021', '', 
    CONVERT(DATETIME, ".$fi.", 103),'N' )";
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO CAJ_DET_PRESTACIONES (cod_empresa,IDPACIENTE, ID, LLAVE_FONASA, VALOR_PARTICULAR, VALOR_PREVISION, 
    VALOR_PAGADO, USUARIO_CREACION, FECHA_ENTREGA, URGENTE, FECHA_CREACION,LIBERADO)  VALUES (1, '".$idpaciente."', 2, 153, 0, 0, 0, 'MASTER', '30/10/2021', '', 
    CONVERT(DATETIME, ".$fi.", 103),'N' )";
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, 
    dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado)  VALUES ('C1', 29, 'C1_C1', 74, 1, '".$idpaciente."', 'MASTER', CONVERT(DATETIME, ".$fi.", 103), 
    'NEGATIVO' )";	
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, 
    dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado)  VALUES ('C1', 29, 'C1_NOTA', 75, 1, '".$idpaciente."', 'MASTER', CONVERT(DATETIME, ".$fi.", 103), 
    '' )";	
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, 
    dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado)  VALUES ('RF', 127, 'RF_TH', 610, 1, '".$idpaciente."', 'MASTER', CONVERT(DATETIME, ".$fi.", 103), 
    'NEGATIVO' )";	
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, 
    dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado)  VALUES ('RF', 127, 'RF_PRO', 611, 1, '".$idpaciente."', 'MASTER', CONVERT(DATETIME, ".$fi.", 103), 
    'NEGATIVO' )";	
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, 
    dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado)  VALUES ('RF', 127, 'RF_PB', 612, 1, '".$idpaciente."', 'MASTER', CONVERT(DATETIME, ".$fi.", 103), 
    'NEGATIVO' )";	
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, 
    dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado)  VALUES ('RF', 127, 'RF_TO', 613, 1, '".$idpaciente."', 'MASTER', CONVERT(DATETIME, ".$fi.", 103), 
    'NEGATIVO' )";	
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, 
    dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado)  VALUES ('RF', 127, 'RF_PA', 614, 1, '".$idpaciente."', 'MASTER', CONVERT(DATETIME, ".$fi.", 103), 
    'NEGATIVO' )";	
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, 
    dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado)  VALUES ('RF', 127, 'RF_BRU', 615, 1, '".$idpaciente."', 'MASTER', CONVERT(DATETIME, ".$fi.", 103), 
    'NEGATIVO' )";	
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
    $sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, 
    dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado)  VALUES ('RF', 127, 'RF_NOTA', 616, 1, '".$idpaciente."', 'MASTER', CONVERT(DATETIME, ".$fi.", 103), 
    '' )";
    $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());

}
?>