<?php
session_start();
//header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado']=="ok" ) {
        } 
        else {
          header("Location: index.php"); 
         
        }
$ver_botones="";
$fecha=date("d , M, y,  H:i a");
include ("librerias/conection.php");
//include("librerias/control_citas.php");
$ODBC=$_SESSION["ODBC"];
$conection=conectar($ODBC);
$fecha=date('d/m/Y');
$cod=$_SESSION['empresa'];
$cod=str_pad($cod, 2, "0", STR_PAD_LEFT);
//echo $cod;
$num= $_GET['num'];
$folio=str_pad($num, 6, "0", STR_PAD_LEFT); 
$folio= $cod.$folio;
$sql="SELECT FECHA, HORA, NUMERO, NUMERO_REGISTRO, RUT, USUARIO_CREACION, NOMBRE_USUARIO, AnOS, NOMBRE_DOCTOR, FECHATOMAMUESTRA, FECHARECEPCIONMUESTRA, ESTADOTOMAMUESTRA, ESTADORECEPCIONMUESTRA, HORARECEPCIONMUESTRA, FECHA_REGISTRO, IDPACIENTE, ORI_PAC, TIPO_DE_URGENCIA, OBSTOMAMUESTRA, DESCRIPCION, RUT_PACIENTE, NOMBRE, APELLIDOS, SEXO, TELEFONO, FECHA_NACIMIENTO, PREVISION, CONTRAINDICACIONES, PROCEDENCIA_MUESTRA, FOLIO_HOST, NUM_CAMA FROM SISTEMA_TOMA_MUESTRAS_PACIENTE WHERE (NUMERO = '".$folio."')";
// echo $sql;
    	
    	$query=odbc_exec($conection,$sql);  
    // echo $sql;  
			      while ($result=odbc_fetch_array($query))
			          {
			        	$idpaciente=$result['IDPACIENTE'];
			        	$nombre=$result['NOMBRE']." ".$result['APELLIDOS'];
			          }
			          //echo $idpaciente;
			          

			          //echo $idpaciente;
			          //echo " " .$i;
?> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!--AQUI ES DONDE PONEMOS LA INFO PARA LA CAPTURA DE LOS ESTUDIOS "AUTOCOMPLETAR" -->

<!-- TERMINA "AUTOCOMPLETAR" -->


<script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
<script language="javascript" type="text/javascript" src="js/mambo.js"></script>
<meta content="text/html; charset=windows-1252" http-equiv="content-type">
<title>**Impresi&oacute;n de Etiquetas**</title>
<style type="text/css">
	body{
		/*
		You can remove these four options 
		
		*/
		

	}
	#ad{
		padding-top:220px;
		padding-left:10px;
	}
	#Citas table tr td .Record .Bottom td {
	text-align: left;
}
</style>
<meta name="GENERATOR" content="CodeCharge Studio 4.2.00.040">
<link rel="stylesheet" type="text/css" href="Styles/INFOLAB/Style_doctype.css">

<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></LINK>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>

</head>
<body>
 
<!-- BEGIN Record Citas -->
<?php include("Header.html")?>
<br></br>
<form id="Etiquetas" method="get" name="Etiquetas" action="etiquetasxfolio.php">
    <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Folio.</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="10" cellpadding="0" cellspacing="0" class="Record">
          
          <tr class="Controls">
             
            <!-- <td><input align="middle" name="Cit" id="Cit" class="Controls" onChange="Citas('librerias/citas.php')" value="" ><div id="Citasn"></div></td> -->
            <td><input  name="num" id="num" class="Controls" onChange="numero('librerias/citas.php')" value="" ><div id="numrocita"></div></td>
           
          </tr>
          </table>
          
          </table>
</form>
<br></br>
<table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Folio:</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td>
            <td class="th"><strong><?php echo $folio;?></strong></td> 
          </tr>
        </table>
        </table>
        <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Nombre del Paciente:</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td>
            <td class="th"><strong><?php echo $nombre;?></strong></td> 
          </tr>
        </table>
        </table>
        <br></br>

<form id="Lista" name="Lista" method="get" action="pdf/impetiq.php">
<table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Etiquetas</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="10" cellpadding="0" cellspacing="0" class="Record">
          <tr><td><input name="num" value="<?php echo $num;?>" type="hidden"></input></td></tr>
          <tr class="Controls">
             
            <!-- <td><input align="middle" name="Cit" id="Cit" class="Controls" onChange="Citas('librerias/citas.php')" value="" ><div id="Citasn"></div></td> -->
            <td>Codigo de Barra</td>
           <td>|   Muestra</td>
           <td>|   Imprime</td>
          </tr>
          <?php $sql="SELECT MUESTRA, CODIGO_BARRAS FROM SISTEMA_BUSCA_DATOS_ETIQUETA_PERFIL WHERE IDPACIENTE = '".$idpaciente."' GROUP BY MUESTRA, CODIGO_BARRAS ORDER BY CODIGO_BARRAS";
          $query=odbc_exec($conection,$sql);  
          //echo $sql;  
          $i=0;
			      while ($result=odbc_fetch_array($query))
			          {
			          	$codigos[$i]=$result['CODIGO_BARRAS'];
			        	
			          	?>
			          	<tr class="Controls">
             
                         <td><input type="hidden" value="<?php echo $codigos[$i];?>" name="curva[]"/><?php echo $codigos[$i];?></td>
                         <td><?php echo $result['MUESTRA'];?></td>
                         <td align="center"><input type="checkbox" name="option[]" align="middle" value="<?php echo $codigos[$i];?>"  checked> </td>
                       </tr>
                       <?php 
			        	$i=$i+1;
			          }?>
			          <tr>
			          <td></td>
          <td><input type="submit" value="Enviar" /></td>
          
          </tr>
          <tr><td><input type="hidden" value="<?php echo $i;?>" name="numero"/></td>
			          <td><input type="hidden" value="<?php echo $codigos;?>" name="curvas"/></td></tr>
          </table>
          
          </table>
</form>
</body>

</html>