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
?> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!--AQUI ES DONDE PONEMOS LA INFO PARA LA CAPTURA DE LOS ESTUDIOS "AUTOCOMPLETAR" -->

<!-- TERMINA "AUTOCOMPLETAR" -->


<script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
<script language="javascript" type="text/javascript" src="js/mambo.js"></script>
<script type="text/javascript">

// ]]&gt;</script>
<meta content="text/html; charset=windows-1252" http-equiv="content-type">

<title>**Atenciones**</title>
<style type="text/css">
	body{


	}
	#ad{
		padding-top:220px;
		padding-left:10px;
	}
        
        .button {
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  background-color: white;
  border: 1px solid #d3d6db;
  border-radius: 3px;
  color: #222324;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-size: 14px;
  height: 32px;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  line-height: 24px;
  padding-left: 8px;
  padding-right: 8px;
  position: relative;
  vertical-align: top;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  white-space: nowrap;
}
        .button.is-white.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
        		.button.is-info.is-outlined {
  background-color: transparent;
  border-color: #42afe3;
  color: #42afe3;
}

.button.is-info.is-outlined:hover, .button.is-info.is-outlined:focus {
  background-color: #42afe3;
  border-color: #42afe3;
  color: white;
}
	#Citas table tr td .Record .Bottom td {
            
            
	text-align: left;
}
</style>
<meta name="GENERATOR" content="CodeCharge Studio 4.2.00.040">

<link rel="stylesheet" type="text/css" href="Styles/Core/Style_doctype.css">
<link rel="icon" type="image/gif" href="../images/core/icon.png">
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></LINK>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<!--<link href="../css/bulma/css/bulma.css" rel="stylesheet" type="text/css" />-->
</head>
<body>
 <table align="center" border="0" cellspacing="0" cellpadding="0">
<!-- BEGIN Record Citas -->
<tr>
      <td valign="top">
    <?php include("Header.html")?>
      </td>
</tr>
 </table>
    <br>    
<form id="Citas" method="post" name="Citas" action="guarda_atencion.php">
    <table align="center" border="0" cellspacing="0" cellpadding="10" width="40%">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>Atenciones</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table  cellpadding="0" cellspacing="0" class="Record"  >
          
        <tr class="Controls">
            <td class="th"><label for="CitasNombres">Nombre del paciente:</label></td> 
            <td><input name="nombre" id="CitasNombres" value="" style="width:100%;"></td>
            <td></td>
          </tr>
 
          <tr class="Controls">
            <td class="th"><label for="CitasSexo">Sexo:</label></td> 
            <td><select id="Sexo" name="Sexo" style="width:100%;
                                                         text-align-last: center;">
				          <option value="" selected></option>	            
			            <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
			      
				        </select></td>
				      <td></td>
          </tr>
 
          

          <tr class="Controls">
             
            <td>Fecha de Nacimiento: </td><td><input style="width:100%; " type="text" id="Fecha" value="<?php echo $fecha;?>" name="theDate2"><img type="button" src="Styles/Core/Images/DatePicker.gif" onclick="displayCalendar(document.Citas.theDate2,'dd/mm/yyyy',this)"></td>
            <td></td>
            </tr>
 
         <tr class="Controls">
            <td class="th"><label for="CitasProcedencia">Procedencia:</label></td> 
            <td><select id="CitasProcedencia" name="CitasProcedencia" style="width:100%; ">
            	<?php
           	  echo '<option value="" </option>';
			      $sql="select * from Procedencia_muestra where activo='S' order by descripcion ";
			      $query=odbc_exec($conection,$sql);
			      $cont=0;
			      while ($result=odbc_fetch_array($query))
			          {
			          	echo '<option  value="'.$result['id'].'">'.$result['descripcion'].'</option>';
			        	
			          	
			          	
			          }	
//			          		
		        ?>        
				</select>

            </td>
            <td></td>
          </tr>
<!--           <tr class="Controls">
            <td class="th"><label for="Tipo">Tipo de Paciente:</label></td> 
            <td><select id="Tipo" name="Tipo">
            	<?php
