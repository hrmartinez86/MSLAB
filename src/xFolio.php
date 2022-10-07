<?php
//Inicio la sesión
session_start();
header("Cache-control: private"); //Arregla IE 6        
if ( $_SESSION['estado']=="ok" ) {
    
        } else {
     
          header("Location: index.php"); 
          echo "<html></html>";
        }

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>InfoWeb</title>
<script language="JavaScript" src="codebase/overlib_mini.js"></script>
<script src="codebase/dhtmlxcommon.js" type="text/javascript"></script>
<script src="codebase/dhtmlxgrid.js" type="text/javascript"></script>
<script src="codebase/dhtmlxgridcell.js" type="text/javascript"></script>
<link rel="STYLESHEET" type="text/css" href="codebase/dhtmlxgrid.css">
<link rel="stylesheet" type="text/css" href="WEB/Styles/Core/Style_doctype.css">
<script type="text/JavaScript">
<!--
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}
//-->
</script>
<style type="text/css">
<!--
.Estilo3 {
	font-size: 12px
}
-->
</style>
</head>
<?php
$saltar=0;
$rs="N";
include ("scripts\php\generales.php");
$columns="Fecha de Creacion,Nombre,Folio,A�os,Procedencia,Liberado";
$xexpe="Fecha de Atencion,Folio,Nombre Paciente,Sexo,Usuario Creacion";
$prue=0;
include("librerias/activewidgets.php");
include ("WEB/librerias/conection.php");
$ODBC=$_SESSION["ODBC"];
            $conection=conectar($ODBC);
			$tags="";
			$valores="";
			$numero = count($_GET);
			
			$tags = array_keys($_GET);// obtiene los nombres de las varibles
			$valores = array_values($_GET);// obtiene los valores de las varibleS
			// crea las variables y les asigna el valor;
			for($i=0;$i<$numero;$i++)
			{
				$$tags[$i]=$valores[$i];
			}	
$rowf="";
$fol=$_GET['folio'];
$n=strlen($fol);
if ($n==8){
	$folio=$fol;
}
else
{
$sql="select codigo from lab_procedencia where ODBC='".$ODBC."'";
            $query=odbc_exec($conection,$sql);  
            //echo $sql;
    // echo $sql;  
			      while ($result=odbc_fetch_array($query))
			          {
			        	$cod=$result['codigo'];
			        	$cod=str_pad($cod, 2, "0", STR_PAD_LEFT);
			          }
			           $fxini=str_pad($fol, 6, "0", STR_PAD_LEFT);
			           $folio=$cod.$fxini;
}
			           //echo $fol;
					    $con="SELECT distinct(NOMBRE_COMPLETO),idpaciente,fecha_atencion, id_procemuestra, numero_atencion, sexo FROM SISTEMA_ATENCION_EXAMENES WHERE numero_atencion=".$folio;	
					    $echo=odbc_exec($conection,$con);
						while ($ros=odbc_fetch_array($echo))
						{
							$index=$ros["idpaciente"]."&pm=".$ros["id_procemuestra"]."&cm=0";
							$fecha=explode("-",$ros['fecha_atencion']);
							$an=$fecha[0];
							$ms=$fecha[1];
							$ro="";
							$da=explode (" ",$fecha[2]);
							$fecha_atencion=$da[0]."/".$ms."/".$an;
							$rowf='"'.$index.'","'.$fecha_atencion.','.$ros["numero_atencion"].','.$ros["NOMBRE_COMPLETO"].','.$ros["sexo"].','.$ro.'",""';
							$saltar++;
						
						
								$seguir_no="SELECT distinct(NOMBRE_COMPLETO),idpaciente,fecha_atencion, id_procemuestra, numero_atencion, sexo,USUARIO_CREACION_DETALLE FROM SISTEMA_ATENCION_EXAMENES WHERE numero_atencion=".$fol;
										
										$sk=odbc_exec($conection,$seguir_no) or die ("ERROR : No se puede ejecutar la consulta.");
										while ($rsd=odbc_fetch_array($sk))
										{															
											$rs="S";
										}	
										
										
																
							$datoss[]= 'mygrid.addRow("'.$index.'","'.$fecha_atencion.','.$ros["NOMBRE_COMPLETO"].','.$ros["numero_atencion"].','.$ros["sexo"].','.$ro.','.$rs.'","");';
						}
						if ($rowf=="")
						{
							$hacer=false;
						}
						else
						{
							$hacer=true;
						}
