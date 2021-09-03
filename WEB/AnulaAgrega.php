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
<title>**Agregar Quitar Estudios**</title>
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
<link rel="stylesheet" type="text/css" href="Styles/Core/Style_doctype.css">

<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></LINK>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>

</head>
<body>
 
<!-- BEGIN Record Citas -->
<?php include("Header.html")?>
<br></br>
<form id="Etiquetas" method="get" name="Etiquetas" action="anulaagregaxfolio.php">
    <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>Folio:</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="10" cellpadding="0" cellspacing="0" class="Record">
          
          <tr class="Controls">
             
            <!-- <td><input align="middle" name="Cit" id="Cit" class="Controls" onChange="Citas('librerias/citas.php')" value="" ><div id="Citasn"></div></td> -->
            <td><input  align="left" name="num" id="num" class="Controls" value="" ></td>
           
          </tr>
          </table>
          
          </table>
</form>
<br></br>


</body>

</html>