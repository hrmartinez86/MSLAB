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
                  <td><a href="/WEB/Estudios.php" id="Estudio"><img height="80" width="80" src="images/botones/doctor.jpeg"</a></td>
                  <td>Estudios</td>
              </tr>
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


