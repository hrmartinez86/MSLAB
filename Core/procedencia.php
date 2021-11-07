<?php 
    function IngresaProcedencia($procedencia)
    {
        $db_conn = conectar('laboratorio');
        ///aumento el correlati vo de la atencion
        $sql_1 = "SELECT id FROM procedencia_muestra WHERE descripcion ='" . $procedencia."'";
        echo $sql_1;
        $query_result = odbc_exec($db_conn, $sql_1) or
        die("ERROR : No se puede ejecutar la consulta.3");
        $proc='';
        while ($result = odbc_fetch_array($query_result)) {
            $proc = $result["id"];
        }

        if ($proc=='') {
            $sql_1="select top 1 id from procedencia_muestra order by id desc";
            $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta.3");
            $proc='';
            while ($result = odbc_fetch_array($query_result)) {
                $cod = "C".$result["id"];
            }
            $sql_1="INSERT INTO procedencia_muestra (codigo,descripcion,activo,clase) values ('".$cod."','".$procedencia."','S','B')";
            $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta.2" . odbc_errormsg() . $sql_1);
            $sql_1="select top 1 id from procedencia_muestra order by id desc";
            $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta.3");
            $proc='';
            while ($result = odbc_fetch_array($query_result)) {
                $proc = $result["id"];
            }
            
        }
        return $proc;
    }
?>