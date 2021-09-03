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
include("librerias/control_citas.php");
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
<title>**Citas**</title>

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
<?php include("Header.html")?>
<br></br>

<form id="Citas" method="post" name="Citas" action="guarda_cita.php">
  <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Citas</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="450" cellpadding="0" cellspacing="0" class="Record">
          <tr class="Controls">
         <td>Fecha de la Cita: </td>
         <td><input id="" type="text" value="<?php echo $fecha;?>" onChange="MostrarConsulta('librerias/control_citas.php');" readonly  name="theDate"><img type="button" src="Styles/INFOLAB/Images/DatePicker.gif" onclick="displayCalendar(document.forms[0].theDate,'dd/mm/yyyy',this)"></td>
         <td>Maximo de Citas:<input type=HIDDEN value=""> <?php 
         //echo $fecha;
         $sql="select citasMaximoDias as Citas from configuracion_infolab";
         //echo $sql;
         $query=odbc_exec($conection,$sql);
          
         while ($result=odbc_fetch_array($query))
			          {
			          	global $MC;
			          	$MC= $result['Citas'];
			        	echo $MC;
			          }			  ?> </td></tr>
           
          <tr class="Controls">
            <td class="th"><label for="CitasExpediente">Expediente:</label></td> 
            <td><input  name="Expediente" id="Expediente" class="Controls" onChange="paciente('librerias/paciente.php')" onBlur="cambia()" value="" ><img style="WIDTH: 25px; HEIGHT: 20px"  type="button" src="Styles/INFOLAB/Images/4.jpg" onclick="valor()"><div id="expedientes"></div></td>
            <td>Citas Disponibles:<div id="citas"></div></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label id="LSexo" for="CitasSexo">Sexo:</label></td> 
            <td><select id="Sexo" name="Sexo">
				  <option value="" selected></option>	            
			      <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
			      
				</select></td>
				<td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasNombres">Nombres:</label></td> 
            <td><input name="nombre" id="CitasNombres" value="" size="70"></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasApellidos">Apellidos:</label></td> 
            <td><input name="apellidos" id="CitasApellidos" value="" size="70"></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
             
            <td>Fecha de Nacimiento: </td><td><input type="text" id="Fecha" value="<?php echo $fecha;?>" readonly name="theDate2"><img type="button" src="Styles/INFOLAB/Images/DatePicker.gif" onclick="displayCalendar(document.forms[0].theDate2,'dd/mm/yyyy',this)">A&ntilde;os<input id="anos" size="1" onBlur="calculaf()" value=0>Meses<input id="meses" size="1"  value=0>Dias<input id="dias" size="1"  value=0></td>
            <td></td>
            </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasProcedencia">Procedencia:</label></td> 
            <td><select id="CitasProcedencia" name="CitasProcedencia">
            	<?php
            	echo '<option value="" </option>';
			      $sql="select * from Procedencia_muestra where activo='S' order by descripcion ";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			        	echo '<option value="'.$result['id'].'">'.$result['descripcion'].'</option>';
			          }			
		        ?>        
				</select>
            </td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasDireccion">Dirección:</label></td> 
            <td><textarea name="Direccion" id="Direccion" cols="45" rows="5"></textarea></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasCiudad">Ciudad:</label></td> 
            <td><select id="CiudadCit" name="CiudadCit">
            	<?php
			      $sql="select * from lab_ciudad order by descripcion";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			        	echo '<option value="'.$result['codigo'].'">'.$result['descripcion'].'</option>';
			          }			
		        ?>        
				</select>
            </td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasTelefono">Telefono:</label></td> 
            <td><input id="Telefono" value="" name="Telefono"></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasRFC">RFC:</label></td> 
            <td><input id="CitasRFC" value="" name="CitasRFC"></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasCURP">CURP:</label></td> 
            <td><input name="CitasCURP" class="Row" id="CitasCURP" value=""></td>
            <td></td>
          </tr>
          <tr class="Bottom">
            <table class="Header" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
                <td class="th"><strong>Estudios</strong></td> 
                <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
              </tr>
            </table>
            <table height="200" cellpadding="0" cellspacing="0" class="Record">
                 <tr class="Controls">
                     <td><strong>Codigo</strong><input name="data[Examen][Codigo]" onKeyPress = "Valida(event)" size="4" value="" type="text" id="ExamenCodigo" /><input type="button" value="+" onClick="buscarEstudio(); javascript: return false;" /></td>
                     <td>                     
                     <select name="ExamenCatalogo"  multiple="multiple" size="9" style="width: 250px;" id="ExamenCatalogo">
						   <?php
                      $sql="select * from caj_codigos_fonasa where activo='S' order by descripcion ";
                      $query=odbc_exec($conection,$sql);
                      while ($result=odbc_fetch_array($query))
                          {
                            echo '<option value="'.$result['codigo_fonasa'].'">'.$result['nombre'].' --> '.$result['codigo_fonasa'].'</option>';
                          }			
                    ?>        
                     </select>
                     </td>
                     <td>
                     <input type="image" src="img/icons/flechder1.jpg" name="test" value=">>" onClick="Choose(); javascript: return false;" />
                     <input type="image" src="img/icons/flechizq1.jpg" name="test2" value="<<" onClick="unChoose(); javascript: return false;" />
                     </td>
                     <td>
            		 <select name="ExamenSeleccionado"  multiple="multiple" size="9" style="width: 250px;" id="ExamenSeleccionado">
                     </select> <input type="hidden" name="examenes" value="" />		
                     </td>
                      
                 </tr>
                 
                
            </table>
          
  		<tr>
  	            
                
                
                <td></td>
              </tr>
            </table>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  
</form>
<input type="image" src="img/icons/bguardcita.jpg" onClick="Valida2()" />

</body>

</html>