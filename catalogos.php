<?php
//include_once(RelativePath . "/Barra.php");
session_start();
header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado']=="ok" ) {
    
        } else {
     
          header("Location: index.php"); 
          echo "<html></html>";
        }

$ver_botones="";
$fecha=date("d , M, y,  H:i a");
if(isset($_GET['FI']) and isset($_GET['ff']))
{ $varsql=array("inicio"=>$_GET['FI'],"fin"=>$_GET['ff'],"caso"=>"validados");}
?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<head><title>**Impresion De Resultados**</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Sistema Web Informatic</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link rel="stylesheet" type="text/css" href="WEB/Styles/Core/Style_doctype.css">
	<!-- Common JS files -->
<script type='text/javascript' src='grid/utils/zapatec.js'></script>

	<!-- Custom includes -->	
<script type="text/javascript" src="grid/src/zpgrid.js"></script>
<script type="text/javascript" src="grid/demo.js"></script>

	<!-- ALL demos need these css -->
	<link rel="SHORTCUT ICON" href="icon.png">
	<script type="text/javascript" src="grid/src/slider.js"></script>
	<script src="SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
<link href="default_2.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.Estilo1 {font-size: 24px}
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
<link href="SpryAssets/SpryMenuBarVertical.css" rel="stylesheet" type="text/css" />

</head>
<body>
 <table align="center" border="0" cellspacing="0" cellpadding="0">
<!-- BEGIN Record Citas -->
<tr>
<!-- BEGIN Record Citas -->
<td valign="top">
<?php include("Header.html");?>
</td>
</tr>
 </table>
<!-- start page -->
<div id="page">
	<!-- start content -->
	<div id="content">
		<!-- start latest-post -->
  <div id="latest-post" class="post">
			<!--  <h3 class="title"><input name="" type="button" onClick="window.open(&quot;salir.php&quot;,&quot;_self&quot;,&quot;&quot;)" value="Cerrar Sesion" /></h3> -->
      <p class="meta"><small>Fecha <?php 
			include ("WEB/librerias/conection.php");
			$ODBC=$_SESSION["ODBC"];
            $conection=conectar($ODBC);
			
			echo $fecha."<h1><center>Cat&aacute;logos</center></h1>"; 
	
//if (isset($varsql))
//{
	
	$finicio=date("d/m/Y");
	
	
	$f_fin=date("d/m/Y");
	
//	$sql="EXECUTE CONSULTA_RESULTADOS_WEB @FECHAINI = '".$finicio."', @FECHAFIN='".$f_fin."'";
	
	//echo $sql;
//}
//else
//{			
	//$sql="";			
	//$sql="select distinct(df.idpaciente), lp.nombre, df.numero,df.fecha_creacion, df.autoriza_retiro, lp.fecha_nacimiento, pm.descripcion procedencia,  lup.DESCRIPCION unidad, dd.nombre + ' ' + dd.apellidos as NOMBRE_DOCTOR  from dat_dfipa df inner join dat_paciente lp on df.rut=lp.rut inner join procedencia_muestra pm on pm.id = df.procedencia_muestra inner join lab_uprocedencia lup on df.ID_UNIDAD_PROCEDENCIA= lup.ID_UNIDAD inner join dat_doctores dd on df.doctor=dd.llave_doctor inner join dat_dpcod dp on df.idpaciente=dp.idpaciente where  dp.estado<>'NULL' and pm.id=".$_SESSION['nivel']." ";	
	
	//$finicio="";
	//$f_fin="";		
//	if (!isset($_GET['Paciente']))
//	{
//		
//		$sql .=$_SESSION['sql'];
//		$ver_botones=TRUE;
//	}
//	else
//	{
//	$_SESSION['sql']="";
//	$paciente=rtrim(ltrim($_SESSION['paciente']));
//	$apellidos= rtrim(ltrim($_SESSION['apellidos']));
//	$sql .=" idpaciente=".$_GET['Paciente'];
//	$_SESSION['sql']=$sql;
//	}

	

?>
              <table align="center">
              <tr>
                  <td><a href="Doctores.php" id="Doctor"><img height="80" width="80" src="images/botones/doctor.jpeg"</a></td>
                  <td>Doctores</td>
              </tr>
			  <tr>
                  <td><a href="tipoPaciente.php" id="tipoPaciente"><img height="80" width="80" src="images/botones/doctor.jpeg"</a></td>
                  <td>Tipo Paciente</td>
              </tr>
			  <tr>
                  <td><a href="procedenciaMuestra.php" id="procedenciaMuestra"><img height="80" width="80" src="images/botones/doctor.jpeg"</a></td>
                  <td>Procedencia de la muestra</td>
              </tr>
              <tr>
                  <td><a href="Usuarios.php" id="Usuarios"><img height="80" width="80" src="images/botones/usuarios.png"</a></td>
                  <td>Usuarios</td>
              </tr>
              <tr>
                  <td><a href="Configuracion.php" id="Configuracion"><img height="80" width="80" src="images/botones/estudios.png"</a></td>
                  <td>Configuraci&oacute;n</td>
              </tr>
              </table>
			<div class="entry">
			<div style="text-align:center;">
			<div id="5"></div>    
			<div id="scroll" style="margin-left : 300px;">
			</div>


<script type="text/javascript">

	/*
	 * Initialize grid
	 */
