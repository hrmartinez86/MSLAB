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

$ODBC=$_SESSION["ODBC"];
$conection=conectar($ODBC);
$fecha=date('d/m/Y');
?> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!--AQUI ES DONDE PONEMOS LA INFO PARA LA CAPTURA DE LOS ESTUDIOS "AUTOCOMPLETAR" -->

<!-- TERMINA "AUTOCOMPLETAR" -->



<meta content="text/html; charset=windows-1252" http-equiv="content-type">
<title>Datos del Paciente</title>

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
<script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
<script language="javascript" type="text/javascript" src="js/mambo.js"></script>
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></LINK>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>

</head>
<body>
 
<!-- BEGIN Record Citas -->

<br></br>
<?php 
$exp=$_GET['exp'];
$rut=$_GET['rut'];

$sql_paciente="select top 1* from dat_paciente";
if($exp != "")
{
	$sql_paciente=$sql_paciente . " where expediente='".$exp."'";
}
if($rut != "")
{
	$sql_paciente=$sql_paciente ." where rut='".$rut."'";
}
    //echo $sql_paciente;
	$eje=odbc_exec($conection,$sql_paciente);
	$count=0;
	while ($res=odbc_fetch_array($eje))
	{
		$sexo=$res['sexo'];
		$nombre=$res['nombre'];
		$apellidos=$res['apellidos'];
		$fec=split(" ",$res['fecha_nacimiento']);
	    $fecs=split("-",$fec[0]);
	    $fm= $fecs[2]."/".$fecs[1]."/".$fecs[0];
		$calle=$res['calle'];
		$ciudad=$res['ciudad'];
		$telefono=$res['telefono'];
		$rfc=$res['rfc'];
		$curp=$res['CURP'];
		$expe=$res['expediente'];
		$Rut=$res['rut'];
	}
	?>
<form id="Paciente" method="post" name="Paciente" action="">
  <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Datos del Paciente</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="150" cellpadding="0" cellspacing="0" class="Record">
         
          <tr class="Controls">
            <td class="th"><label for="CitasExpediente">Expediente:</label></td> 
            <td><input   name="Expediente" id="Expediente" class="Controls" value="<?php echo $expe;?>" ><div id="expedientes"></div></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label id="LSexo" for="CitasSexo">Sexo:</label></td> 
            <td><select id="Sexo" name="Sexo">
				   <?php if ($sexo=="M"){?>           
			      <option value="M" selected>Masculino</option>
                  <option value="F">Femenino</option>
                  <?php } else {?>
			      <option value="M" >Masculino</option>
                  <option value="F" selected>Femenino</option>
                  <?php }?>
			      
				</select></td>
				<td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasNombres">Nombres:</label></td> 
            <td><input name="nombre" id="CitasNombres" value="<?php echo $nombre;?>" size="70"></td>
            <td></td>
          </tr>
 
         
 
          <tr class="Controls">
             
            <td>Fecha de Nacimiento: </td><td><input type="text" id="Fecha" value="<?php echo $fm;?>" readonly name="theDate2"><img type="button" src="Styles/INFOLAB/Images/DatePicker.gif" onclick="displayCalendar(document.forms[0].theDate2,'dd/mm/yyyy',this)">A&ntilde;os<input id="anos" size="1" onBlur="calculaf()" value=0>Meses<input id="meses" size="1"  value=0>Dias<input id="dias" size="1"  value=0></td>
            <td></td>
            </tr>
 
          
 
          
          <tr class="Controls">
            <td ></td> 
            <td><input type="hidden" name="Rut" class="Row" id="Rut" value="<?php echo $Rut;?>"></td>
            <td></td>
          </tr>
    <tr>  
    <td></td>    
    <td>
   <input type="image" src="img/icons/bagregpac.jpg" onClick="actualiza()" />
   </td>
   
   </tr>
  </table>
  
</form>


</body>

</html>