<?php
session_start();
session_unset();
session_destroy(); 
session_start();
header("Cache-control: private"); 
include ("librerias/conection.php");
$conection=conectar();
$fecha=date("d , M, y,  H:i a");

?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--

Design by Free CSS Templates
http://www.freecsstemplates.org
Released for free under a Creative Commons Attribution 2.5 License

Title      : Puzzled
Version    : 1.0
Released   : 20080706
Description: A wide two-column design suitable for blogs and small websites.

-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script language="javascript" type="text/javascript" src="js/mambo.js"></script>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>MS-APEC</title>
<!--<link rel="icon" type="image/gif" href="favicon.gif">-->
<meta name="keywords" content="" />
<meta name="description" content="" />
<link href="default.css" rel="stylesheet" type="text/css" />
<link href="css/bulma/css/bulma.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="WEB/Styles/INFOLAB/Style_doctype.css">
<style type="text/css">
<!--
#apDiv1 {
	position:absolute;
	left:200px;
	top:309px;
	width:582px;
	height:12px;
	z-index:1;
	visibility: visible;
	overflow: visible;
}
.Estilo2 {font-size: 9px}
#Layer1 {
	position:absolute;
	left:512px;
	top:190px;
	width:137px;
	height:102px;
	z-index:1;
}
.Estilo3 {font-family: "Times New Roman", Times, serif}
-->
</style>
<script language="javascript">
function self()
{
	 document.forms[0].login.focus()
}
</script>

</head>
<body onload="self()">
<!-- start header -->
<!-- end header -->
<div id="headerbg">

</div>
<!-- start page -->
<div id="page">
	<!-- start content -->
	<div id="content">
		<!-- start latest-post -->
		<div id="latest-post" class="post">
			<h1 class="tag is-info is-large">Inicio de Sesion </h1>
			<p class="meta"><small>Fecha <?php echo $fecha; ?><br />
			</small></p>
			<div class="entry">
			<div style="text-align:center;">
            <form id="ingreso" name="ingreso" method="post" action="valida.php">
    <table width="200" border="0" align="center">

      <tr>
        <td align="left">USUARIO:</td>
        <td><input type="text" name="usuario" id="usuario" onKeyPress = "Valida(event)"/></td>
      </tr>
	  <TR>
		<td align="left">CONTRASEÑA:</td>
        <td><input type="password" name="password" id="password" onKeyPress = "Valida(event)" /></td>
	  <label>
      
	    <!--div align="center">PACIENTE:<br />
	      <span class="Estilo2">(si 
	        <input type="checkbox"    checked="checked" disabled="disabled"/>
	        , no
	        <input type="checkbox"  disabled="disabled"/>
	        )</span></div>
	  </label></td>
		<td>
		  <div align="center">
		    <input type="checkbox" name="checkbox" value="checkbox" />
		      </div--></td></label>
	  </TR>
    </table>
    

      <br />
      
    
    </form>
                            <a class="button is-info is-outlined" onclick="Validas()">
  Aceptar
</a>
      <!--<input type="image" src="images/infolab/baceptar1.jpg" onclick="Validas()" />-->
</div>
		  </div>
		</div>
		<!-- end latest-post -->
		<!-- start recent-posts -->
		<!-- end recent-posts -->
    </div>
	<!-- end content -->
	<!-- start sidebar -->
	
  <!-- end sidebar -->
</div>
<!-- end page -->

</body>
</html>
