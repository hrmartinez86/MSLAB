<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
$examenes=$_SESSION['examenes'];
$idPaciente=$_POST['i'];
require('FPDF/fpdf.php');
require('modules/consultas.php');
include("librerias/conection.php");
define ('FPDF_FONTPATH','FPDF/font/');
class PDF extends FPDF
{
protected $col = 0; // Columna actual
protected $y0;      // Ordenada de comienzo de la columna

    function encabezado($nombre,$doctor,$procedencia,$fecha,$numero){
        $this->Ln(10);

        $this->WriteText('LABORATORIO SALAS FERNANDEZ',210,5,'B',13,'Arial',true,false);
        $this->WriteText('QUIMICO RESPONSABLE',210,5,'',8,'Arial',true,false);
        $this->WriteText('Q.F.B. GERARDO SALAS FERNANDEZ',210,5,'B',8,'Arial',true,false);
        $this->WriteText('Emilio Carranza No.208 Ote.Zona Centro Cd. Madero,Tam.',210,5,'',8,'Arial',true,false);
        $this->WriteText('C.P. 89400 Tel. 2-10-22-98 y 2-15-01-82',210,5,'',8,'Arial',true,false);
        $this->WriteText('RFC.SAFG-7200203-IM0 UNE D.G.P. Num. 2530411',210,5,'',8,'Arial',true,false);
        
        $diassemana = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
        $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        $this->WriteText('',200,6,'',8,'Arial',false,false);

        $this->WriteText($numero,160,6,'B',8,'Arial',false,false);

        $hoy=utf8_decode($diassemana[date('w',strtotime($fecha))])." ".date('d',strtotime($fecha))." de "
        .$meses[date('n',strtotime($fecha))-1]. " del ".date('Y',strtotime($fecha))  ;
        $this->WriteText($hoy,130,6,'',8,'Arial',false,false);
        
		$this->WriteText("NOMBRE DEL PACIENTE:".str_replace("?","Ñ",$nombre),10,10,'B',8,'Arial',false,false);
		$this->WriteText("NOMBRE DEL DOCTOR:".utf8_decode($doctor),10,0,'B',8,'Arial',false,false);
        $this->WriteText($procedencia,130,5,'B',8,'Arial',false,false);
		$x1=5;
		$x2=200;
		$y1=$this->GetY();
		$this->Line($x1,  $y1,  $x2, $y1);

    }
    function Header()
    {    
        
        // $this->encabezado();
        
        // $this->Image('images/logo_laboratorio.jpeg',10,5,40,0,'JPEG');
        // Guardar ordenada
        $this->y0 = $this->GetY();
    }

