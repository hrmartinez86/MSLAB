<?php
/* Sistema WEB HosCar */
define ('FPDF_FONTPATH','font/');
require ('FPDF/fpdf.php');

function RetornaPosicionExacta($TamanoFuente = 0)
{
   Return $TamanoFuente/2.54;
}

include ('../Librerias/conection.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .
$db_conn=conectar();
#$Consulta = mssql_init("SISTEMA_WEB_RESULTADOS ", $db_conn);
$i=$_POST['i'];
$lf=$_POST['lf'];
$VL_IdPaciente = $i;  //$HTTP_GET_VARS["i"];
$VL_LlaveFonasa = $lf; //$HTTP_GET_VARS["lf"];
$VL_UsuarioImprime = "Infoweb";
$VL_NumeroPcImprime = 200;
/*mssql_bind($Consulta, "@X_IDPACIENTE", $VL_IdPaciente, SQLVARCHAR); 
mssql_bind($Consulta, "@X_LLAVE_FONASA", $VL_LlaveFonasa, SQLINT2); 
mssql_bind($Consulta, "@X_USUARIO_QUE_IMPRIME", , SQLVARCHAR); 
mssql_bind($Consulta, "@X_PC_QUE_IMPRIME", , SQLINT1); */
$Consulta="SISTEMA_WEB_RESULTADOS ".$VL_IdPaciente.",".$VL_LlaveFonasa.",".$VL_UsuarioImprime.",".$VL_NumeroPcImprime;
@$TMP_RecordSet = odbc_exec($db_conn,$Consulta); 
$var="";


#$sq1_web_result="SISTEMA_RESULTADOS_WEB ".$VL_IdPaciente;
#$exect= odbc_exec($db_conn,$sq1_web_result);
/*while ($ros=odbc_fetch_array($exect))
{
	#print_r( $ros['0']); echo ":---:";print_r($var); echo "<br>";
	if ($var<>$ros['LLAVE_FONASA'])
	{
		$var=$ros['LLAVE_FONASA'];
		echo $ros['LLAVE_FONASA']."  ".$i."<br>";	
	}
}

	/*Consulta a realizar*/
	#echo $VL_IdPaciente."  ".$VL_LlaveFonasa;
$sxql=	"SELECT * FROM TBL_Impresion WHERE I_IdPaciente = '".$VL_IdPaciente."' AND I_Llave_Fonasa = ".$VL_LlaveFonasa." AND (I_Informacion IS NOT NULL) AND ((I_Informacion <> '') OR I_Estilo = 'L') ORDER BY I_Estilo, I_Orden";

$query_result=odbc_exec($db_conn,$sxql) or 
	die ("ERROR: no se puede ejecutar la consulta");

$pdf=new FPDF('P','mm','Letter');
$pdf->SetTitle('Sistema InfoLAB 2008');
$pdf->SetAuthor('Lic. Nestor Ismael Aguilar Estrada');
$pdf->Open();
$pdf->AddPage();

$pdf->AddFont('Arial Narrow','','arialnarrow.php');
$pdf->AddFont('Verdana','','verdana.php');
$pdf->AddFont('Courier New','','couriernew.php');
$pdf->AddFont('Times New Roman','','Times.php');

// restaurar canal alfa .-
$pdf->Image("Imagenes/Logo_HosCar.png", 93,2);
$pdf->Image("Firmas/nombre_y_firma.png", 1,230);
$pdf->SetAlpha(1);

$pdf->SettextColor(0,0,0);

$VL_Texto="";
if (odbc_num_rows($query_result)!=0)
{
	$VL_Informacion = "";
	$VL_CoordenadaX1 = 0;
	$VL_CoordenadaY1 = 0;
	$VL_CoordenadaX2 = 0;
	$VL_CoordenadaY2  = 0;
	$VL_Negrita = "";
	$VL_Italica = "";
	$VL_Subrayada = "";
	$VL_Fuente = "";
	$VL_Tamano = 0;
	$VL_Estilo = "";
	$VL_EstiloImpresion = "";
	
	$VL_LineaPunteada = 0;
	$VL_ControldeLinea = 0;
	$VL_NumeroLinea = 0;
	$VL_NumeroSalto = 0;
	$VL_CoordenadaY1Actual = 0;
	$VL_FuenteActual = "Arial";
	$VL_TamanoActual = 0;
	$VL_TempCY = 0;
	$VL_NombreUsuarioFirma = "";
   while($result=odbc_fetch_array($query_result))
   {
	$VL_Informacion = trim(" ".$result["I_Informacion"]);
	if (!isset($result["I_CoordenadaX1"]))
		{
		$VL_CoordenadaX1 = 0;
		}
	else
		{
		$VL_CoordenadaX1 = $result["I_CoordenadaX1"];
		}

	if (!isset($result["I_CoordenadaY1"]))
		{
		$VL_CoordenadaY1 = 0;
		}
	else
		{
		$VL_CoordenadaY1 = $result["I_CoordenadaY1"];
		}

	$VL_CoordenadaX2 = $result["I_CoordenadaX2"];
	if (!isset($result["I_CoordenadaX2"]))
		{
		$VL_CoordenadaX2 = 0;
		}
	else
		{
		$VL_CoordenadaX2 = $result["I_CoordenadaX2"];
		}

	if (!isset($result["I_CoordenadaY2"]))
		{
		$VL_CoordenadaY2 = 0;
		}
	else
		{
		$VL_CoordenadaY2 = $result["I_CoordenadaY2"];
		}

	if (!isset($result["I_Negrita"]))
		{
		$VL_EstiloImpresion="";
		}
	else
		{
		if ($result["I_Negrita"]=="S")
			{
			$VL_EstiloImpresion = "";
			}
		else
			{
			$VL_EstiloImpresion="";
			}
		}

	if (!isset($result["I_Italica"]))
		{
		$VL_EstiloImpresion=$VL_EstiloImpresion."";
		}
	else
		{
		if ($result["I_Italica"]=="S")
			{
			$VL_EstiloImpresion=$VL_EstiloImpresion."I";
			}
		else
			{
			$VL_EstiloImpresion=$VL_EstiloImpresion."";
			}
		}

	if (!isset($result["I_Subrayada"]))
		{
		$VL_EstiloImpresion=$VL_EstiloImpresion."";
		}
	else
		{
		if ($result["I_Subrayada"]=="S")
			{
			$VL_EstiloImpresion=$VL_EstiloImpresion."U";
			}
		else
			{
			$VL_EstiloImpresion=$VL_EstiloImpresion."";
			}
		}

	//$VL_EstiloImpresion="";

	if (!isset($result["I_Fuente"]) or $result["I_Fuente"]=="" or !empty($result["I_Fuente"]))
		{
		$VL_Fuente = "Verdana";
		}
	else
		{
		$VL_Fuente = $result["I_Fuente"];
		}

	if (!isset($result["I_TamanoFuente"]))
		{
		$VL_Tamano = 0;
		}
	else
		{
		$VL_Tamano = $result["I_TamanoFuente"];
		}

	if (!isset($result["I_Estilo"]))
		{
		$VL_Estilo = "T";
		}
	else
		{
		$VL_Estilo = $result["I_Estilo"];
		}
	
	$VL_NumeroLinea = $result["I_NumeroLinea"];
	$VL_NumeroSalto = $result["I_NumeroSalto"];

	switch ($VL_Estilo) 
	{
		case "M":
			if ($VL_LineaPunteada == 0 and ereg("_____",$VL_Informacion))
			{
				$VL_CoordenadaY1 = $VL_CoordenadaY1;
				$VL_LineaPunteada = 1;
			}
			$pdf->SetXY($VL_CoordenadaX1,$VL_CoordenadaY1 + 12);
			$pdf->SetFont($VL_Fuente,'',$VL_Tamano); // $VL_EstiloImpresion
			$pdf->Cell(0,0,$VL_Informacion,0,0,1);
			$VL_CoordenadaY1Actual = $VL_CoordenadaY1 + 12;
			break; 
		case "L":
			$CX1 = 0;
			$CY1 = 0;
			$CX2 = 0;
			$CY2 = 0;

			if ($VL_CoordenadaY1 == $VL_CoordenadaY2) // Esta es una l�nea Horizontal
			{
				$CX1 = $VL_CoordenadaX1 - 46;
				$CY1 = $VL_CoordenadaY1 + 57;
				$CX2 = $VL_CoordenadaX1 - 46 + $VL_CoordenadaX2;
				$CY2 = $VL_CoordenadaY2 + 57;
			}
			else  // Esta es una l�nea Vertical
			{
				$CX1 = $VL_CoordenadaX1 - 46;
				$CY1 = $VL_CoordenadaY1 + 57;
				$CX2 = $VL_CoordenadaX1 - 46;
				$CY2 = $VL_CoordenadaY1 + 57 + $VL_CoordenadaY2;
			}
			$pdf->Line($CX1, $CY1, $CX2, $CY2);
			$pdf->SettextColor(0,0,0);
			$pdf->SetFont('Arial','',10); // $VL_EstiloImpresion
			$pdf->Cell(0,0,$VL_NombreUsuarioFirma."[".$CX1.",".$CY1."]-"."[".$CX2.",".$CY2."]",0,0,1);
			$pdf->SettextColor(250,250,250);
			break;
		case "E":
			$pdf->SetXY($VL_CoordenadaX1,$VL_CoordenadaY1 + 12);
			$pdf->SetFont($VL_Fuente,'',$VL_Tamano); // $VL_EstiloImpresion
			$pdf->Cell(0,0,$VL_Informacion,0,0,1);
			break;
		case "T":
				if ($VL_CoordenadaY1 == 0)
				{
					if ($VL_NumeroLinea == 0)
					{
						$pdf->SetFont($VL_Fuente,'',$VL_Tamano); // $VL_EstiloImpresion
						$pdf->SetTextColor(0,0,190);
						$pdf->SetXY($VL_CoordenadaX1,$VL_CoordenadaY1Actual);
						$pdf->Cell(0,RetornaPosicionExacta($VL_Tamano),"",0,0,'C');
						$VL_CoordenadaY1Actual = $pdf->GetY();
						$pdf->SetXY($VL_CoordenadaX1,$VL_CoordenadaY1Actual);
						$pdf->Ln();
						if ($VL_Informacion == '.')
						{
							$VL_Informacion = ' ';
						}
						$pdf->Cell(0,RetornaPosicionExacta($VL_Tamano),$VL_Informacion,0,0,'C');
						$pdf->SetTextColor(0,0,0);
						//$pdf->Ln();
						$VL_CoordenadaY1Actual = $pdf->GetY();
						$VL_TempCY = $VL_CoordenadaY1Actual;
						$VL_ControldeLinea = 0;
						$VL_FuenteActual = $VL_Fuente;
						$VL_TamanoActual = $VL_Tamano;
						break;
					}
					else
					{
						if ($VL_ControldeLinea != $VL_NumeroLinea)
						{
							$pdf->SetXY($VL_CoordenadaX1,$VL_TempCY);
							$pdf->Cell(0,RetornaPosicionExacta(10),"",0,0,1);
							$VL_TempCY = $pdf->GetY();
	
							$VL_CoordenadaY1Actual = $VL_TempCY;
							if ($VL_NumeroSalto > 0) 
							{ 
								for ($VL_ContI = 1; $VL_ContI <= $VL_NumeroSalto; $VL_ContI++)
								{
									$pdf->SetY($VL_TempCY);
									$pdf->Ln();
									$VL_TempCY = $pdf->GetY();
								}
							}
							$VL_ControldeLinea = $VL_NumeroLinea;
						}
						else
						{
							$pdf->SetXY($VL_CoordenadaX1,$VL_CoordenadaY1Actual);
							$VL_TempCY = $VL_CoordenadaY1Actual;
							if ($VL_NumeroSalto > 0) 
							{ 
								for ($VL_ContI = 1; $VL_ContI <= $VL_NumeroSalto; $VL_ContI++)
								{
									$pdf->SetY($VL_TempCY);
									$pdf->Ln();
									$VL_TempCY = $pdf->GetY();
								}
							}
						}
						$pdf->SetY($VL_TempCY);
						$pdf->SetX($VL_CoordenadaX1);
						$pdf->SetFont($VL_Fuente,$VL_EstiloImpresion,$VL_Tamano); // $VL_EstiloImpresion
						$pdf->Cell(0,RetornaPosicionExacta(10),$VL_Informacion,0,0,1);
						break;
					}
				}
				else
				{
					$pdf->SetXY($VL_CoordenadaX1 - 46,$VL_CoordenadaY1Actual + $VL_CoordenadaY1 + 12);
					$pdf->SetFont($VL_Fuente, $VL_EstiloImpresion, $VL_Tamano); // $VL_EstiloImpresion
					$pdf->Cell(0,0,$VL_Informacion,0,0,1);
					break;
				}
		case "F":
			/* Registro de Firmas alojadas en el Directorio del Servidor /
			
			$VL_NombreUsuarioFirma = "Firmas/".strtolower($VL_Informacion).".png";
			echo $VL_NombreUsuarioFirma;
			#$pdf->Image($VL_NombreUsuarioFirma, $VL_CoordenadaX1 + 20, $VL_CoordenadaY1 + 170, 50, 25);
			break;*/
	#	case "P":
		    
		#	$VL_NombreUsuarioFirma = "Firmas/".strtolower($VL_Informacion).".png";
			#$pdf->Image($VL_NombreUsuarioFirma, $VL_CoordenadaX1 + 20, $VL_CoordenadaY1 + 170, 50, 25); 
			$pdf->SetX($VL_CoordenadaX1);
			$pdf->SetY($VL_CoordenadaY1*-1);
			$pdf->SetFont($VL_Fuente, $VL_EstiloImpresion, $VL_Tamano); // $VL_EstiloImpresion
			$pdf->Cell(0,0,$VL_Informacion,0,0,1);
			break;
		} //End Sw
	}
	$pdf->Output();
	
	$Consulta = mssql_init("SISTEMA_WEB_TERMINATE ", $db_conn);
	mssql_bind($Consulta, "@X_IDPACIENTE", $VL_IdPaciente, SQLVARCHAR);
	mssql_bind($Consulta, "@X_LLAVE_FONASA", $VL_LlaveFonasa, SQLINT2);
	mssql_bind($Consulta, "@X_USUARIO_QUE_IMPRIME", $VL_UsuarioImprime, SQLVARCHAR);
	mssql_bind($Consulta, "@X_PC_QUE_IMPRIME", $VL_NumeroPcImprime, SQLINT1);
	
	$TMP_RecordSet = mssql_execute($Consulta);
	
	mssql_close($db_conn);
}
else
{ 
   $VL_Texto = "Sin registros";
} 
?> 