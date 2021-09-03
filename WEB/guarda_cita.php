<?php
//include_once(RelativePath . "/Barra.php");
session_start();
header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado']=="ok" ) {
    
        } else {
     
          header("Location: ../index.php"); 
          echo "<html></html>";
        }
include ('Librerias/conection.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .   
	 
	$ODBC=$_SESSION["ODBC"];
    //$conection=conectar($ODBC);
	$db_conn=conectar($ODBC);        
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Combrobante de Cita</title>
</head>
<?php
/***VARIABLES POR GET ***/
$paciente=0;
$numero = count($_POST);
$tags = array_keys($_POST);// obtiene los nombres de las varibles
$valores = array_values($_POST);// obtiene los valores de las varibles

// crea las variables y les asigna el valor
for($i=0;$i<$numero;$i++){
$$tags[$i]=$valores[$i];
}
//pRIMERO CHCO SI EXISTE O NO EL PACIENTE
if($Expediente!=''){
$sql_1="SELECT     TOP 1 *
FROM         dat_paciente
WHERE     (expediente = '".$Expediente."')";
//ECHO $sql_1;
$query_result=odbc_exec($db_conn,$sql_1) or 
			die ("ERROR : No se puede ejecutar la consulta.");
			
if (odbc_num_rows($query_result)!=0)
{
	//Si existe Paciente
	while($result=odbc_fetch_array($query_result))
		{	
		$rut=$result["rut"];
		$nombre=$result["nombre"];	
		$apellidos=$result["apellidos"];
		$theDate2=$result["fecha_nacimiento"];	
		$Sexo=$result["sexo"];
		//echo $correcit;	
		}	
}

else
{
    //echo "No existe " .$Expediente;
    $sql_1="SELECT CORRELATIVO_PACIENTES FROM CAJ_CORRELATIVOS";
    $query_result=odbc_exec($db_conn,$sql_1) or 
	die ("ERROR : No se puede ejecutar la consulta.");
	while($result=odbc_fetch_array($query_result))
	{	
	      $correPac=$result["CORRELATIVO_PACIENTES"];
	      $correcPac=$correPac+1;
		              	
	}	
	$sql_1="UPDATE CAJ_CORRELATIVOS SET CORRELATIVO_PACIENTES =".$correcPac;
    $query_result=odbc_exec($db_conn,$sql_1) or 
	die ("ERROR : No se puede ejecutar la consulta.");
	//Cambio el formato de la fecha
	
	//echo $_SESSION['empresa']."d";	
	$sql_1="INSERT INTO dat_paciente (cod_empresa, rut,expediente, nombre, apellidos, fecha_nacimiento, calle, telefono, fono_urgencia, contraindicaciones, sexo, ciudad, fecha_ult_examen,curp,rfc) VALUES (".$_SESSION['empresa'].", '".$correPac."','".$Expediente."' ,'".$nombre."', '".$apellidos."', '".$theDate2."', '".$Direccion."', '".$Telefono."', '', '', '".$Sexo."', '".$CiudadCit."', CONVERT(DATETIME, GETDATE(), 103), '".$CitasCURP."', '".$CitasRFC."')";            
    $rut=$correPac;
    //echo $rut;
    $query_result=odbc_exec($db_conn,$sql_1) or 
    die ("ERROR : No se puede ejecutar la consulta.");
}
}
else
{
	//echo "No existe " .$Expediente;
    $sql_1="SELECT CORRELATIVO_PACIENTES FROM CAJ_CORRELATIVOS";
    $query_result=odbc_exec($db_conn,$sql_1) or 
	die ("ERROR : No se puede ejecutar la consulta.");
	while($result=odbc_fetch_array($query_result))
	{	
	      $correPac=$result["CORRELATIVO_PACIENTES"];
	      $correcPac=$correPac+1;
		              	
	}	
	$sql_1="UPDATE CAJ_CORRELATIVOS SET CORRELATIVO_PACIENTES =".$correcPac;
    $query_result=odbc_exec($db_conn,$sql_1) or 
	die ("ERROR : No se puede ejecutar la consulta.");
	//Cambio el formato de la fecha
	
	//echo $_SESSION['empresa']."d";	
	$sql_1="INSERT INTO dat_paciente (cod_empresa, rut,expediente, nombre, apellidos, fecha_nacimiento, calle, telefono, fono_urgencia, contraindicaciones, sexo, ciudad, fecha_ult_examen,curp,rfc) VALUES (".$_SESSION['empresa'].", '".$correPac."','".$Expediente."' ,'".$nombre."', '".$apellidos."', '".$theDate2."', '".$Direccion."', '".$Telefono."', '', '', '".$Sexo."', '".$CiudadCit."', CONVERT(DATETIME, GETDATE(), 103), '".$CitasCURP."', '".$CitasRFC."')";            
    $rut=$correPac;
    //echo $rut;
    $query_result=odbc_exec($db_conn,$sql_1) or 
    die ("ERROR : No se puede ejecutar la consulta.");
}
    
    
    //veo si hay citas en esa fecha
    $sql_1="SELECT     *
    FROM         citas_dias
    WHERE     (fecha = CONVERT(DATETIME, '".$theDate."', 103))";
    $query_result=odbc_exec($db_conn,$sql_1) or 
			die ("ERROR : No se puede ejecutar la consulta.");
			
    if (odbc_num_rows($query_result)!=0)
    {/**echo "si hay citas";**/
       while($result=odbc_fetch_array($query_result))
		{	
			
		$correcit=$result["id"];
		
		//echo $correcit;	
		}	
    
    }
    else
    {
    	//echo "no hay citas ";
    	//Checo el numero de la cita
    	$sql_1="SELECT CORRELATIVO_CITAS_DIAS FROM CAJ_CORRELATIVOS";
    	$query_result=odbc_exec($db_conn,$sql_1) or 
			die ("ERROR : No se puede ejecutar la consulta.");
		while($result=odbc_fetch_array($query_result))
		{	
		$correcit=$result["CORRELATIVO_CITAS_DIAS"];
		$correcitac=$correcit+1;
		//echo $correcit;	
		}	
		$sql_1="UPDATE CAJ_CORRELATIVOS SET CORRELATIVO_CITAS_DIAS =".$correcitac;
		$query_result=odbc_exec($db_conn,$sql_1) or 
		die ("ERROR : No se puede ejecutar la consulta.");
			
		$sql="select citasMaximoDias as Citas from configuracion_Core";
         //echo $sql;
         $query=odbc_exec($db_conn,$sql);
          
         while ($result=odbc_fetch_array($query))
			          {
			          	global $MC;
			          	$MC= $result['Citas'];
			        	//echo $MC;
			          }			
		$sql_1="Insert into CITAS_DIAS (ID, FECHA, MAXIMO_ATENCIONES_DIA, INTERVALO, CITAS_CREADAS) Values (".$correcit.", Convert(DateTime, '".$theDate."', 103),".$MC.", NULL, 0)";
        
		$query_result=odbc_exec($db_conn,$sql_1) or 
		die ("ERROR : No se puede ejecutar la consulta.");
		
    }
		//echo $sql_1;
        //Checo la hora
        $sql_1=" SELECT citas_dias.fecha, citas_horas.hora_cita, citas_horas.ID ID_HORA,  citas_dias.citas_creadas, CITAS_HORAS.maximo_atenciones_hora From citas_dias  INNER JOIN citas_horas ON citas_dias.ID = CITAS_HORAS.id_citas Where  LTRIM(RIGHT(Convert(VARCHAR(19),citas_horas.hora_cita, 100),7)) = CONVERT(VARCHAR(7),'7:00AM',100) AND citas_dias.fecha = CONVERT(DATETIME,'".$theDate."', 103)";
        $query_result=odbc_exec($db_conn,$sql_1) or 
			die ("ERROR : No se puede ejecutar la consulta.");
			while($result=odbc_fetch_array($query_result))
			{$ncitas=$result["citas_creadas"];$correcith=$result["ID_HORA"];}
            if ($ncitas>=2)
            {
            	//echo "si hay citas";
            	//echo $ncitas;
            	$paciente=1;
            	
            }
            else
            {
            	///No existe en la base de datos
            	$paciente=0;
            	$sql_1="SELECT CORRELATIVO_CITAS_HORAS FROM CAJ_CORRELATIVOS";
            	$query_result=odbc_exec($db_conn,$sql_1) or 
			       die ("ERROR : No se puede ejecutar la consulta.");
		        while($result=odbc_fetch_array($query_result))
		        {	
		           $correcith=$result["CORRELATIVO_CITAS_HORAS"];
		           $correcitach=$correcith+1;
		           //echo $correcith;	
		        }	
		        $sql_1="UPDATE CAJ_CORRELATIVOS SET CORRELATIVO_CITAS_HORAS =".$correcitach;
		        $query_result=odbc_exec($db_conn,$sql_1) or 
			    die ("ERROR : No se puede ejecutar la consulta.");
		        //echo $sql_1;
		        $sql_1="Insert into CITAS_HORAS (ID, ID_CITAS, HORA_CITA, MAXIMO_ATENCIONES_HORA ) Values (".$correcith.",".$correcit.", Convert(DateTime, '07:00:00', 108), NULL )";
        
		        $query_result=odbc_exec($db_conn,$sql_1) or 
		       	die ("ERROR : No se puede ejecutar la consulta.");
		        //echo $sql_1;
            }
		        $sql_1="SELECT CORRELATIVO_CITAS_PACIENTES FROM CAJ_CORRELATIVOS";
		        $query_result=odbc_exec($db_conn,$sql_1) or 
			       die ("ERROR : No se puede ejecutar la consulta.");
		        while($result=odbc_fetch_array($query_result))
		        {	
		           $correcitP=$result["CORRELATIVO_CITAS_PACIENTES"];
		           $correcitacP=$correcitP+1;
		          // echo $correcitP;	
		        }	
		         $sql_1="UPDATE CAJ_CORRELATIVOS SET CORRELATIVO_CITAS_PACIENTES = ".$correcitacP;
		        $query_result=odbc_exec($db_conn,$sql_1) or 
			    die ("ERROR : No se puede ejecutar la consulta.");
		        //echo $sql_1;
		        $ahora = getdate();
		        $hora_actual = $ahora["hours"] . ":" . $ahora["minutes"];
		        $fecha_actual = $ahora["mday"] . "/" . $ahora["mon"] . "/" . $ahora["year"];
		        $sql_1="INSERT INTO CITAS_PACIENTE (ID, ID_CITAS, ID_HORA, ID_PACIENTE, LLAVE_DOCTOR, ID_PROCEDENCIA_MUESTRA, USUARIO_CREACION, CITAS_OBS, numero_consultorio, ID_UNIDAD_PROCEDENCIA, ID_DIAGNOSTICO, HORA_CREACION ) VALUES (".$correcitP.", ".$correcit.",".$correcith.",".$rut.", 1,".$CitasProcedencia.", '".$_SESSION['nivel']."', '', '', 0,0,'".$fecha_actual."-".$hora_actual."')";
                //echo $sql_1;
                
		        
		        $query_result=odbc_exec($db_conn,$sql_1) or 
		       	die ("ERROR : No se puede ejecutar la consulta.");
		       	$sql_1="UPDATE CITAS_DIAS SET CITAS_CREADAS = CITAS_CREADAS + 1 WHERE ID =".$correcit;
		       	$query_result=odbc_exec($db_conn,$sql_1) or 
		       	die ("ERROR : No se puede ejecutar la consulta.");
		        
		        $ex = explode(" ", $examenes);
		        $j=count($ex); 
                
		        if ($paciente=0){//echo  $correcit;
		        }
                else
                {
                	//echo  $correcitP;
                	$correcit=$correcitP;
                
                }
		        for($i=1;$i<=$j;$i++){
                    //--Para el Ingreso de los Estudios                 
                	
                	$sql_1="SELECT CORRELATIVO_CITAS_EXAMENES FROM CAJ_CORRELATIVOS";
                    $query_result=odbc_exec($db_conn,$sql_1) or 
			        die ("ERROR : No se puede ejecutar la consulta.");
			        while($result=odbc_fetch_array($query_result))
		            {	
		              $correcitE=$result["CORRELATIVO_CITAS_EXAMENES"];
		              $correcitacE=$correcitE+1;
		              	
		            }	
		            $sql_1="UPDATE CAJ_CORRELATIVOS SET CORRELATIVO_CITAS_EXAMENES =".$correcitacE;
		            $query_result=odbc_exec($db_conn,$sql_1) or 
		       	    die ("ERROR : No se puede ejecutar la consulta.");
		            
		            $sql_1="SELECT llave_fonasa FROM CAJ_codigos_fonasa where codigo_fonasa='".$ex[$i-1]."'";
                    $query_result=odbc_exec($db_conn,$sql_1) or 
			        die ("ERROR : No se puede ejecutar la consulta.");
			        while($result=odbc_fetch_array($query_result))
		            {	
		              $llave=$result["llave_fonasa"];
		             
		            }	
		            $sql_1="Insert into CITAS_EXAMENES (ID, ID_CITAS_PACIENTE, ID_EXAMEN) Values (".$correcitE.", ".$correcit.", ".$llave.")";
		            $query_result=odbc_exec($db_conn,$sql_1) or 
		       	    die ("ERROR : No se puede ejecutar la consulta.");
		            //echo $sql_1;
                }
            
        
    
    
    





/*********************************************************************************************************************/




?>
<link rel="stylesheet" type="text/css" href="Styles/Core/Style_doctype.css">

<body>
<div id="Seleccion"><table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            
            <td width="768" class="th"><div align="center"><strong> COMPROBANTE DE CITA</strong></div></td>  
            
          </tr>
</table>
<table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td> 
            <td class="th"><strong>N&uacute;mero de Cita:<?php echo $correcit;?></strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
          </tr>
</table>

<table height="10" cellpadding="0" cellspacing="0" class="Record">
          
          <tr class="Controls">
          
         <TD ALIGN="right" WIDTH=800> Fecha de Cita: <?php echo " ".$theDate; ?></TD>
         <td WIDTH=800>Fecha/Hora Creacion: <?php echo $fecha_actual."-".$hora_actual;?></td>
</tr>
<tr class="Controls">
         <TD ALIGN="right" WIDTH=200> Nombre Completo: <?php echo $nombre." ".$apellidos;?></TD>
         <td WIDTH=500>Fecha de Nacimiento: <?php echo $theDate2;?> </td>
         

         </tr>
         <tr class="Controls">
         <TD ALIGN="right" WIDTH=200> Expediente: <?php echo $Expediente;?></TD>
         <td WIDTH=500>Sexo: <?php if ($Sexo="F"){echo "FEMENINO";}ELSE{echo "MASCULINO";}?> </td>
         

         </tr>
         
           </tr>
         <tr class="Controls">
         <TD ALIGN="right" WIDTH=200> Procedencia: <?php 
         $sql_1="SELECT     *
FROM         procedencia_muestra
WHERE     (id = ".$CitasProcedencia.")";
                    $query_result=odbc_exec($db_conn,$sql_1) or 
			        die ("ERROR : No se puede ejecutar la consulta.");
			        while($result=odbc_fetch_array($query_result))
		            {	
		              echo $result["descripcion"];
		              
		              	
		            }	
         ?> </TD>
         <td WIDTH=500>Usuaro de Creaci&oacute;n: <?php echo $_SESSION['nivel'];?> </td>
         

         </tr>
			
			

</table>
<table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="32" class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
            <td width="768" class="th"><div align="center"><strong> EXAMENES</strong></div></td>  
            <td width="32" class="th"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif" /></td>
          </tr>
</table>
<table height="10" cellpadding="0" cellspacing="0" class="Record">
 <tr class="Controls">
         <TD ALIGN="right" WIDTH=200> CODIGO </TD>
         <td WIDTH=500>DESCRIPCION  </td>
         <td WIDTH=500>INDICACIONES  </td>

         </tr>
</table>

<table height="10" cellpadding="0" cellspacing="0" class="Record">
<?php 
   for($i=1;$i<=$j;$i++){
     $sql_1="SELECT     *
FROM         caj_codigos_fonasa
WHERE     (codigo_fonasa = '".$ex[$i-1]."')";
                    $query_result=odbc_exec($db_conn,$sql_1) or 
			        die ("ERROR : No se puede ejecutar la consulta.");
			        while($result=odbc_fetch_array($query_result))
		            {	
		             $exades=$result["nombre"];
		             $exaindi=$result["indicaciones_toma_muestra"]; 
		              	
		            }	
?>
<tr class="Controls">
<TD ALIGN="right" WIDTH=200> <?php echo $ex[$i-1];?></TD>
         <td WIDTH=500><?php echo $exades;?>  </td>
         <td WIDTH=500><?php echo $exaindi;?>  </td>
         </tr>
<?php 
   }
?>  
</table></div>       
<a href="javascript:window.print()"><img title="Imprimir" width="32" height="32" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link4}" src="images/fileprint.gif"></a>
<a href="citas.php"><img title="Nueva Cita" width="32" height="32" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link4}" src="images/regresar.jpg"></a>
<a href="Main.php"><img title="Principal" width="32" height="32" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link4}" src="images/home.gif"></a>

</body>
</html>
