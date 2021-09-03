<?php
session_start();
define ('FPDF_FONTPATH','FPDF/font/');
require('fpdf153/fpdf.php');
include ("consultas.php");
include("librerias/conection.php");
set_time_limit(0);
$uno=0;
$h=0;
$ds=1;
$new_page='';
$numero=0;
$numer=1;
$lineas=0;
$new_prue=0;
$VL_UsuarioImprime = "Infoweb";
	$i=$_GET['i'];
	$lf=$_GET['lf'];
	$llave_fonasa=$_GET['llave'];
	$VL_IdPaciente = $i;  //$HTTP_GET_VARS["i"];
	$VL_LlaveFonasa = $lf; //$HTTP_GET_VARS["lf"];
	$VL_UsuarioImprime = "Infoweb";
	$VL_NumeroPcImprime = 200;
	//echo $llave_fonasa;
	$variables=$VL_IdPaciente."@".$llave_fonasa."@".$VL_UsuarioImprime."@".$VL_NumeroPcImprime;

$varia=explode ("@",$variables);

$cero=0;
$new=0;
$j=0;
$Y=40;

class PDF extends FPDF
{

var $B;
var $I;
var $U;
var $HREF;

function PDF($orientation='P',$unit='mm',$format='A4')
{
    //Llama al constructor de la clase padre
    $this->FPDF($orientation,$unit,$format);
    //Iniciación de variables
    $this->B=0;
    $this->I=0;
    $this->U=0;
    $this->HREF='';
}

function WriteHTML($html)
{
    //Intérprete de HTML
    $html=str_replace("\n",' ',$html);
    $a=preg_split('/<(.*)>/U',$html,-1,PREG_SPLIT_DELIM_CAPTURE);
    foreach($a as $i=>$e)
    {
        if($i%2==0)
        {
            //Text
            if($this->HREF)
                $this->PutLink($this->HREF,$e);
            else
                $this->Write(5,$e);
        }
        else
        {
            //Etiqueta
            if($e{0}=='/')
                $this->CloseTag(strtoupper(substr($e,1)));
            else
            {
                //Extraer atributos
                $a2=explode(' ',$e);
                $tag=strtoupper(array_shift($a2));
                $attr=array();
                foreach($a2 as $v)
                    if(ereg('^([^=]*)=["\']?([^"\']*)["\']?$',$v,$a3))
                        $attr[strtoupper($a3[1])]=$a3[2];
                $this->OpenTag($tag,$attr);
            }
        }
    }
}

function OpenTag($tag,$attr)
{
    //Etiqueta de apertura
    if($tag=='B' or $tag=='I' or $tag=='U')
        $this->SetStyle($tag,true);
    if($tag=='A')
        $this->HREF=$attr['HREF'];
    if($tag=='BR')
        $this->Ln(5);
}

function CloseTag($tag)
{
    //Etiqueta de cierre
    if($tag=='B' or $tag=='I' or $tag=='U')
        $this->SetStyle($tag,false);
    if($tag=='A')
        $this->HREF='';
}

function SetStyle($tag,$enable)
{
    //Modificar estilo y escoger la fuente correspondiente
    $this->$tag+=($enable ? 1 : -1);
    $style='';
    foreach(array('B','I','U') as $s)
        if($this->$s>0)
            $style.=$s;
    $this->SetFont('',$style);
}

function PutLink($URL,$txt)
{
    //Escribir un hiper-enlace
    $this->SetTextColor(0,0,255);
    $this->SetStyle('U',true);
    $this->Write(5,$txt,$URL);
    $this->SetStyle('U',false);
    $this->SetTextColor(0);
}



//Cabecera de página


function Header()
{

$exa=50;
	$exa2=14;
	$ODBC=$_SESSION["ODBC"];
 		
            
	$link=conectar($ODBC);	
	//$var=variables();
	//$varia=explode ("@",$var);
    
	
	$sql="";
	$sql="SELECT id_membrete FROM lab_imp_detalles_formatos WHERE nombre_formato = 'FORMATO MEXICO'";
	$consultas=odbc_exec($link,$sql);
	while ($result=odbc_fetch_array($consultas))
	{
		$id_membrete=$result['id_membrete'];
	}
	
	$sql_int="SELECT 
			*
		FROM 
			lab_imp_detalle_membrete 
		WHERE 
			Activo = 'S' and id_membrete=".$id_membrete;
	if ($ODBC=="ODBC_DELICIAS")
               {
		$this->SetY(0);
                }	
                ELSE
                 {
		$this->SetY(7);
                }	
		$consultss=	odbc_exec($link,$sql_int);
		$i=0;
	  while($result=odbc_fetch_array($consultss)) 
		   {
		   	$imagen=$result['imagen'];	
		    $etiqueta=$result['etiqueta'];
		    $tipoletra=$result['tipo_letra'];
		    $tamano=$result['tamano_letra'];
		    $xx=$result['coorX_etiqueta'];
		    $this->SetX($xx);
	        $this->SetFont('Arial','',$tamano);
            $this->Cell(0,0,$etiqueta,0,0,'L');
		    
		    $this->Ln(5);
		   }	
	


$I_Info=Header2($varia[0],$varia[1],$varia[3],$varia[2],$link);
//echo $varia[0];
//////////////////////////////////////////////////////////////////////////////////////////////////
$html='<U>                                                                                                                                                                                                </U>';

for ($i=0;$i<count($I_Info);$i++)
{
		//echo $I_Info;
		if (ereg("_____",$I_Info[$i]['Info']))
		{
			$this->SetXY($I_Info[$i]['X'],$I_Info[$i]['Y']+$exa2);
			$this->SetLeftMargin(1);
			$this->SetFontSize(10);
			$this->WriteHTML($html);
		}
		else
		{
			$this->SetXY($I_Info[$i]['X'],$I_Info[$i]['Y']+$exa2);
			$this->SetFont("Arial",'',$I_Info[$i]['Tamano']); // $VL_Est
			
			
			/////para la edad y fecha impresion
			////
			if ($I_Info[$i]['Info']=='Edad:')
			{
                            $fecha_nac=fecha_nac();	
                            $fx=explode(" ",$fecha_nac);
                            $fxa=explode("-",$fx[0]);
                            $fa=date("Y");

                            settype($fa, "integer");
                            settype($fxa[0], "integer");
                            $edad=$fa-$fxa[0];
                            $this->SetXY($I_Info[$i]['X']+13,$I_Info[$i]['Y']+$exa2);
                            $this->Cell(0,0," años",0,0,1,'S');
			}
			else
                        if ($I_Info[$i]['Info']=='Fecha Entrega:')
                        {
                            $F=fecha_resultado($_GET['i']);				
                            $this->SetXY($I_Info[$i]['X']+30,$I_Info[$i]['Y']+$exa2);
                            $this->Cell(0,0,'Fecha Entrega:'.$F,0,0,1,'S');
                        }
                        else
                        if ($I_Info[$i]['Info']=='Fecha Solicitud:')
                        {
                            $F=$_GET['i'];				
                            $this->SetXY($I_Info[$i]['X']-25,$I_Info[$i]['Y']+8);
                            $this->Cell(0,0,'Fecha Solicitud:',0,0,1,'S');
                            //$this->Cell(0,0,'xxxxx',0,0,1,'S');
                        }
                        else
                        if ($I_Info[$i]['Info']=='Expediente:')
                        {
                            $expediente=expediente($_GET['i']);
                            $this->SetXY($I_Info[$i]['X']+16,$I_Info[$i]['Y']+$exa2);
                            $this->Cell(0,0,'Expediente:'.$expediente,0,0,1,'S');
                        }
                    else {$this->Cell(0,0,$I_Info[$i]['Info'],0,0,1,'S');}
		}
                $this->Image('logo.png', 5, 5, 28, 0, 'PNG');

}
//////////////////////////////////////////////////////////////////////////////////////////////////

}
//Pie de página
function Footer()
{
	$this->SetFont("Arial","","8");
	session_start();
	$ODBC=$_SESSION["ODBC"];
    //$conection=conectar($ODBC);
	//$db_conn=conectar($ODBC);
	$link=conectar($ODBC);		
	$var=variables();
	$varia=explode ("@",$var);
	$datos=Foot($varia[0],$varia[1],$varia[3],$varia[2],$link);
	#print_r($datos);
	#echo "<br>".$datos[1][0][4];
	for ($i=0;$i<count($datos[1]);$i++)
	{
		if ($datos[1][$i][4]=="N" or $datos[1][$i][4]=="")
		{
				$this->SetXY($datos[1][$i][0],290-$datos[1][$i][1] );
				$this->SetFont("Arial",'',$datos[1][$i][3]); // $VL_Est
				$this->Cell(0,0,$datos[1][$i][3],0,0,1,'S');
		}
		else
		{
			$this->SetXY($datos[1][$i][0],290-$datos[1][$i][1]);
			$this->SetFont("Arial",'',$datos[1][$i][3]); // $VL_Est
			$this->Cell(0,0,$datos[1][$i][3],0,0,1,'S');
			$this->Image($datos[1][$i][5],$datos[1][$i][6],290-$datos[1][$i][7],$datos[1][$i][8],$datos[1][$i][9]);
			
		}
	}
}
}
	$i=$_GET['i'];
	$lf=$_GET['lf'];
	//echo $lf;
	$llave_fonasa=$_GET['llave'];
	$VL_IdPaciente = $i;  //$HTTP_GET_VARS["i"];
	$VL_LlaveFonasa = $lf; //$HTTP_GET_VARS["lf"];

