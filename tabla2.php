<?php
session_start();
header("Cache-control: private"); //Arregla IE 6        
if (@$_SESSION['estado']=="ok" ) {
    
        } else {
     
          header("Location: index.php"); 
          echo "<html></html>";
        }

$ver_botones="";
$fecha=date("d , M, y,  H:i a");
if(isset($_GET['UFI']) and isset($_GET['UFF']) and isset($_GET['t_urgencia']))
{ $varsql=array("inicio"=>$_GET['UFI'],"fin"=>$_GET['UFF'],"tipo"=>$_GET['t_urgencia']);}
?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<head><title></title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Sistema Web Informatico de Análisis Clinico</title>
<meta name="keywords" content="" />
<meta name="description" content="" />

	<!-- Common JS files -->
<script type='text/javascript' src='grid/utils/zapatec.js'></script>

	<!-- Custom includes -->	
<script type="text/javascript" src="grid/src/zpgrid.js"></script>
<script type="text/javascript" src="grid/demo.js"></script>

	<!-- ALL demos need these css -->
	<link rel="SHORTCUT ICON" href="images/logo.gif">
	<script type="text/javascript" src="grid/src/slider.js"></script>
	<script src="SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
<link href="default.css" rel="stylesheet" type="text/css" />
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
-->
</style>
<link href="SpryAssets/SpryMenuBarVertical.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="headerbg">
  <p class="text1">DICIPA  S.A. de C.V.<br />
    <span class="Estilo1">Inicio </span></p>
</div>
<!-- start page -->
<div id="page">
	<!-- start content -->
	<div id="content">
		<!-- start latest-post -->
  <div id="latest-post" class="post">
			<h1 class="title">Inicio de Sesion </h1>
			<p class="meta"><small>Fecha <?php 
			include ("librerias/conection.php");
			$conection=conectar();
			echo $fecha."<h1><center>Coincidencias encontrados</center></h1>"; 
		
if (isset($varsql) and $varsql['inicio']<>"" and $varsql['fin']<>"")
{
	$fin=explode("-",$varsql['inicio']);
	$finicio=$fin[2]."/".$fin[1]."/".$fin[0];
	
	$ffin=explode("-",$varsql['fin']);
	$f_fin=$ffin[2]."/".$ffin[1]."/".$ffin[0];
	
	$sql="SELECT distinct(NOMBRE_COMPLETO),idpaciente,fecha_atencion,  numero_atencion, sexo, lp.descripcion as procedencia, lu.nombre, sa.NOMBRE_DOCTOR, sa.t_urgencia";
	$sql .=" FROM SISTEMA_ATENCION_EXAMENES sa ";
	$sql .=" inner join procedencia_muestra lp on lp.id = sa.id_procemuestra inner join lab_usuarios lu on sa.USUARIO_CREACION_DETALLE = lu.usuario";
	$sql .=" WHERE LIBERADO='S' AND fecha_atencion between (convert(datetime,'".$finicio."',103)) and (convert(datetime,'".$f_fin."',103))";
	$sql .=" AND sa.t_urgencia='".$varsql['tipo']."'";
	$sql .=" order by fecha_atencion";
}
else
{
echo "<h2 align='center'>NO SE ENCONTRO NINGUN TIPO DE BUSQUEDA</h2>";

}
function edad($fecha_nac){
$dia=date("j");
$mes=date("n");
$anno=date("Y");
$dia_nac=substr($fecha_nac, 8, 2);
$mes_nac=substr($fecha_nac, 5, 2);
$anno_nac=substr($fecha_nac, 0, 4);
if($mes_nac>$mes){
$calc_edad= $anno-$anno_nac-1;
}else{
if($mes==$mes_nac AND $dia_nac>$dia){
$calc_edad= $anno-$anno_nac-1;
}else{
$calc_edad= $anno-$anno_nac;
}
}
return $calc_edad;
}
?>
			<div class="entry">
			<div style="text-align:center;">
			<div id="5"></div>    
			<div id="scroll" style="margin-left : 300px;">
			</div>

<div class='mainCol'>
  <div class='zpCalDemoText'></div>
	<div id="gridContainer">
        <table  id="gridSource">
                <tbody>
				  <?php  
				  $carpeta=$_SESSION['nombre'];     
				  @mkdir("XML/".$carpeta, 0600);
				  $nombre="archivo_".rand().".xml";
				  $file=fopen("XML/".$carpeta."/".$nombre,"a+");   
				  $poner='<?xml version="1.0" encoding="ISO-8859-1"?> 
