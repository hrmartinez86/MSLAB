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
$folio=$_GET['folio'];


$sql="SELECT dat_dfipa.fecha AS Fecha, dat_paciente.rfc,dat_paciente.rut,dat_paciente.CURP,dat_paciente.expediente,dat_paciente.telefono,dat_paciente.calle,dat_paciente.ciudad,dat_dfipa.numero AS Folio, dat_paciente.nombre ,dat_paciente.apellidos , dat_paciente.sexo as Sexo, ";
	$sql .=" dat_doctores.nombre + ' ' + dat_doctores.apellidos AS Medico ,  procedencia_muestra.id as procedencia, dat_paciente.fecha_nacimiento , lab_tipo_paciente.codigo AS Tipo ";
	$sql .=" FROM         dat_dfipa INNER JOIN ";
	$sql .=" dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN " ;
	$sql .=" dat_doctores ON dat_dfipa.doctor = dat_doctores.llave_doctor  INNER JOIN " ;
    $sql .=" procedencia_muestra ON dat_dfipa.procedencia_muestra = procedencia_muestra.id INNER JOIN " ;
	$sql .="  lab_tipo_paciente ON dat_dfipa.tipo = lab_tipo_paciente.codigo " ;
	$sql .=" WHERE     (dat_dfipa.idpaciente=".$_GET['id'].") ";
    //echo $sql;
	$eje=odbc_exec($conection,$sql);
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
		$procedencia=$res['procedencia'];
	    $tipo=$res['Tipo'];
	}
	?>
	<input type="hidden" id="folio" value="<?php echo $folio ?>"></input>
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
     </td>
     </tr>
     </table>
     
        <table height="450" cellpadding="0" cellspacing="0" class="Record">
         
          <tr class="Controls">
            <td class="th"><label for="CitasExpediente">Expediente:</label></td> 
            <td><input  readonly name="Expediente" id="Expediente" class="Controls" value="<?php echo $expe;?>" ><div id="expedientes"></div></td>
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
            <td class="th"><label for="CitasApellidos">Apellidos:</label></td> 
            <td><input name="apellidos" id="CitasApellidos" value="<?php echo $apellidos;?>" size="70"></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
             
            <td>Fecha de Nacimiento: </td><td><input type="text" id="Fecha" value="<?php echo $fm;?>" readonly name="theDate2"><img type="button" src="Styles/INFOLAB/Images/DatePicker.gif" onclick="displayCalendar(document.forms[0].theDate2,'dd/mm/yyyy',this)">A&ntilde;os<input id="anos" size="1" onBlur="calculaf()" value=0>Meses<input id="meses" size="1"  value=0>Dias<input id="dias" size="1"  value=0></td>
            <td></td>
            </tr>
 
          
 
          <tr class="Controls">
            <td class="th"><label for="CitasDireccion">Dirección:</label></td> 
            <td><textarea  name="Direccion" id="Direccion" cols="45" rows="5"><?php echo $calle;?></textarea></td>
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
          <tr class="Controls">
            <td ></td> 
            <td><input type="hidden" name="Rut" class="Row" id="Rut" value="<?php echo $Rut;?>"></td>
            <td></td>
          </tr>
          </table>
          <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Datos de la Ficha</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
           </tr> 
            </table>
          
          <table cellpadding="0" cellspacing="0" class="Record">
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
           
            
          </tr>
           <tr class="Controls">
            <td class="th"><label for="Tipo">Tipo de Paciente:</label></td> 
            <td><select id="Tipo" name="Tipo">
            	<?php
            	  
			      $sql="select * from lab_tipo_paciente where clase='B' order by descripcion ";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          {
			          	if ($result['codigo']==$tipo){
			        	echo '<option value="'.$result['codigo'].'" selected>'.$result['descripcion'].'</option>';
			          	}
			        		else
			        		{echo '<option value="'.$result['codigo'].'" selected>'.$result['descripcion'].'</option>';}
			        	}
			          		
		        ?>        
				</select>
            </td>
          </tr>
          </table>
          
          
     
   
    
   <input type="image" src="img/icons/bagregpac.jpg" onClick="actualizafolio()" />
   
   
  
</form>


</body>

</html>