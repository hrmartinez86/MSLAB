<?php
session_start();
define ('FPDF_FONTPATH','FPDF/font/');
require('fpdf153/fpdf.php');
include ("consultasxlote.php");
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
$var=variables();
$varia=explode ("@",$var);
$cero=0;
$new=0;
$j=0;
$Y=40;
$ODBC=$_SESSION["ODBC"];
//$conection=conectar($ODBC);
$db_conn=conectar($ODBC);   
//aqui es por lote

     
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

	$exa=20;
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
	
		$this->SetY(10);	
		$consultss=	odbc_exec($link,$sql_int);
		$i=0;
	  while($result=odbc_fetch_array($consultss)) 
		   {
		   	$xi=8;
		   	$yi=5;
		   	$imagen='logo1.JPG';	
		    $etiqueta=$result['etiqueta'];
		    $tipoletra=$result['tipo_letra'];
		    $tamano=$result['tamano_letra'];
		    $xx=$result['coorX_etiqueta'];
		    $this->SetX($xx);
	        $this->SetFont('Arial','',$tamano);
            $this->Cell(0,0,$etiqueta,0,0,'L');
		    //$this->Image($imagen, $xi, $yi,'20','20');
            $this->Ln(5);
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
	$i=$_POST['i'];
	$lf=$_POST['lf'];
	$llave_fonasa=$_POST['llavefonasa'];
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
$ODBC=$_SESSION["ODBC"];
$link=conectar($ODBC);	
	$sql="SELECT * FROM DETALLE_RESULTADOS WHERE FECHA=CONVERT(varchar(10), '".$_GET['theDate']."', 103) ORDER BY IDPACIENTE, LLAVE_FONASA, ORDEN";
	
	$cc=0; 
	 /*if($_GET['CitasProcedencia']!='')
	 {$sql=$sql." and dat_dfipa.procedencia_muestra=".$_GET['CitasProcedencia'];}
	 
	 if($_GET['Tipo']!='')
	 {$sql=$sql." and dat_dfipa.tipo='".$_GET['Tipo']."'";}
	 $sql=$sql." order by dat_dfipa.numero";*/
	 //echo $sql;
     $consultas=odbc_exec($link,$sql);
     $i=1;
     $pdf->SetY(27);
	while ($result=odbc_fetch_array($consultas))
	{
		
		$ID[$i]=$result['IDPACIENTE'];
		$llave[$i]=$result['LLAVE_FONASA'];
	    if ($i>1)
	    {
	    	//ve si es el mismo paciente
	    	if ($ID[$i-1]==$ID[$i])
	    	{
	    		//ahora veo si es el mismo estudio
	    		
	    		if ($llave[$i-1]==$llave[$i])
	    		{   
	    			$prueba[$i]=$result['DESC_PRU'];
	    			$res[$i]=$result['RESULTADO'];
	    			$uni[$i]=$result['UNIDADES_MEDIDA'];
	    			$val[$i]=$result['VALOR_DESDE'].'-'.$result['VALOR_HASTA'];
	    			$cc=$cc+1;
	    			$yy=$yy+20;
	    			//ESTUDIO
					 $pdf->Ln(3);
					 $pdf->SetFont("Arial",'',8);
					 $pdf->Cell(0,0,$result['DESC_PRU'],0,0,1,'S');
		 
					 //RESULTADO
					 $pdf->SetX(80);
					 $pdf->Cell(0,0,$result['RESULTADO'],0,0,1,'S');
		 
					 //UNIDAD
					 $pdf->SetX(110);
					 $pdf->Cell(0,0,$result['UNIDADES_MEDIDA'],0,0,1,'S');
		 
					 //VALORES DE REFERENCIA
					 $pdf->SetX(145);
					 $pdf->Cell(0,0,$result['VALOR_DESDE'].'-'.$result['VALOR_HASTA'],0,0,1,'S');
				    ////
	    			
	    		}
	    		
	    		   ELSE
	    		   {
	    		   	  //impresion de la primera prueba
		 		   		$pdf->SetFont("Arial",'',10);
						
						 $pdf->Ln(10);
						  $pdf->SetX(77);
						 $pdf->Cell(0,0,$result['NOMBRE_FONASA'],0,0,1,'S');
						 
						 //ESTUDIO
						 $pdf->Ln(5);
						 $pdf->SetFont("Arial",'',8);
						 $pdf->Cell(0,0,$result['DESC_PRU'],0,0,1,'S');
		 
						 //RESULTADO
						 $pdf->SetX(80);
						 $pdf->Cell(0,0,$result['RESULTADO'],0,0,1,'S');
		 
						 //UNIDAD
						 $pdf->SetX(110);
						 $pdf->Cell(0,0,$result['UNIDADES_MEDIDA'],0,0,1,'S');
		 
						 //VALORES DE REFERENCIA
						 $pdf->SetX(145);
						 $pdf->Cell(0,0,$result['VALOR_DESDE'].'-'.$result['VALOR_HASTA'],0,0,1,'S');
						 $yy=$yy+20;
	    		   }
	    		
	    	}
	    	else 
	    	{
	    		//para otro paciente
	    		$pdf->AddPage();
	    		$pdf->SetY(27);
	    		$pdf->SetFont('Arial','',8);
		$pdf->Cell(0,0,'Nombre:'.$result['NOMBRE_PACIENTE'],0,0);
	 	$pdf->Ln(3);
	 	$pdf->Cell(0,0,'Expediente:'.$result['RUT_PACIENTE'],0,0);
	 	$pdf->Ln(3);
	 	$pdf->Cell(0,0,'Medico:'.$result['NOMBRE_MEDICO'],0,0);
	 	//SEGUNDA COLUMNA
	 	 $pdf->SetY(27);
	 	 $pdf->SetX(80);
	 	 $pdf->Cell(0,0,'Procedencia:'.$result['DESC_PROCEDENCIA'],0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(80);
	 	 $pdf->Cell(0,0,'Edad:'.$result['ANOS'].' a�os',0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(80);
	 	 $fx=explode(" ",$result['FECHA_NACIMIENTO']);
	 	 $pdf->Cell(0,0,'Fecha Nacimiento:'.$fx[0],0,0);
	 	 //TERCERA COLUMNA
	 	 $pdf->SetY(27);
	 	 $pdf->SetX(140);
	 	 $F=date("d/m/Y,  H:i a");
	 	 $pdf->Cell(0,0,'Impresi�n:'.$F,0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(140);
	 	 $pdf->Cell(0,0,'Folio:'.$result['NUMERO'],0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(140);
	 	 $fx=explode(" ",$result['FECHA']);
	 	 $pdf->Cell(0,0,'Admisi�n:'.$fx[0],0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(140);
	 	 $SEX=$result['SEXO'];
	 	 if ($SEX=='M')
	 	 {
	 	 	$SEX='MASCULINO';
	 	 }
	 	 else 
	 	 {
	 	 	$SEX='FEMENINO';
	 	 }
	 	 $pdf->Cell(0,0,'Sexo:'.$SEX,0,0);
	 	 $pdf->SetXY(8,40);	
         $pdf->SetFont("Arial",'',8);
 		 $pdf->Cell(0,0,"EXAMEN",0,0,1,'');
		 $pdf->SetXY(77,40);	
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,"RESULTADO",0,0,1,'');
		 $pdf->SetXY(108,40);	
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,"UNIDAD",0,0,1,'S');
		 $pdf->SetXY(140,40);	
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,"VALOR DE REFERENCIA",0,0,1,'S');  
		 $pdf->SetXY(0,40);
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,"___________________________________________________________________________________________________________________________________________________",0,0,1,'S');
		 
		 
		 //impresion de la primera prueba
		 $pdf->SetFont("Arial",'',10);
		 $pdf->SetXY(77,45);
		 $pdf->Cell(0,0,$result['NOMBRE_FONASA'],0,0,1,'S');
		 
		 //ESTUDIO
		 $pdf->Ln(5);
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,$result['DESC_PRU'],0,0,1,'S');
		 
		 //RESULTADO
		 $pdf->SetX(80);
		 $pdf->Cell(0,0,$result['RESULTADO'],0,0,1,'S');
		 
		 //UNIDAD
		 $pdf->SetX(110);
		 $pdf->Cell(0,0,$result['UNIDADES_MEDIDA'],0,0,1,'S');
		 
		 //VALORES DE REFERENCIA
		 $pdf->SetX(145);
		 $pdf->Cell(0,0,$result['VALOR_DESDE'].'-'.$result['VALOR_HASTA'],0,0,1,'S');
	    ////
		 $yy=70;
	    	}
	    	
	    }
	    else 
	    {
	    	//imprime el encabezado para el primero ya no mover
		$pdf->SetFont('Arial','',8);
		$pdf->Cell(0,0,'Nombre:'.$result['NOMBRE_PACIENTE'],0,0);
	 	$pdf->Ln(3);
	 	$pdf->Cell(0,0,'Expediente:'.$result['RUT_PACIENTE'],0,0);
	 	$pdf->Ln(3);
	 	$pdf->Cell(0,0,'Medico:'.$result['NOMBRE_MEDICO'],0,0);
	 	//SEGUNDA COLUMNA
	 	 $pdf->SetY(27);
	 	 $pdf->SetX(80);
	 	 $pdf->Cell(0,0,'Procedencia:'.$result['DESC_PROCEDENCIA'],0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(80);
	 	 $pdf->Cell(0,0,'Edad:'.$result['ANOS'].' a�os',0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(80);
	 	 $fx=explode(" ",$result['FECHA_NACIMIENTO']);
	 	 $pdf->Cell(0,0,'Fecha Nacimiento:'.$fx[0],0,0);
	 	 //TERCERA COLUMNA
	 	 $pdf->SetY(27);
	 	 $pdf->SetX(140);
	 	 $F=date("d/m/Y,  H:i a");
	 	 $pdf->Cell(0,0,'Impresi�n:'.$F,0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(140);
	 	 $pdf->Cell(0,0,'Folio:'.$result['NUMERO'],0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(140);
	 	 $fx=explode(" ",$result['FECHA']);
	 	 $pdf->Cell(0,0,'Admisi�n:'.$fx[0],0,0);
	 	 $pdf->Ln(3);
	 	 $pdf->SetX(140);
	 	 $SEX=$result['SEXO'];
	 	 if ($SEX=='M')
	 	 {
	 	 	$SEX='MASCULINO';
	 	 }
	 	 else 
	 	 {
	 	 	$SEX='FEMENINO';
	 	 }
	 	 $pdf->Cell(0,0,'Sexo:'.$SEX,0,0);
	 	 $pdf->SetXY(8,40);	
         $pdf->SetFont("Arial",'',8);
 		 $pdf->Cell(0,0,"EXAMEN",0,0,1,'');
		 $pdf->SetXY(77,40);	
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,"RESULTADO",0,0,1,'');
		 $pdf->SetXY(108,40);	
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,"UNIDAD",0,0,1,'S');
		 $pdf->SetXY(140,40);	
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,"VALOR DE REFERENCIA",0,0,1,'S');  
		 $pdf->SetXY(0,40);
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,"___________________________________________________________________________________________________________________________________________________",0,0,1,'S');
		 
		 
		 //impresion de la primera prueba
		 $pdf->SetFont("Arial",'',10);
		 $pdf->SetXY(77,45);
		 $pdf->Cell(0,0,$result['NOMBRE_FONASA'],0,0,1,'S');
		 
		 //ESTUDIO
		 $pdf->Ln(5);
		 $pdf->SetFont("Arial",'',8);
		 $pdf->Cell(0,0,$result['DESC_PRU'],0,0,1,'S');
		 
		 //RESULTADO
		 $pdf->SetX(80);
		 $pdf->Cell(0,0,$result['RESULTADO'],0,0,1,'S');
		 
		 //UNIDAD
		 $pdf->SetX(110);
		 $pdf->Cell(0,0,$result['UNIDADES_MEDIDA'],0,0,1,'S');
		 
		 //VALORES DE REFERENCIA
		 $pdf->SetX(145);
		 $pdf->Cell(0,0,$result['VALOR_DESDE'].'-'.$result['VALOR_HASTA'],0,0,1,'S');
	    ////
		 $yy=50;
	    }	
		
		$i=$i+1;
		
		
      
	}    		          
	//$c=count($idpaciente);
	 //$pdf->Cell(0,0,$i,0,0);
	 
	
	//$x=1;
	
	
	$pdf->Output();
	///
/*	do
	{
	if ($idpaciente[$x]==$idpaciente[$x-1] && $x!=1)
	{
	    //echo 'primero';
	    
	}
	else
	{
	   
		if($x>1){
			 $Y=40;
	                 $pdf->AddPage();
		}
		$num=0;
	
	}
	$sql="";
	$sql="SELECT id FROM lab_imp_encabezados WHERE descripcion = 'ENCABEZADO MEXICO'";
	$consultas=odbc_exec($link,$sql);
	while ($result=odbc_fetch_array($consultas))
	{
		$id_encabezado=$result['id'];
	}
	
	$sql_int="SELECT 
			*
		FROM 
			lab_imp_detalle_encabezado
		WHERE 
			Activo = 'S' and id_encabezado=".$id_encabezado;
	
			
		$consultss=	odbc_exec($link,$sql_int);
		$j=0;
	  while($result=odbc_fetch_array($consultss)) 
		   {
		   	
		    $etiqueta[$j]=$result['etiqueta'];
		    $tipoletra[$j]=$result['tipo_letra'];
		    $tamano[$j]=$result['tamano_letra'];
		    $xx[$j]=$result['coorX_etiqueta'];
		    $yy[$j]=$result['coorY_etiqueta'] + 13;
		    $campo[$j]=$result['campo'];
		    $xc[$j]=$result['coorX_campo'];
		    $yc[$j]=$result['coorY_campo']+ 13;
		    $j=$j+1;
		    }	
		    
		for ($k=0;$k<=$j;$k++) {   
		    $pdf->SetXY($xx[$k],$yy[$k]);
		    $pdf->SetFont('Arial','',$tamano[$k]);
		    $pdf->Cell(0,0,$etiqueta[$k],0,0,'L');
		 if ($etiqueta[$k]=="Impresi�n")
		   {
		   	$F=date("d/m/Y,  H:i a");
		       $pdf->SetXY($xx[$k]+20,$yy[$k]);
		    $pdf->SetFont('Arial','',$tamano[$k]);
		    $pdf->Cell(0,0,$F,0,0,'L');
		   }
		    if ($campo[$k]!=0){
		    	$sql_int="SELECT 
			*
		FROM 
			lab_imp_campos_de_impresion
		WHERE 
			codigo=".$campo[$k];
	
			
		    $consultss=	odbc_exec($link,$sql_int);
		
	        while($result=odbc_fetch_array($consultss)) 
		    	
	        {
		        $tabla=$result['tabla'];
		        $campo_nombre=$result['nombre_campo'];
		        $descripcion_campo=$result['descripcion_campo'];	
	        }
	        
	        //$nombre=explode(" ",$campo_nombre);
	        //echo $campo_nombre;
	        if ($campo_nombre=="nombre apellidos")
	        {$sql_int="SELECT 
			dat_paciente.nombre + ' ' + dat_paciente.apellidos AS campos
	        
		FROM         dat_dfipa INNER JOIN
                      dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN
                      procedencia_muestra ON dat_dfipa.procedencia_muestra = procedencia_muestra.id INNER JOIN
                      dat_doctores ON dat_dfipa.doctor = dat_doctores.llave_doctor
			
		WHERE 
			dat_dfipa.idpaciente=".$idpaciente[$x];}
	        else
	        {$sql_int="SELECT 
			" .$tabla.".".$campo_nombre."  as campos
		FROM         dat_dfipa INNER JOIN
                      dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN
                      procedencia_muestra ON dat_dfipa.procedencia_muestra = procedencia_muestra.id INNER JOIN
                      dat_doctores ON dat_dfipa.doctor = dat_doctores.llave_doctor
			
		WHERE 
			dat_dfipa.idpaciente=".$idpaciente[$x];}
		    
	     
			//echo $sql_int;
		    $consultss=	odbc_exec($link,$sql_int);
		
	        while($result=odbc_fetch_array($consultss)) 
		    	
	        {
		        $descripcion=$result['campos'];
	        }   
	       
	        
		    if($campo_nombre=="sexo")
	        {
	        	if ($descripcion=="M")
	        	{
	        	$descripcion="MASCULINO";
	        	}
	        	else
	        	{
	        	$descripcion="FEMENINO";	
	        	}
	        }
	        if($descripcion_campo=="Edad")
	        {
	        	$fx=explode(" ",$descripcion);
	        	$fxa=explode("-",$fx[0]);
	        	//$descripcion=$fxa[0];
	        	$fa=date("Y");
			
            settype($fa, "integer");
            settype($fxa[0], "integer");
			$descripcion=$fa-$fxa[0]."  a�os";
	        }
		   
                if($campo_nombre=="doctor")
	        {$descripcion=$doctor[$x];}
	            $pdf->SetXY($xc[$k],$yc[$k]);
		        $pdf->SetFont('Arial','',$tamano[$k]);
		        $pdf->Cell(0,0,$descripcion,0,0,'L');
		   
		    }
		}
//aqui mando el segundo encabezado
$pdf->SetXY(8,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"EXAMEN",0,0,1,'');
$pdf->SetXY(77,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"RESULTADO",0,0,1,'');
$pdf->SetXY(108,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"UNIDAD",0,0,1,'S');
$pdf->SetXY(130,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"VALOR DE REFERENCIA",0,0,1,'S');  
$pdf->SetXY(0,43);
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"___________________________________________________________________________________________________________________________________________________",0,0,1,'S');  		    
	
	
	//$va=variables();
	//$vaa=explode ("@",$va);
	//$nombre=$vaa[2];
	//$id_paciente=$vaa[0];
	//$no_pc=$vaa[3];
	//echo $x;
	///aqui se imprimen los resultados
	$nombre = "Infoweb";
	$no_pc = 200;
	
	//$I_In=bodys($idpaciente[$x],$llave[$x],$nombre,$no_pc);
	
	
	$tot=$Y + count($I_In);
	
	if ($tot >= 220)
	{
		$Y=40;
		$pdf->AddPage();
	$sql="";
	$sql="SELECT id FROM lab_imp_encabezados WHERE descripcion = 'ENCABEZADO MEXICO'";
	$consultas=odbc_exec($link,$sql);
	while ($result=odbc_fetch_array($consultas))
	{
		$id_encabezado=$result['id'];
	}
	
	$sql_int="SELECT 
			*
		FROM 
			lab_imp_detalle_encabezado
		WHERE 
			Activo = 'S' and id_encabezado=".$id_encabezado;
	
			
		$consultss=	odbc_exec($link,$sql_int);
		$j=0;
	  while($result=odbc_fetch_array($consultss)) 
		   {
		   	
		    $etiqueta[$j]=$result['etiqueta'];
		    $tipoletra[$j]=$result['tipo_letra'];
		    $tamano[$j]=$result['tamano_letra'];
		    $xx[$j]=$result['coorX_etiqueta'];
		    $yy[$j]=$result['coorY_etiqueta'] + 3;
		    $campo[$j]=$result['campo'];
		    $xc[$j]=$result['coorX_campo'];
		    $yc[$j]=$result['coorY_campo']+3;
		    $j=$j+1;
		    }	
		    
		for ($k=0;$k<=$j;$k++) {   
		    $pdf->SetXY($xx[$k],$yy[$k]);
		    $pdf->SetFont('Arial','',$tamano[$k]);
		    $pdf->Cell(0,0,$etiqueta[$k],0,0,'L');
		if ($etiqueta[$k]=="FECHA DE IMPRESION")
		   {
		   	$F=date("d/m/Y,  H:i a");
		       $pdf->SetXY($xx[$k]+40,$yy[$k]);
		    $pdf->SetFont('Arial','',$tamano[$k]);
		    $pdf->Cell(0,0,$F,0,0,'L');
		   }
		    if ($campo[$k]!=0){
		    	$sql_int="SELECT 
			*
		FROM 
			lab_imp_campos_de_impresion
		WHERE 
			codigo=".$campo[$k];
	
			
		    $consultss=	odbc_exec($link,$sql_int);
		
	        while($result=odbc_fetch_array($consultss)) 
		    	
	        {
		        $tabla=$result['tabla'];
		        $campo_nombre=$result['nombre_campo'];	
	        }
	        
	        //$nombre=explode(" ",$campo_nombre);
	        //echo $campo_nombre;
	        if ($campo_nombre=="nombre apellidos")
	        {$sql_int="SELECT 
			dat_paciente.nombre + ' ' + dat_paciente.apellidos AS campos
	        
		FROM         dat_dfipa INNER JOIN
                      dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN
                      procedencia_muestra ON dat_dfipa.procedencia_muestra = procedencia_muestra.id INNER JOIN
                      dat_doctores ON dat_dfipa.doctor = dat_doctores.llave_doctor
			
		WHERE 
			dat_dfipa.idpaciente=".$idpaciente[$x];}
	        else
	        {$sql_int="SELECT 
			" .$tabla.".".$campo_nombre."  as campos
		FROM         dat_dfipa INNER JOIN
                      dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN
                      procedencia_muestra ON dat_dfipa.procedencia_muestra = procedencia_muestra.id INNER JOIN
                      dat_doctores ON dat_dfipa.doctor = dat_doctores.llave_doctor
			
		WHERE 
			dat_dfipa.idpaciente=".$idpaciente[$x];}
		    
	     
			//echo $sql_int;
		    $consultss=	odbc_exec($link,$sql_int);
		
	        while($result=odbc_fetch_array($consultss)) 
		    	
	        {
		        $descripcion=$result['campos'];
	        }   
	        
		    if($campo_nombre=="sexo")
	        {
	        	if ($descripcion=="M")
	        	{
	        	$descripcion="MASCULINO";
	        	}
	        	else
	        	{
	        	$descripcion="FEMENINO";	
	        	}
	        }
		    if($campo_nombre=="fecha_nacimiento")
	        {
	        	$fx=explode(" ",$descripcion);
	        	$fxa=explode("-",$fx[0]);
	        	//$descripcion=$fxa[0];
	        	$fa=date("Y");
			
            settype($fa, "integer");
            settype($fxa[0], "integer");
			$descripcion=$fa-$fxa[0]."  a�os";
	        }
	        
		    if($campo_nombre=="Ingreso de Ficha")
	        {
	        	//$fx=explode(" ",$descripcion);
	        	
			$descripcion="jaja";
	        }
	        
                if($campo_nombre=="doctor")
	        {$descripcion=$doctor[$x];}
		    //if($campo_nombre=="fecha_nacimiento")
	        //{$descripcion="fecha";}
	            $pdf->SetXY($xc[$k],$yc[$k]);
		        $pdf->SetFont('Arial','',$tamano[$k]);
		        $pdf->Cell(0,0,$descripcion,0,0,'L');
		    }
		}
	    //aqui mando el segundo encabezado
$pdf->SetXY(8,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"EXAMEN",0,0,1,'');
$pdf->SetXY(77,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"RESULTADO",0,0,1,'');
$pdf->SetXY(108,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"UNIDAD",0,0,1,'S');
$pdf->SetXY(130,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"VALOR DE REFERENCIA",0,0,1,'S');  
$pdf->SetXY(0,43);
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"___________________________________________________________________________________________________________________________________________________",0,0,1,'S');  		    
	
	}
	#print_r($I_In);
	for($i=0;$i<count($I_In);$i++)
	{

		//if ($I_In[$i]["Imp_Sola"]=='S')
		//{
			   
			  //$pdf->AddPage();
			   //encabezado($idpaciente[$x],$procedencia[$x],$link);
			    //$Y=50;
			    /*$I_In2[]=$I_In;
				$new_prue++;
				break;*/	
		//}
		//else
		
		/*$cuentas=1;
		$numero=$I_In[$i]['cuenta'];

	
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
		
		$linea2=$I_In[$i]['Linea'];
		$linea=$I_In[$i]['Salto'];
		$j=$j+10;

		if ($I_In[$i]['Linea']<>$lineas)
		{
			$h++;	
			$ds++;
			$lineas=$I_In[$i]['Linea'];
		}
		
		//$new_page=$I_In[$i]['Imp_Sola'];
		
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


/*for ($k=0;$k<$new_prue;$k++)
{*/
/*if ($uno>1)
{
	$pdf->AddPage();
}
$Y=40;
	
for($i=0;$i<count($I_In2[$k]);$i++)
	{
		$numero=$I_In2[$k][$i]['cuenta'];


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

*/
	
	
	if ($x!=$c){
	//$pdf->AddPage();
	}
	
	
	/*$x=$x+1;
}			          
while ($x<=$c);

	
   
$pdf->Output();

function encabezado($id,$pro,$link)
{
	$pdf=new PDF();
	$sql="";
	$sql="SELECT id FROM lab_imp_encabezados WHERE descripcion = 'ENCABEZADO MEXICO'";
	$consultas=odbc_exec($link,$sql);
	while ($result=odbc_fetch_array($consultas))
	{
		$id_encabezado=$result['id'];
	}
	
	$sql_int="SELECT 
			*
		FROM 
			lab_imp_detalle_encabezado
		WHERE 
			Activo = 'S' and id_encabezado=".$id_encabezado;
	
			
		$consultss=	odbc_exec($link,$sql_int);
		$j=0;
	  while($result=odbc_fetch_array($consultss)) 
		   {
		   	
		    $etiqueta[$j]=$result['etiqueta'];
		    $tipoletra[$j]=$result['tipo_letra'];
		    $tamano[$j]=$result['tamano_letra'];
		    $xx[$j]=$result['coorX_etiqueta'];
		    $yy[$j]=$result['coorY_etiqueta'] + 3;
		    $campo[$j]=$result['campo'];
		    $xc[$j]=$result['coorX_campo'];
		    $yc[$j]=$result['coorY_campo']+3;
		    $j=$j+1;
		    }	
		    
		for ($k=0;$k<=$j;$k++) {   
		    $pdf->SetXY($xx[$k],$yy[$k]);
		    $pdf->SetFont('Arial','',$tamano[$k]);
		    $pdf->Cell(0,0,$etiqueta[$k],0,0,'L');
		    if ($campo[$k]!=0){
		    	$sql_int="SELECT 
			*
		FROM 
			lab_imp_campos_de_impresion
		WHERE 
			codigo=".$campo[$k];
	
			
		    $consultss=	odbc_exec($link,$sql_int);
		
	        while($result=odbc_fetch_array($consultss)) 
		    	
	        {
		        $tabla=$result['tabla'];
		        $campo_nombre=$result['nombre_campo'];	
	        }
	        
	        //$nombre=explode(" ",$campo_nombre);
	        //echo $campo_nombre;
	        if ($campo_nombre=="nombre apellidos")
	        {$sql_int="SELECT 
			dat_paciente.nombre + ' ' + dat_paciente.apellidos AS campos
	        
		FROM         dat_dfipa INNER JOIN
                      dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN
                      procedencia_muestra ON dat_dfipa.procedencia_muestra = procedencia_muestra.id INNER JOIN
                      dat_doctores ON dat_dfipa.doctor = dat_doctores.llave_doctor
			
		WHERE 
			dat_dfipa.idpaciente=".$id;}
	        else
	        {$sql_int="SELECT 
			" .$tabla.".".$campo_nombre."  as campos
		FROM         dat_dfipa INNER JOIN
                      dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN
                      procedencia_muestra ON dat_dfipa.procedencia_muestra = procedencia_muestra.id INNER JOIN
                      dat_doctores ON dat_dfipa.doctor = dat_doctores.llave_doctor
			
		WHERE 
			dat_dfipa.idpaciente=".$id;}
		    
	     
			//echo $sql_int;
		    $consultss=	odbc_exec($link,$sql_int);
		
	        while($result=odbc_fetch_array($consultss)) 
		    	
	        {
		        $descripcion=$result['campos'];
	        }   
	       
		    if($campo_nombre=="sexo")
	        {
	        	if ($descripcion=="M")
	        	{
	        	$descripcion="MASCULINO";
	        	}
	        	else
	        	{
	        	$descripcion="FEMENINO";	
	        	}
	        }
                if($campo_nombre=="doctor")
	        {$descripcion=$doctor[$x];}
	            $pdf->SetXY($xc[$k],$yc[$k]);
		        $pdf->SetFont('Arial','',$tamano[$k]);
		        $pdf->Cell(0,0,$descripcion,0,0,'L');
		    }
		}
//aqui mando el segundo encabezado
$pdf->SetXY(8,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"EXAMEN",0,0,1,'');
$pdf->SetXY(77,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"RESULTADO",0,0,1,'');
$pdf->SetXY(108,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"UNIDAD",0,0,1,'S');
$pdf->SetXY(130,43);	
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"VALOR DE REFERENCIA",0,0,1,'S');  
$pdf->SetXY(0,43);
$pdf->SetFont("Arial",'',8);
$pdf->Cell(0,0,"___________________________________________________________________________________________________________________________________________________",0,0,1,'S')*/

?>
