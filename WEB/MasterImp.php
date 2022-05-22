<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
$examenes=$_POST['lf'];
$examenesCodigo=$_POST['llave'];
$examenesDescripcion=$_POST['descripcion_'];

// echo $examenesCodigo;
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
    function divide($fechaAtencion)
    {
        $fh=explode(" ",$fechaAtencion);
        $fd=explode("-",$fh[0]);
        $fecha=$fd[2].'/'.$fd[1].'/'.$fd[0];
        return $fecha;
    }
    function encabezado($imagen,$anchoPagina){
        
        if ($imagen==TRUE) {
            $this->Image('marco.jpg',0,0,220,0,'','');
            $x1=10;          
        }
        else
        {
            $x1=20;   
        }

        $x2=200;

        $this->Ln(50);
		$nombre=$_POST['nombrePaciente'];
        $edad=$_POST['anos'];
        $sexo=$_POST['sexo'];
        $expediente=$_POST['expediente'];
		$doctor=$_POST['doc'];
        $procedencia=$_POST['procedencia'];
        $numero=$_POST['folioPaciente'];
        $fecha=$this->divide($_POST['fecha']);
        $diagnostico=$_POST['diagnostico'];
        //fuentes
        $fontTitle='Arial';
        $fontSizeTitle=11;
        $font='Arial';
        $fontSize=8;

        $this->WriteText("Paciente:",$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($nombre,$x1+30,3,'B',$fontSize,$font,false,false);
        $this->WriteText("Edad:",$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($edad,$x1+30,3,'B',$fontSize,$font,false,false);
        $this->WriteText("Sexo:",$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($sexo,$x1+30,3,'B',$fontSize,$font,false,false);
        $this->WriteText("Fecha:",$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($fecha,$x1+30,3,'B',$fontSize,$font,false,false);
        $this->WriteText("Expediente:",$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($expediente,$x1+30,3,'B',$fontSize,$font,false,false);
        $this->WriteText("Doctor:",$x1,0,'B',$fontSize,$font,false,false);	
        $this->WriteText($doctor,$x1+30,3,'B',$fontSize,$font,false,false);
        $this->WriteText('Procedencia:',$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($procedencia,$x1+30,5,'B',$fontSize,$font,false,false);
        
        $this->Ln(5);
        
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
        // Go to 1.5 cm from bottom
    $this->SetY(-35);
    // Select Arial italic 8
    // $this->SetFont('Arial','',8);
    // $responsableSanitario=utf8_decode('RESPONSABLE SANITARIO:Q.F.B. José Justiano Sánchez Hernández R.F.C. SAHJ580905EM1 Ced. Prof. No. 871857 U.A.P.');
    // $direccion=utf8_decode('Av. Lerdo de Tejada No. 19 2do. Piso 202 Secc. 2da. Zacatelco;Tlaxcala Teléfono (246) 497 0588                      E-Mail: lasines@prodigy.net.mx');
    // $telefono=utf8_decode('Tel. Celular: (246) 116 9861 / (246) 101 0155                                   Urgencias Tel.:(246) 497 2619');
    // $this->Cell(0,10,$responsableSanitario,0,0,'L');
    // $y=$this->GetY()+10;
    // $this->SetLineWidth(1);
    // $this->Line(10,$y,192,$y);
    // $this->SetY(-25);
    // $this->Cell(0,10,$direccion,0,0,'L');   
    // $this->SetY(-20);
    // $this->Cell(0,10,$telefono,0,0,'L');   
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
    function evaluaLen($text,$cant)
    {
        $arrTotl=array();
        $arrTot='';
        if(strlen($text)>$cant)
        {
            // echo strlen($text);
            // echo '<br>'.$text;
            $arryRes=explode(" ",$text);
            $arrTot="";
            foreach ($arryRes as $l) {
                // echo $l."<br>";
                $x=strlen($l);
                $y=strlen($arrTot);
                if(($x+$y)<=$cant)
                {
                    $arrTot=$arrTot . " " .$l;
                    // echo $arrTot."<br>";
                }
                else
                {
                    $arrayTotl[0]=$arrTot;
                    $arrayTotl[1]=$l;
                }

                
            }
        }
        // var_dump($arrayTotl);
        return $arrTotl;
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
        $font='Arial';
        $fontSize=9;
        $fontTitle=$font;
        $fontSizeTitle=16;

        if ($imagen==TRUE) {
            $inicioIMp=10;
        }
        else
        {
            $inicioIMp=20;
        }
        $this->SetFont($fontTitle,'B',$fontSizeTitle);
        // $this->SetFillColor(208,211,212);
        // $this->Cell(0,$inicioIMp,$label,0,5,'B',false);
        $y=$this->GetY();
        $this->SetY($y-15);
        $this->WriteText($label,120,20,'B',$fontSizeTitle,$fontTitle,false,false);
        
        $this->Ln(1);

        $y1=$this->GetY();
		// $this->Line($inicioIMp,  $y1,  200, $y1);

        $this->WriteText('',$anchoPagina,2,'',$fontSize,$font,false,false);
        $this->WriteText('EXAMEN',$inicioIMp,0,'B',$fontSize,$font,false,false);
        $this->WriteText('RESULTADOS',80,0,'B',$fontSize,$font,false,false);
        $this->WriteText('VALOR DE REFERENCIA',140,6,'B',$fontSize,$font,false,false);
        
        $this->Ln(2);
        // Guardar ordenada
        $this->y0 = $this->GetY();
    }
    
    function evaluarHoja($cantidad,$posicionY)
    {
        $pasa=false;
        $total=$cantidad+$posicionY;
        if ($total>220) {
            $pasa=false;
        }
        else{
            $pasa=true;
        }
        return $pasa;
    }

    function ChapterConten($llave,$examArray,$imagen)
    {
        
        if ($imagen==TRUE) {
            $xRes=10;
        }
        else
        {
            $xRes=20;
        }
        $font='Arial';
        $sizeFont=8;
        $interLine=0;
        $interLinell=5;
        $xResVal=85;
        $xUM=110;
        $xRT=140;
        $xVd=140;
        // var_dump($examArray);
        for ($i=0;$i<count($examArray);$i++)
        {
            if($examArray[$i]['Res']!=''){
                // $linesName=$this->evaluaLen($examArray[$i]['Info'],30);
                // foreach ($linesName as $line) {
                //     $this->WriteText($line,$xRes,$interLine,'',$sizeFont,$font,false,false);
                //     $this->Ln(5);
                // }
                $this->WriteText($examArray[$i]['Info'],$xRes,$interLine,'',$sizeFont,$font,false,false);
                
                
                if ($examArray[$i]['rt']!="") {
                    $this->WriteText($examArray[$i]['rt'],$xRT,$interLine,'',$sizeFont,$font,false,false);
                }
                else
                {
                    $umV=utf8_encode($examArray[$i]['um']);
                    
                    $this->WriteText(number_format($examArray[$i]['vd'],2) ." - ".number_format($examArray[$i]['vh'],2)." " . 
                    $umV,
                    $xVd,$interLine,'',$sizeFont,$font,false,false);
                    
                }
                
                $this->WriteText($examArray[$i]['Res'],$xResVal,$interLine,'',$sizeFont,$font,false,false);
 
                $this->Ln($interLinell);
                //evaluamos si cuenta con un metodo
                if ($examArray[$i]['metodo']!="") {
                    $this->WriteText($examArray[$i]['metodo'],10,$interLine,'',$sizeFont,$font,false,false);
                    $this->Ln($interLinell);
                }
                else{
                    $this->Ln($interLinell);
                }
            }
        }
        $metodo=metodo($llave);
        if ($metodo!=""){
            $this->WriteText(metodo($llave),$xRes,5,'B',8,$font,false,true);
        }
        $nota=nota($llave);
        if ($nota!=""){
            $this->WriteText($nota ,$xRes,0,'',11,$font,false,true);
        }

        $this->Ln(5);
    }

    function ChapterBody($examenes,$idPaciente,$anchoPagina,$imagen,$examenesDescripcion)
    {
        // Fuente
        $this->SetFont('Times','',12);
        $this->SetX(5);

        $evalua=true;
        if($evalua==true){
            $cod=explode(",",$examenes);
            $desc=explode(",",$examenesDescripcion);
            $x=count($cod);

            for ($i=0; $i <$x ; $i++) { 
                $examArray=resultados($cod[$i],$idPaciente);

                //evaluar el tamaño de la hoja
                if ($this->evaluarHoja(count($examArray),$this->GetY())==false) {
                    $this->AddPage();
                }
                //nombre del estudio
                $this->ChapterTitle($desc[$i],$anchoPagina,$imagen);
                //pruebas en el estudio
                $this->ChapterConten($cod[$i],$examArray,$imagen);
            }
        }
       
        $this->Ln(1);
        
    }

    function PrintChapter($title, $examenes,$idPaciente,$imagen,$examenesDescripcion)
    {
        // Añadir capítulo
        $anchoPagina=1;
        $this->ChapterBody($examenes,$idPaciente,$anchoPagina,$imagen,$examenesDescripcion);
        
    }
}

$pdf = new PDF();

$pdf->SetAuthor('MSLAB');
//descomponer el array de los estudios
$pdf->AddPage();
// $pdf->WriteText($examenes,10,6,'',10,$font,false,false);
// $examen=explode(",",$examenes);
$y=$pdf->GetY();
$pdf->SetY($y);

$pdf->PrintChapter($title,$examenes,$idPaciente,$imagen,$examenesDescripcion);

$pdf->Output();

?>
