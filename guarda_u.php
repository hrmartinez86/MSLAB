<?php
//include_once(RelativePath . "/Barra.php");
session_start();
header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado']=="ok" ) {
    
        } else {
     
          header("Location: ../index.php"); 
          echo "<html></html>";
        }
include ('Librerias/conection.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .   
	 
	$ODBC=$_SESSION["ODBC"];
//        echo $ODBC;
    //$conection=conectar($ODBC);
	$db_conn=conectar($ODBC);        
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<link rel="stylesheet" type="text/css" href="WEB/Styles/INFOLAB/Style_doctype.css">
    <head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Ingreso de Usuario</title>
</head>
<?php


$Nombre = $_POST['nombre'];
$Apellidos = $_POST['apellidos'];
$Codigo = $_POST['codigo'];
$Password=$_POST['Password'];
//llave_doctor
//$sql_1="Select max(llave_doctor)as llave_doctor from dat_doctores ";
// $query_result=odbc_exec($db_conn,$sql_1) or 
//			        die ("ERROR : No se puede ejecutar la consulta.");
//			        while($result=odbc_fetch_array($query_result))
//		            {	
//                                $llave_doctor=$result["llave_doctor"]+1;   	
//		            }	

$sql_1="INSERT INTO lab_usuarios (usuario, nombre, clave)   
       VALUES (
           '".$Codigo."', 
           '".$Nombre."', 
           '".$Password."')"; 
//   echo $sql_1; 
  $query_result=odbc_exec($db_conn,$sql_1) or 
die ("ERROR : No se puede ejecutar la consulta.");
   

?>
<link rel="stylesheet" type="text/css" href="Styles/INFOLAB/Style_doctype.css">

<body>
 <table align="center" border="0" cellspacing="0" cellpadding="0">
<!-- BEGIN Record Citas -->
<tr>
<!-- BEGIN Record Citas -->
<td valign="top">
<!-- BEGIN Record Citas -->
<!-- BEGIN Record Citas -->
<!-- BEGIN Record Citas -->
<?php  include("Header.html")?>
</td>
</tr>
 </table>
<!--<br></br>
<form id="Atenciones" method="post" name="Atenciones" action="atencionesxcita.php">
    <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>N&uacute;mero de Cita</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="10" cellpadding="0" cellspacing="0" class="Record">
          
          <tr class="Controls">
             
             <td><input align="middle" name="Cit" id="Cit" class="Controls" onChange="Citas('librerias/citas.php')" value="" ><div id="Citasn"></div></td> 
            <td><input  name="num" id="num" class="Controls" onChange="numero('librerias/citas.php')" value="" ><div id="numrocita"></div></td>
           
          </tr>
          </table>
          
          </table>
</form>
<br></br>-->
<br></br>
<form id="Citas" method="post" name="Citas" action="guarda_d.php">
    <table align="center" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
              <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong Usuario Ingresado</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td>
          </tr>
        </table>
 
          <table width="40" height="200" cellpadding="0" cellspacing="0" class="Record">
          
          <tr class="Controls">
              <td class="th"><label for="CitasNombres">Usuario:</label></td> 
            <td><h3  size="70"><?php echo $Apellidos . ' ' . $Nombre; ?></td>
            <td></td>
          </tr>
          
  		
            </table>
</form>
<table align="center">
    <tr>
        <!--<td><input value="Guardar" type="button" src="WEB/img/icons/bguardatencion.jpg" onClick="GuardaDoctor()" /></td>-->
    </tr>
</table>
<p>
  <!-- END Record Citas -->
</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp; </p>

</body>

</html>
