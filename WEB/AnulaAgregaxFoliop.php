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
$sql="SELECT     dat_dfipa.numero, dat_dfipa.idpaciente,caj_det_prestaciones.llave_fonasa, dat_paciente.nombre as NOMBRE, dat_paciente.apellidos as APELLIDOS, caj_codigos_fonasa.codigo_fonasa
FROM         dat_dfipa INNER JOIN
                      caj_det_prestaciones ON dat_dfipa.idpaciente = caj_det_prestaciones.idpaciente INNER JOIN
                      dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN
                      caj_codigos_fonasa ON caj_det_prestaciones.llave_fonasa = caj_codigos_fonasa.llave_fonasa
WHERE     (dat_dfipa.idpaciente = '".$_GET['id']."')";
$examenes=0;
    	
    	$query=odbc_exec($conection,$sql);  
    // echo $sql;  
			      while ($result=odbc_fetch_array($query))
			          {
			        	$exa[$examenes]=$result["codigo_fonasa"];
			        	$examenes=$examenes+1;
			        	$idpaciente=$result['idpaciente'];
			        	$nombre=$result['NOMBRE']." ".$result['APELLIDOS'];
			        	$folio=$result['numero'];
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
<script language="javascript" type="text/javascript" src="js/mambo2.js"></script>
<meta content="text/html; charset=windows-1252" http-equiv="content-type">
<title>**Agregar Quitar Estudios**</title>
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

<br></br>
<input id="folio" type="hidden" value="<?php echo $folio;?>" ></input>
<input id="idpaciente" type="hidden" value="<?php echo $idpaciente;?>" ></input>

<br></br>
<table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Folio:</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td>
            <td class="th" ><strong><?php echo $folio;?></strong></td> 
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
        <form id="Citas" method="post" name="Citas" action="">
<table class="Header" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="HeaderLeft"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td> 
                <td class="th"><strong>Estudios</strong></td> 
                <td class="HeaderRight"><img border="0" alt="" src="Styles/INFOLAB/Images/Spacer.gif"></td>
              </tr>
            </table>
            <table height="200" cellpadding="0" cellspacing="0" class="Record">
                 <tr class="Controls">
                     <td><strong>Codigo</strong><input name="data[Examen][Codigo]"  onKeyPress = "Valida(event)" size="4" value="" type="text" id="ExamenCodigo" /><input type="button" value="+" onClick="buscarEstudio(); javascript: return false;" /></td>
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
</form>
</body>

</html>