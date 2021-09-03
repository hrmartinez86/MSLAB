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
$num=$_POST['num'];
$sql="SELECT     CP.id_paciente, CP.llave_doctor, CP.id_procedencia_muestra, CE.id_examen, CD.fecha, CH.hora_cita, CP.Citas_obs, CP.ID_DIAGNOSTICO, 
                      caj_codigos_fonasa.codigo_fonasa
FROM         citas_dias CD INNER JOIN
                      citas_horas CH ON CD.id = CH.id_citas INNER JOIN
                      citas_paciente CP ON CH.id = CP.id_hora INNER JOIN
                      citas_examenes CE ON CP.id = CE.id_citas_paciente INNER JOIN
                      caj_codigos_fonasa ON CE.id_examen = caj_codigos_fonasa.llave_fonasa
WHERE     (CP.id =".$num.")";
                  $examenes=0;
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			        	$exa[$examenes]=$result["codigo_fonasa"];
			        	$examenes=$examenes+1;
			          	$pac=$result["id_paciente"];
			          	$procedencia=$result["id_procedencia_muestra"];
			          }	
			      $sql="SELECT TOP 1 dat_paciente.*, { fn IFNULL(citas_paciente.ID_UNIDAD_PROCEDENCIA, 0) } AS ID_UNIDAD_PROCEDENCIA  FROM dat_paciente LEFT OUTER JOIN citas_paciente ON dat_paciente.expediente = citas_paciente.id_paciente WHERE (dat_paciente.rut = ".$pac.")";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			        	$expediente=$result["expediente"];
			          	$nombre=$result["nombre"];
			          	$Sexo=$result["sexo"];
			          	$apellidos=$result["apellidos"];
			          	$fecha=split(" ",$result["fecha_nacimiento"]);
			          	$fechas=split("-",$fecha[0]);
			          	$direccion=$result["calle"];
			          	$ciudad=$result["ciudad"];
			          	$telefono=$result["telefono"];
			          	$curp=$result["CURP"];
			          	$rfc=$result["rfc"];
			          }	   
?>  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!--AQUI ES DONDE PONEMOS LA INFO PARA LA CAPTURA DE LOS ESTUDIOS "AUTOCOMPLETAR" -->

<!-- TERMINA "AUTOCOMPLETAR" -->


<script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
<script language="javascript" type="text/javascript" src="js/mambo.js"></script>
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
<link rel="stylesheet" type="text/css" href="Styles/INFOLAB/Style_doctype.css">

<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></LINK>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>

</head>
<body>
 
<!-- BEGIN Record Citas -->
<?php include("header.html");?>
<br></br>
<form id="Atenciones" method="post" name="Atenciones" action="atencionesxcita.php">
    <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>N&uacute;mero de Cita</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="10" cellpadding="0" cellspacing="0" class="Record">
          
          <tr class="Controls">
             
            <!-- <td><input align="middle" name="Cit" id="Cit" class="Controls" onChange="Citas('librerias/citas.php')" value="" ><div id="Citasn"></div></td> -->
            <td><input  name="num" id="num" class="Controls" onChange="numero('librerias/citas.php')" value="" > <?php echo "Número de Cita:". $_POST['num'];?></td>
            
          </tr>
          
          </table>
          
          </table>
</form>
<br></br>

<form id="Citas" method="post" name="Citas" action="guarda_atencion.php">
  <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Atenciones</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="450" cellpadding="0" cellspacing="0" class="Record">
          
          <tr class="Controls">
            <td class="th"><label for="Expediente">Expediente:</label></td> 
            <td><input  name="Expediente" id="Expediente" class="Controls" onChange="paciente('librerias/paciente.php')" value="<?php echo $expediente;?>" ><div id="expedientes"></div></td>
            
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasSexo">Sexo:</label></td> 
            <td><select id="Sexo" name="Sexo">
				  <?php if ($Sexo=="M"){?>           
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
            <td class="th"><label for="CitasApellidos">Apellidos:</label></td> 
            <td><input name="apellidos" id="CitasApellidos" value="<?php echo $apellidos;?>" size="70"></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
             
            <td>Fecha de Nacimiento: </td><td><input type="text" value="<?php echo $fechas[2]."/".$fechas[1]."/".$fechas[0];?>" readonly name="theDate2"><img type="button" src="Styles/INFOLAB/Images/DatePicker.gif" onclick="displayCalendar(document.forms[1].theDate2,'dd/mm/yyyy',this)"></td>
            <td></td>
            </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasProcedencia">Procedencia:</label></td> 
            <td><select id="CitasProcedencia" name="CitasProcedencia">
            	<?php
			      $sql="select * from Procedencia_muestra where activo='S' order by descripcion ";
			      $query=odbc_exec($conection,$sql);
			      $cont=0;
			      while ($result=odbc_fetch_array($query))
			          {
			          	if ($result['id']==$procedencia){
			          	echo '<option  value="'.$result['id'].'" selected>'.$result['descripcion'].'</option>';
			          	}
			          	else
			          	{
			          		echo '<option  value="'.$result['id'].'">'.$result['descripcion'].'</option>';
			          	}
			          	
			          	
			          }	
			          		
		        ?>        
				</select>

            </td>
            <td></td>
          </tr>
           <tr class="Controls">
            <td class="th"><label for="Tipo">Tipo de Paciente:</label></td> 
            <td><select id="Tipo" name="Tipo">
            	<?php
            	echo '<option value="" </option>';
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
            <td class="th"><label for="Doctor">Médico:</label></td> 
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
            <td class="th"><label for="CitasDireccion">Dirección:</label></td> 
            <td><textarea  name="Direccion" id="Direccion" cols="45" rows="5"><?php echo $direccion;?></textarea></td>
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
			        	
			          	if ($result['codigo']==$ciudad){
			          	echo '<option  value="'.$result['codigo'].'" selected>'.$result['descripcion'].'</option>';
			          	}
			          	else
			          	{
			          		echo '<option  value="'.$result['codigo'].'">'.$result['descripcion'].'</option>';
			          	}
			          	
			          	
			          }	
			          		
		        ?>        
				</select>
            </td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasTelefono">Telefono:</label></td> 
            <td><input id="Telefono" value="<?php echo $telefono;?>" name="Telefono"></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasRFC">RFC:</label></td> 
            <td><input id="CitasRFC" value="<?php echo $rfc;?>" name="CitasRFC"></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasCURP">CURP:</label></td> 
            <td><input name="CitasCURP" class="Row" id="CitasCURP" value="<?php echo $curp;?>"></td>
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
                     <td><strong>Codigo</strong><input name="data[Examen][Codigo]"  size="4" value="" type="text" id="ExamenCodigo" /><input type="button" value="+" onClick="buscarEstudio(); javascript: return false;" /></td>
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
                       <?php
                       for($i=1;$i<=$examenes;$i++){
                       $sql="select * from caj_codigos_fonasa where codigo_fonasa='".$exa[$i-1]."' order by descripcion ";
                       $query=odbc_exec($conection,$sql);
                      while ($result=odbc_fetch_array($query))
                          {
                            echo '<option value="'.$result['codigo_fonasa'].'">'.$result['nombre'].' --> '.$result['codigo_fonasa'].'</option>';
                          }			
                       }
                       ?>        
                       </select> <input type="hidden" name="examenes" value="" />		
                     </td>
                      
                 </tr>
                 
                
            </table>
          
  		
  	            
                
                
                <td></td>
              </tr>
            </table>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  
</form>
<input type="image" src="img/icons/bguardatencion.jpg" onClick="Valida1()" />
<p>
  <!-- END Record Citas -->
</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp; </p>

</body>

</html>