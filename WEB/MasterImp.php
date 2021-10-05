<?php
session_start();
$examenes=$_SESSION['examenes'];
$idPaciente=$_POST['i'];
require('FPDF/fpdf.php');
define ('FPDF_FONTPATH','FPDF/font/');
class PDF extends FPDF
{
protected $col = 0; // Columna actual
protected $y0;      // Ordenada de comienzo de la columna

    function encabezado(){
		$nombre=$_POST['nombrePaciente'];
		$doctor=$_GET['doc'];
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
		$this->WriteText("NOMBRE DEL PACIENTE:".$nombre,10,10,'B',12,'Arial',false);
		$this->WriteText("NOMBRE DEL DOCTOR:".$doctor,10,6,'B',12,'Arial',false);
		$x1=5;
		$x2=200;
		$y1=$this->GetY();
		$this->Line($x1,  $y1,  $x2, $y1);
    }
    function Header()
    {    
        
        $this->encabezado();
        
        // $this->Image('images/logo_laboratorio.jpeg',10,5,40,0,'JPEG');
        // Guardar ordenada
        $this->y0 = $this->GetY();
    }

    function Footer()
    {
		
		$this->SetY(-15);
        $this->WriteText(utf8_decode('Q.F.B. Gerardo Salas Fernández'),140,0,'',10,'Arial',false);
		$this->SetY(-11);
		$this->WriteText('UNE D.G.P. Num.2530411',145,0,'',10,'Arial',false);
		$this->SetY(-7);
		$this->WriteText('S.S. 20303',160,0,'',10,'Arial',false);
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
        $this->Cell(0,6,$label,0,10,'',true);
        $this->Ln(0);
        // Guardar ordenada
        $this->y0 = $this->GetY();
    }

    function ChapterConten($llave,$idPaciente)
    {
        $this->WriteText('glucosa',5,6,'',10,'Arial',false);
        $this->WriteText('urea',5,6,'',10,'Arial',false);
    }

    function ChapterBody($examenes,$idPaciente)
    {
        // Fuente
        $this->SetFont('Times','',12);
        $this->SetX(90);
        $x=count($examenes);
        $this->Ln(8);
        $this->WriteText($x,9,6,'',10,'Arial',false);
        
        for ($i=0; $i <$x ; $i++) { 
            //nombre del estudio
            $this->ChapterTitle($examenes[$i]['nombre']);
            //pruebas en el estudio
            $this->ChapterConten($examenes[$i]['llave'],$idPaciente);
        }
        
        
    }

    function PrintChapter($title, $examenes,$idPaciente)
    {
        // Añadir capítulo

        $this->ChapterBody($examenes,$idPaciente);
        
    }
}

$pdf = new PDF();

$pdf->SetAuthor('MSLAB');
//descomponer el array de los estudios
$pdf->AddPage();
//$pdf->WriteText($examenes,10,6,'',10,'Arial',false);

$examen=explode(",",$examenes);
$y=$pdf->GetY();
$pdf->SetY($y+5);

$pdf->PrintChapter($title,$examenes,$idPaciente);

$pdf->Output();

?>
