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
$num= $_GET['id'];
if(strlen($num)==8)
{
   $folio=$num;	
}
else
{
	$folio=str_pad($num, 6, "0", STR_PAD_LEFT); 
    $folio= $cod.$folio;
}

$sql="SELECT FECHA, HORA, NUMERO, NUMERO_REGISTRO, RUT, USUARIO_CREACION, NOMBRE_USUARIO, A�OS, NOMBRE_DOCTOR, FECHATOMAMUESTRA, FECHARECEPCIONMUESTRA, ESTADOTOMAMUESTRA, ESTADORECEPCIONMUESTRA, HORARECEPCIONMUESTRA, FECHA_REGISTRO, IDPACIENTE, ORI_PAC, TIPO_DE_URGENCIA, OBSTOMAMUESTRA, DESCRIPCION, RUT_PACIENTE, NOMBRE, APELLIDOS, SEXO, TELEFONO, FECHA_NACIMIENTO, PREVISION, CONTRAINDICACIONES, PROCEDENCIA_MUESTRA, FOLIO_HOST, NUM_CAMA FROM SISTEMA_TOMA_MUESTRAS_PACIENTE WHERE (numero = '".$folio."')";

    	
    	$query=odbc_exec($conection,$sql);  
    // echo $sql;  
			      while ($result=odbc_fetch_array($query))
			          {
			        	$idpaciente=$result['IDPACIENTE'];
			        	$nombre=$result['NOMBRE']." ".$result['APELLIDOS'];
			        	$folio=$result['NUMERO'];
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
<title>**Impresi&oacute;n de Resultados**</title>
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
<link rel="stylesheet" type="text/css" href="Styles/Core/Style_doctype.css">

<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></LINK>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>

</head>
<body>
 
<!-- BEGIN Record Citas -->

<br></br>

<br></br>
<table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>Folio:</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>
            <td class="th"><strong><?php echo $folio;?></strong></td> 
          </tr>
        </table>
        </table>
        <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>Nombre del Paciente:</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>
            <td class="th"><strong><?php echo $nombre;?></strong></td> 
          </tr>
        </table>
        </table>
        <br></br>

<form id="Lista" name="Lista" method="GET" action="../Core/MasterImp.php">
<table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>Estudios </strong></td> 
            <td class="HeaderRight"><img bordber="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>

          </tr>
        </table>
 
        <table height="10" cellpadding="0" cellspacing="0" class="Record">
          <tr><td><input name="num" value="<?php echo $num;?>" type="hidden"></input></td></tr>
          <tr class="Controls">
             
            <!-- <td><input align="middle" name="Cit" id="Cit" class="Controls" onChange="Citas('librerias/citas.php')" value="" ><div id="Citasn"></div></td> -->
            <td>Codigo</td>
           <td>|   Descripcion</td>
           <td>|   Imprime Todos<input type="checkbox" onclick="check()" name="todos" > </td>
          </tr>
          <?php $sql="SELECT     *
FROM         SISTEMA_ATENCION_EXAMENES SAE INNER JOIN
                      lab_relac_fonasa_perfil LRFP ON LRFP.llave_fonasa = SAE.llave_fonasa INNER JOIN
                      lab_RLS_perfiles LP ON LRFP.llave_perfil = LP.llave_perfil
WHERE     (SAE.numero_atencion = '".$folio."')
ORDER BY LP.cod_llave, LP.orden_perfil";
          $query=odbc_exec($conection,$sql);  
          //echo $sql;  
          $i=0;
			      while ($result=odbc_fetch_array($query))
			          {
			          	$codigos[$i]=$result['llave_fonasa'];
			          	 		
			          	
			        	$llave=$result['codigo_fonasa'];
			        	$id=$result['idpaciente'];
			        	$llave_fonasa=$result['llave_fonasa'];
			          	?>
			          	<tr class="Controls">
             
                         <td><input type="hidden" value="<?php echo $codigos[$i];?>" name="curvas"/><?php echo $llave;?></td>
                         <td><?php echo $result['nombre_prestacion'];?></td>
                         <td ><input   type="checkbox" name="option" align="middle" value="<?php echo $result['LIBERADO'];?>" <?php if ($result['LIBERADO']=='N'){echo "disabled";} else {echo "enabled";}?>> </td>
                       </tr>
                       <?php 
			        	$i=$i+1;
			          }?>
			          <tr>
			          <td></td>
          <td><input type="button" value="Enviar" onclick="imp()"/></td>
          
          </tr>
                      <tr><td><input type="hidden" value="<?php echo $id;?>" name="i" id="idpac"/></td>
			          <td><input type="hidden" value="<?php echo $llave;?>" name="llave" /></td></tr>
			          <td><input type="hidden" value="<?php echo $llave_fonasa;?>" name="lf" id="lf" /></td></tr>
          </table>
          
          </table>
</form>
</body>

</html>