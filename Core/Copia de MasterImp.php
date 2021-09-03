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
$Y=50;

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
    //Iniciaci�n de variables
    $this->B=0;
    $this->I=0;
    $this->U=0;
    $this->HREF='';
}

function WriteHTML($html)
{
    //Int�rprete de HTML
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



//Cabecera de p�gina


function Header()
{

	$exa=50;
	$exa2=14;
	$ODBC=$_SESSION["ODBC"];
 		
            
	$link=conectar($ODBC);		
	$var=variables();
	$varia=explode ("@",$var);
/*
	$datos=Headers($varia[0],$varia[1],$varia[3],$varia[2],$link);
	
	
	for ($i=0;$i<3;$i++)
	{
		if ($datos[1][$i][0]=="" or $datos[1][$i][1]==NULL)
		{
			$this->SetXY($datos[1][$i][1],$datos[1][$i][2] + 9);
			$this->SetFont("Arial",'',$datos[1][$i][3]); // $VL_Est
			$this->Cell(0,0,$datos[1][$i][4],0,0,1);
		}
		else
		{
			$this->SetXY($datos[1][$i][1],$datos[1][$i][2] + 9);
			$this->SetFont("Arial",'',$datos[1][$i][3]); // $VL_Est
			$this->Cell(0,0,$datos[1][$i][4],0,0,1);
			$this->Image($datos[1][$i][7],$datos[1][$i][5]+5,$datos[1][$i][6]+9,$datos[1][$i][8]-6,$datos[1][$i][9]);
		}
		
	}*/

$I_Info=Header2($varia[0],$varia[1],$varia[3],$varia[2],$link);
//////////////////////////////////////////////////////////////////////////////////////////////////
$html='<U>                                                                                                                                                                                                </U>';

for ($i=0;$i<count($I_Info);$i++)
{
		
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
			$this->Cell(0,0,$I_Info[$i]['Info'],0,0,1,'S');
		}
		$this->SetXY(8,$exa+3);	
		$this->SetFont("Arial",'',8);
		$this->Cell(0,0,"EXAMEN",0,0,1,'');
		$this->SetXY(77,$exa);	
		$this->SetFont("Arial",'',8);
		$this->Cell(0,0,"RESULTADO",0,0,1,'');
		$this->SetXY(108,$exa);	
		$this->SetFont("Arial",'',8);
		$this->Cell(0,0,"UNIDAD",0,0,1,'S');
		$this->SetXY(130,$exa);	
		$this->SetFont("Arial",'',8);
		$this->Cell(0,0,"VALOR DE REFERENCIA",0,0,1,'S');
		$this->SetXY(3,$exa);
		$this->SetLeftMargin(1);
		$this->SetFontSize(10);
		$this->WriteHTML($html);

}
//////////////////////////////////////////////////////////////////////////////////////////////////

}
//Pie de p�gina
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

//Creaci�n del objeto de la clase heredada
#$pdf=new PDF('P','mm','Letter');
$pdf=new PDF();
$pdf->SetTitle('Sistema WEB');
$pdf->SetAuthor('Nestor I. Aguilar Estrada');
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
	if ($new_page=='S')
	{
		$pdf->AddPage();
		$num=0;
	}
	
	#print_r($I_In);
	for($i=0;$i<count($I_In);$i++)
	{

		if ($I_In[$i]["Imp_Sola"]=='S'  or $fonasa[$x]==53 or $fonasa[$x]==40)
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
				$pdf->SetFont("Arial",'',$I_In[$i]['Tamano']); // $VL_Est
				$pdf->Cell(0,0,$I_In[$i]['Info'],0,0,'C');
				#echo $I_In[$i]['Info']."<br>";
				$pdf->Ln(4);
			}
			else 
			{

				if ($linea2==$I_In[$i]['Linea'])
				{
					if ($linea==$I_In[$i]['Salto'])
					{	
						$pdf->SetFont("Arial",'',$I_In[$i]['Tamano']); // $VL_Est
						$pdf->SetX($I_In[$i]['X']);
						$pdf->Cell(0,0,$I_In[$i]['Info'],0);

						
					}
					else
					{

					$pdf->Ln(4);
					$pdf->SetFont("Arial",'',$I_In[$i]['Tamano']); // $VL_Est
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
							$pdf->SetFont("Arial",'B',$I_In[$i]['Tamano']); // $VL_Est
							$pdf->SetX($I_In[$i]['X']);
							$pdf->Cell(0,0,$I_In[$i]['Info'],0);	

						}
						else
						{
							$pdf->Ln(4);
							$pdf->SetFont("Arial",'',$I_In[$i]['Tamano']); // $VL_Est
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
	if ($ds==30)
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
$Y=50;
/****************************************************************************************************************************************************************/	
for($i=0;$i<count($I_In2[$k]);$i++)
	{
		$numero=$I_In2[$k][$i]['cuenta'];

	/*****************************************************************************************************/
			if ($I_In2[$k][$i]['Linea']==0)
			{		
				
				$pdf->SetXY($I_In2[$k][$i]['X'],$Y+10);
				$pdf->SetFont("Arial",'',$I_In2[$k][$i]['Tamano']); // $VL_Est
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
						$pdf->SetFont("Arial",'',$I_In2[$k][$i]['Tamano']); // $VL_Est
						$pdf->SetX($I_In2[$k][$i]['X']);
						$pdf->Cell(0,0,$I_In2[$k][$i]['Info'],0);
					}
					else
					{
						##IMPRIME ALGUNOS ENCABEZADOS
					$pdf->Ln(4);
					$pdf->SetFont("Arial",'',$I_In2[$k][$i]['Tamano']); // $VL_Est
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
							$pdf->SetFont("Arial",'B',$I_In2[$k][$i]['Tamano']); // $VL_Est
							$pdf->SetX($I_In2[$k][$i]['X']);
							$pdf->Cell(0,0,$I_In2[$k][$i]['Info'],0);	
													}
						else
						{
							$pdf->Ln(4);
							$pdf->SetFont("Arial",'',$I_In2[$k][$i]['Tamano']); // $VL_Est
							$pdf->SetX($I_In2[$k][$i]['X']);
							$pdf->Cell(0,0,$I_In2[$k][$i]['Info'],0);	
							
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