$fecha=date("d , M, y,  H:i a");
?>	<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Sistema Web Informatico de Análisis Clinico</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link href="default.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.Estilo1 {font-size: 24px}
.Estilo2 {font-size: .1}
#Layer1 {
	position:absolute;
	left:305px;
	top:260px;
	width:598px;
	height:91px;
	z-index:1;
}
-->
</style>
</head>
<body>

<div id="headerbg">
  <p class="text1">&nbsp;</p>
</div>
<!-- start page -->
<div id="page">
	<!-- start content -->
	<div id="content">
		<!-- start latest-post -->
		<div id="latest-post2" class="post">
			<h3 class="title"><center></center> </h3>
		  <p align="right" class="meta"><small>Fecha: <?php echo $fecha;  ?></small></p>
		  <div class="entry" align="center">
		    <div align="left">
		      <p>
			     <?php
						$titulo='<h1 align="center">Pacientes por Folio</h1>';
						if ($hacer==true)
						{
						/*	if ($saltar==1)
							{
								echo "saltar directo";
							}
							else
							{*/
								if (count($datoss)==1)
								{
								$rowf1=explode("\"",$rowf);
								$dat= explode("&",$rowf1[1]);
								
										$seguir_no="SELECT distinct(NOMBRE_COMPLETO),idpaciente,fecha_atencion, id_procemuestra, numero_atencion, sexo,USUARIO_CREACION_DETALLE FROM SISTEMA_ATENCION_EXAMENES WHERE numero_atencion=".$folio;#"EXECUTE SISTEMA_RESULTADOS_WEB '".$dat[0]."'";
										$sk=odbc_exec($conection,$seguir_no) or die ("ERROR : No se puede ejecutar la consulta.");
										while ($rsd=odbc_fetch_array($sk))
										{															
											$ser="S";
										}
										
										if ($ser=="S")
										{
										
										if ($rsd['LIBERADO']=="N")
											{
											
											}																				
													?>
				<script language="javascript">
				setTimeout("abrir()",500);
				function abrir()
				{
					window.open ("<?php echo "Core/Ficha_Paciente.php?Paciente=".$dat[0];?> ","_self",""); 
				}
				</script>
		      </p>
		      <p align="center"><img src="images/espera.gif" width="48" height="48" /></p>
		      <p align="center" class="Estilo3">Por favor espere
		      <p align="center" class="Estilo3">Se esta realizando la busquda</p>
		      <p>
		        <?php
													
										
										
										
										}
										else
										{
											echo '<h4 align="center">NO SE ENCONTRO NINGUN RESULTADO VALIDADO</h4><center><a href="presen.php">regresar</a></center>';}
									
								}
								else
								{
									tablajax4($columns,$datoss,$titulo);							
								}
							}
						
						else
						{
						echo '<h3 align="center">NO SE ENCONTRO EL FOLIO QUE BUSCA</h3><center><a href="presen.php">Regresar</a></center>';						}
					?>
	          </p>
</p>
									<h1 class="title Estilo2">&nbsp;</h1>
      </div>
		</div>

    </div>
	<div id="sidebar">
		<div style="clear: both;">&nbsp;</div>
	</div>
</div>
<div id="footer">
	 <p id="legal">&copy;2008 MultiSystems S.A. de C.V.,  All Rights Reserved.  Designed by <a href="http://www.MultiSystems.com.mx">T.I</a></p>
  <p id="links"><a href="http://www.deltalab.com.mx/bioquimica">Principal</a>&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; <a href="#">Terms</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="http://validator.w3.org/check/referer" title="This page validates as XHTML 1.0 Transitional"><abbr title="eXtensible HyperText Markup Language">XHTML</abbr></a> &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="http://jigsaw.w3.org/css-validator/check/referer" title="This page validates as CSS"><abbr title="Cascading Style Sheets">CSS</abbr></a></p></div>
</body>
</html>
