<?php
//Inicio la sesión
session_start();
header("Cache-control: private"); //Arregla IE 6        
if ( isset($_SESSION['estado']) and $_SESSION['estado']=="ok" ) {
        } else {
     
          header("Location: valida.php"); 
          echo "<html></html>";
        }
$fecha=date("d , M, y,  H:i a");	
$fecha2=date("Y-m-d");
$nombre_archivo ="includes/procedencia";

if ($file = fopen($nombre_archivo, "w+")) 
{ 
    fclose($file); 
}  
include ("scripts\php\generales.php");


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Sistema Web Informatico de Análisis Clinico</title>
<meta name="description" content="" />
<link href="default.css" rel="stylesheet" type="text/css" />
<link href="css/themes/blue/css/text-edit.css"rel="stylesheet" type="text/css" />
<script>
      window.dhx_globalImgPath="codebase/imgs/";
</script>
<script  src="codebase/dhtmlxcommon.js"></script>
<script  src="codebase/dhtmlxcalendar.js"></script>
<script type="text/javascript" src="js/dhtml-suite-for-applications-without-comments.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/caljs.js"></script>
<script type="text/javascript" src="js/overlib_mini.js"></script>
<script>
	var cal1, cal2, cal3, cal4, mCal, mDCal, newStyleSheet;

	var dateFrom = null;
	var dateTo = null;
	
	window.onload = function () {
		cal1 = new dhtmlxCalendarObject('calendar1');
		cal1.setOnClickHandler(selectDate1);
		cal2 = new dhtmlxCalendarObject('calendar2');
		cal2.setOnClickHandler(selectDate2);
		cal3 = new dhtmlxCalendarObject('calendar3');
		cal3.setOnClickHandler(selectDate3);
		cal4 = new dhtmlxCalendarObject('calendar4');
		cal4.setOnClickHandler(selectDate4);
		cal5 = new dhtmlxCalendarObject('calendar5');
		cal5.setOnClickHandler(selectDate5);
		cal6 = new dhtmlxCalendarObject('calendar6');
		cal6.setOnClickHandler(selectDate6);
		
				
		mCal = new dhtmlxCalendarObject('dhtmlxCalendar', false, {isYearEditable: true});
		mCal.setYearsRange(2000, 2500);
		mCal.draw();
	}
	
	function setFrom() {
		dateFrom = new Date(cal1.date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}

	function selectDate1(date) {
		document.getElementById('calInput1').value = cal1.getFormatedDate(null,date);	
		document.getElementById('calendar1').style.display = 'none';
		dateFrom = new Date(date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}
	function selectDate2(date) {
		document.getElementById('calInput2').value = cal2.getFormatedDate(null,date);
		document.getElementById('calendar2').style.display = 'none';
		dateTo = new Date(date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}
	
	function selectDate3(date) {
		document.getElementById('calInput3').value = cal3.getFormatedDate(null,date);
		document.getElementById('calendar3').style.display = 'none';
		dateTo = new Date(date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}
		function selectDate4(date) {
		document.getElementById('calInput4').value = cal4.getFormatedDate(null,date);
		document.getElementById('calendar4').style.display = 'none';
		dateTo = new Date(date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}
		function selectDate5(date) {
		document.getElementById('calInput5').value = cal5.getFormatedDate(null,date);
		document.getElementById('calendar5').style.display = 'none';
		dateTo = new Date(date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}
		function selectDate6(date) {
		document.getElementById('calInput6').value = cal6.getFormatedDate(null,date);
		document.getElementById('calendar6').style.display = 'none';
		dateTo = new Date(date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}
	function showCalendar(k) {
		document.getElementById('calendar'+k).style.display = 'block';
	}
	
	

	</script>
<?php
include ("librerias/conection.php");
$conection=conectar();
?>
<style type="text/css">
<!--
.Estilo1 {
	font-size: 24px
}
.Estilo3 {font-family: "Times New Roman", Times, serif}

-->
</style>
<script src="SpryAssets/SpryTabbedPanels.js" type="text/javascript"></script>
<script src="SpryAssets/SpryAccordion.js" type="text/javascript"></script>
<link href="SpryAssets/SpryTabbedPanels.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.Estilo3 {
	font-size: 9pt
}
.Estilo6 {
	font-size: 9pt
}
.Estilo10 {
	font-size: 9pt;
	color: #0033FF;
}
.Estilo11 {
	color: #990000
}
-->
</style>
<link href="SpryAssets/SpryAccordion.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
#apDiv1 {
	left:574px;
	top:194px;
	width:132px;
	height:172px;
	z-index:1;
	position: absolute;
}
.Estilo12 {
	font-size: 16px;
	color: #000000;
}
-->
</style>
</head>
<body bgcolor="#FFFFFF">
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
      <h3 class="title">&nbsp;</h3>
      <p class="meta"><small>Fecha <?php echo $fecha; ?></small><small><br />
        </small> </p>
      <div id="TabbedPanels1" class="TabbedPanels">
        <ul class="TabbedPanelsTabGroup">
          <li class="TabbedPanelsTab Estilo6" tabindex="0">Ingreso de pacientes</li>
          <li class="TabbedPanelsTab Estilo3" tabindex="0">Impresion de Resultados</li>
          <li class="TabbedPanelsTab Estilo6" tabindex="0">Busqueda detallada</li>
        </ul>
        <div class="TabbedPanelsContentGroup">
        <div class="TabbedPanelsContent">
          <form id="form1" method="post" action="">
            <label><table width="682"  border="1">
                      <tr>
                        <td width="222">Expediente&nbsp;
                        <input type="text" name="expediente" id="expediente2" tabindex="E" /></td>
                        <td width="293"><label>
                          <div align="center">F. Nacimiento<br />
                            <select name="Fecha" id="Fecha">
                            </select>
                          </div>
                        </label></td>
                        <td width="73"><label>
                          <div align="center">Años<br />
                            <input name="ano" type="text" id="ano" size="3" maxlength="3" />
                          </div>
                        </label></td>
                        <td width="104"><label>
                          <div align="center">Meses
                            <br />
                            <input name="Meses" type="text" id="Meses" size="3" maxlength="3" />
                          </div>
                        </label></td>
                        <td width="25"><label>Días
                            <input name="Dias" type="text" id="Dias" size="3" maxlength="3" />
                        </label></td>
                      </tr>
                      <tr>
                        <td colspan="3"><label>Nombres
                          <input name="nombre" type="text" id="nombre2" size="40" maxlength="40" />
</label></td>
                        <td colspan="2" rowspan="2">&nbsp;</td>
                      </tr>
                      
                      <tr>
                        <td colspan="3"><label>Direccion
                            <input name="Direccion" type="text" id="Direccion" size="100" maxlength="150" />
                        </label></td>
                      </tr>
                      <tr>
                        <td><label>R.F.C.
                            <input type="text" name="RFC" id="RFC" />
                        </label></td>
                        <td colspan="4"><label>C.U.R.P.
                            <input name="CURP" type="text" id="CURP" size="20" maxlength="40" />
                        </label></td>
                      </tr>
                      <tr>
                        <td><label>Tel. Particular
                            <input type="text" name="particular" id="particular" />
                        </label></td>
                        <td colspan="4"><label>Tel. Comercial
                            <input type="text" name="comericial" id="comericial" />
                        </label></td>
                      </tr>
                    </table>
                    <table  border="1">
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    </table>
            </label>
          </form>
        </div>
          <div class="TabbedPanelsContent">
            <div id="Accordion1" class="Accordion" tabindex="0">
              <div class="AccordionPanel">
                <div class="AccordionPanelTab">Por folio</div>
                <div class="AccordionPanelContent">
                      <form  target="_self" name="xFolio" method="Get" action="xFolio.php">
                       <label>
                        <div align="center">
                          <h1>BUSQUEDA DE PACIENTE POR FOLIO</h1>
                        </div>
                        <div align="center">Folio
                          <input type="text" name="folio" id="folio" />
                        </div>
                        <div align="center">
                          <input type="submit" value="Enviar" />
                          <input type="reset"	value="Borrar" name="B" />
                          <br />
                        </div>
                       </label>
                  </form>
                </div>
              </div>
              
              
              <div class="AccordionPanel">
              <div class="AccordionPanelTab">
                	Validados
              </div>
              <div class="AccordionPanelContent">
                <link rel="STYLESHEET" type="text/css" href="codebase/dhtmlxcalendar.css" />
                <form method="get" action="tabla.php" name="sample">
                  <table width="380" align="center" cellpadding="10">
                    <tr>
                      <td valign="top"><strong><h1>Busqueda de pacientes validados</h1></strong>
                          <p > Fecha Inicial: </p>
                        <div style=" border:1px ; width: 100px; ">
                            <input name="FI"  value="<?php echo $fecha2;?>" type="text" id="calInput1"  style="border-width:0px; width: 70px; font-size:12px;" readonly="true" />
                            <img style="cursor:pointer;" onclick="showCalendar(1)" src="codebase/imgs/calendar.gif" align="absmiddle" />
                            <div id="calendar1" style="position:relative; left:100px; top:-50px; display:none"> </div>
                        </div>
                        <br />
                          <p > Fecha Final: </p>
                        <div style=" border:1px; width: 100px">
                        <input name="ff" value="<?php echo $fecha2;?>" type="text" id="calInput2"  style="border-width:0px; width: 70px; font-size:12px;" readonly="true" /><img style="cursor:pointer;" onclick="showCalendar(2)" src="codebase/imgs/calendar.gif" align="absmiddle" />
                            <div id="calendar2" style="position:relative; left:100px; top:-100px; display:none"></div>
                        </div>
                        <p align="center">
                            <input type="submit" value="Buscar" />
                        </p></td>
                    </tr>
                  </table>
                </form>
              </div>
              </div>
              <!--
              <div class="AccordionPanel">
                <div class="AccordionPanelTab">Solicitudes Urgentes</div>
                <div class="AccordionPanelContent">
				  <div  class="Estilo12">
                  	<form method="get" action="tabla2.php" name="sample">
                      <table width="380" align="center" cellpadding="10">
                        <tr>
                          <td valign="top">
                            <center>Selecciona el tipo de busqueda:
                              <select name="t_urgencia" size="1">
                            <option value="R"> Rutina</option>
                              <option value="U" > Urgencia</option>
                            </select>
                            </center>
                          </td>
                          <td>
                            Fecha Inicial:
                            <div style=" border:1px ; width: 100px; ">
                                <input name="UFI" type="text" id="calInput5" style="border-width:0px; width: 70px; font-size:12px;" readonly="true" />
                                <img style="cursor:pointer;" onclick="showCalendar(5)" src="codebase/imgs/calendar.gif" align="absmiddle" />
								 Fecha Final:
                                <input name="UFF" type="text" id="calInput6" style="border-width:0px; width: 70px; font-size:12px;"readonly="true" />
                                <img style="cursor:pointer;" onclick="showCalendar(6)" src="codebase/imgs/calendar.gif" align="absmiddle" />
                                <div id="calendar5" style="position:relative; left:100px; top:-50px; display:none"> </div>
                                <div id="calendar6" style="position:relative; left:100px; top:-100px; display:none"></div>
                            </div>                            </td>
                            <td>
                                <p align="center">
                                <input type="submit" value="Buscar" />
                            </p>                            </td>
                        </tr>

                      </table>
                    </form>
                  </div>
                </div>
              </div>
              -->
            </div>
              
          </div>
          
          <div class="TabbedPanelsContent">
		  
              <table>
              <tr>
                <td><label id="labelExpediente">Expediente:</label></td>
                <td><div id="expediente">(Capturar)</div></td>
              </tr>
              <tr>
                <td><label id="nombre">Nombre:</label></td>
                <td><div id="nombre1">(Capturar)</div></td>
              </tr>
              <tr>
                <td><label id="apellido">Apellidos:</label></td>
                <td><div id="apellido1">(Capturar)</div></td>
              </tr>
              <tr>
                <td><label id="labelMedico">Medico:</label></td>
                <td><div id="Medico">(Seleccionar)</div></td>
              </tr>	
              <tr>
                <td><label id="labeluProcedencia">Unidad de procedencia:</label></td>
                <td><div id="uProcedencia">(Seleccionar)</div></td>
              </tr>
              <tr>
                <td><label id="labelprocedencia">Procedencia:</label></td>
                <td><div id="procedencia">(Seleccionar)</div></td>
              </tr>
              <!--tr>
                <td><label id="labelurgente">Urgente:</label></td>
                <td><div id="urgente">(Seleccionar)</div></td>
              </tr-->
            </table>
           
            <div>
              <table id="fecha" >
       Fecha Inicial: 
          <input name="FI" value="<?php echo $fecha2;?>" type="text" id="calInput3" style="border-width:0px; width: 70px; font-size:10px;" readonly="true" />
          <img style="cursor:pointer;" onclick="showCalendar(3)" src="codebase/imgs/calendar.gif" align="absmiddle" />               
          <div style="position:relative; border:0px  width: 50px;width: 100px;">
          <div id="calendar3" style="position:absolute; left:190px; top:-50px; display:none"> </div>
          </div>

             Fecha Final: 
            <input name="FF" value="<?php echo $fecha2;?>" type="text" id="calInput4" style="border-width:0px; width: 70px; font-size:10px;" readonly="true" />
              <img style="cursor:pointer;" onclick="showCalendar(4)" src="codebase/imgs/calendar.gif" align="absmiddle" />
              </p>  
           <div style="position:relative; border:1px  width: 199px; width: 100px;">
             <div id="calendar4" style="position:absolute; left:190px; top:-100px; display:none"></div>
        </div>      </td>
    </tr>
  </table>
            </div>
              <div align="center">
                <!--select id="urgente_1">
                           <option value="S">Si</option>
                           <option value="N">No</option>
              </select-->
                <select id="datasource_list2">
                  <?php
                              	$str_sql="";	
								$str_sql="SELECT * FROM procedencia_muestra";
								$res=odbc_exec($conection,$str_sql);
								while ($result=odbc_fetch_array($res))
								{
									echo '<option value="'.$result['id'].'">'.$result['descripcion'].'</option>';
								}
                              ?>
                </select>
                <select id="datasource_list3">
                  <?php 
								$str_sql="";
								$str_sql="SELECT LLAVE_DOCTOR, LTRIM(RTRIM(NOMBRE)) + ' ' + LTRIM(RTRIM(APELLIDOS)) NOMBRE_COMPLETO FROM DAT_DOCTORES WHERE LLAVE_DOCTOR <> 1 ORDER BY NOMBRE, APELLIDOS ";
								$res=odbc_exec($conection,$str_sql);
								while ($result=odbc_fetch_array($res))
								{
									echo '<option value="'.$result['LLAVE_DOCTOR'].'">'.$result['NOMBRE_COMPLETO'].'</option>';
								}							
							?>
                </select>
                <select id="unidad">
                  <?php 
								$str_sql="";
								$str_sql="SELECT * FROM lab_uprocedencia WHERE ID_UNIDAD>0 AND ACTIVO='S' ORDER BY clave_unidad";
								$res=odbc_exec($conection,$str_sql);
								while ($result=odbc_fetch_array($res))
								{
									echo '<option value="'.$result['ID_UNIDAD'].'">'.$result['DESCRIPCION'].'</option>';
								}							
							?>
                </select>
                <input  type="button" value="Buscar" onclick="abrirpagina('procedencia')" />
                </p>
              </div>
              <p align="right" class="Estilo10"><span class="Estilo11">Nota</span>: Para seleccionar un dato favor de presionar sobre el nombre del campo</p>
              
		  
		   
		
          </div>
          <div class="TabbedPanelsContent">No validados</div>
        </div>
      </div>
    </div>
    <!-- end latest-post -->
    <!-- start recent-posts -->
    <!-- end recent-posts -->
  </div>
  <!-- end content -->
  <!-- start sidebar -->
  <div id="sidebar">
<div align="center" class="current_page_item Estilo3"> <em>Un producto mas de Dicipa S.A de C.V.</em></div>
  </div>
  <!-- end sidebar -->
</div>
<!-- end page -->
<div id="footer">
  <p id="legal">&copy;2008 DICIPA S.A. de C.V.,  All Rights Reserved.  Designed by <a href="http://www.dicipa.com.mx">T.I</a></p>
  <p id="links"><a href="http://www.deltalab.com.mx/bioquimica">Principal</a>&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; <a href="#">Terms</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="http://validator.w3.org/check/referer" title="This page validates as XHTML 1.0 Transitional"><abbr title="eXtensible HyperText Markup Language">XHTML</abbr></a> &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="http://jigsaw.w3.org/css-validator/check/referer" title="This page validates as CSS"><abbr title="Cascading Style Sheets">CSS</abbr></a></p>
</div>
<script type="text/javascript">
<!--
var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels1");
//-->
</script>
<script type="text/javascript">
		//var listModelGender = new DHTMLSuite.listModel();
		//listModelGender.createFromMarkupSelect('datasource_list');
		var listModelIncome = new DHTMLSuite.listModel();
		listModelIncome.createFromMarkupSelect('datasource_list2');

		//var listModelurgente = new DHTMLSuite.listModel();
		//listModelurgente.createFromMarkupSelect('urgente_1');		

		var listModelMedico = new DHTMLSuite.listModel();
		listModelMedico.createFromMarkupSelect('datasource_list3');
		

		
		var listModelunidad = new DHTMLSuite.listModel();
		listModelunidad.createFromMarkupSelect('unidad');
		
		var textEditObj = new DHTMLSuite.textEdit();	// Create new textEdit object
		textEditObj.setServersideFile('includes/saveTextEdit.php');	// Specify server side file
		
		textEditObj.addElement( { labelId: 'nombre',elementId: 'nombre1' } );	// Add element
		textEditObj.addElement( { labelId: 'apellido',elementId: 'apellido1' } );	// Add element
		textEditObj.addElement( { labelId: 'labelExpediente',elementId: 'expediente' } );	// Add element
		//textEditObj.addElement( { labelId: 'labelurgente',elementId: 'urgente',listModel:listModelurgente } );	// Add element
		textEditObj.addElement( { labelId: 'labelMedico',elementId: 'Medico',listModel:listModelMedico } );	// Add element
		textEditObj.addElement( { labelId: 'labeluProcedencia',elementId: 'uProcedencia',listModel:listModelunidad } );	// Add element
		textEditObj.addElement( { labelId: 'labelprocedencia',elementId: 'procedencia',listModel:listModelIncome } );	// Add element
		textEditObj.init();

function abrirpagina(dato)
{
	var inicial=cal2.getFormatedDate(null,dateFrom)
	var final=cal2.getFormatedDate(null,dateTo);
	window.open("ver.php?class="+dato+"&inicial="+inicial+"&final="+final,"_self","");
}
var Accordion1 = new Spry.Widget.Accordion("Accordion1");
</script>
</body>
</html>
<?PHP
odbc_close($conection);