//            	  echo '<option value="" </option>';
//			      $sql="select * from lab_tipo_paciente where clase='B' order by descripcion ";
//			      $query=odbc_exec($conection,$sql);
//			      while ($result=odbc_fetch_array($query))
//			          {
//			        	echo '<option value="'.$result['codigo'].'">'.$result['descripcion'].'</option>';
//			          }			
		        ?>        
				</select>
            </td>
          </tr>-->
          <tr class="Controls">
              <td class="th"><label for="Doctor">M&eacute;dico:</label></td> 
            <td><select id="Doctor" name="Doctor" style="width:100%; " >
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
            <td class="th"><label for="Tipo">Tipo de Paciente:</label></td> 
            <td><select id="Tipo" name="Tipo" style="width:100%; text-align: center;
                                                         text-align-last: center;
                                                         -moz-text-align-last: center;">
            	<?php
            	  echo '<option value="" </option>';
			      $sql="select * from lab_tipo_paciente where clase='B' order by descripcion ";
			      $query=odbc_exec($conection,$sql);
			      while ($result=odbc_fetch_array($query))
			          { 
                  if ($result['codigo']==1)
                  {
                      echo '<option value="'.$result['codigo'].'" selected>'.$result['descripcion'].'</option>';
                  }
                  else
                  {
                      echo '<option value="'.$result['codigo'].'">'.$result['descripcion'].'</option>';
                  }
                                        
			          }			
		        ?>        
				</select>
            </td>
          </tr>

          <tr class="Controls">
            <td class="th"><label for="Correo">Email:</label></td> 
            <td><input  name="correo" id="correo" class="Controls"  value="" style="width:98%; text-align: center;
                                                         text-align-last: center;
                                                         -moz-text-align-last: center;" ></td>
            
          </tr>
          
          <tr class="Controls">
            <td class="th"><label for="FormaPago">Forma de pago:</label></td> 
            <td><select id="FormaPago" name="FormaPago" style="width:100%; text-align: center;
                                                         text-align-last: center;
                                                         -moz-text-align-last: center;">
				          <option value="" selected></option>	            
			            <option value="efe">Efectivo</option>
                  <option value="tc">Tarjeta de crédito</option>
                  <option value="td">Tarjeta de debito</option>
				        </select></td>
				      <td></td>
          </tr>

 
<!--          <tr class="Controls">
            <td class="th"><label for="CitasCiudad">Ciudad:</label></td> 
            <td><select id="CiudadCit" name="CiudadCit">
            	<?php
//			      $sql="select * from lab_ciudad order by descripcion";
//			      $query=odbc_exec($conection,$sql);
//			      while ($result=odbc_fetch_array($query))
//			          {
//			        	echo '<option value="'.$result['codigo'].'">'.$result['descripcion'].'</option>';
//			          }			
		        ?>        
				</select>
            </td>
            <td></td>
          </tr>-->
 
<!--          <tr class="Controls">
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
          </tr>-->
          <tr class="Bottom">
            <table class="Header" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td> 
                <td class="th"><strong>Estudios</strong></td> 
                <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
              </tr>
            </table>
            <table height="150" cellpadding="0" cellspacing="0" class="Record">
                 <tr class="Controls">
                     <td><strong>Codigo</strong><input name="data[Examen][Codigo]"  onKeyPress = "Valida(event)" size="4" value="" type="text" id="ExamenCodigo" /><input type="button" value="+" onClick="buscarEstudio(); javascript: return false;" /></td>
                     <td>                     
                     <select name="ExamenCatalogo"  multiple="multiple" size="9" style="width: 250px;" id="ExamenCatalogo">
						   <?php
                      $sql="select * from caj_codigos_fonasa where activo='S' AND CODIGO_FONASA NOT LIKE 'ANTV%' order by CODIGO_FONASA ";
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
    <table align="center">
        <tr>
            <td align="center"><a class="button is-info is-outlined" onclick="Valida1()">
                Guardar
                </a></td>
            <!--<td><input type="image" src="img/icons/bguardatencion.jpg" onClick="Valida1()" /></td>-->
        </tr>
        
    </table>

<p>
  <!-- END Record Citas -->
</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp; </p>

</body>

</html>