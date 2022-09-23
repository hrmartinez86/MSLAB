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

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
<script language="javascript" type="text/javascript" src="js/mambo.js"></script>
<!-- <script language="javascript" type="text/javascript" src="../WEB/js/mambo.js"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
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
 
          <table align="center" width="20" height="20" cellpadding="0" cellspacing="0" class="Record">
          
          
          <tr class="Controls">
            <td class="th"><label for="estudios">Editor de estudio:</label></td> 
            <td><select style="width:100%;"  id="ExamenCatalogo"  onchange="despliegaDetalle()">
                  <?php
                  ///estudios
                  $sql = "select llave_fonasa,codigo_fonasa,nombre,costo_examen as precio,nivel_1,dias_proceso  from caj_codigos_fonasa where activo='S' AND CODIGO_FONASA NOT LIKE 'ANTV%' order by nombre ";
                  $query = odbc_exec($conection, $sql);
                  while ($result = odbc_fetch_array($query)) {
                    echo '<option value="' . $result['llave_fonasa'] .'">'
                     .  $result['nombre'] .  '</option>';
                  }
                  ?>
                </select></td>
            <td></td>
          </tr>

  		
            </table>
            <div id="estudioDetalle">
              <table id="tablaEstudiosDetalle" class="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th scope="col">Prueba</th>
                    <th scope="col">Unidades</th>
                    <th scope="col">CodigoBarras</th>
                    <th scope="col">Rangos de referencia</th>
                  </tr>
                </thead>
            </table></div>
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