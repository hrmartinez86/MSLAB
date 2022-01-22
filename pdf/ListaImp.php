<?php
session_start();
header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado']=="ok" ) {
    
        } else {
     
          header("Location: index.php"); 
          echo "<html></html>";
        }

include ("../WEB/librerias/conection.php");
			$ODBC=$_SESSION["ODBC"];
            $conection=conectar($ODBC);        
require('fpdf.php');

class PDF extends FPDF
{
//Cabecera de p�gina
function Header()
{
    $ODBC=$_SESSION["ODBC"];
    $conection=conectar($ODBC); 
	$infocon=$_GET['FI'];
	global $fin;
	global $ini;
	global $sec;
	global $tipo;
	global $proc;
	$f=explode("-",$infocon);
    $ini=$f[2]."/".$f[1]."/".$f[0];
    $ffin=$_GET['FF'];
	$f=explode("-",$ffin);
    $fin=$f[2]."/".$f[1]."/".$f[0];
    $sec=$_GET['Seccion'];
	$tipo=$_GET['Tipo'];
    $proc=$_GET['Procedencia'];
	//Para las Seccion
    if($sec!='')
    {
    $sql="select lab_secciones.descripcion AS Seccion from lab_relacion_laboratorio_seccion INNER JOIN lab_secciones ON lab_relacion_laboratorio_seccion.seccion = lab_secciones.codigo where cod_llave='".$sec."'";
     $query=odbc_exec($conection,$sql);  
    // echo $sql;  
			      while ($result=odbc_fetch_array($query))
			          {
			        	$sec_d=$result['Seccion'];
			          }
    }
    else
    {$sec_d="Todos";}
    //Para el tipo
    if($tipo!='')
    {
    $sql="select descripcion AS Tipo from lab_tipo_paciente where codigo='".$tipo."'";
     $query=odbc_exec($conection,$sql);  
    // echo $sql;  
			      while ($result=odbc_fetch_array($query))
			          {
			        	$tipo_d=$result['Tipo'];
			          }
    }
    else
    {$tipo_d="Todos";}	
    //Para Procedencia
      if($proc!='')
    {
    $sql="select descripcion AS Procedencia from procedencia_muestra where id=".$proc;
     $query=odbc_exec($conection,$sql);  
     //echo $sql;
      
			      while ($result=odbc_fetch_array($query))
			          {
			        	$proc_d=$result['Procedencia'];
			          }
    }
    
    else
    {
    	$proc=0;
    	$proc_d="Todos";
    }					
    //Logo
    //$this->Image('../images/globulos.jpg',10,8,33);
    //Arial bold 15
    $this->Cell(140);
	$this->SetFont('Arial','B',5);
    $this->Cell(50,10,'MSLAB',0,0,'R');
    
    $this->Ln(2);
    $this->Cell(140);
    $fecha=date("d , M, y,  H:i a");
    $this->Cell(50,10,$fecha,0,0,'R');
    //Movernos a la derecha
    $this->Ln(10);
    //T�tulo
    $this->Cell(80);
    $fon=14;
    $this->SetFont('Arial','B',$fon);
    $this->Cell(30,10,'Lista de Trabajo',0,0,'C');
    
    $this->Ln(5);
    $this->Cell(80);
    
    $this->SetFont('Arial','B',8);
    $this->Cell(30,10,'Desde '.$ini.' Hasta '.$fin,0,0,'C');
    
    $this->Ln(5);
    $this->Cell(80);
    
    $this->Cell(30,10,'Tipo de Paciente:'.$tipo_d,0,0,'C');
    
    $this->Ln(5);
    $this->Cell(80);
    
    $this->Cell(30,10,'Procedencia de Muestra:'.$proc_d,0,0,'C');
    //Salto de l�nea
    $this->Ln(5);
    
   // $this->SetX(10);
    //$this->Cell(30,10,"Nombre",0,0,'C');
$this->Ln(10);
}

//Pie de p�gina
function Footer()
{
    //Posici�n: a 1,5 cm del final
    $this->SetY(-15);
    //Arial italic 8
    $this->SetFont('Arial','',6);
    //N�mero de p�gina
    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'R');
}
}

//Creaci�n del objeto de la clase heredada
$pdf=new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',8);
$sql="execute LISTA_DE_TRABAJO_WEB @TIPO='".$tipo."',@PROCEDENCIA=".$proc.",@SECCION='".$sec."',@FECHA_DESDE='".$ini."',@FECHA_HASTA='".$fin."'";
$query=odbc_exec($conection,$sql); 

$i=0;
$estudios="";
$impSeccion=false;
while ($result=odbc_fetch_array($query))
    {
        if($seccion != $result['cod_llave']&&$seccion!='')
        {
            $pdf->AddPage();
            $impSeccion=false;
        }
        
        if ($impSeccion==false) {

            $pdf->SetFont('Arial','B',14);

            $pdf->Cell(0,0,$result['seccion'],0,0,'C',false,'');
            $pdf->SetX(5);
            
            $pdf->SetFont('Arial','',11);
            
            $pdf->Cell(0,10,"Folio",0,0);
            
            $pdf->SetX(23);
            
            $pdf->Cell(0,10,"Nombre Completo",0,0);
            $pdf->SetX(80);
            
            $pdf->Cell(0,10,"Tipo de Paciente",0,0);
            
            $pdf->SetX(120);
            
            $pdf->Cell(0,10,"Procedencia de Muestra",0,0);

            $pdf->Ln(5);

            $impSeccion=true;
        }
        
        $seccion=$result['cod_llave'];
        
        $pdf->Ln(5);
        
        $pdf->SetFont('Arial','',9);

        $paciente[$i]=$result['idpaciente'];

        if ($paciente[$i-1]!=$result['idpaciente'])
        {
            $pdf->SetX(0);	
            $pdf->Cell(0,0,"____________________________________________________________________________________________________________________",0,0);	
            $pdf->SetX(10);	
            $pdf->Cell(0,0,$result['numero_registro'],0,0);
            $pdf->SetX(24);
            $pdf->Cell(0,0,$result['nombre'],0,0);

            $pdf->SetX(80);
            $pdf->Cell(0,0,$result['tipo_paciente'],0,0);

            $pdf->SetX(120);
            $pdf->Cell(0,0,$result['procedencia'],0,0);

            $pdf->SetX(170);
            $pdf->Cell(0,0,$result['Estudio']."_________",0,0); 
            $pdf->Ln(5);
        }
        $i++;
        $pdf->Ln(5);
        
    
}

    $pdf->Output();
?>