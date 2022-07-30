<?php
session_start();
//header("Cache-control: private"); //Arregla IE 6 
  
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
<script language="javascript" type="text/javascript" src="WEB/js/mambo.js"></script>
<meta content="text/html; charset=windows-1252" http-equiv="content-type">
<title>**Gestión de estudios**</title>
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
<?php  include("Header.html")?>
</td>
</tr>
 </table>

<br></br>
<form id="Citas" method="post" name="Citas" action="guarda_d.php">
    <table align="center" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
          <table align="center" class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
              <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>Estudios</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>
          </tr>
        </table>
 
          <table align="center" width="40" height="200" cellpadding="0" cellspacing="0" class="Record">
          
          <tr class="Controls">
            <td class="th"><label for="seccion">Sección:</label></td> 
            <td><select name="seccion" id="seccion" onChange="cambiaEstudio()" ><?php
                  $sql = "select cod_llave,descripcion from lab_relacion_laboratorio_seccion";
                  $query = odbc_exec($conection, $sql);
                  while ($result = odbc_fetch_array($query)) {
                    echo '<option value="' . $result['cod_llave'] . '">' . $result['descripcion'] . '</option>';
                  }
                  ?></select></td>
            <td></td>
          </tr>
          <tr class="Controls">
            <td class="th"><label for="estudios">Estudio:</label></td> 
            <td><select name="estudios" id="estudios"></select></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasApellidos">Apellidos:</label></td> 
            <td><input name="apellidos" id="CitasApellidos" value="" size="70"></td>
            <td></td>
          </tr>

  		
            </table>
</form>
<table align="center">
    <tr>
        <td><input value="Guardar" type="button" src="WEB/img/icons/bguardatencion.jpg" onClick="GuardaDoctor()" /></td>
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