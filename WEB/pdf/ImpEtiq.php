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
$sql="SELECT     fecha, hora, numero, numero_registro, rut, usuario_creacion, nombre_usuario, anos, NOMBRE_DOCTOR, FechaTomaMuestra, 
                      FechaRecepcionMuestra, EstadoTomaMuestra, EstadoRecepcionMuestra, HoraRecepcionMuestra, FECHA_REGISTRO, idpaciente, ori_pac, 
                      tipo_de_urgencia, ObsTomaMuestra, descripcion, rut_paciente, nombre, apellidos, sexo, telefono, fecha_nacimiento, prevision, contraindicaciones, 
                      PROCEDENCIA_MUESTRA, folio_host, num_cama
FROM         SISTEMA_TOMA_MUESTRAS_PACIENTE
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
    
