<?php
session_start();
require('modules/consultas.php');
$nombre=$_POST['nombrePaciente'];
$examenes_=$_POST['examenesCuenta'];
$examenes=explode(",",$examenes_);
$nota=$_POST['notaCuenta'];
$pendiente=$_POST['pendienteCuenta'];
$total=$_POST['totalCuenta'];
$adelanto=$_POST['adelantoCuenta'];
$fp=$_POST['fpCuenta'];
$fe=$_POST['feCuenta'];
$he=$_POST['heCuenta'];
$nombre=$_POST['nombrePaciente'];
$examenes_=$_POST['examenesCuenta'];
$examenes=explode(",",$examenes_);
$nota=$_POST['notaCuenta'];
$pendiente=$_POST['pendienteCuenta'];
$total=$_POST['totalCuenta'];
$adelanto=$_POST['adelantoCuenta'];
$fp=$_POST['fpCuenta'];
if ($fp!='') {
    
    switch ($fp) {
        case 'efe':
            $fp="Efectivo";
            break;
            case 'tc':
                $fp="Tarjeta de crédito";
                break;
                case 'td':
                    $fp="Tarjeta de debito";
                    break;
                    default:
                    $fp="";
                    break;
                }}
                // echo $fp;
                $fe=$_POST['feCuenta'];
                $he=$_POST['heCuenta'];
                require('FPDF/fpdf.php');
                define ('FPDF_FONTPATH','FPDF/font/');
                class PDF extends FPDF
                {
                    protected $col = 0; // Columna actual
                    protected $y0;      // Ordenada de comienzo de la columna
                    
                    function encabezado(){
                        $idPaciente=$_POST['idPaciente'];
                        $centroPagina=310;
                        $extremoDerecho=200;
                        $this->WriteText('LABORATORIO CLINICO SANTA INES.',$centroPagina,5,'B',13,'Arial',true);
                        // $this->WriteText('QUIMICO RESPONSABLE',210,5,'',10,'Arial',true);
                        // $this->WriteText('Q.F.B.  .',210,5,'B',10,'Arial',true);
                        // $encabezado=detallePiePagina($idPaciente);
                        $this->WriteText('Av. Lerdo de Tejada No. 19 2do. Piso 202 Secc. 2da. Zacatelco;',$centroPagina,5,'',10,'Arial',true);
                        $this->WriteText(utf8_decode('Tlaxcala Teléfono (246) 497 0588 E-Mail: lasines@prodigy.net.mx'),$centroPagina,5,'',10,'Arial',true);
                        // $this->WriteText('',210,5,'',10,'Arial',true);
                        $numero=$_POST['numeroCuenta'];
                        $diassemana = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
                        $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
                        // $this->WriteText('',210,6,'',10,'Arial',false);
                        $this->WriteText('Folio:'.str_pad($numero,3,"0",STR_PAD_LEFT),$extremoDerecho,6,'B',12,'Arial',false);
                        if (isset($_POST['fechaIngreso'])) {
                            
                            $hoy=date("d/m/Y",strtotime($_POST['fechaIngreso']));   
                            $xx=155; 
                            // echo $hoy;
                        }
                        else
                        {
                            $hoy=utf8_decode($diassemana[date('w')])." ".date('d')." de ".$meses[date('n')-1]. " del ".date('Y') . " " . date('g:ia') ;
                            $xx=130;
                        }
                        
                        $this->WriteText($hoy,$extremoDerecho,6,'',10,'Arial',false);
                        
                        
                    }
                    function Header()
                    {    
                        
                        
                        // echo $numero;
                        $this->encabezado();
                        // $this->Image('http://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=SoyUnDios&.png',20,20,20,20);
                        // $this->Image('images/QR.jpEg',10,5,40,0,'JPEG');
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
            //// se pone como limite de cadena 40 caracteres
            $this->WriteText(substr($x_value, 0, 40) ,10,8,'',10,'Arial',false);
        }
        
    }
    
    function ChapterCuenta($nota,$total,$adelanto,$pendiente,$fp,$fe,$he)
    {
        // Fuente
        $this->SetFont('Times','',12);
        if (isset($_POST['fechaIngreso'])) {
            $hoy=date("d/m/Y",strtotime($_POST['fechaIngreso'])); 
        }
        else
        {
            $hoy=date('d/m/Y g:ia');
        }
        if (isset($_POST['feCuenta'])) {
            $fe=date("d/m/Y",strtotime($_POST['feCuenta'])); 
        }
        $extremoDerecho=200;
        $this->WriteText('Fecha Ingreso:'.$hoy ,$extremoDerecho,8,'B',10,'Arial',false);
        $this->WriteText('Fecha Entrega:'.$fe ,$extremoDerecho,8,'B',10,'Arial',false);
        if ($fp!='') {
            $this->WriteText('Forma de pago:'.$fp ,$extremoDerecho,8,'B',10,'Arial',false);
        }
        $this->WriteText($nota ,$extremoDerecho,8,'B',18,'Arial',false);
        $this->WriteText("Total    :".$total ,$extremoDerecho,8,'B',15,'Arial',false);
        $this->WriteText("Anticipo :".$adelanto ,$extremoDerecho,8,'B',13,'Arial',false);
        $this->WriteText("Restante :".$pendiente ,$extremoDerecho,8,'B',13,'Arial',false);
    }
    
    function PrintChapter($title, $examenes,$nota,$total,$adelanto,$pendiente,$y,$fp,$fe,$he)
    {
        // Añadir capítulo
        
        $this->ChapterTitle($title);
        $this->ChapterBody($examenes);
        $this->SetY($y);
        $this->ChapterCuenta($nota,$total,$adelanto,$pendiente,$fp,$fe,$he);
        
    }
}
$pdf = new PDF('L','mm',array(200,270));
//tamaño media carta
$pdf->SetAuthor('MSLAB');
$pdf->AddPage();
$pdf->PrintChapter($nombre,$examenes,$nota,$total,$adelanto,$pendiente,70,$fp,$fe,$he);
$pdf->SetY(160);
$pdf->Output();
?>

