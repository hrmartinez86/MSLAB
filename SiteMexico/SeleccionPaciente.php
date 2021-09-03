<?php
/* INICIALIZA LA FECHA DEL SERVIDOR */
$fecha_hoy=date("d/m/Y");
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta http-equiv="imagetoolbar" content="no">
<title>Selección de Pacientes</title>
  <!-- estilo del calendario themes.- -->
  <link rel="stylesheet" type="text/css" media="all" href="Libreria/calendar-blue.css" title="winter" />
  <!-- control central del script.- -->
  <script type="text/javascript" src="Libreria/calendar.js"></script>
  <!-- idioma del calendario a utilizar.- -->
  <script type="text/javascript" src="Libreria/calendar-es.js"></script>
  <!-- parametros de configuracion del calendario.- -->
  <script type="text/javascript" src="Libreria/calendar-setup.js"></script>

<script language="JavaScript">
function fechaHOY()
{
    var f = document.forms[0];
    if (f.VLF_FechaInicio.value == "")
	{
       f.VLF_FechaInicio.value = f.txt_fecha.value;
       f.VLF_FechaTermino.value = f.txt_fecha.value;
    }
}
</script>
<script language="javascript" src="Libreria/xp_progress.js"></script>
<script>
	function F_IniciaConsulta()
	{
		bar1.showBar();
		bar1.togglePause();
		frm_control.submit()
	}
	function F_LimpiarCampos()
	{
		document.frm_control.Paciente.value = "-1";
		document.frm_control.VLF_CMC.value = "";
		document.frm_control.VLF_Folio.value = "";
		document.frm_control.VLF_Rut.value = "";
		document.frm_control.VLF_FechaInicio.value = "";
		document.frm_control.VLF_FechaTermino.value = "";
	}
</script>
</head>

<body>
<img src="Imagenes/SeleccionPaciente.jpg" width="503" height="463" style="position:absolute; left: 11px; top: 15px;" alt="" border="0">
<div style="font-size:19px; font:Tahoma; color:#FFFFFF; position:absolute; top: 20px; left: 28px; width: 196px; height: 26px;">Selecci&oacute;n de Pacientes </div>
<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 408px; height: 21px; left: 59px; top: 81px;">Indique los parámetros para la selección de Pacientes</div>
<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 118px; height: 20px; left: 351px; top: 214px;">(Ej. 13.739.992-9)</div>
<form name="frm_control" method="POST" action="procesa_formulario.php" target="_self">

<select id="Paciente" name="Paciente" align="left" onclick ="fechaHOY();" style="position:absolute; top: 125px; left: 224px; width: 280px; height: 20px;">
<option value='-1'>Seleccione la Procedencia</option>
<?php
include ('Libreria/ConectarDB.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .
$db_conn=conectarDB();

/* Consulta a realizar 23 */
$RCS_Consulta=mssql_query("SELECT * FROM procedencia_muestra WHERE activo = 'S' ORDER BY Descripcion",$db_conn) or 
		die ("ERROR: No se puede ejecutar la consulta");

if (mssql_num_rows($RCS_Consulta)!=0)
{
   while($RCS_01=mssql_fetch_array($RCS_Consulta))
   {
		echo("<option value=".$RCS_01["id"].">".$RCS_01["descripcion"]."</option>");
   }
}
?>
<input name="VLF_CMC"          type="text"   maxlength="12" style="position:absolute; top: 170px; left: 224px; width: 80px; height: 20px;">
<input name="VLF_Rut"          type="text"   maxlength="12" style="position:absolute; top: 212px; left: 224px; width: 84px; height: 20px;">
<input name="VLF_Folio"        type="text"   maxlength="08" style="position:absolute; top: 255px; left: 224px; width: 71px; height: 20px;">
<input type="hidden" name="txt_fecha" value="<?php echo ($fecha_hoy); ?>">

<input name="VLF_FechaInicio"  type="text"   maxlength="10" style="position:absolute; top: 300px; left: 224px; width: 74px; height: 20px;" id="f_date_ini" value="">
<img src="Imagenes/Calendario.gif" id="img_FechaInicio" style="position:absolute; top: 300px; left: 304px; cursor: pointer; border: 0px solid red;" title="Selecciona fecha inicial.-" /></td>
<script type="text/javascript">
  Calendar.setup({
	  inputField     :    "f_date_ini",     // id of the input field
	  ifFormat       :    "%d/%m/%Y",      // format of the input field
	  button         :    "img_FechaInicio",  // trigger for the calendar (button ID)
	  align          :    "Br",           // alignment (defaults to "Bl")
	  singleClick    :    true
  });
</script>

<input name="VLF_FechaTermino" type="text"   maxlength="10" style="position:absolute; top: 340px; left: 224px; width: 74px; height: 20px;" id="f_date_fin" value="">
<img src="Imagenes/Calendario.gif" id="img_FechaTermino" style="position:absolute; top: 340px; left: 304px; cursor: pointer; border: 0px solid red;" title="Selecciona fecha final.-">
<script type="text/javascript">
  Calendar.setup({
	  inputField     :    "f_date_fin",     // id of the input field
	  ifFormat       :    "%d/%m/%Y",      // format of the input field
	  button         :    "img_FechaTermino",  // trigger for the calendar (button ID)
	  align          :    "Br",           // alignment (defaults to "Bl")
	  singleClick    :    true
  });
</script>
<input name="btn_acceso" type="submit" maxlength="12" style="position:absolute; top: 384px; left: 256px; width: 111px; height: 24px;" onclick="F_IniciaConsulta()" value="Ingresar" >
</form>

<form name="FRM_Limpiar">
<input name="BTN_Limpiar" type="submit" maxlength="12" style="position:absolute; top: 384px; left: 139px; width: 111px; height: 24px;" onclick="F_LimpiarCampos()" value="Limpiar" >
</form>

<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 329px; height: 20px; left: 100px; top: 416px;">
<script type="text/javascript">
	var bar1= createBar(300,15,'white',1,'lightblack','lightblue',185,7,1,"");
	bar1.togglePause();
	bar1.hideBar();
</script>
</div>
</body>
</html>
