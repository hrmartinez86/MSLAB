<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
$examenes=$_POST['lf'];
$examenesCodigo=$_POST['llave'];
$examenesDescripcion=$_POST['descripcion_'];

// echo $examenesCodigo;
$idPaciente=$_POST['i'];
// $imagen=$_POST['logos'];
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
        
        if ($_POST['logos']) {
            $this->Image('.\images\SantaInes.jpg',0,0,220,0,'','');
            $x1=2;          
        }
        else
        {
            $x1=2;   
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
        $fontSize=10;

        $this->WriteText("Paciente:",$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($nombre,$x1+30,3,'B',$fontSize,$font,false,false);
        $this->WriteText("Edad:",$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($edad,$x1+30,3,'B',$fontSize,$font,false,false);
        $this->WriteText("Sexo:",$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($sexo,$x1+30,3,'B',$fontSize,$font,false,false);
        $this->WriteText("Fecha:",$x1,0,'B',$fontSize,$font,false,false);
        $this->WriteText($fecha,$x1+30,3,'B',$fontSize,$font,false,false);
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
    $this->SetY(-35);

    // evalua si se va a imprimir el pie de pagina
    if ($_POST['logos']) {
        //recuperamos el footer del paciente
        $idPaciente=$_POST['i'];
        $piePagina=detallePiePagina($idPaciente);
        $this->SetFont('Arial','',8);
        $responsableSanitario=$piePagina[0]['responsable_sanitario'];
        $direccion=$piePagina[0]['direccion'];
        $telefono=$piePagina[0]['telefono1'];
        $this->Cell(0,10,$responsableSanitario,0,0,'L');
        $y=$this->GetY()+10;
        $this->SetLineWidth(1);
        $this->Line(10,$y,192,$y);
        $this->SetY(-25);
        $this->Cell(0,10,$direccion,0,0,'L');   
        $this->SetY(-20);
        $this->Cell(0,10,$telefono,0,0,'L');   
    }
    
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
            $this->MultiCell(0,4.5,$text,0,'J',0);
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
                        $this->Cell(0, 0,$texto, 0, 0);
                        $texto='';
                    }
                }
            }
            else
            {
                $this->Cell(0,0,$text,0,0);
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

    function ChapterTitle($label,$anchoPagina,$imagen,$detalleEstudio)
    {
        $font='Arial';
        $fontSize=10;
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
        ///obtenemos el dato de 
        if ($detalleEstudio[0]['imprimir_nombre_perfil']=='S') {
            $this->WriteText('',$anchoPagina,2,'',$fontSize,$font,false,false);
            $this->WriteText('EXAMEN',$inicioIMp,0,'B',$fontSize,$font,false,false);
            $this->WriteText('RESULTADOS',80,0,'B',$fontSize,$font,false,false);
            $this->WriteText('UNIDADES',130,0,'B',$fontSize,$font,false,false);
            $this->WriteText('REFERENCIA',180,6,'B',$fontSize,$font,false,false);  
        }
        
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
        
        $xRes=2;
        $font='Arial';
        $sizeFont=10;
        $interLine=0;
        $interLinell=3;
        $xResVal=85;
        $xUM=130;
        $xRT=170;
        $xVd=80;
        // $yResultado=$this->GetY();
        // $this->WriteText($yResultado,$xRes+40,$interLine,'B',$sizeFont,$font,false,false);
        // var_dump($examArray);
        $numeroPruebas=count($examArray);

        if ($numeroPruebas<10&&!$_POST['mediaCarta']) {
            # code...
            $interLinell=10;
        }

        for ($i=0;$i<count($examArray);$i++)
        {   
            
            // $this->WriteText(count($examArray),$xRes,$interLine,'B',$sizeFont,$font,false,false);
            // $yResultado=$this->GetY();
            // $this->WriteText($yResultado,$xRes+40,$interLine,'B',$sizeFont,$font,false,false);
            ///EVALUAMOS EL TIPO DE RENGLON
            if ($examArray[$i]['x']==0) {
                $xRes=2;
                $xResVal=85;
                $xUM=132;
                $xRT=180;
                $xMetodo=4;
            }
            if ($examArray[$i]['x']<>0) {
                $xRes=+$examArray[$i]['x']-$xVd;
                $xResVal=+$examArray[$i]['x']-$xVd+80;
                $xMetodo=+$examArray[$i]['x']-$xVd+4;
            }
            if ($examArray[$i]['xr']<>0) {
                $xResVal=$examArray[$i]['xr'];
            }
            if ($examArray[$i]['y']<>0) {
                $this->SetY($examArray[$i]['y']);
            }
            if ($examArray[$i]['tipo']=='S') {
                ///imprimimos el subtitulo
                $this->WriteText($examArray[$i]['Info'],$xRes,$interLine,'B',$sizeFont+2,$font,false,false);
                $this->Ln($interLinell);
                //evaluamos si cuenta con un metodo
                if ($examArray[$i]['metodo']!="") {
                    // $metodoCorreccion=utf8_encode($examArray[$i]['metodo']);
                    $metodoCorreccion=$examArray[$i]['metodo'];
                    $this->WriteText($metodoCorreccion,$xMetodo,$interLine,'B',8,$font,false,false);
                    $this->Ln($interLinell+2);
                }
            }
            else
            if($examArray[$i]['Res']!=''){

                $this->WriteText($examArray[$i]['Info'],$xRes,$interLine,'',$sizeFont,$font,false,false);
                
                ///rangos
                if ($examArray[$i]['rt']!="") {
                    $this->WriteText($examArray[$i]['rt'],$xRT,$interLine,'B',$sizeFont,$font,false,false);
                }
                if ($examArray[$i]['um']!="") {
                    $this->WriteText($examArray[$i]['um'],$xUM,$interLine,'B',$sizeFont,$font,false,false);
                }
                
                // else
                // {
                //     $umV=utf8_encode($examArray[$i]['um']);
                    
                //     $this->WriteText(number_format($examArray[$i]['vd'],2) ." - ".number_format($examArray[$i]['vh'],2)." " . 
                //     $umV,
                //     $xVd,$interLine,'',$sizeFont,$font,false,false);
                    
                // }
                $this->WriteText($examArray[$i]['Res'],$xResVal,$interLine,'',$sizeFont,$font,false,false);
 
                $this->Ln($interLinell);
                //evaluamos si cuenta con un metodo
                if ($examArray[$i]['metodo']!="") {
                    $metodoCorreccion=utf8_encode($examArray[$i]['metodo']);
                    $this->WriteText($metodoCorreccion,4,$interLine,'B',8,$font,false,false);
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
                // if ($this->evaluarHoja(count($examArray),$this->GetY())==false) {
                if ($i>0) {
                    $this->AddPage();
                } 
                // }
                //nombre del estudio $desc[$i]
                //obtenemos el detalle del estudio
                $detalleEstudio=DetalleEstudios($cod[$i]);
                $this->ChapterTitle($desc[$i],$anchoPagina,$imagen,$detalleEstudio);
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

//tamaño de hoja normal
if ($_POST['mediaCarta']) {
    $pdf = new PDF('L','mm',array(200,270));
}
else
{
    $pdf = new PDF('P','mm','Letter');
}
//CARTA

//MEDIA CARTA
// $pdf = new PDF('L','mm',array(200,270));

$pdf->SetAuthor('MSLAB');
//descomponer el array de los estudios
$pdf->AddPage();
// $pdf->WriteText($_POST['mediaCarta'],10,6,'',10,$font,false,false);
// $pdf->WriteText($_POST['logos'],10,6,'',10,$font,false,false);
// $pdf->WriteText($examenes,10,6,'',10,$font,false,false);
// $examen=explode(",",$examenes);
$y=$pdf->GetY();
$pdf->SetY($y);

$pdf->PrintChapter($title,$examenes,$idPaciente,$imagen,$examenesDescripcion);

$pdf->Output();

?>
