<?php 
    function IngresaFolio($paciente,$empresa,$procedencia,$tipo,$doctor,$fecha)
    {
        $db_conn = conectar('laboratorio');
        ///aumento el correlati vo de la atencion
        $sql_1 = "SELECT par_correlativo FROM lab_parametros_sistema WHERE cod_empresa =" . $empresa;
        echo $sql_1;
        $query_result = odbc_exec($db_conn, $sql_1) or
        die("ERROR : No se puede ejecutar la consulta.3");

        while ($result = odbc_fetch_array($query_result)) {
            $correF = $result["par_correlativo"];
            $correcF = $correF + 1;
        }
        $cod = str_pad($empresa, 2, "0", STR_PAD_LEFT);
        $folio = str_pad($correF, 6, "0", STR_PAD_LEFT);
        $folio = $cod . $folio;
        $f=explode("-",$fecha);
        $fi=$f[2]."/".$f[1]."/".$f[0];
        $idpaciente = $f[0] .$f[1].$f[2]. $folio;
        echo '<br>'.$idpaciente .'<br>';
        
        //Actualizo el correlativo del folio
        $sql_1 = "UPDATE lab_parametros_sistema SET par_correlativo =" . $correcF . " WHERE cod_empresa =" . $_SESSION['empresa'];
        $query_result = odbc_exec($db_conn, $sql_1) or
        die("ERROR : No se puede ejecutar la consulta.1");

        // //almacenamos el numero consecutivo diario
        // $numeroDiario=numeroDiario($fecha)+1;
        $sql="select max(numero_registro) as numero_registro from dat_dfipa where fecha='".$fi."'";

        $eje=odbc_exec($db_conn,$sql);
	
        while ($res=odbc_fetch_array($eje))
        {
            $num=$res['numero_registro'];
        }
        $numeroDiario=$num+1;
        $folioComprobante=str_pad($numeroDiario, 3, "0", STR_PAD_LEFT);
        $paciente--;
        // //insert a dat_dfipa
        $sql_1 = "INSERT INTO dat_dfipa (cod_empresa, fecha, hora, numero,  
        rut, 
        idpaciente, 
        USUARIO_CREACION, 
        procedencia, 
        localizacion, 
        observacion_ficha, 
        tipo, 
        VERIFICA_INGRESO, 
        TIPO_DE_URGENCIA, 
        doctor, 
        MEDICO_ESCRITO, 
        hora_creacion, 
        anos, 
        meses, 
        dias, 
        comentario, 
        fecha_creacion, 
        procedencia_muestra, 
        autoriza_retiro, 
        turno, 
        ID_UNIDAD_PROCEDENCIA, 
        num_cama,
        numero_registro) 
        vALUES (" . $empresa . ",
        '" . $fi . "', 
        '', 
        '" . $folio . "', 
        '" . $paciente . "', 
        '" . $idpaciente . "', 
        '" . $_SESSION['nivel'] . "', 
        '0', 
        '0', 
        '', 
        '" . $tipo . "', 
        'K', 
        'R', 
        " . $doctor . ", 
        '', 
        '17:17:39', 
        0, 
        0, 
        1, 
        '0',
        '" . $fecha . "', 
        " . $procedencia . ", 
        '', 
        1, 
        0, 
        '',
        '" . $numeroDiario . "')";


        $query_result = odbc_exec($db_conn, $sql_1) or
        die("ERROR : No se puede ejecutar la consulta.2" . odbc_errormsg() . $sql_1);

        return $idpaciente;
    }
    
?>
    