//	cvar objGrid = new Zapatec.Grid({

		// Use HTML table with id "gridSource" as grid data source
		source: 'gridSource',
		sourceType: 'html',

		// Use "winxp" theme
		theme: 'lightblue',

		// Put the grid into element with id "gridContainer"
		container: 'gridContainer',

		// Call onCellClick function when cell is clicked
		callbackCellOnClick: onCellClick,

		// Call onCellRightClick function when cell is right clicked
		//callbackCellOnRightClick: onCellRightClick,

				// Initially sort ascending by first column
		sortColumn: 0,

		// Display 10 rows per page
		rowsPerPage: 10,

		// Display filter out forms
		filterOut: [
			// Filter Rate Period
			{
				// Use column number 3 (first column number is 0)
				column: 3,
				// Put checkboxes into element with id "filterOutRate"
				container: 'filterOutRate',
				// This will press "Filter" button for you if you changed range of items
				// or minutes and forgot to press it
				onclick: 'filter(this.form)'
			},
			// Filter Minutes
			{
				// Use column number 5 (first column number is 0)
				column: 5,
				// Sort descending
				sortDesc: true,
				// Put checkboxes into element with id "filterOutMinutes"
				container: 'filterOutMinutes',
				// This will press "Filter" button for you if you changed range of items
				// or minutes and forgot to press it
				onclick: 'filter(this.form)'
			}
		],

		// Event listeners
		eventListeners: {
			'gridInitialized': onGridInit,
			'gridModified': onGridInit,
			'gridMovedColumn': onGridMovedColumn
		}

	});
</script>
<script language="javascript">
var colum=0; // columna por la que se filtrará
var valor; // value del botón que se ha pulsado

function selecciona(obj,num) {
  t = document.getElementById('gridSource');
  filas = t.getElementsByTagName('tr');
  // Deseleccionar columna anterior
  for (i=1; ele=filas[i]; i++) 
    ele.getElementsByTagName('td')[colum].className='';
  // Seleccionar columna actual
  colum=num;
  for (i=1; ele=filas[i]; i++)
    ele.getElementsByTagName('td')[colum].className='celdasel';
  // Cambiar botón por cuadro de texto
  valor = obj.value;
  celda = obj.parentNode;
  celda.removeChild(obj);
  txt = document.createElement('input');
  celda.appendChild(txt);
  txt.focus();
  txt.onblur = function() {ponerBoton(this,num)};
  txt.onkeyup = function() {filtra(this.value)};
  // Desactivar los demás botones
  for (i=0; ele=t.getElementsByTagName('input')[i]; i++)
    if (ele.type == 'button') ele.disabled=true;
}

function ponerBoton(obj,num) {
  celda = obj.parentNode;
  celda.removeChild(obj);
  boton = document.createElement('input');
  boton.type = 'button';
  boton.value = valor;
  boton.onclick = function() {selecciona(this,num)}
  boton.onkeypress = function() {selecciona(this,num)}
  celda.appendChild(boton);
  // Activar botones
  for (i=0; ele=t.getElementsByTagName('input')[i]; i++)
    ele.disabled=false;
}

function filtra(txt) {
  t = document.getElementById('gridSource');
  filas = t.getElementsByTagName('tr');
  for (i=1; ele=filas[i]; i++) {
    texto = ele.getElementsByTagName('td')[colum].innerHTML.toUpperCase();
    for (j=0; ra=document.forms[0].rad[j]; j++) // Comprobar radio seleccionado
      if (ra.checked) num = j;
      
    if (num==0) posi = (texto.indexOf(txt.toUpperCase()) == 0);
    else if (num==1) posi = (texto.lastIndexOf(txt.toUpperCase()) == texto.length-txt.length);
    else posi = (texto.indexOf(txt.toUpperCase()) != -1);
    ele.style.display = (posi) ? '' : 'none';
  } 
}
</script>
<noscript>
</noscript>
</div>
		  </div>
		</div>
		<!-- end latest-post -->
		<!-- start recent-posts -->
<div id="recent-posts">
			<div class="post">
				<!-- <h2 class="title">Menu Principal</h2> -->
				<p class="meta">
                <?php

					if ($ver_botones==TRUE)
					{
		            	?>
                </p>
				<div align="center">
                <div class="entry">
				  <p>
                  <?php 
				  $_SESSION['archivo']=$nombre;
				  ?>
	              <!--a href="imprime.php?finicio=<?php echo $finicio;?>&ffin=<?php echo $f_fin;?>">IMPRIMIR</a></p>
                  <a href="importar.php?&finicio=<?php echo $finicio;?>&ffin=<?php echo $f_fin;?>">EXPORTAR EXCEL</a>                  </p-->
                
				  <p><a href="presen.php">Busqueda a detalle</a></p>
				  
				  <p><a href="WEB/ResultadosxLote.php">Impresion por Lote</a></p>
			  </div>
				
				  <?PHP
					}
					else
					{
//						echo "
//                <a href=\"index.php\">cerrar sesion</a>";

					}
				?>                
			  </p>
  <div class="entry">
					<p>&nbsp;</p>
			  </div>
			</div>
	  </div>
		<!-- end recent-posts -->
	</div>
<!-- end content -->
	<!-- start sidebar -->
  <!-- <div id="sidebar"> -->
		<!-- <div align="center" class="current_page_item Estilo3"> <em>Un producto mas de MultiSystems</em></div> -->
        <?php 
$poer='
</XFecha>';
@fwrite($file,$poer);         
@fclose($file);
		?>
                
          <?php
		  
		  			function cerrarsession()					
					{
					session_unset();
					session_destroy();
					header ("Location: index.php"); 
					}?>
	
	
	</div>
  <!-- end sidebar -->
</div>
<!-- end page -->

</body>
</html>


