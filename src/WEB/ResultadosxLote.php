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
<title>**IMPRESION POR LOTE**</title>

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
<script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
<script language="javascript" type="text/javascript" src="js/mambo2.js"></script>
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></LINK>
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
  <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.11.2/css/bootstrap-select.min.css'>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/js/bootstrap-select.min.js"></script>
</head>
<body>
 
<!-- BEGIN Record Citas -->
<?php include("Header.html")?>
<br></br>

<form target="_blank" id="Citas" method="get" name="Citas" action="MasterImpxlote.php">
  <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>Impresion por Lote</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
          </tr>
        </table>
 
        <table height="150" cellpadding="0" cellspacing="0" class="Record">
          <tr class="Controls">
         <td>Fecha Inicial: </td>
         <td><input id="" required value="<?php echo $fecha;?>"  type="date"  name="theDate"></td>
         
          <tr class="Controls">
             
            <td>Fecha Final: </td><td><input id="Fecha" required value="<?php echo $fecha;?>" type="date" name="theDate2"></td>
            
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
          
          
            </table>
            
     
            </table>
            <input type="button" class="btn btn-primary" value='Enviar' onClick="validar3()" >
</form>



</body>

</html>