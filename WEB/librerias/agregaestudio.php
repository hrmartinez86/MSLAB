<?php
	session_start();
	$ODBC=$_SESSION['ODBC'];
	$conection = odbc_connect($ODBC, "sa", "Kapi312") or  die ("<h1 align='center'>ERROR EN LA 
	IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> 
	<a href=\"../index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
    $fecha=date("d/m/Y");
    $hora=date("H:i:s");
    $fh=$fecha." ".$hora; 
    $idpaciente=$_GET['idpaciente'];
	$examenCodigo=$_GET['est'];
	
	$lastChar = substr($examenCodigo, -1);
	//verificar si es agrupación
	if ($lastChar == '-') {

		$really = strlen($examenCodigo) - 1;
		
    	$textoExam = substr($examenCodigo, 0, $really);
		
		//buscamos los estudios de la agrupcion
		$sql_1 = "select ccf.codigo_fonasa from agrupaciones ag
		inner join agrupacion_examenes ae on ae.id_agrupacion=ag.id
		inner join caj_codigos_fonasa ccf on ccf.llave_fonasa=ae.llave_fonasa
		where ag.codigo='" . $textoExam . "'";
  
	  $query_result = odbc_exec($conection, $sql_1) or
		die("ERROR : No se puede ejecutar la consulta select". odbc_errormsg());
	  while ($result = odbc_fetch_array($query_result)) {
		$final[] = $result['codigo_fonasa'];
	  }
	  $numFinal = count($final);
	  for ($i = 0; $i < $numFinal; $i++) {
		//--Para el Ingreso de los Estudios                 
		$sql_1 = "SELECT llave_fonasa FROM CAJ_codigos_fonasa where codigo_fonasa='" . $final[$i] . "'
				  and activo='S'";
	  
		$query_result = odbc_exec($conection, $sql_1) or
		  die("ERROR : No se puede ejecutar la consulta.4 " . odbc_errormsg());
	  
		while ($result = odbc_fetch_array($query_result)) {
		  $llave = $result["llave_fonasa"];
		}
	  
		///hay que evaluar si es una agrupación
		$contEs=$i+1;
		$sql_1 = "INSERT INTO CAJ_DET_PRESTACIONES (cod_empresa,IDPACIENTE, ID, LLAVE_FONASA, VALOR_PARTICULAR, VALOR_PREVISION, VALOR_PAGADO, USUARIO_CREACION, FECHA_ENTREGA, URGENTE, FECHA_CREACION,LIBERADO) 
						  VALUES (" . $_SESSION['empresa'] . ", '" . $idpaciente . "', " . $contEs . ", " . $llave . ", 0, 0, 0, '" . $_SESSION['nivel'] . "', '" . $fecha . "', '', CONVERT(DATETIME, GETDATE(), 103),'N' )";
		$query_result = odbc_exec($conection, $sql_1) or
		  die("ERROR : No se puede ejecutar la consulta.5" . odbc_errormsg());
	  
		$sql_1 = "SELECT llave_perfil From lab_relac_fonasa_perfil Where llave_fonasa = " . $llave;
		$query_result = odbc_exec($conection, $sql_1) or
		  die("ERROR : No se puede ejecutar la consulta.6" . odbc_errormsg());
		while ($result = odbc_fetch_array($query_result)) {
		  $perfil = $result["llave_perfil"];
		}
	  
		$sql_1 = "Execute x_Sistema_Busca_Detalle_Perfil @xllave_per =" . $perfil;
		// echo "<br>.$sql_1.<br>";
		$query_result = odbc_exec($conection, $sql_1) or
		  die("ERROR : No se puede ejecutar la consulta." . odbc_errormsg() . $sql_1);
		while ($result = odbc_fetch_array($query_result)) {
		  $sql_1 = "INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado) 
							  VALUES ('" . $result["perfil"] . "', " . $result["llave_perfil"] . ", '" . $result["prueba"] . "', " . $result["llave_prueba"] . ", " . $_SESSION['empresa'] . ", '" . $idpaciente . "', '" . $_SESSION['nivel'] . "', CONVERT(DATETIME, GETDATE(), 103), '' )";
		  //			        	echo $sql_1." **";
		  $query_result2 = odbc_exec($conection, $sql_1) or
			die("ERROR : No se puede ejecutar la consulta.8");
		}
	  }
	  
	}
     else{

	 
    $sql_1="SELECT     caj_det_prestaciones.id
			FROM         caj_det_prestaciones INNER JOIN
								dat_dfipa ON caj_det_prestaciones.idpaciente = dat_dfipa.idpaciente
			WHERE     (dat_dfipa.idpaciente = '".$_GET['idpaciente']."')
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
				}
				
?>
