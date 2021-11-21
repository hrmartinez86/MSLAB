<?php
	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "Kapi312") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");


	$sql_paciente="select top 1* from dat_paciente where expediente ='".$_GET['exp']."'";
	$eje=odbc_exec($conection,$sql_paciente);
	$count=0;
	while ($res=odbc_fetch_array($eje))
	{
	if($res['sexo']=="M")
		$sexo="Masculino";
	else
		$sexo="Femenino";
		
	$fec=split(" ",$res['fecha_nacimiento']);
	$fecs=split("-",$fec[0]);
	$fm= $fecs[2]."/".$fecs[1]."/".$fecs[0];
	echo '
	     <input type="hidden" value="1" id="p" name="paciente"/>
	     <input type="hidden" value="'.$res['nombre'].'" id="CitasNombresR"/>
	     <input type="hidden" value="'.$res['apellidos'].'" id="CitasApellidosR"/>
	     <input type="hidden" value="'.$res['sexo'].'" id="SexoR"/>
		 <input type="hidden" value="'.$fm.'" id="FechaR"/>
		 <input type="hidden" value="'.$res['calle'].'" id="DireccionR"/>
		 <input  type="hidden"  value="'.$res['ciudad'].'" id="CiudadCitR"/>
		 <input  type="hidden"  value="'.$res['telefono'].'" id="TelefonoR"/>
		 <input  type="hidden"  value="'.$res['rfc'].'" id="CitasRFCR"/>
		 <input  type="hidden"  value="'.$res['CURP'].'" id="CitasCURPR"/>
		 ';
	$count++;	
	}
	
if ($count<=0){
echo 'Sin Registros <input type="hidden" value="0" id="p" name="paciente"/>';
}
else
{
	echo '';
}

?>