    function Footer()
    {
		
		$this->SetY(-15);
        $this->WriteText(utf8_decode('Q.F.B. Gerardo Salas Fernández'),140,0,'',8,'Arial',false,false);
		$this->SetY(-11);
		$this->WriteText('UNE D.G.P. Num.2530411',145,0,'',8,'Arial',false,false);
		$this->SetY(-7);
		$this->WriteText('S.S. 20303',160,0,'',8,'Arial',false,false);
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
            $find=';';
            $sep=strpos($text,$find);
            if($sep>0)
            {
                ///vemos las porciones a imprimir
                $porciones = explode(";", $text);
                            
                for ($xxx = 0; $xxx < 100; $xxx++) 
                {   
                    if ($porciones[$xxx]!='')
                    {
                        $texto=$porciones[$xxx];
                        if ($xxx>0)
                        {
                        $this->Ln(4);
                        }
                        $this->setX(80);
                        $this->Cell(0, 0, utf8_decode($texto), 0, 0);
                        $texto='';
                    }
                }
            }
            else
            {
                $this->Cell(0,0,utf8_decode($text),0,0);
            }
            
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

    function ChapterTitle($label)
    {
        $this->SetFont('Arial','',8);
        // $this->SetFillColor(208,211,212);
        $this->Cell(0,6,$label,0,10,'B',false);
        $this->WriteText('',210,2,'',8,'Arial',false,false);
        $this->WriteText('NOMBRE DEL EXAMEN',5,0,'B',8,'Arial',false,false);
        $this->WriteText('RESULTADOS',80,0,'B',8,'Arial',false,false);
        $this->WriteText('VALOR DE REFERENCIA',140,6,'B',8,'Arial',false,false);
        
        // Guardar ordenada
        $this->y0 = $this->GetY();
    }

    function ChapterConten($llave,$idPaciente)
    {
        
        $examArray=resultados($llave,$idPaciente);
        // $this->WriteText(count($examArray),15,6,'',10,'Arial',false,false);
        for ($i=0;$i<count($examArray);$i++)
        {
            if($examArray[$i]['Res']!=''){
                $this->WriteText(utf8_decode($examArray[$i]['Info']),5,0,'',8,'Arial',false,false);
                $this->WriteText(utf8_decode($examArray[$i]['um']),140,0,'',8,'Arial',false,false);
                if ($examArray[$i]['rt']!="") {
                    $this->WriteText($examArray[$i]['rt'],140,0,'',8,'Arial',false,false);
                }
                else
                {
                    $this->WriteText($examArray[$i]['vd']." - ".$examArray[$i]['vh'],160,0,'',8,'Arial',false,false);
                }
                // $resultado=$examArray[$i]['Res'];
                // $longitud=strlen($resultado);
                // if ($longitud>40)
                // {
                //     // echo "<script> console.log('superior');</script>";
                //     $arr_res=str_split($resultado,40);
                //     for ($i=0; $i < count($arr_res); $i++) { 
                //         $this->WriteText($arr_res[$i],80,0,'',8,'Arial',false,false);
                //         $this->Ln(4);
                //         // echo "<script> console.log('".$i."-".$arr_res[$i]."');</script>";
                //     }
                // }
                // else{
                    $this->WriteText($examArray[$i]['Res'],80,0,'',8,'Arial',false,false);
                // }
                
                
                
                $this->Ln(4);
            }
        }
        $metodo=metodo($llave);
        if ($metodo!=""){
            $this->WriteText(metodo($llave),5,5,'B',8,'Arial',false,true);
        }
        $nota=nota($llave);
        if ($nota!=""){
            $this->WriteText($nota ,5,0,'',6,'Arial',false,true);
        }
    }

    function ChapterBody($examenes,$idPaciente)
    {
        // Fuente
        $this->SetFont('Times','',8);
        $this->SetX(90);
        $x=count($examenes);
        $this->Ln(1);
        $this->WriteText($x,9,6,'',10,'Arial',false,false);
        var_dump($examenes);
        echo "_".$idPaciente;
        echo '<br>';
        echo $x;
        echo $examenes[0]['llave'];
        for ($i=0; $i <$x ; $i++) { 
            //nombre del estudio
            echo $examenes[$i]['nombre'];
            $this->ChapterTitle($examenes[$i]['nombre']);
            //pruebas en el estudio
            $this->ChapterConten($examenes[$i]['llave'],$idPaciente);
        }
        
        
    }

    function PrintChapter($examenes,$idPaciente)
    {
        // Añadir capítulo

        $this->ChapterBody($examenes,$idPaciente);
        
    }
}

$pdf = new PDF();

$pdf->SetAuthor('MSLAB');
//tomamos los parametros 
$fechaIni=$_GET['theDate'];
$fechaFin=$_GET['theDate2'];

$fecha_array = explode("-", $fechaIni);
$fechaIni=$fecha_array[2]."/". $fecha_array[1] ."/". $fecha_array[0];

$fecha_array_ = explode("-", $fechaFin);
$fechaFin=$fecha_array_[2]."/". $fecha_array_[1] ."/". $fecha_array_[0];


$procedencia=$_GET['CitasProcedencia'];
$tipo=$_GET['Tipo'];
$idspaciente=pacientes($fechaIni,$fechaFin,$tipo,$procedencia);
// var_dump($idspaciente);

for ($i=0; $i < count($idspaciente) ; $i++) { 
    if($idPacienteComp==$idspaciente[$i]['idpaciente'])
    {
        $pdf->ChapterTitle($idspaciente[$i]['nombre']);

        $pdf->ChapterConten($idspaciente[$i]['llave_fonasa'],$idspaciente[$i]['idpaciente']);
    }
    else
    {
        $idPacienteComp=$idspaciente[$i]['idpaciente'];

        $pdf->AddPage();

        $pdf->encabezado($idspaciente[$i]['nombrePaciente'],$idspaciente[$i]['doctor'],
        $idspaciente[$i]['procedencia'],$idspaciente[$i]['fecha'],str_pad($idspaciente[$i]['numero'],3,"0",STR_PAD_LEFT));

        $pdf->ChapterTitle($idspaciente[$i]['nombre']);

        $pdf->ChapterConten($idspaciente[$i]['llave_fonasa'],$idspaciente[$i]['idpaciente']);

    }
    
}

        

$pdf->Output();


?>
