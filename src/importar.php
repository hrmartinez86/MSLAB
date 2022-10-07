<?php
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Estadistica.xls");
header("Pragma: no-cache");
header("Expires: 0");
session_start();
header("Cache-control: private"); //Arregla IE 6        
if ($_SESSION['estado']=="ok" ) {
    
        } else {
     
          header("Location: index.php"); 
          echo "<html></html>";
        }

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Impresion de Pacientes Validados</title>
<style type="text/css">
<!--
#apDiv1 {
	position:absolute;
	left:114px;
	top:27px;
	width:0px;
	height:6px;
	z-index:1;
}
-->
</style>
<style type="text/css">
<!--
.Estilo1 {
	font-size: 9pt;
	font-weight: bold;
}
.Estilo2 {font-size: 10pt}
.Estilo3 {font-size: 10px}
-->
</style>
<script type="text/javascript">
<!--

//-->
function imprimir()
{
window.print();
}
</script>
</head>
<?php
function CargarXML($ruta_fichero)
{
	$contenido = "";
	if($da = @fopen($ruta_fichero,"r"))
	{
		while ($aux= fgets($da,1024))
		{
			$contenido.=$aux;
		}
		fclose($da);
	}
	else
	{
		echo "Error: no se ha podido leer el archivo <strong>".$ruta_fichero."</strong>";
	}
	$contenido=ereg_replace("á","a",$contenido);
	$contenido=ereg_replace("é","e",$contenido);
	$contenido=ereg_replace("í","i",$contenido);
	$contenido=ereg_replace("ó","o",$contenido);
	$contenido=ereg_replace("ú","u",$contenido);
	$contenido=ereg_replace("Á","A",$contenido);
	$contenido=ereg_replace("É","E",$contenido);
	$contenido=ereg_replace("Í","I",$contenido);
	$contenido=ereg_replace("Ó","O",$contenido);
	$contenido=ereg_replace("Ú","U",$contenido);
	$contenido=ereg_replace("Ñ","NI",$contenido);
	$contenido=ereg_replace("ñ","ni",$contenido);
	
		if ($_SESSION['tagnames'] == 'sexo')
		{
		$tagnames=array ("id","folio","fecha_atencion","nombre","sexo","procedencia","doctor");
		}
		else
		{
		$tagnames=array ("id","folio","fecha_atencion","nombre","edad","procedencia","doctor");
		}
	if (!$xml = domxml_open_mem($contenido))
	{
		echo "<br>Ha ocurrido un error al procesar el documento<strong> \"$ruta_fichero\"</strong> a XML <br>Favor de realizar la consulta nuevamente";
		exit;
	}
	else
	{
		$raiz = $xml->document_element();
		$tam=sizeof($tagnames);

		for($i=0; $i<$tam; $i++)
		{
			$nodo = $raiz->get_elements_by_tagname($tagnames[$i]);
			$j=0;
			foreach ($nodo as $etiqueta)
			{
			$matriz[$j][$tagnames[$i]]=$etiqueta->get_content();
			$j++;	
		}
	}

		return $matriz;
	}
} 
$fichero="XML/".$_SESSION['nombre']."/".$_SESSION['archivo'];
$matriz=CargarXML($fichero);
$num_noticias=sizeof($matriz);
?>
<body onload="imprimir()">
<div align="center" class="current_page_item">
  <div id="page">
    
    
    	<?php
		if (isset($_GET['titulo']))
		{
			$_GET['titulo'];
			if ($_GET['titulo']=="Pacientes_R")
			{
				$tipo="RUTINA";
			}
			else if ($_GET['titulo']=="Pacientes_U")
			{
				$tipo="URGENCIAS";
			}
			?>
            <p><h1>PACIENTES DE <?php echo $tipo; ?> DEL <?php echo $_GET['finicio']; ?> AL <?php echo $_GET['ffin'];?></h1></p>
            <?php
		}
		else
		{
        if ($_SESSION['tagnames'] == 'sexo')
		{
		?>
    <p><h1>PACIENTES VALIDADOS DE <?php echo $_GET['finicio']; ?> AL <?php echo $_GET['ffin'];?></h1></p>
    	<?php
			}
			else
			{		
		?>    	
        <p><h1>RESULTADOS ENCONTRADOS</h1></p>
    	<?php
			}	
		}	
		?>    	        
    <p align="right" class="Estilo2">Fecha y Hora de Impresion: <?php echo date("d , M, y,  H:i a");?></p>}    
    <table width="800" >
      <tr>
        <?php 
		if ($_SESSION['tagnames'] == 'sexo')
		{
		echo '
        <td width="50" ><span class="Estilo1">Folio</span></td>
        <td width="120"><div align="center"><span class="Estilo1">Fecha de atencion</span></div></td>
        <td width="160"><div align="center"><span class="Estilo1"> Nombre</span></div></td>
        <td width="100"><div align="right"><span class="Estilo1">Sexo</span></div></td>
        <td width="180"><div align="center"><span class="Estilo1">Procedencia</span></div></td>
        <td width="150"><div align="center"><span class="Estilo1">Doctor</span></div></td>';
		}
		else
		{
		echo '
        <td width="50" ><span class="Estilo1">Folio</span></td>
        <td width="120"><div align="center"><span class="Estilo1">Fecha de atencion</span></div></td>
        <td width="160"><div align="center"><span class="Estilo1"> Nombre</span></div></td>
        <td width="100"><div align="right"><span class="Estilo1">Edad</span></div></td>
        <td width="180"><div align="center"><span class="Estilo1">Procedencia</span></div></td>
        <td width="150"><div align="center"><span class="Estilo1">Doctor</span></div></td>';
		}
		?>
        
        
      </tr>
</table>
    <hr align="center" width="800" color="#000000"/>

      <p>
        <?php 
	  $j=1;
for($i=0;$i<$num_noticias;$i++)
{
		if ($_SESSION['tagnames'] == 'sexo')
		{
		echo '
		<table width="800" border="1">
		<tr>
		<font size="-1">
		<td width="50">'.$matriz[$i]["folio"].'</td>
		<td width="50">'.$matriz[$i]["fecha_atencion"].'</td>
		<td width="200">'.$matriz[$i]["nombre"].'</td>
		<td width="70">'.$matriz[$i]["sexo"].'</td>
		<td width="100">'.$matriz[$i]["procedencia"].'</td>
		<td width="100">'.$matriz[$i]["doctor"].'</td>
		</font>
		</table>
		';
		}
		else
		{
		echo '
		<table width="800" border="1">
		<tr>
		<font size="-1">
		<td width="50">'.$matriz[$i]["folio"].'</td>
		<td width="50">'.$matriz[$i]["fecha_atencion"].'</td>
		<td width="200">'.$matriz[$i]["nombre"].'</td>
		<td width="70">'.$matriz[$i]["edad"].'</td>
		<td width="100">'.$matriz[$i]["procedencia"].'</td>
		<td width="100">'.$matriz[$i]["doctor"].'</td>
		</font>
		</table>
		';		
		}		
$j++;
} 
?>
 <p><h2 align="right">Total Validados=<?php echo $i;?></h2></p>
  </div>
</div>
</body>
</html>
