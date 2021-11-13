
<?php
	session_start();
	$ODBC='laboratorio';
	$conection = odbc_connect($ODBC, "sa", "Demo123.") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $fecha=date("d/m/Y");
    $hora=date("H:i:s");
    $fh=$fecha." ".$hora; 
    
    $idAgrupacion=$_GET['id'];
   
    $sql_1="select ccf.codigo_fonasa from agrupaciones ag
    inner join agrupacion_examenes ae on ae.id_agrupacion=ag.id
    inner join caj_codigos_fonasa ccf on ccf.llave_fonasa=ae.llave_fonasa
    where ag.codigo='".$idAgrupacion."'";
    $consultas=odbc_exec($conection,$sql_1);
   
	while ($result=odbc_fetch_array($consultas))
	{
		echo"<tr>";
        echo "<td>".$result['codigo_fonasa']."</td>";
        echo "</tr>";
	}
   
//return $sql_1;
?>