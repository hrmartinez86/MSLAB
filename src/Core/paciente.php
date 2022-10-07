<?php

    function IngresaPaciente($nombre,$telefono,$email,$fecha,$empresa){
        $db_conn = conectar('laboratorio');
        //agregamos al paciente
        // echo "No existe el expediente " .$Expediente;
        $sql_1 = "SELECT CORRELATIVO_PACIENTES FROM CAJ_CORRELATIVOS";
        $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_CORRELATIVOS.");

        while ($result = odbc_fetch_array($query_result)) {
            $correPac = $result["CORRELATIVO_PACIENTES"];
            $correcPac = $correPac + 1;
        }

        //   actualizamos el correlativo de paciente
        $sql_1 = "UPDATE CAJ_CORRELATIVOS SET CORRELATIVO_PACIENTES =" . $correcPac;
        $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta.");

        $sql_1 = "INSERT INTO dat_paciente (cod_empresa, rut, expediente , nombre, apellidos, fecha_nacimiento, 
        calle, telefono, fono_urgencia, contraindicaciones, sexo, ciudad, fecha_ult_examen,curp,rfc,email) 
            VALUES (" . $empresa . ", '" . $correPac . "', '','" . $nombre . "', 
            '', '" . $fecha . "', '', '" . $telefono . "', '', ''
            , 'U', '1', CONVERT(DATETIME, GETDATE(), 103), '', '','".$email."')";

        $rut = $correPac;
        // echo $sql_1;
        $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
        
        

        return $correcPac;
        
    }
?>