//Creación del objeto de la clase heredada
#$pdf=new PDF('P','mm','Letter');
$pdf=new PDF();
$pdf->SetTitle('Resultado Web');
$pdf->SetAuthor('Hèctor Rubèn Martinez');
$pdf->AliasNbPages();
$pdf->AddPage();
$fonasa=explode("-",$varia[1]);

$cuentas=0;

for ($x=0;$x<=count($fonasa)-2;$x++)
{

	$va=$variables;
	$vaa=explode ("@",$va);
	$nombre=$vaa[2];
	$id_paciente=$vaa[0];
	$no_pc=$vaa[3];
	$I_In=bodys($id_paciente,$fonasa[$x],$nombre,$no_pc);
	$tot=$Y + count($I_In);
	if ($tot >= 220)
	{
		$Y=40;
		$pdf->AddPage();
	}
	if ($new_page=='S')
	{
		$Y=40;
		$pdf->AddPage();
		$num=0;
	}
	
	#print_r($I_In);
	for($i=0;$i<count($I_In);$i++)
	{

		if ($I_In[$i]["Imp_Sola"]=='S' )
		{
			    $I_In2[]=$I_In;
				$new_prue++;
				break;	
		}
		else
		{
		$cuentas=1;
		$numero=$I_In[$i]['cuenta'];

	/*****************************************************************************************************/
			if ($I_In[$i]['Linea']==0)
			{		
				
				$pdf->SetXY($I_In[$i]['X'],$Y+10);
				$pdf->SetFont("Arial",'',12);
                                if (strlen($I_In[$i]['Info'])>100)
                    {
                        
                        $por=strpos($I_In[$i]['Info'],';');
                        $pdf->SetXY(100,100);
                        $pdf->Cell(0, 0, $por, 0, 0);
                        if ($por>0)
                        {   
                            $porciones = explode(";", $I_In[$i]['Info']);
                            
                            for ($xxx = 0; $xxx < 100; $xxx++) 
                            {   
                                if ($porciones[$xxx]!='')
                                {
                                    $texto=$porciones[$xxx];
                                    if ($xxx>0)
                                    {
                                    $pdf->Ln(4);
                                    }
                                    $pdf->SetX($I_In[$i]['X']);
                                    $pdf->Cell(0, 0, $texto, 0, 0);
                                    $texto='';
                                }
                            }                        
                        }
                        else {
                            $porciones = explode(",", $I_In[$i]['Info']);
                            for ($xxx = 0; $xxx < 100; $xxx++) 
                            {   
                                if ($porciones[$xxx]!='')
                                {

                                        $texto=$porciones[$xxx];
                                        if ($xxx>0)
                                        {
                                        $pdf->Ln(4);
                                        }
                                        $pdf->SetX($I_In[$i]['X']);
                                        $pdf->Cell(0, 0, $texto, 0, 0);
                                        $texto='';


                                }

                            }
                        }
//                        $pdf->Cell(0, 0, substr($I_In[$i]['Info'], 0, 60), 0);
                    }
                    else
                    {
                        ////////IMPRIME EL NOMBRE DEL PERFIL
//                        $pdf->Cell(0, 0, $I_In[$i]['Info'], 0);
                    }// $VL_Est
//				$pdf->Cell(0,0,$I_In[$i]['Info'],0,0,'C');
				#echo $I_In[$i]['Info']."<br>";
				$pdf->Ln(4);
			}
			else 
			{

				if ($linea2==$I_In[$i]['Linea'])
				{
					if ($linea==$I_In[$i]['Salto'])
					{	
						$pdf->SetFont("Arial",'',12); // $VL_Est
						$pdf->SetX($I_In[$i]['X']);
                                                if (strlen($I_In[$i]['Info'])>10)
                    {
                        
                        $por=strpos($I_In[$i]['Info'],';');
//                        echo $por;
                        if ($por>0)
                        {   
                            $porciones = explode(";", $I_In[$i]['Info']);
                            
                            for ($xxx = 0; $xxx < 100; $xxx++) 
                            {   
                                if ($porciones[$xxx]!='')
                                {
                                    $texto=$porciones[$xxx];
                                    if ($xxx>0)
                                    {
                                    $pdf->Ln(4);
                                    }
                                    $pdf->SetX($I_In[$i]['X']);
                                    $pdf->Cell(0, 0, $texto, 0, 0);
                                    $texto='';
                                }
                            }                        
                        }
                        else {
                            $porciones = explode(",", $I_In[$i]['Info']);
                            for ($xxx = 0; $xxx < 100; $xxx++) 
                            {   
                                if ($porciones[$xxx]!='')
                                {

                                        $texto=$porciones[$xxx];
                                        if ($xxx>0)
                                        {
                                        $pdf->Ln(4);
                                        }
                                        $pdf->SetX($I_In[$i]['X']);
                                        $pdf->Cell(0, 0, $texto, 0, 0);
                                        $texto='';


                                }

                            }
                        }
//                        $pdf->Cell(0, 0, substr($I_In[$i]['Info'], 0, 60), 0);
                    }
                    else
                    {
                        $pdf->Cell(0, 0, $I_In[$i]['Info'], 0);
                    }
//						$pdf->Cell(0,0,$I_In[$i]['Info'],0);

						
					}
					else
					{

					$pdf->Ln(4);
					$pdf->SetFont("Arial",'',12); // $VL_Est
						$pdf->SetX($I_In[$i]['X']);
						$pdf->Cell(0,0,$I_In[$i]['Info'],0);	
						#echo $I_In[$i]['Info']."<br>";					
					}
					
				}
				else
				{
					if ($I_In[$i]['X']==5)
						{
							$pdf->Ln(4);
							$pdf->Ln(4);
							$pdf->SetFont("Arial",'B',12); // $VL_Est
							$pdf->SetX($I_In[$i]['X']);
							$pdf->Cell(0,0,$I_In[$i]['Info'],0);	

						}
						else
						{
							if ($fonasa[$x]==3224 || $fonasa[$x]==3225 || $fonasa[$x]==3226 || $fonasa[$x]==3227 || $fonasa[$x]==3228 || $fonasa[$x]==3229 || $fonasa[$x]==3230 || $fonasa[$x]==3231 ||$fonasa[$x]==3232)
                                                        {
                                                            $pdf->Ln(4);
                                                        }
 else {                                                         $pdf->Ln(4);
                                                                $pdf->Ln(4);
							}
                                                        
                                                        $pdf->SetFont("Arial",'',12); // $VL_Est
							$pdf->SetX($I_In[$i]['X']);
							$pdf->Cell(0,0,$I_In[$i]['Info'],0);							
						}
						
				}
			}
		/*****************************************************************************************************/
		$linea2=$I_In[$i]['Linea'];
		$linea=$I_In[$i]['Salto'];
		$j=$j+10;

		if ($I_In[$i]['Linea']<>$lineas)
		{
			$h++;	
			$ds++;
			$lineas=$I_In[$i]['Linea'];
		}
		}
		$new_page=$I_In[$i]['Imp_Sola'];
		
	}
	#$pdf->SetX(30);
	if ($ds==20)
	{
		#$pdf->Cell(0,0,$ds,0);
		$pdf->AddPage();
		$ds=0;
	}
	#$pdf->Cell(0,0,$ds,0);
	$Y=$pdf->GetY();
	$X=$pdf->GetX();
	$pdf->SetX(10);
	$uno=$uno+1;

}
for ($k=0;$k<$new_prue;$k++)
{
if ($uno>1)
{
	$pdf->AddPage();
}
$Y=40;
/****************************************************************************************************************************************************************/	
for($i=0;$i<count($I_In2[$k]);$i++)
	{
		$numero=$I_In2[$k][$i]['cuenta'];

	/*****************************************************************************************************/
			if ($I_In2[$k][$i]['Linea']==0)
			{		
				
				$pdf->SetXY($I_In2[$k][$i]['X'],$Y+10);
				$pdf->SetFont("Arial",'',12); // $VL_Est
				$pdf->Cell(0,0,$I_In2[$k][$i]['Info'],0,0,'C');
				#echo $I_In2[$k][$i]['Info']."<br>";
				$pdf->Ln(4);
			}
			else 
			{

				if ($linea2==$I_In2[$k][$i]['Linea'])
				{
				
					if ($linea==$I_In2[$k][$i]['Salto'])
					{	##IMPRIME LOS RANGOS Y LOS RESULTADOS
						$pdf->SetFont("Arial",'',12); // $VL_Est
						$pdf->SetX($I_In2[$k][$i]['X']);
						$pdf->Cell(0,0,$I_In2[$k][$i]['Info'],0);
					}
					else
					{
						##IMPRIME ALGUNOS ENCABEZADOS
					$pdf->Ln(4);
					$pdf->SetFont("Arial",'',12); // $VL_Est
						$pdf->SetX($I_In2[$k][$i]['X']);
						$pdf->Cell(0,0,$I_In2[$k][$i]['Info'],0);							
					}
				}
				else
				{
						if ($I_In2[$k][$i]['X']==5)
						{
							$pdf->Ln(4);
							$pdf->Ln(4);
							$pdf->SetFont("Arial",'B',12); // $VL_Est
							$pdf->SetX($I_In2[$k][$i]['X']);
							$pdf->Cell(0,0,$I_In2[$k][$i]['Info'],0);	
													}
						else
						{       
                                                        
                                                      if ($fonasa[$x]==3224 || $fonasa[$x]==3225 || $fonasa[$x]==3226 || $fonasa[$x]==3227 || $fonasa[$x]==3228 || $fonasa[$x]==3229 || $fonasa[$x]==3230 || $fonasa[$x]==3231 ||$fonasa[$x]==3232)
                                                        {
                                                            $pdf->Ln(4);
                                                        }
 else {                                                         $pdf->Ln(4);
                                                                $pdf->Ln(4);
							}
                                                        
                                                        $pdf->SetFont("Arial",'',12); // $VL_Est
							$pdf->SetX($I_In[$i]['X']);
							$pdf->Cell(0,0,$I_In[$i]['Info'],0);	
							
						}
				}
			}
		/*****************************************************************************************************/
		$linea2=$I_In2[$k][$i]['Linea'];
		$linea=$I_In2[$k][$i]['Salto'];
		$j=$j+5;

		if ($I_In2[$k][$i]['Linea']<>$lineas)
		{
			$h++;	
			$ds++;
			$lineas=$I_In2[$k][$i]['Linea'];
		}
		}
		#$new_page=$I_In2[$k][$i]['Imp_Sola'];
/****************************************************************************************************************************************************************/
}
$pdf->Output();
?>
