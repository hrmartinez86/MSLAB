<?php 
    function IngresaFolio($paciente,$empresa,$procedencia,$tipo,$doctor)
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
    }
    
?>
    