<?PHP
include ('Libreria\ConectarDB.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .
$db_conn = conectarDB();

/* Consulta a realizar*/
$VL_SQLString = "";
$VL_SQLString = "SELECT DAT_DFipa.IdPaciente FROM DAT_Paciente, DAT_DFipa ";
$VL_SQLString = $VL_SQLString."WHERE (DAT_Paciente.rut = dat_dfipa.rut) ";
$VL_SQLString = $VL_SQLString."AND (DAT_Paciente.rut_paciente = '".$usuario."') ";
$VL_SQLString = $VL_SQLString."AND (DAT_Paciente.cmc = '".$contrasena."') ";
$VL_SQLString = $VL_SQLString."AND (DAT_Dfipa.numero = '".$folio."')";

$query_result = mssql_query($VL_SQLString, $db_conn) or 
	die ("ERROR: no se puede ejecutar la consulta");

if (mssql_num_rows($query_result) != 0)
{
	// usuario y contraseña válidos. defino una sesion y guardo datos
	 echo ("Con registros<BR>");
	echo ($usuario."<BR>");
	echo ($contrasena);
	echo ($folio);
	session_start();
	$_SESSION["autentificado"] = "SI";
	$result = mssql_fetch_array($query_result);
	$Paciente = $result["IdPaciente"];
	header ("Location: Ficha_Paciente.php?Paciente=".$Paciente);
}
else
{ 
	//   si no existe le mando otra vez a la portada 
	//   echo ("Sin registros");
	header("Location: salir.php"); 
} 
mssql_close($db_conn);
?>