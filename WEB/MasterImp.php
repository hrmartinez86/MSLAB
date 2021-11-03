<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
$examenes=$_SESSION['examenes'];
$idPaciente=$_POST['i'];
$imagen=$_POST['imagen'];

require('FPDF/fpdf.php');
require('modules/consultas.php');
include("librerias/conection.php");
define ('FPDF_FONTPATH','FPDF/font/');
class PDF extends FPDF
{
protected $col = 0; // Columna actual
protected $y0;      // Ordenada de comienzo de la columna

    function encabezado($imagen,$anchoPagina){
        
        if ($imagen==TRUE) {
            $this->Image('marco.jpg',0,0,220,0,'','');
            $x1=10;
            $x2=200;
            
        }
        else
        {
            $x1=5;
            $x2=200;
            
        }
        $this->Ln(10);
		$nombre=$_POST['nombrePaciente'];
		$doctor=$_POST['doc'];
        $procedencia=$_POST['procedencia'];
        $numero=$_POST['folioPaciente'];
        $fecha=$_POST['fecha'];
        $this->WriteText('LABORATORIO SALAS FERNANDEZ',$anchoPagina,5,'B',13,'Arial',true,false);
        $this->WriteText('QUIMICO RESPONSABLE',$anchoPagina,5,'',8,'Arial',true,false);
        $this->WriteText('Q.F.B. GERARDO SALAS FERNANDEZ',$anchoPagina,5,'B',8,'Arial',true,false);
        $this->WriteText('Emilio Carranza No.208 Ote.Zona Centro Cd. Madero,Tam.',$anchoPagina,5,'',8,'Arial',true,false);
        $this->WriteText('C.P. 89400 Tel. 2-10-22-98 y 2-15-01-82',$anchoPagina,5,'',8,'Arial',true,false);
        $this->WriteText('RFC.SAFG-7200203-IM0 UNE D.G.P. Num. 2530411',$anchoPagina,5,'',8,'Arial',true,false);
        
        $diassemana = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
        $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        $this->WriteText('',180,6,'',8,'Arial',false,false);

        $this->WriteText($numero,160,6,'B',8,'Arial',false,false);
        
        $hoy=utf8_decode($diassemana[date('w')])." ".date('d')." de ".$meses[date('n')-1]. " del ".date('Y') . " " . date('g:ia') ;
        $hoy=utf8_decode('Fecha de Atención:'.$fecha);
        $this->WriteText($hoy,125,6,'',8,'Arial',false,false);
        
		$this->WriteText("NOMBRE DEL PACIENTE:".utf8_decode($nombre),10,10,'B',8,'Arial',false,false);
		$this->WriteText("NOMBRE DEL DOCTOR:".utf8_decode($doctor),10,0,'B',8,'Arial',false,false);
        $this->WriteText($procedencia,130,5,'B',8,'Arial',false,false);
        $y1=$this->GetY();
		$this->Line($x1,  $y1,  $x2, $y1);

    }
    function Header()
    {    
        $anchoPagina=210;
        $imagen=$_POST['imagen'];
        $this->encabezado($imagen,$anchoPagina);
        $this->y0 = $this->GetY();
    }

    function Footer()
    {
		

    }

    function SetCol($col)
    {
        // Establecer la posición de una columna dada
        $this->col = $col;
        $x = 10+$col*65;
        $this->SetLeftMargin($x);
        $this->SetX($x);
    }

    function WriteText($text,$wth,$s,$font1,$font2,$font3,$center,$mul)
    {
        $this->SetFont($font3,$font1,$font2);
        if($center){
            $w = $this->GetStringWidth($text)+6;
            $this->SetX(($wth-$w)/2);
        }
        else{
            $this->SetX($wth);
        }
        if ($mul) {
            $this->MultiCell(0,4.5,utf8_decode($text),0,'J',0);
        }
        else
        {
            $this->Cell(0,0,$text,0,0);
        }
        
        $this->Ln($s);
    }

