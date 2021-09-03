<?php
session_start();
session_destroy();
?>
	<html>
	<head>
	<title>Impresion de Resultados</title>
	<meta http-equiv="imagetoolbar" content="no">
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
	<style type="text/css">
	.FondoVentana {background-color: #003366}
	.TituloInformacion {
		font-family:Verdana;
		font-size:12px;
		color:#FFFFFF;
		text-decoration:none;
		text-transform: uppercase;
		background-position: center center;
	}
	.Informacion {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 10px;
		font-style: normal;
		text-transform: uppercase;
	}
	.MensajeError {
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-size: 14px;
		font-style: italic;
		color: #0000CC;
	}
	</style>
	</head>
	<BODY>
	<table border="0" width="100%" height=100% border=0 cellspacing=0 cellpadding=0>
	<tr height="24">
		<td background="Imagenes/Fondo.jpg" class="TituloInformacion">Seleccion de Pacientes</td>
	</tr>
	<tr height="12">
		<td background="Imagenes/FondoDegradadoAR.jpg" class="TituloInformacion">&nbsp;</td>
	</tr>
	<tr>
		<td bgcolor="#FFFFFF">
		<br><br><center><b class='MensajeError'>El nombre de Usuario o Contraseña no corresponde.<br><br>Rectifique.</b></center><br><br>
		<center><A HREF="javascript:history.back()">- Volver Atr&aacute;s -</A></center>
		</td>
	</tr>
	<tr height="14">
		<td background="Imagenes/FondoDegradadoAB.jpg" align="right" class="TituloInformacion"><img src="Imagenes/Pcs.gif" width="32" height="32"></td>
	</tr>
	</table>
	</BODY>
	</html>
