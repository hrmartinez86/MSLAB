<?php


    //$conection=conectar($ODBC);
		
function consulta($idpaciente,$llave,$usuario,$No_pc)
{
//	echo "hola";
     session_start();
	global $ODBC;
	$ODBC=$_SESSION["ODBC"];
	$link=conectar($ODBC);
	$llaves=explode("-", $llave);	
	$cont=count($llaves)-2;
	$Consulta="LISTA_DE_TRABAJO_WEB ".$idpaciente.",".$llaves[0].",".$usuario.",".$No_pc;
	#echo $Consulta."<br>";
	$TMP_RecordSet = odbc_exec($link,$Consulta); 
	

}
function variables()
 {
	$VL_UsuarioImprime = "Infoweb";
	$i=$_POST['i'];
	$lf=$_POST['lf'];
	$llave_fonasa=$_POST['llavefonasa'];
	$VL_IdPaciente = $i;  //$HTTP_GET_VARS["i"];
	$VL_LlaveFonasa = $lf; //$HTTP_GET_VARS["lf"];
	$VL_UsuarioImprime = "Infoweb";
	$VL_NumeroPcImprime = 200;
	$variables=$VL_IdPaciente."@".$llave_fonasa."@".$VL_UsuarioImprime."@".$VL_NumeroPcImprime;
	return $variables;
 } 
function Headers($idp,$llaves,$pc_imp,$usuario,$link)
 { 
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
	
			
		$consultss=	odbc_exec($link,$sql_int);
		
	  while($result=odbc_fetch_array($consultss)) 
		   {
		   	$info[1][]=array($result['imagen'],$result['coorX_etiqueta'],$result['coorY_etiqueta'],$result['tamano_letra'],$result['etiqueta'],$result['coorX_imagen'],$result['coorY_imagen'],$result['imagen'],$result['ancho_imagen'],$result['alto_imagen']);	
		   }	
		   

	 return $info;
}

function Foot($idp,$llaves,$pc_imp,$usuario,$link)
{
	$sql="";
	$sql="SELECT id_piepagina FROM lab_imp_detalles_formatos WHERE nombre_formato = 'FORMATO MEXICO'";
#	echo $sql."<br>";
	$consultas=odbc_exec($link,$sql);
	while ($result=odbc_fetch_array($consultas))
	{
		$id_pie=$result['id_piepagina'];
	}
	$sql_q="SELECT * FROM lab_imp_detalle_piepagina WHERE Activo = 'S' and id_piepagina=".$id_pie; 
#	echo $sql_q."<br>";
	$conss=	odbc_exec($link,$sql_q);		
	while($res=odbc_fetch_array($conss)) 
	{
	//$da[1][]=array($res['coorX_etiqueta'],$res['coorY_etiqueta'],$res['tamano_letra'],$res['etiqueta'],$res['firma_digital'],$res['imagen'],$res['coorX_imagen'],$res['coorY_imagen'],$res['ancho_imagen'],$res['alto_imagen']);	
	}	
#	print_r($da);
return $da;			
			
			
}




function bodys($id_paciente,$fonasa,$nombre,$no_pc)
{
	//$cons="";
	//$sq="";
	 //session_start();
	//$ODBC=$_SESSION["ODBC"];
    //$conection=conectar($ODBC);
	//$db_conn=conectar($ODBC);
	//$link=conectar($ODBC);	
	//$cons="LISTA_DE_TRABAJO_WEB '".$id_paciente."',".$fonasa.",'".$nombre."',".$no_pc;
	//$cons="LISTA_DE_TRABAJO_WEB @TIPO='CE' ,@PROCEDENCIA=0 ,@SECCION='-QC-QC',@FECHA_DESDE='06/06/2010',@FECHA_HASTA='22/06/2010'";
	//$sn=odbc_exec($link,$cons);
	//$js=1;
	//$sq="SELECT tbl.*,caj.imprimir_sola FROM TBL_Impresion tbl inner join caj_codigos_fonasa caj on tbl.I_llave_fonasa = caj.llave_fonasa WHERE I_IdPaciente = '".$id_paciente."'  AND (I_Informacion IS NOT NULL) AND ((I_Informacion <> '') OR I_Estilo = 'L') and 	I_Estilo='T' ORDER BY I_Estilo, I_Orden";
	//$sqcount="SELECT count (distinct I_NumeroLinea) as cuenta  FROM TBL_Impresion WHERE I_IdPaciente = '".$id_paciente."' AND (I_Informacion IS NOT NULL) AND ((I_Informacion <> '') OR I_Estilo = 'L') and I_Estilo='T' ";
	//$scount=odbc_exec($link,$sqcount);

	//$sn=odbc_exec($link,$sq);
	#odbc_result_all($sn);
	//while($rw =odbc_fetch_array($sn) )
	//{ 
		
		//$I_In[]=array('X'=>$rw['fecha'],'Y'=>$rw['folio'],'Tamano'=>$rw['I_TamanoFuente'],'Info'=>$rw['I_Informacion'],'Linea'=>$rw['I_NumeroLinea'],'Salto'=>$rw['I_NumeroSalto'],"cuenta"=>odbc_result($scount,"cuenta"),"Imp_Sola"=>$rw['imprimir_sola']);
	//}

	//return $I_In;
	//odbc_close($link);
}
?>