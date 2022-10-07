<?PHP
include ('Libreria\ConectarDB.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .
$db_conn = conectarDB();

/* Consulta a realizar*/


$VL_SQLString = "";
$VL_SQLString = "SELECT DAT_DFipa.IdPaciente FROM DAT_Paciente, DAT_DFipa ";
$VL_SQLString = $VL_SQLString."WHERE (DAT_Paciente.rut = dat_dfipa.rut) ";
$VL_SQLString = $VL_SQLString."AND (DAT_Paciente.apellidos = '".$usuario."') ";
$VL_SQLString = $VL_SQLString."AND (DAT_Paciente.nombre = '".$contrasena."') ";
$VL_SQLString = $VL_SQLString."AND (DAT_Dfipa.numero = '".$folio."')";

#echo $VL_SQLString."<br><br><br>";

$query_result = mssql_query($VL_SQLString, $db_conn) or 
	die ("ERROR: no se puede ejecutar la consulta $VL_SQLString");

if (mssql_num_rows($query_result) != 0)
{
	/*/ usuario y contraseña válidos. defino una sesion y guardo datos
	 echo ("Con registros<BR>");
	echo ($usuario."<BR>");
	echo ($contrasena);
	echo ($folio);*/
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