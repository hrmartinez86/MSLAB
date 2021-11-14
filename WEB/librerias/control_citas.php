<?php


	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "Demo123.") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
	

			$sql_citas="select citas_creadas, maximo_atenciones_dia from citas_dias where fecha=convert(datetime,'".$_GET['fecha_b']."',103)";
			$exec=odbc_exec($conection, $sql_citas) or die ("Error");
			$hechas=odbc_result($exec,"citas_creadas");
			
			$exec_t=odbc_exec($conection,"select citasMaximoDias from configuracion_Core");
			$total=odbc_result($exec_t,"citasMaximoDias");	
			$fecha=$total-$hechas;
			echo  $fecha;

	
	
	
	
	

?>