    function AcceptPageBreak()
    {
        // Método que acepta o no el salto autom�tico de p�gina
        if($this->col<2)
        {
            // Ir a la siguiente columna
            $this->SetCol($this->col+1);
            // Establecer la ordenada al principio
            $this->SetY($this->y0);
            // Seguir en esta p�gina
            return false;
        }
        else
        {
            // Volver a la primera columna
            $this->SetCol(0);
            // Salto de p�gina
            return true;
        }
    }

    function ChapterTitle($label,$anchoPagina,$imagen)
    {
        if ($imagen==TRUE) {
            $inicioIMp=10;
        }
        else
        {
            $inicioImpresion=5;
        }
        $this->SetFont('Arial','',8);
        // $this->SetFillColor(208,211,212);
        $this->Cell(0,$inicioIMp,$label,0,10,'B',false);
        $this->WriteText('',$anchoPagina,2,'',8,'Arial',false,false);
        $this->WriteText('NOMBRE DEL EXAMEN',$inicioIMp,0,'B',8,'Arial',false,false);
        $this->WriteText('RESULTADOS',80,0,'B',8,'Arial',false,false);
        $this->WriteText('VALOR DE REFERENCIA',140,6,'B',8,'Arial',false,false);
        
        // Guardar ordenada
        $this->y0 = $this->GetY();
    }

    function ChapterConten($llave,$idPaciente,$imagen)
    {
        
        if ($imagen==TRUE) {
            $xRes=10;
        }
        else
        {
            $xRes=5;
        }
        $examArray=resultados($llave,$idPaciente);

        for ($i=0;$i<count($examArray);$i++)
        {
            if($examArray[$i]['Res']!=''){
                $this->WriteText(utf8_decode($examArray[$i]['Info']),$xRes,0,'',8,'Arial',false,false);
                $this->WriteText(utf8_decode($examArray[$i]['um']),140,0,'',8,'Arial',false,false);
                if ($examArray[$i]['rt']!="") {
                    $this->WriteText($examArray[$i]['rt'],140,0,'',8,'Arial',false,false);
                }
                else
                {
                    $this->WriteText($examArray[$i]['vd']." - ".$examArray[$i]['vh'],160,0,'',8,'Arial',false,false);
                }
                
                $this->WriteText($examArray[$i]['Res'],80,0,'',8,'Arial',false,false);
 
                $this->Ln(4);
            }
        }
        $metodo=metodo($llave);
        if ($metodo!=""){
            $this->WriteText(metodo($llave),$xRes,5,'B',8,'Arial',false,true);
        }
        $nota=nota($llave);
        if ($nota!=""){
            $this->WriteText($nota ,$xRes,0,'',6,'Arial',false,true);
        }
    }

    function ChapterBody($examenes,$idPaciente,$anchoPagina,$imagen)
    {
        // Fuente
        $this->SetFont('Times','',8);
        $this->SetX(90);
        $x=count($examenes);
        $this->Ln(1);
        // $this->WriteText($x,9,6,'',10,'Arial',false,false);
        
        for ($i=0; $i <$x ; $i++) { 
            //nombre del estudio
            $this->ChapterTitle($examenes[$i]['nombre'],$anchoPagina,$imagen);
            //pruebas en el estudio
            $this->ChapterConten($examenes[$i]['llave'],$idPaciente,$imagen);
        }
        
        
    }

    function PrintChapter($title, $examenes,$idPaciente,$imagen)
    {
        // Añadir capítulo
        $anchoPagina=210;
        $this->ChapterBody($examenes,$idPaciente,$anchoPagina,$imagen);
        
    }
}

$pdf = new PDF();

$pdf->SetAuthor('MSLAB');
//descomponer el array de los estudios
$pdf->AddPage();
//$pdf->WriteText($examenes,10,6,'',10,'Arial',false,false);

$examen=explode(",",$examenes);
$y=$pdf->GetY();
$pdf->SetY($y);

$pdf->PrintChapter($title,$examenes,$idPaciente,$imagen);

$pdf->Output();

?>
