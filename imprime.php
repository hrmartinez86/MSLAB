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
<link href="default_2.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.Estilo1 {
	font-size: 9pt;
	font-weight: bold;
}
.Estilo2 {font-size: 10pt}
-->
</style>
<script type="text/javascript">
<!--
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_nbGroup(event, grpName) { //v6.0
  var i,img,nbArr,args=MM_nbGroup.arguments;
  if (event == "init" && args.length > 2) {
    if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
      img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;
      if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
      nbArr[nbArr.length] = img;
      for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
        if (!img.MM_up) img.MM_up = img.src;
        img.src = img.MM_dn = args[i+1];
        nbArr[nbArr.length] = img;
    } }
  } else if (event == "over") {
    document.MM_nbOver = nbArr = new Array();
    for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = (img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);
      nbArr[nbArr.length] = img;
    }
  } else if (event == "out" ) {
    for (i=0; i < document.MM_nbOver.length; i++) {
      img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }
  } else if (event == "down") {
    nbArr = document[grpName];
    if (nbArr)
      for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }
    document[grpName] = nbArr = new Array();
    for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = img.MM_dn = (args[i+1])? args[i+1] : img.MM_up;
      nbArr[nbArr.length] = img;
  } }
}
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
echo "Error: no se ha podido leer el archivo <strong>$ruta_fichero</strong>";
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

$tagnames = array ("id","folio","fecha_atencion","nombre","sexo","procedencia","doctor");

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

$fichero=$_GET['nombre'];

$matriz=CargarXML($fichero);

$num_noticias=sizeof($matriz);
?>
<body onload="imprimir()">
<div align="center" class="current_page_item">
  <div id="page">
    <p><h1>PACIENTES VALIDADOS DE <?php echo $_GET['finicio']; ?> AL <?php echo $_GET['ffin'];?></h1></p>
    <p align="right" class="Estilo2">Fecha y Hora de Impresion: <?php echo date("d , M, y,  H:i a");?></p>
    <table width="800">
      <tr>
        <td width="50" ><span class="Estilo1">Folio</span></td>
        <td width="120"><span class="Estilo1">Fecha de atencion</span></td>
        <td width="160"><span class="Estilo1">Nombre</span></td>
        <td width="100"><div align="right"><span class="Estilo1">Sexo</span></div></td>
        <td width="180"><div align="center"><span class="Estilo1">Procedencia</span></div></td>
        <td width="150"><div align="center"><span class="Estilo1">Doctor</span></div></td>
      </tr>
</table>
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td><img src="images/img06.jpg" alt="" name="t" width="800" height="2" border="0" id="t" onload="" /></td>
      </tr>
    </table>
    <hr align="center" width="800" color="#000000"/>

      <p>
        <?php 
	  $j=1;
	  $x=1;
for($i=0;$i<$num_noticias;$i++)
{
echo '
<table width="800">
<tr>
<font size="-1">
<td width="50">'.$matriz[$i]["folio"].$j.'</td>
<td width="50">'.$matriz[$i]["fecha_atencion"].'</td>
<td width="200">'.$matriz[$i]["nombre"].'</td>
<td width="70">'.$matriz[$i]["sexo"].'</td>
<td width="100">'.$matriz[$i]["procedencia"].'</td>
<td width="100">'.$matriz[$i]["doctor"].'</td>
</font>
</table>
';
$j++;
$x++;
if ($x==47)
{
echo'<br><br><br><br>
    <p><h1>PACIENTES VALIDADOS DE '.$_GET['finicio'].' AL '.$_GET['ffin'].'</h1></p>
    <p align="right" class="Estilo2">Fecha y Hora de Impresion: <?php echo date("d , M, y,  H:i a");?></p>
    <table width="800">
      <tr>
        <td width="50" ><span class="Estilo1">Folio</span></td>
        <td width="120"><span class="Estilo1">Fecha de atencion</span></td>
        <td width="160"><span class="Estilo1">Nombre</span></td>
        <td width="100"><div align="right"><span class="Estilo1">Sexo</span></div></td>
        <td width="180"><div align="center"><span class="Estilo1">Procedencia</span></div></td>
        <td width="150"><div align="center"><span class="Estilo1">Doctor</span></div></td>
      </tr>
</table>
 <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td><img src="images/img06.jpg" alt="" name="t" width="800" height="2" border="0" id="t" onload="" /></td>
      </tr>
    </table>
';
$x=0;
}

} 
?>
 <p align="right">Total Validados=<?php echo $i;?></p>
  </div>
</div>
</body>
</html>
<script language="javascript">
	window.setTimeout("cambiar()",1000);
function cambiar()
{
	window.open("presen.php","_self","");
}
</script>
