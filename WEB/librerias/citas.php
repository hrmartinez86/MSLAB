<?php
	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "Demo123.") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");


	$sql_paciente="select top 1* from dat_paciente where expediente ='".$_GET['cta']."'";
	$eje=odbc_exec($conection,$sql_paciente);
	$count=0;
	while ($res=odbc_fetch_array($eje))
	{
	if($res['sexo']=="M")
		$sexo="Masculino";
	else
		$sexo="Femenino";
		
	$fec=explode(" ",$res['fecha_nacimiento']);
	echo '
		 <ul>
     		<li><strong>Nombre: </strong>'.$res['nombre']." ".$res['apellidos'].'<br></li>
			<li><strong>Sexo: </strong>'.$sexo.'<br></li>
			<li><strong>Fecha de Nacimiento: </strong>'.$fec[0].'<br></li>
			<li><strong>Rut: </strong>'.$res['rut'].'<br></li>
			<li><strong>Rut: </strong>"ttttt"<br></li>			
   		</ul>
		 ';
	$count++;	
	}
	
if ($count<=0){
echo 'sin registros <input type="hidden" value="0" name="paciente"/>';
}
else
{
	echo '<input type="hidden" value="1" name="paciente"/>';
}

?>