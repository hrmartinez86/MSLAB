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
<title>**Editar Ficha**</title>
<meta name="description" content="" />
<link rel="stylesheet" type="text/css" href="WEB/Styles/INFOLAB/Style_doctype.css">
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
		dateFrom = new Date(date);
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
include ("WEB/librerias/conection.php");
$ODBC=$_SESSION["ODBC"];
            $conection=conectar($ODBC);

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
#apDiv2 {
	position:relative;
	left:800px;
	top:300px;
	width:147px;
	height:40px;
	z-index:1;
}
-->
</style>
<link href="css/themes/blue/css/text-edit.css"rel="stylesheet" type="text/css" />
</head>
<body>
<?php include("Header.html");?>
<!-- start header -->
<!-- end header -->

<!-- start page -->
<div id="page">
  <!-- start content -->
  <div id="content">
    <!-- start latest-post -->
    <div id="latest-post" class="post">
      <!-- <h3 class="title"><input name="" type="button" onClick="window.open(&quot;salir.php&quot;,&quot;_self&quot;,&quot;&quot;)" value="Cerrar Sesion" /></h3> -->
      
      <table >
        <tr>
          <td><span class="meta"><small>Fecha <?php echo $fecha; ?></small></span></td>
          <td>&nbsp;</td>
        </tr>
      </table>
     
      <div id="TabbedPanels1" class="TabbedPanels"><ul class="TabbedPanelsTabGroup"><li class="TabbedPanelsTab Estilo3" tabindex="0">Editar Datos De La Atencion </li>
          <li class="TabbedPanelsTab Estilo6" tabindex="0">Editar Datos Del Paciente</li>
        </ul>
        <div class="TabbedPanelsContentGroup">
        
          <div class="TabbedPanelsContent">
            <div id="Accordion1" class="Accordion" tabindex="0">
              <div class="AccordionPanel">
                <div class="AccordionPanelTab">BUSQUDA POR FOLIO</div>
            <div class="AccordionPanelContent">
                      <form  target="_self" name="xFolio" method="Get" action="Editarxfolio.php">
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
                	
              </div>
              <div class="AccordionPanelContent">
 <link rel="STYLESHEET" type="text/css" href="codebase/dhtmlxcalendar.css" />
                <form method="get" action="tabla.php" name="sample">
                  <table width="380" align="center" cellpadding="10">
                    <tr>
                      <td valign="top"><strong>
                        <h1>Busqueda de pacientes validados</h1>
                        </strong>
                          <p > Fecha Inicial: </p>
                        <div style=" border:1px ; width: 100px; ">
                            <input name="FI"  value="<?php echo $fecha2;?>" type="text" id="calInput1"  style="border-width:0px; width: 70px; font-size:12px;" readonly="true" />
                            <img style="cursor:pointer;" onclick="showCalendar(1)" src="codebase/imgs/calendar.gif" align="absmiddle" />
                            <div id="calendar1" style="position:relative; left:100px; top:-50px; display:none"> </div>
                        </div>
                        <br />
                          <p > Fecha Final: </p>
                        <div style=" border:1px; width: 100px">
                            <input name="ff" value="<?php echo $fecha2;?>" type="text" id="calInput2"  style="border-width:0px; width: 70px; font-size:12px;" readonly="true" />
                            <img style="cursor:pointer;" onclick="showCalendar(2)" src="codebase/imgs/calendar.gif" align="absmiddle" />
                            <div id="calendar2" style="position:relative; left:100px; top:-100px; display:none"></div>
                        </div>
                        <input type="submit" value="Buscar" />
                      </td>
                    </tr>
                  </table>
                </form>
              </div>
              </div>
              
            </div>
              
          </div>
          
          <div class="TabbedPanelsContent">
		
              <form  target="_self" name="ver" method="Get" action="Editarxpaciente.php">
              <table>
              
               <table id="fecha" >
        
            <td><label for="Expediente">Expediente:</label></td> 
            <td><input name="Expediente" id="Expediente" value=""></td>
          </tr>
          <tr>   
            <td><label for="Nombre">Nombres:</label></td> 
            <td><input name="Nombre" id="Nombre" size="50" value=""></td>
          </tr>
          
   
           <tr>
           <td>
           <div align="center">
                          <input type="submit" value="Enviar" />
                          <input type="reset"	value="Borrar" name="B" />
                          <br />
                        </div>
            </td>            
            </tr>
            </table>
           </form>
            
		  
		   
		
         
          <div class="TabbedPanelsContent"></div>
        </div>
      </div>
    </div>
    <!-- end latest-post -->
    <!-- start recent-posts -->
    <!-- end recent-posts -->
  </div>
  <!-- end content -->
  <!-- start sidebar -->
 <!-- <div id="sidebar">
<div align="center" class="current_page_item Estilo3"> <em>Un producto mas de Dicipa S.A de C.V.</em></div> -->
  </div>
  <!-- end sidebar -->
</div>
<!-- end page -->
<!-- <div id="footer">
  <p id="legal">&copy;2008 DICIPA S.A. de C.V.,  All Rights Reserved.  Designed by <a href="http://www.dicipa.com.mx">T.I</a></p>
  <p id="links"><a href="http://www.deltalab.com.mx/bioquimica">Principal</a>&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; <a href="#">Terms</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="http://validator.w3.org/check/referer" title="This page validates as XHTML 1.0 Transitional"><abbr title="eXtensible HyperText Markup Language">XHTML</abbr></a> &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="http://jigsaw.w3.org/css-validator/check/referer" title="This page validates as CSS"><abbr title="Cascading Style Sheets">CSS</abbr></a></p>
</div> -->
<script type="text/javascript">
<!--
var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels1");
//-->
</script>
<script type="text/javascript">
		//var listModelMedico = new DHTMLSuite.listModel();
		//listModelMedico.createFromMarkupSelect('datasource_list2');
		//var listModelIncome = new DHTMLSuite.listModel();
		//listModelIncome.createFromMarkupSelect('datasource_list2');

		//var listModelurgente = new DHTMLSuite.listModel();
		//listModelurgente.createFromMarkupSelect('urgente_1');		

		//var listModelTipo = new DHTMLSuite.listModel();
		//listModelTipo.createFromMarkupSelect('datasource_list3');
		

		
		//var listModelunidad = new DHTMLSuite.listModel();
		//listModelunidad.createFromMarkupSelect('unidad');
		
		var textEditObj = new DHTMLSuite.textEdit();	// Create new textEdit object
		textEditObj.setServersideFile('includes/saveTextEdit.php');	// Specify server side file
		
		// Add element
		textEditObj.init();


var Accordion1 = new Spry.Widget.Accordion("Accordion1");
</script>
</body>
</html>
<?PHP
odbc_close($conection);
