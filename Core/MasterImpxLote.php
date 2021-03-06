<?php
session_start();
$nombre="prueba";
$examenes=array("2"=>"biometria");
require('FPDF/fpdf.php');
define ('FPDF_FONTPATH','FPDF/font/');
class PDF extends FPDF
{
protected $col = 0; // Columna actual
protected $y0;      // Ordenada de comienzo de la columna

    function encabezado(){
        $this->WriteText('LABORATORIO SALAS FERNANDEZ',210,5,'B',13,'Arial',true);
        $this->WriteText('QUIMICO RESPONSABLE',210,5,'',10,'Arial',true);
        $this->WriteText('Q.F.B. GERARDO SALAS FERNANDEZ',210,5,'B',10,'Arial',true);
        $this->WriteText('Emilio Carranza No.208 Ote.Zona Centro Cd. Madero,Tam.',210,5,'',10,'Arial',true);
        $this->WriteText('C.P. 89400 Tel. 2-10-22-98 y 2-15-01-82',210,5,'',10,'Arial',true);
        $this->WriteText('RFC.SAFG-7200203-IM0 UNE D.G.P. Num. 2530411',210,5,'',10,'Arial',true);
        
        $diassemana = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
        $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        $this->WriteText('',210,6,'',10,'Arial',false);
        
        $hoy=utf8_decode($diassemana[date('w')])." ".date('d')." de ".$meses[date('n')-1]. " del ".date('Y') . " " . date('g:ia') ;
        $this->WriteText($hoy,130,6,'',10,'Arial',false);

        
    }
    function Header()
    {    
        
        $this->encabezado();
        
        $this->Image('images/logo_laboratorio.jpeg',10,5,40,0,'JPEG');
        // Guardar ordenada
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

    function WriteText($text,$wth,$s,$font1,$font2,$font3,$center)
    {
        $this->SetFont($font3,$font1,$font2);
        if($center){
            $w = $this->GetStringWidth($text)+6;
            $this->SetX(($wth-$w)/2);
        }
        else{
            $this->SetX($wth);
        }
        $this->Cell(0,0,$text,0,0);
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

    function ChapterTitle($label)
    {
        $this->SetFont('Arial','',12);
        $this->SetFillColor(208,211,212);
        $this->Cell(0,6,"Nombre del paciente : $label",0,1,'C',true);
        $this->Ln(4);
        // Guardar ordenada
        $this->y0 = $this->GetY();
    }

    function ChapterBody($examenes)
    {
        // Fuente
        $this->SetFont('Times','',12);
        $this->SetX(90);
        $x=count($examenes);
        $this->Ln(8);
        
        foreach($examenes as $x => $x_value) {
            
            $this->WriteText($x_value ,40,8,'B',12,'Arial',false);

        }
        
    }

    function PrintChapter($title, $examenes)
    {
        // Añadir capítulo
        
        $this->ChapterTitle($title);
        $this->ChapterBody($examenes);
        
    }
}

$pdf = new PDF();

$pdf->SetAuthor('MSLAB');
$pdf->AddPage();
$pdf->Cell()
// $pdf->PrintChapter($nombre,$examenes);
// $pdf->SetY(140);
// $pdf->Image('images/logo_laboratorio.jpeg',10,135,40,0,'JPEG');
// $pdf->encabezado();
// $pdf->PrintChapter($nombre,$examenes);
// $pdf->SetY(160);
// $pdf->Output();
?>
