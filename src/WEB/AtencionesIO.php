<?php
session_start();



//header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado']=="ok" ) {
    
        } else {
     
          header("Location: ../index.php"); 
          echo "<html></html>";
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
<meta content="text/html; charset=windows-1252" http-equiv="content-type">
<title>**Atenciones**</title>
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
<table border="0" cellspacing="0" cellpadding="0" width="1154">
  <tr>
    <td colspan="8"><img style="WIDTH: 1000px; HEIGHT: 130px" border="0" alt="logo" src="../images/Core/cabeza2.png" width="517" height="24"></td> 
  </tr>
 
  <tr>
    <td width="3"></td> 
    <td width="103"><a href="citas.php" id="Link1"><img style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link1}" src="../images/Core/botones/b1.jpg"></a></td> 
    <td width="103"><a href="{Link2}" id="Link2"><img style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link2}" src="../images/Core/botones/b10.jpg"></a></td> 
    <td width="103"><a href="{Link3}" id="Link3"><img style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link3}" src="../images/Core/botones/b2.jpg"></a></td> 
	<td width="99"><a href="../tabla.php" id="Link4"><img style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link4}" src="../images/Core/botones/b4.jpg"></a></td>
	<td width="103"><a href="../lista.php" id="Link5"><img style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link5}" src="../images/Core/botones/b12.png" /></a></td>
	<td width="395">&nbsp;</td>
	<td><a href="../salir.php" id="Link6"><img style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link6}" src="../images/logout.png" /></a></td>
    <td width="1"></td> 
  </tr>
</table>
<br></br>
<form id="Atenciones" method="post" name="{HTMLFormName}" action="{Action}">
  <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>Atenciones</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="509" cellpadding="0" cellspacing="0" class="Record">
          
           
          <tr class="Controls">
            <td class="th"><label for="CitasExpediente">Expediente:</label></td> 
            <td><input name="Expediente" class="Controls" id="CitasExpediente" value=""></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasSexo">Sexo:</label></td> 
            <td><select id="Sexo" name="{Sexo}">
            	<?php
			      $sql="select * from dat_sexo order by descripcion ";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			        	echo '<option value="'.$result['id'].'">'.$result['DESCRIPCION'].'</option>';
			          }			
		        ?>        
				</select></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasNombres">Nombres:</label></td> 
            <td><input name="{Nombres_Name}" id="CitasNombres" value="" size="70"></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasApellidos">Apellidos:</label></td> 
            <td><input name="{Apellidos_Name}" id="CitasApellidos" value="" size="70"></td>
          </tr>
 
          <tr class="Controls">
             
            <td>Fecha de Nacimiento: </td><td><input type="text" value="<?php echo $fecha;?>" readonly name="theDate2"><img type="button" src="Styles/Core/Images/DatePicker.gif" onclick="displayCalendar(document.forms[0].theDate2,'dd/mm/yyyy',this)"></td></tr>
          
 
          <tr class="Controls">
            <td class="th"><label for="CitasProcedencia">Procedencia:</label></td> 
            <td><select id="Procedencia" name="{Procedencia_Name}">
            	<?php
			      $sql="select * from Procedencia_muestra where activo='S' order by descripcion ";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			        	echo '<option value="'.$result['id'].'">'.$result['descripcion'].'</option>';
			          }			
		        ?>        
				</select>
            </td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="Tipo">Tipo de Paciente:</label></td> 
            <td><select id="Tipo" name="Tipo_Pac">
            	<?php
			      $sql="select * from lab_tipo_paciente where clase='B' order by descripcion ";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			        	echo '<option value="'.$result['codigo'].'">'.$result['descripcion'].'</option>';
			          }			
		        ?>        
				</select>
            </td>
          </tr>
          
          <tr class="Controls">
            <td class="th"><label for="Doctor">M�dico:</label></td> 
            <td><select id="Doctor" name="Doctor">
            	<?php
			      $sql="select nombre + ' ' + apellidos as Nombre,llave_doctor from dat_doctores  order by Nombre ";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			        	echo '<option value="'.$result['llave_doctor'].'">'.$result['Nombre'].'</option>';
			          }			
		        ?>        
				</select>
            </td>
          </tr>
          
          <tr class="Controls">
            <td class="th"><label for="CitasDireccion">Direcci�n:</label></td> 
            <td><textarea name="Direccion" id="Direccion" cols="45" rows="5">(Opcional)</textarea></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasCiudad">Ciudad:</label></td> 
            <td><input id="CitasCiudad" value="" name="{Ciudad_Name}"></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasTelefono">Telefono:</label></td> 
            <td><input id="CitasTelefono" value="" name="{Telefono_Name}"></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasRFC">RFC:</label></td> 
            <td><input id="CitasRFC" value="" name="{RFC_Name}"></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasCURP">CURP:</label></td> 
            <td><input name="{CURP_Name}" class="Row" id="CitasCURP" value=""></td>
          </tr>
 
          <tr class="Bottom">
            <td height="102" colspan="2" align="center">
              <!-- BEGIN Button Button_Insert --><!-- END Button Button_Insert -->
            <!-- BEGIN Button Button_Cancel --><!-- END Button Button_Cancel --></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <p>&nbsp;</p>
</form>
<!-- END Record Citas -->
</body>
</html>