<XFecha>';
				  fwrite($file,$poner);         
                  if (isset($varsql) and $varsql<>"otro")
					{ 
                       echo
					   '<tr>
                        <td width="*" class="zpGridTypeInt">Folio</td>
                            <td width="60" class="zpGridTypeDate">Fecha de Atencion</td>
                            <td width="46" class="zpGridTypeTime">Nombre</td>
                            <td width="20">Sexo</td>
                            <td width="87">Procedencia</td>
                            <!--td width="47" class="zpGridTypeInt"></td-->
                            <td width="80" class="zpGridTypeFloat">Medico</td>
                       </tr>';
					   $ver_botones=TRUE;
                   	}
				  else
				    {			
				    }
					$result=odbc_exec($conection,$sql);
					$i=0;
					while($rows=odbc_fetch_array($result))
					{
					if (isset($varsql) and $varsql<>"otro")
					{ 
						$aten=explode(" ",$rows['fecha_atencion']);
						$aaten=explode("-",$aten[0]);
						$faten=$aaten[2]."/".$aaten[1]."/".$aaten[0];
						if(	$rows['sexo']=='M')
						{
							$sexo="Masculino";
						}
						if(	$rows['sexo']=='F')
						{
							$sexo="Femenino";
						}
						$sexo=ereg_replace("<","",$sexo);
						
						$atencion=$rows['numero_atencion'];
						$atencion=ereg_replace("<","",$atencion);
						$faten=ereg_replace("<","",$faten);
						$nombre_completo=$rows['NOMBRE_COMPLETO'];
						$nombre_completo=ereg_replace("<","",$nombre_completo);
						$procedencia=$rows['procedencia'];
						#$procedencia=ereg_replace("<","",$procedecia);
						$doctor=$rows['NOMBRE_DOCTOR'];
						$doctor=ereg_replace("<","",$doctor);
						echo 
						'
							<tr>
							<td>'.$atencion.'</td>
							<td>'.$faten.'</td>
							<td>'.$nombre_completo.'</td>
							<td>'.$sexo.'</td>
							<td>'.$procedencia.'</td>
							<td>'.$doctor.'</td>
							</tr>										
						';
						
						$cadena="
							<Paciente>
								<id>".$i."</id>
								<folio>".$atencion."</folio>
								<fecha_atencion>".$faten."</fecha_atencion>
								<nombre>".$nombre_completo."</nombre>
								<sexo>".$sexo."</sexo>
								<procedencia>".$procedencia."</procedencia>
								<doctor>".$doctor."</doctor>
							</Paciente>	
						";
						fwrite($file,$cadena);
					$_SESSION['tagnames'] = 'sexo';
						$i++;	
					 }
					 else
					 {
	 										
					 }	
					}
					?>
                    
                </tbody>
		</table>
        
         </div>
</div>

<script type="text/javascript">

	/*
	 * Initialize grid
	 */
	var objGrid = new Zapatec.Grid({

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
				<h2 class="title">Menu Principal</h2>
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
				  </p>
                  <p><a href="presen.php">REGRESAR</a></p>
			  </div>
				
				  <?PHP
					}
					else
					{
						echo "<div class=\"entry\" align='center'>
                <a href=\"index.php\">cerrar sesion</a><br />
				<a href=\"presen.php\">REGRESAR</a></div>";

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
	<div id="sidebar">
		<ul>
        <?php 
$poer='
</XFecha>';
fwrite($file,$poer);         
fclose($file);
		?>
          <ul>
		    <li>
		    </li>
          </ul>
		  <li>
				   
		  </li>
				<li></li>
		  <li></li>
		        <ul>
		          <li>
		            <div align="center"></div>
		          </li>
          </ul>
		  <li>
				   <div align="center"></div>
		  </li>
				<li></li>
		  <li></li>
          <?php
		  
		  			function cerrarsession()					
					{
					session_unset();
					session_destroy();
					header ("Location: index.php"); 
					}?>
	  </ul>
	  <div style="clear: both;">&nbsp;</div>
	</div>
  <!-- end sidebar -->
</div>
<!-- end page -->
<div id="footer">
	<p id="legal">&copy;2008 DICIPA S.A. de C.V.,  All Rights Reserved.  Designed by <a href="www.dicipa.com.mx">T.I</a></p>
  <p id="links"><a href="#">Privacy</a>&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Link's.&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; <a href="#">Terms</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="http://validator.w3.org/check/referer" title="This page validates as XHTML 1.0 Transitional"><abbr title="eXtensible HyperText Markup Language">XHTML</abbr></a> &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="http://jigsaw.w3.org/css-validator/check/referer" title="This page validates as CSS"><abbr title="Cascading Style Sheets">CSS</abbr></a></p>
</div>

</body>
</html>


