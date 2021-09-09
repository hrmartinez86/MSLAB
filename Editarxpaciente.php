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

?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<head><title>Editar Datos del Paciente</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Sistema Web Informatico de Análisis Clinico</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link rel="stylesheet" type="text/css" href="WEB/Styles/Core/Style_doctype.css">
	<!-- Common JS files -->
<script type='text/javascript' src='grid/utils/zapatec.js'></script>

	<!-- Custom includes -->	
<script type="text/javascript" src="grid/src/zpgrid.js"></script>
<script type="text/javascript" src="grid/Pacientes.js"></script>

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

<?php 
include("Header.html");
?>

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
			
			echo $fecha."<h1><center>Coincidencias encontrados</center></h1>"; 
	
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
	$cod=str_pad($_SESSION['empresa'], 2, "0", STR_PAD_LEFT);  
    $folio=str_pad($_GET['folio'], 6, "0", STR_PAD_LEFT); 
 
    $folio=$cod.$folio;
	$exp=$_GET['Expediente'];
	//echo $exp;
	$nombre=$_GET['Nombre'];
	$ape=$_GET['Apellidos'];
	
	$sql="SELECT     dat_paciente.nombre + ' ' + dat_paciente.apellidos AS Nombre, dat_paciente.sexo AS Sexo, dat_paciente.fecha_nacimiento AS Fn, dat_paciente.rut, 
                      dat_paciente.CURP, dat_paciente.expediente
FROM         dat_dfipa INNER JOIN
                      dat_paciente ON dat_dfipa.rut = dat_paciente.rut
WHERE     dat_paciente.cod_empresa=".$_SESSION['empresa'];
	
	//echo $sql;
	if ($exp!="")
	{
	
	$sql .=" AND dat_paciente.expediente='".$exp."'";
	//echo $sql;
	}
	
	if ($nombre!="")
	{
	
	$sql .=" AND dat_paciente.nombre like '".$nombre."%'" ;
	//echo $sql;
	}
	
	if ($ape!="")
	{
	
	$sql .=" AND dat_paciente.apellidos like '".$ape."%'" ;
	//echo $sql;
	}
	
	
	
	$sql .=" GROUP BY dat_paciente.nombre + ' ' + dat_paciente.apellidos, dat_paciente.sexo, dat_paciente.fecha_nacimiento, dat_paciente.rut, dat_paciente.CURP, 
                      dat_paciente.expediente, dat_paciente.cod_empresa";
	
//}
//else
//{			
	//$sql="";			
	//$sql="select distinct(df.idpaciente), lp.nombre, df.numero,df.fecha_creacion, df.autoriza_retiro, lp.fecha_nacimiento, pm.descripcion procedencia,  lup.DESCRIPCION unidad, dd.nombre + ' ' + dd.apellidos as NOMBRE_DOCTOR  from dat_dfipa df inner join dat_paciente lp on df.rut=lp.rut inner join procedencia_muestra pm on pm.id = df.procedencia_muestra inner join lab_uprocedencia lup on df.ID_UNIDAD_PROCEDENCIA= lup.ID_UNIDAD inner join dat_doctores dd on df.doctor=dd.llave_doctor inner join dat_dpcod dp on df.idpaciente=dp.idpaciente where  dp.estado<>'NULL' and pm.id=".$_SESSION['nivel']." ";	
	
	//$finicio="";
	//$f_fin="";		
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
					   <td width="20">Rut</td>
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
                       
					   echo
					   '<tr>
                             <td width="20">Rut</td>
                            <td width="46" class="zpGridTypeTime">Nombre Completo</td>
                            <td width="20">Edad</td>
                            <td width="87">Fecha de Nacimiento</td>
							<td width="87">Expediente</td>
                            <td width="47" class="zpGridTypeInt">Sexo</td>
                            <td width="80" class="zpGridTypeFloat">CURP</td>
                       </tr>';					
				    }
				   
					$result=odbc_exec($conection,$sql);
					$i=0;
					while($rows=odbc_fetch_array($result))
					{
						
					if (isset($varsql) and $varsql<>"otro")
					{ 
						
                        
						#$aten=explode(" ",$rows['fecha_atencion']);
						#$aaten=explode("-",$aten[0]);
						$faten=$rows["Fecha"];
						
						if(	$rows['Sexo']=='M')
						{
							$sexo="Masculino";
						}
						if(	$rows['Sexo']=='F')
						{
							$sexo="Femenino";
						}
					
						$sexo=ereg_replace("<","",$sexo);
						
						$atencion=$rows['folio'];
						$atencion=ereg_replace("<","",$atencion);
						$faten=ereg_replace("<","",$faten);
						$nombre_completo=$rows['Nombre'];
						
						$nombre_completo=ereg_replace("<","",$nombre_completo);
						
						$procedencia=$rows['Procedencia'];
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
	 				$fec=explode(" ",$rows['Fn']);
					$fech_2=explode("-",$fec[0]);
					$fecha_nac =$fech_2[0]."/".$fech_2[1]."/".$fech_2[2];
					$fecha_nac2=$fech_2[2]."/".$fech_2[1]."/".$fech_2[0];
					edad($fecha_nac);
					$creacis=explode(" ",$rows['Fecha']);
					$creaci=explode("-", $creacis[0]);
					$creacion=$creaci[2]."/".$creaci[1]."/".$creaci[0];
					 	echo 
						'
							<tr>
							<td>'.$rows['rut'].'</td>
							<td>'.$rows['Nombre'].'</td>
							<td>'.edad($fecha_nac).'</td>
							<td>'.$fecha_nac2.'</td>
							<td>'.$rows['expediente'].'</td>
							<td>'.$rows['Sexo'].'</td>
							<td>'.$rows['CURP'].'</td>
							</tr>										
						';
						$cadena="
						<Paciente>
							<id>".$i."</id>
							<folio>".$rows['numero']."</folio>
							<fecha_atencion>".$creacion."</fecha_atencion>
							<nombre>".$rows['Nombre']."</nombre>
							<edad>".edad($fecha_nac)."</edad>
							<procedencia>".$fecha_nac."</procedencia>
							<tipo>".$rows['Tipo']."</tipo>
							<sexo>".$sexo."</sexo>
							<doctor>".$rows['Medico']."</doctor>
						</Paciente>	
						";
						fwrite($file,$cadena);
						$_SESSION['tagnames'] = '';
						$i++;
						
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


