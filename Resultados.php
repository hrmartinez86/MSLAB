﻿<?php
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

?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<head><title></title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Sistema Web Informatico de Análisis Clinico</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link rel="stylesheet" type="text/css" href="WEB/Styles/Core/Style_doctype.css">
	<!-- Common JS files -->
<script type='text/javascript' src='grid/utils/zapatec.js'></script>

	<!-- Custom includes -->	
<script type="text/javascript" src="grid/src/zpgrid.js"></script>
<script type="text/javascript" src="grid/resultados.js"></script>

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

<?php include("Header.html");?>

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
			
            $sql="select codigo from lab_procedencia where ODBC='".$ODBC."'";
            $query=odbc_exec($conection,$sql);  
            //echo $sql;
    // echo $sql;  
			      while ($result=odbc_fetch_array($query))
			          {
			        	$cod=$result['codigo'];
			        	$cod=str_pad($cod, 2, "0", STR_PAD_LEFT);
			          }
			echo $fecha."<h1><center>Coincidencias encontrados</center></h1>"; 
	$cod=$_SESSION['empresa'];
//if (isset($varsql))
//{
	$infocon=$_GET['FI'];
	
	$f=explode("-",$infocon);
    $ini=$f[2]."/".$f[1]."/".$f[0];
	//echo $ini;
	$ffin=$_GET['FF'];
	$f=explode("-",$ffin);
    $fin=$f[2]."/".$f[1]."/".$f[0];
	//echo $fin;
	
	$exp=$_GET['Expediente'];
	//echo $exp;
	$nombre=$_GET['Nombre'];
	$ape=$_GET['Apellidos'];
	$proc=$_GET['Procedencia'];
	$tipo=$_GET['Tipo'];
	$sec=$_GET['Seccion'];
	$fxini=$_GET['foliod'];
	$fxfin=$_GET['folioh'];

	if (!empty($fxini))
	
	{
		if (empty($fxfin))
		{
			$fxini=str_pad($fxini, 6, "0", STR_PAD_LEFT);
			$fxini=$cod.$fxini;
			$fxfin=$fxini; 
		}

		else
		{  
         
			$fxini=str_pad($fxini, 6, "0", STR_PAD_LEFT); 
			$fxfin=str_pad($fxfin, 6, "0", STR_PAD_LEFT);    
			$cod=str_pad($cod,2,"0",STR_PAD_LEFT);
			$fxini=$cod.$fxini;
			$fxfin=$cod.$fxfin;

		}
	 }
	if($sec!='')
    {
       
    	$sql="select lab_secciones.descripcion AS Seccion from lab_relacion_laboratorio_seccion INNER JOIN lab_secciones ON lab_relacion_laboratorio_seccion.seccion = lab_secciones.codigo where cod_llave='".$sec."'";

    	
    	$query=odbc_exec($conection,$sql);  
    // echo $sql;  
			      while ($result=odbc_fetch_array($query))
			          {
			        	$sec_d=$result['Seccion'];
			          }
    }
    else
    {$sec_d="";}
    if ($sec!='')
    echo "Seccion:".$sec_d;
    if (!empty($infocon))
    {$sql="EXECUTE LISTA_RESULTADOS_WEB @TIPO='".$tipo."',@PROCEDENCIA='".$proc."',@SECCION='".$sec."',@FECHA_DESDE='".$ini."',@FECHA_HASTA='".$fin."',@EXP='".$exp."',@NOMBRE='".$nombre."',@APELLIDO='".$ape."'";}
    
    else
    {$sql="execute LISTA_RESULTADOSXFOLIO_WEB @FINI='".$fxini."',@FFIN='".$fxfin."'";}
	
    if (!isset($_GET['Paciente']))
	{
		
		$sql .=$_SESSION['sql'];
		$ver_botones=TRUE;
	}
	else
	{
		$_SESSION['sql']="";
		$paciente=rtrim(ltrim($_SESSION['paciente']));
		$apellidos= rtrim(ltrim($_SESSION['apellidos']));
		$sql .=" idpaciente=".$_GET['Paciente'];
		$_SESSION['sql']=$sql;
	}

	function edad($fecha_nac){
	$dia=date("j");
	$mes=date("n");
	$anno=date("Y");
	$dia_nac=substr($fecha_nac, 8, 2);
	$mes_nac=substr($fecha_nac, 5, 2);
	$anno_nac=substr($fecha_nac, 0, 4);
	if($mes_nac>$mes)
	{
	$calc_edad= $anno-$anno_nac-1;
	}
	else
	{
	if($mes==$mes_nac AND $dia_nac>$dia){
	$calc_edad= $anno-$anno_nac-1;
	}else{
	$calc_edad= $anno-$anno_nac;
	}
}
return $calc_edad;
}
$varsql="otro";


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
				  
                  
                       
					   echo
					   '<tr>
                        <td width="*" class="zpGridTypeInt">Folio</td>
                            <td width="60" class="zpGridTypeDate">Fecha</td>
                            <td width="46" class="zpGridTypeTime">Nombre</td>
                            <td width="20">Edad</td>
                            <td width="87">Procedencia</td>
							<td width="87">Tipo</td>
                            <td width="47" class="zpGridTypeInt">Sexo</td>
                            <td width="80" class="zpGridTypeFloat">Medico</td>
                       </tr>';					
				    
                                    echo $sql;
					$result=odbc_exec($conection,$sql);
                                        
					$i=0;
					while($rows=odbc_fetch_array($result))
					{
						
				
	 				$fec=explode(" ",$rows['Fn']);
					$fech_2=explode("-",$fec[0]);
					$fecha_nac =$fech_2[0]."/".$fech_2[1]."/".$fech_2[2];
					edad($fecha_nac);
					$creacis=explode(" ",$rows['Fecha']);
					$creaci=explode("-", $creacis[0]);
					$creacion=$creaci[2]."/".$creaci[1]."/".$creaci[0];
					 	echo 
						'
							<tr>
							<td>'. str_pad($rows['numero_registro'],3,"0",STR_PAD_LEFT).'</td>
							<td>'.$creacion.'</td>
							<td>'.$rows['Nombre'].'</td>
							<td>'.edad($fecha_nac).'</td>
							<td>'.$rows['Procedencia'].'</td>
							<td>'.$rows['Tipo'].'</td>
							<td>'.$rows['Sexo'].'</td>
							<td>'.$rows['Medico'].'</td>
							</tr>										
						';
						$cadena="
						<Paciente>
							<id>".$i."</id>
                                                            <folio>".$rows['Folio']."</folio>
							<fecha_atencion>".$creacion."</fecha_atencion>
							<nombre>".$rows['Nombre']."</nombre>
							<edad>".edad($fecha_nac)."</edad>
							<procedencia>".$rows['procedencia']."</procedencia>
							<tipo>".$rows['Tipo']."</tipo>
							<sexo>".$sexo."</sexo>
							<doctor>".$rows['Medico']."</doctor>
						</Paciente>	
						";
						fwrite($file,$cadena);
						$_SESSION['tagnames'] = '';
						$i++;
						
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
                
				  <p><a href="busqueda.php">Busqueda a detalle</a></p>
				  <?php $fi=$_GET['foliod'];
				  $ff=$_GET['folioh'];
				  if ($_GET['foliod']!=""){
				  echo "<p><a href=\"Core/Resultados_r.php?t=1&foliod=".$fxini."&folioh=".$fxfin."\">Acepta Rango</a></p>";}
				  else
				  {
				  	if($_GET['FI']!="")
				  	{echo "<p><a href=\"Core/Resultados_r.php?t=3&FI=".$_GET['FI']."&FF=".$_GET['FF']."&Expediente=".$_GET['Expediente']."&Nombre=".$_GET['Nombre']."&Apellidos=".$_GET['Apellidos']."&Procedencia=".$_GET['Procedencia']."&Seccion=".$_GET['Seccion']."&Tipo=".$_GET['Tipo']."\">Acepta Rango</a></p>";}
				  	else
				  	{echo "<p><a href=\"Core/Resultados_r.php?t=4\">Acepta Rango</a></p>";}
				  }
				  ?>
			  </div>
				
				  <?PHP
					}
					else
					{
						echo "
                <a href=\"index.php\">cerrar sesion</a>";

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


