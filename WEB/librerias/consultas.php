<?php
	session_start();
	
	

    function numeroDiario($fecha)
    {
        $ODBC=$_SESSION['ODBC'];

        $conection = odbc_connect($ODBC, "sa", "") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
        
        $sql="select max(numero_registro) as numero_registro from dat_dfipa where fecha='21/10/2021'";

        $eje=odbc_exec($conection,$sql);
	
        while ($res=odbc_fetch_array($eje))
        {
            $num=$res['numero_registro'];
        }

        return $num;
    }

	
	
?>