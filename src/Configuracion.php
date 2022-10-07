<?php
session_start();
//header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado']=="ok" ) {
        } 
        else {
          header("Location: index.php"); 
         
        }
$ver_botones="";
$fecha=date("d , M, y,  H:i a");
include ("librerias/conection.php");
//include("librerias/control_citas.php");
$ODBC=$_SESSION["ODBC"];
$conection=conectar($ODBC);
$fecha=date('d/m/Y');
?> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!--AQUI ES DONDE PONEMOS LA INFO PARA LA CAPTURA DE LOS ESTUDIOS "AUTOCOMPLETAR" -->

<!-- TERMINA "AUTOCOMPLETAR" -->


<script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
<script language="javascript" type="text/javascript" src="js/mambo.js"></script>
<meta content="text/html; charset=windows-1252" http-equiv="content-type">
<title>**Configuraci&oacute;n**</title>
<style type="text/css">
	body{
		/*
		You can remove these four options 
		
		*/
		

	}
	#ad{
		padding-top:220px;
		padding-left:10px;
	}
	#Citas table tr td .Record .Bottom td {
	text-align: left;
}
</style>
<meta name="GENERATOR" content="CodeCharge Studio 4.2.00.040">
<link rel="stylesheet" type="text/css" href="WEB/Styles/Core/Style_doctype.css">

<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></LINK>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>

</head>
<body>
 <table align="center" border="0" cellspacing="0" cellpadding="0">
<!-- BEGIN Record Citas -->
<tr>
<!-- BEGIN Record Citas -->
<td valign="top">
<?php  
if ($_SESSION['login']=='master'){
include("Header.html");}
else
{
include("Headersc.html");}
?>
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
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>N&uacute;mero de Cita</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
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
<form id="Citas" method="post" name="Citas" action="guarda_c.php">
    <table align="center" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
          <table align="center" class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
              <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td> 
              <td class="th"><strong>Configuraci&oacute;n</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>
          </tr>
        </table>
 
          <table align="center" width="40" height="20" cellpadding="0" cellspacing="0" class="Record">
          
          <tr class="Controls">
            <td class="th"><label for="CitasNombres">Folio Paciente:</label></td> 
            <td><input name="codigo" id="Codigo" value="<?php 
            $sql="select par_correlativo from lab_parametros_sistema  where cod_empresa=1  ";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			        	echo $result['par_correlativo'];
			          }			?>" size="70"></td>
            <td></td>
          </tr>
          <!-- <tr class="Controls">
            <td class="th"><label for="CitasNombres">Folio Veterinario:</label></td> 
            <td><input name="Nombres" id="CitasNombres" value="<?php 
            //$sql="select par_correlativo from lab_parametros_sistema  where cod_empresa=2  ";
			      //$query=odbc_exec($conection,$sql);
			      //while ($result=odbc_fetch_array($query))
			         // {
			        	//echo $result['par_correlativo'];
			          //}			?>" size="70"></td>
            <td></td>
          </tr> -->
 
         
            
              <td><input type="hidden" name="nombre" id="usuario" value="<?php 
			        	echo $_SESSION['login'];
			          			?>" size="70"></td>
            

  		
            </table>
</form>
<table align="center">
    <tr>
        <td><input value="Guardar" type="button" src="WEB/img/icons/bguardatencion.jpg" onClick="GuardaFolio()" /></td>
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