<?php
	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "123") or  die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $fecha=date("d/m/Y");
    $hora=date("H:i:s");
    $fh=$fecha." ".$hora; 
    $idpaciente=$_GET['idpaciente'];
     
    $sql_1="SELECT     caj_det_prestaciones.id
FROM         caj_det_prestaciones INNER JOIN
                      dat_dfipa ON caj_det_prestaciones.idpaciente = dat_dfipa.idpaciente
WHERE     (dat_dfipa.numero = '".$_GET['folio']."')
ORDER BY caj_det_prestaciones.id";
    
    $query_result=odbc_exec($conection,$sql_1) or 
			        die ("ERROR : No se puede ejecutar la consulta.");
			        while($result=odbc_fetch_array($query_result))
		            {	
		              $num=$result["id"];
		             
		            }	
	                $num=$num+1;
                    $sql_1="SELECT llave_fonasa FROM CAJ_codigos_fonasa where codigo_fonasa='".$_GET['est']."'";
                    $query_result=odbc_exec($conection,$sql_1) or 
			        die ("ERROR : No se puede ejecutar la consulta.");
			        while($result=odbc_fetch_array($query_result))
		            {	
		              $llave=$result["llave_fonasa"];
		             
		            }	
		            $sql_1="INSERT INTO CAJ_DET_PRESTACIONES ( COD_EMPRESA, IDPACIENTE, ID, LLAVE_FONASA, VALOR_PARTICULAR, VALOR_PREVISION, VALOR_PAGADO, USUARIO_CREACION, FECHA_ENTREGA, URGENTE, FECHA_CREACION,LIBERADO) 
		            VALUES ( ".$_SESSION['empresa'].",'".$idpaciente."', ".$num.", ".$llave.", 0, 0, 0, '".$_SESSION['nivel']."', '".$fecha."', '', CONVERT(DATETIME, GETDATE(), 103),'N' )";
		            $query_result=odbc_exec($conection,$sql_1) or 
		       	    die ("ERROR : No se puede ejecutar la consulta.");
		            $sql_1="SELECT llave_perfil From lab_relac_fonasa_perfil Where llave_fonasa = ".$llave;
		            $query_result=odbc_exec($conection,$sql_1) or 
			        die ("ERROR : No se puede ejecutar la consulta.");
			        while($result=odbc_fetch_array($query_result))
		            {	
		              $perfil=$result["llave_perfil"];
		             
		            }	
		            //echo $perfil." " ;
		            $sql_1="Execute x_Sistema_Busca_Detalle_Perfil @xllave_per =".$perfil;
		            $query_result=odbc_exec($conection,$sql_1) or 
			        die ("ERROR : No se puede ejecutar la consulta.");
			        while($result=odbc_fetch_array($query_result))
			        {
			        	$sql_1="INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado) 
			        	VALUES ('".$result["perfil"]."', ".$result["llave_perfil"].", '".$result["prueba"]."', ".$result["llave_prueba"].", ".$_SESSION['empresa'].", '".$idpaciente."', '".$_SESSION['nivel']."', CONVERT(DATETIME, GETDATE(), 103), '' )";
			        	//echo $sql_1." **";
			        	$query_result2=odbc_exec($conection,$sql_1) or 
			            die ("ERROR : No se puede ejecutar la consulta.");
			        }
?>
