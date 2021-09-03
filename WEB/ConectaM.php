<?php
include ('Libreria/ConectarDB.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .
$db_conn = conectarDB();

/* Consulta a realizar */
$query_result = mssql_query("SELECT * FROM TBL_UsuariosWEB WHERE (UW_NombreUsuario = '".$usuario."') AND (UW_Contrasena = '".$contrasena."')",$db_conn) or 
	die ("ERROR: no se puede ejecutar la consulta");

if (mssql_num_rows($query_result) != 0)
{
	session_start();
	$_SESSION["autentificado"] = "SI";
	header ("Location: SeleccionPaciente.php");
}
else
{ 
	header("Location: salir.php"); 
} 
mssql_close($db_conn);
?>