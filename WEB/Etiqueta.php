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
include ("../librerias/conection.php");
//include("librerias/control_citas.php");
$ODBC=$_SESSION["ODBC"];
$conection=conectar($ODBC);
require('../librerias/code39.php');
$cod=$_SESSION['empresa'];
$cod=str_pad($cod, 2, "0", STR_PAD_LEFT);
$num= $_GET['num'];
$folio=str_pad($num, 6, "0", STR_PAD_LEFT); 
$folio= $cod.$folio;
$sql="select df.numero_registro,df.fecha,dp.nombre,dp.apellidos,df.anos,lrp.cod_llave,ccf.codigo_corto,dp.sexo,pm.descripcion
from dat_paciente dp
INNER JOIN dat_dfipa df on df.rut=dp.rut
INNER JOIN caj_det_prestaciones cdp on cdp.idpaciente=df.idpaciente 
INNER JOIN lab_relac_fonasa_perfil lrfp on lrfp.llave_fonasa=cdp.llave_fonasa
INNER JOIN caj_codigos_fonasa ccf on ccf.llave_fonasa=lrfp.llave_fonasa
INNER JOIN lab_RLS_perfiles lrp on lrp.llave_perfil=lrfp.llave_perfil
INNER JOIN procedencia_muestra pm on pm.id=df.procedencia_muestra
  WHERE (NUMERO = '".$folio."')";
// echo $sql;
    	
    	$query=odbc_exec($conection,$sql);  
    // echo $sql;  
			      while ($result=odbc_fetch_array($query))
			          {
			        	$idpaciente=$result['IDPACIENTE'];
			        	$nombre=$result['NOMBRE']." ".$result['APELLIDOS'];
                $folio=str_pad($result['NUMERO_REGISTRO'],3,"0",STR_PAD_LEFT). '<br>' .date("d/m/Y");
			          }

?> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!--AQUI ES DONDE PONEMOS LA INFO PARA LA CAPTURA DE LOS ESTUDIOS "AUTOCOMPLETAR" -->

$a=$folios;
$n=$apellidos." ,".$nombre;
$pdf = new PDF_Code39('P','mm',array(50,20));

if($i<=0){
	$pdf->AddPage();
	///configuración de la impresión de la primera etiqueta (x,y)
	$pdf->Code39(0, 5, $a,$folios,$n,$fecha_ingreso,$proc,$i,$e,$m,$opcion[$t-1]);
	
}
	
	for($t=1;$t<=$nopciones;$t++){
	$i=$i+1;
	$a= $opcion[$t-1].$folio;

	$sql="EXECUTE CODIGOS_ETIQUETAS @CODBARRAS = '".$opcion[$t-1]."', @IDPACIENTE = '".$idpac."'";
	$query=odbc_exec($conection,$sql);  
	// echo $sql;
	while ($result=odbc_fetch_array($query))
	{
		$m=$result['GRUPO_MUESTRAS'];
		
		if ($comp != $result['codigo_fonasa']){		
			$e=$result['codigo_fonasa'].",".$e;
			$comp=$result['codigo_fonasa'];
		}
		else
		{
			$comp=$result['codigo_fonasa'];
			$e=$result['codigo_fonasa'];}
		}
		$comp='';
			       
		$pdf->AddPage();
             if ($opcion[$t-1]==00) 
	    {$pdf->Code39(0, 5, $a,$folios,$n,$fecha_ingreso,$proc,$i,$e,$m,$opcion[$t-1]);}
             else
             if($opcion[$t-1]==31)
             {$pdf->Code39(0, 5, $a,$folios,$n,$fecha_ingreso,$proc,$i,$e,$m,$opcion[$t-1]);}
              else
            {$pdf->Code39(0, 5, $a,$folios,$n,$fecha_ingreso,$proc,$i,$e,$m,$opcion[$t-1]);}
	    $e='';
		}
	


$pdf->Output();
?>
    
