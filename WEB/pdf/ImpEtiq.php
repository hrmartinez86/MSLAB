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
$folios=str_pad($num, 6, "0", STR_PAD_LEFT);
$folio=$cod.$folios; 
$folios=$cod.$folios; 
$i=0;
$curva=$_GET['curva'];
$opcion=$_GET['option'];
$nopciones=count($opcion);
$sql="select df.numero_registro,df.fecha,dp.nombre,dp.apellidos,df.anos,lrp.cod_llave,ccf.codigo_corto,dp.sexo,pm.descripcion as PROCEDENCIA_MUESTRA
from dat_paciente dp
INNER JOIN dat_dfipa df on df.rut=dp.rut
INNER JOIN caj_det_prestaciones cdp on cdp.idpaciente=df.idpaciente 
INNER JOIN lab_relac_fonasa_perfil lrfp on lrfp.llave_fonasa=cdp.llave_fonasa
INNER JOIN caj_codigos_fonasa ccf on ccf.llave_fonasa=lrfp.llave_fonasa
INNER JOIN lab_RLS_perfiles lrp on lrp.llave_perfil=lrfp.llave_perfil
INNER JOIN procedencia_muestra pm on pm.id=df.procedencia_muestra
WHERE     (numero = '".$folio."')";
 $query=odbc_exec($conection,$sql);  
    //  echo $sql;  
while ($result=odbc_fetch_array($query))
{
	$nombre=$result['nombre'];
	$apellidos=$result['apellidos'];
	$fecha=explode(" ", $result['fecha']);
	$fx=explode("-",$fecha[0]);
	$fecha_ingreso=$fx[2]."/".$fx[1]."/".$fx[0]." ".$result['hora']." Sx:".$result['sexo']." Ed:".$result['anos'];
	//$fecha_ingreso=$fecha[0]." ".$result['hora'];
	$proc=$result['PROCEDENCIA_MUESTRA'];
	$idpac=$result['idpaciente'];
	$folios=str_pad($result['numero_registro'],3,"0",STR_PAD_LEFT);
	
	$folio=str_pad($result['numero_registro'],3,"0",STR_PAD_LEFT);
}
			       
$cont=$_GET['numero'];

$a=$folios;
$n=$nombre;
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
		$m=$result['COD_MUESTRA'];
		
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
    
