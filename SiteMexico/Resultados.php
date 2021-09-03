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
	$db_conn2=conectar($ODBC);        
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML><HEAD><TITLE>Ingreso de Resultados</TITLE>
<META content="text/html; charset=iso-8859-1" http-equiv=Content-Type>
<META content="MSHTML 5.00.2314.1000" name=GENERATOR>
<meta http-equiv="imagetoolbar" content="no">
<link rel="stylesheet" type="text/css" href="../WEB/Styles/INFOLAB/Style_doctype.css">
<!-- <!#E3E3E3> -->
<!-- <style type="text/css">
.Estilo3 {font-family: "Times New Roman", Times, serif}
    <!--
    body {
	SCROLLBAR-FACE-COLOR:#6699CC;
	SCROLLBAR-HIGHLIGHT-COLOR: #6699CC;
	SCROLLBAR-SHADOW-COLOR: #6699CC;
	SCROLLBAR-3DLIGHT-COLOR: #FFFFFF;
	SCROLLBAR-ARROW-COLOR: #FFFFFF;
	SCROLLBAR-TRACK-COLOR: #375aa6;
	SCROLLBAR-DARKSHADOW-COLOR: #000000;
	background-color: #000000;
    }
    -->
<!--  .txt_{font-family:Verdana;font-size:12px;color:#FFFFFF;text-decoration:none;}

</style> -->


<script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
<script language="javascript" type="text/javascript" src="js/mambo.js"></script>
</HEAD>
<!--  <BODY aLink=#cccccc leftMargin=0 link=#ffffff onLoad="" text=#ffffff topMargin=0 vLink=#cccccc MARGINWIDTH="0" MARGINHEIGHT="0"> -->
<body>
<?php include("Header.html");?>
<br></br>

  <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td> 
            <td class="th"><strong>Secci&oacute;n:</strong></td> 
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/INFOLAB/Images/Spacer.gif"></td>
          </tr>
        </table>
        </table>
<form id="Seccionf" method="get" name="Seccion" action="Resultadosxsec.php">        
<table border="0" cellspacing="0" cellpadding="0" width="1154">
 
    <tr>
     
           <td> <select id="Secciond" name="Secciond" onchange="javascript:Seccionf.submit()">
            	<?php
			       echo '<option value="" </option>';
				  $sql="SELECT   DISTINCT    lab_relacion_laboratorio_seccion.cod_llave AS codigo, lab_secciones.descripcion FROM caj_det_prestaciones INNER JOIN caj_codigos_fonasa ON caj_det_prestaciones.llave_fonasa = caj_codigos_fonasa.llave_fonasa INNER JOIN lab_relac_fonasa_perfil ON caj_det_prestaciones.llave_fonasa = lab_relac_fonasa_perfil.llave_fonasa INNER JOIN lab_RLS_perfiles ON lab_relac_fonasa_perfil.llave_perfil = lab_RLS_perfiles.llave_perfil INNER JOIN lab_relacion_laboratorio_seccion ON lab_RLS_perfiles.cod_llave = lab_relacion_laboratorio_seccion.cod_llave INNER JOIN lab_secciones ON lab_relacion_laboratorio_seccion.seccion = lab_secciones.codigo WHERE     (caj_det_prestaciones.idpaciente =".$_GET['Paciente'].") ORDER BY lab_secciones.descripcion";
			      $query=odbc_exec($db_conn,$sql);
			      
			      while ($result=odbc_fetch_array($query))
			          {
			        	echo '<option value="'.$result['codigo'].'">'.$result['descripcion'].'</option>';
			        	
			        	
			          }	
			          
		        ?>        
				</select>
            </td> 
            </tr>
            <tr>   
             
            <td><input type="hidden" name="Paciente" id="Paciente" size="50" value="<?php echo $_GET['Paciente'];?>"></td>
          </tr>
            <tr>
            <!-- <td><input type="submit" value="Enviar" /></td> -->
  </tr>
 
   
</table>  
</form>
<br></br>


<div align="center">
  <?php
 
global $result ;
	$llavefon="";
global	$VL_Buscar; 

    $VL_Buscar = $_GET['Paciente'];
    //echo $VL_Buscar;
	$VL_Nombre = "";
	$VL_Rut = "";
	$VL_Fecha_Nacimiento = "";
	$VL_Admision = "";
	$VL_Sexo = "";
	global $VL_Edad;
	$VL_Edad = 0;
	$VL_Procedencia = "";
	$VL_NombreMedico = "";
	$VL_LlaveFonasa = "";
	$VL_Compara = "";
	$SEC=$_GET['Seccion'];
	//echo ($VL_Buscar);
	/*gbrel*/
	
	/*Consulta a realizar 23 */
	$sql_1="EXECUTE SISTEMA_RESULTADOS_WEB_EDIT '".$VL_Buscar."'";
	
	$i=0;
	//echo $sql_1;
	$query_result=odbc_exec($db_conn,$sql_1) or 
			die ("ERROR : No se puede ejecutar la consulta.");
	if (odbc_num_rows($query_result)!=0)
	{ 
		
		$VL_Encabezado="T";
		while($result=odbc_fetch_array($query_result))
		{
			if ($VL_Encabezado == 'T')
			{

				$VL_Encabezado="F";
				$VL_Nombre = $result["NOMBRE_PACIENTE"];
				echo $VL_Rut = $result["RUT_PACIENTE"];
				$VL_Fecha_Nacimiento = $result["FECHA_NACIMIENTO"];
				$VL_Admision = $result["FECHA"];
				$VL_Sexo = $result["SEXO"];
				$VL_Edad = $result["ANOS"];
				$VL_Procedencia = $result["DESC_PROCEDENCIA"];
				$VL_NombreMedico = $result["NOMBRE_MEDICO"];
				$llave=$result["LLAVE_PRUEBA"];
				$perfil=$result["LLAVE_PERFIL"];
				$paciente=$result["IDPACIENTE"];
				$tipo=$result["TIPO"];
				$alto=$result["VALOR_HASTA"];
				$bajo=$result["VALOR_DESDE"];
				
				
	?>
<!-- <img src="../images/globulos.jpg" width="1206" height="150"></div> -->
<!-- <TABLE border=1 borderColor=#000000 cellPadding=0 cellSpacing=0 height="100%" width="100%"> -->
<TABLE>
      <TBODY>
      <TR>
        <TD>
        <!--  <TD bgColor=#000000 height=419 vAlign=top width="9%"> -->
             <TABLE align=center border=0 cellPadding=0 cellSpacing=0 height=100 width="98%">
            <TBODY>
            <TR>
               <TD height=2 vAlign=top>&nbsp;</TD>
            </TR>
            <TR>
               <TD vAlign=top>
                  <TABLE border=1 borderColor=#5c7ec3 cellPadding=0 cellSpacing=3 width="100%">
                  
                    <TBODY> 
                    <TR> 
                      <TD>
                        <div align="center"><b>FOLIO :  <?php echo (substr($VL_Buscar,8)) ?></b></div>
                        <!-- ."-".$VL_Buscar) ?>)</b></div>-->
                      </TD>
                    </TR>
                    <TR> 
                      <TD colSpan=2 height=2> 
                        <TABLE border=0 cellPadding=0 cellSpacing=0 width="100%">
                          <TBODY> 
                          <TR> 
                            <TD vAlign=top width="100%" height="116"><IMG height=12 src="Imagenes/Transparente.gif" width=20><BR>
                              <TABLE border=1 borderColor=#5c7ec3 cellPadding=0 cellSpacing=2 width="98%" align=center>
                                <TBODY> 
                                <TR> 
                                  <TD colSpan=4 height=5> 
                                    <div align="center"><FONT color=#666666 face="Arial, Helvetica, sans-serif" size=2><B><FONT color=#000000 face="Arial, Helvetica, sans-serif" size=2>DATOS DEL PACIENTE</FONT><FONT color=#000000 size=2> 
                                      </FONT></B></FONT></div>
                                  </TD>
                                </TR>
                                <TR> 
                                  <TD bgColor=#3759a2 height=74 vAlign=top width="14%">
                                    <P>
                                      <FONT color=#ffffff face="Arial, Helvetica, sans-serif" size=2>&nbsp;Nombre :<BR>
                                      &nbsp;M&eacute;dico :<BR>
                                      &nbsp;Procedencia : </FONT>
                                    </P>
                                  </TD>
                                  <TD bgColor=#5c7ec3 height=74 vAlign=top width="52%"><FONT color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
    <?php
				echo($VL_Nombre."<br>");
				#echo($VL_Rut."<br>"); 
				echo($VL_NombreMedico."<br>"); 
				echo($VL_Procedencia."<br>"); 
    ?>
    </FONT>
    </TD>
    <TD bgColor=#3759a2 height=74 vAlign=top width="19%"><p>
    <font color=#ffffff face="Arial, Helvetica, sans-serif" size=2>&nbsp;F. de Nacimiento : <br>
    &nbsp;Edad :<br>
    &nbsp;Sexo :<br>
    &nbsp;Admisi&oacute;n : </font></p>
    </TD>
    <TD bgColor=#5c7ec3 height=74 vAlign=top width="15%"><FONT color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
    <?php
				echo(substr($VL_Fecha_Nacimiento,0,10)."<br>");
				echo($VL_Edad." A�os<br>");
				if ($VL_Sexo=="F") 
				{ 
					echo("Femenino<br>"); 
				} 
				else 
				{ 
					echo("Masculino<br>"); 
				} 
				echo(substr($VL_Admision,0,10)."<br>");
    ?>
                                    </FONT>
                                  </TD>
                                </TR>
                                </TBODY> 
                              </TABLE>
                            </TD>
                            <TD background=Menu_archivos/fwebhosting.jpeg rowSpan=3 vAlign=top>&nbsp;</TD>
                          </TR>
                          <TR> 
                            <TD height=115 vAlign=top width="90%"><IMG height=12 src="Imagenes/Transparente.gif" width=20>
                              <table border=2 bordercolor=#5c7ec3 cellpadding=0 cellspacing=2 width="99%" align=center>
                                
    <?php
                }
                
                if (strtoupper($VL_Compara)==strtoupper($result["NOMBRE_FONASA"]))
                {
                	$llave2=$result["LLAVE_PRUEBA"];
                	
                	$perfil=$result["LLAVE_PERFIL"];
                	$paciente=$result["IDPACIENTE"];
                	$tipo=$result["TIPO"];
                    $alto=$result["VALOR_HASTA"];
				    $bajo=$result["VALOR_DESDE"];
				    $res=$result["RESULTADO"];
				    //para los valores de referencia
				    if ($alto==0){
				    $color='#ffffff';}
				    else
				    {
				    if ($res==''){$color='#ffffff';}
				    else
				    {
				    if ($res<$alto && $res>$bajo){
				    $color='#ffffff';
				    }
				    else
				    {$color='#ed6d5a';}
				    }
				    }
    /*              echo ($result["DESC_PRU"]." ");
                    echo ($result["RESULTADO"]." ");
                    echo ($result["ESTADO"]."<br>"); */
    ?>
                                <tr> 
                                  <td id="prueba_desc[<?php ECHO $llave2;?>]" bgcolor=#5c7ec3 height=25 valign=middle width="40%"> 
                                    
                                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1></font>
                                    <font color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
                    				<?php echo ($result["DESC_PRU"]); ?>
                                    </font>
                                    
                                  </td>
                                  
                                  
                                  <td bgcolor=#5c7ec3 height=25 valign=center width="20%"> 
                                    <input <?php if($result["ESTADO"]==' ' || $result["ESTADO"]==''||$result["ESTADO"]=='P'){}else{echo "readonly";}?> style="background-color:<?php echo $color;?>;" type="text" value="<?php echo ($result["RESULTADO"]); ?>" id="<?php ECHO $llave2;?>" onChange="valor('<?php ECHO $llave2;?>','<?php ECHO $perfil;?>','<?php ECHO $paciente;?>','<?php ECHO $tipo;?>','<?php ECHO $alto;?>','<?php ECHO $bajo;?>','<?php echo $result["ESTADO"];?>'); javascript: return false;"> 
                                  </td>
                                  
                                  <!-- <td bgcolor=#5c7ec3 height=15 align=center valign=middle width="5%">
                                  <input type="image" src="imagenes/cross.jpg" width="12" height="12" name="desvalidar" onclick="regresar()">
                                  </td> -->
                                  <td bgcolor=#5c7ec3 height=25 align=middle valign=center width="20%"> 
                                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                    				<?php
										if (trim($result["UNIDADES_MEDIDA"] != "")) 
									{
                    					echo ($result["UNIDADES_MEDIDA"]);
									}
									else
									{
										echo ("&nbsp;");
									}
									?>
                                    </font>
                                  </td>
                                  <td bgcolor=#5c7ec3 height=25 align=middle valign=center width="20%"> 
                                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                    				<?php if (trim($result["RANGO_TEXTO"]) != "") 
									{
	                    				echo ($result["RANGO_TEXTO"]);
									}
									else
									{
										if ((empty($result["VALOR_DESDE"])) or (trim($result["VALOR_DESDE"]) == ""))
										{
											echo ("-");
										}
										else
										{	
											echo "<br>"; echo (number_format($result["VALOR_DESDE"],$result["DECIMALES"],".",".")." - ".number_format($result["VALOR_HASTA"],$result["DECIMALES"],".","."));
										}
									}
									?>
									</font>
                                  </td>
                                  <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="5%">
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
					<?php
					if (trim($result["ESTADO"] != "")) 
					{
						echo ($result["ESTADO"]);
					}
					else
					{
						echo ("&nbsp;");
					}
					?>
                    </font>
                    </td>
                                </tr>
    <?php
                }
                else
                {
                	$llave=$result["LLAVE_PRUEBA"];
                	$perfil=$result["LLAVE_PERFIL"];
                	$tipo=$result["TIPO"];
                	$alto=$result["VALOR_HASTA"];
                	 $res=$result["RESULTADO"];
				$bajo=$result["VALOR_DESDE"];
                if ($alto==0){
				    $color='#ffffff';}
				    else
				    {
				    if ($res==''){$color='#ffffff';}
				    else
				    {
				    if ($res<$alto && $res>$bajo){
				    $color='#ffffff';
				    }
				    else
				    {$color='#ed6d5a';}
				    }
				    }
    ?>              <tr><td colspan=6><IMG height=12 src="Imagenes/Transparente.gif" width=20></td></tr>
                    <tr>
                    <td bgcolor=#87CEFA colspan=6 height=10 valign=middle>
                    <div align="center">
                    <font color=#000000 face="Arial, Helvetica, sans-serif" size=2>
                    <b>
                    <?php echo (strtoupper($result["NOMBRE_FONASA"])); ?>
                    </b></font>
                    </div>
                    </td>
                    
                    </tr>
                    <?php 
					$VL_LlaveFonasa = $result["LLAVE_FONASA"]; 
					$llavefon .=$result["LLAVE_FONASA"]."-";
					?>

                                      
                    
                    <tr>
                    <td bgcolor=#3759a2 height=25 valign=middle width="40%">
                    <p>
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>&nbsp;</font>
                    <font color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
                    <img height=14 src="Imagenes/Carpeta.gif" width=20>EXAMEN</font>
                    </p>
                    </td>
                    <td bgcolor=#3759a2 height=25 align=center valign=middle width="20%">
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>RESULTADO</font>
                    </td>
                    <!-- <td bgcolor=#3759a2 height=10 align=center valign=middle width="5%"> 
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>DESVALIDA</font>
                    </td> -->
                    <td bgcolor=#3759a2 height=25 align=center valign=middle width="20%"> 
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>UNIDAD DE MEDIDA</font>
                    </td>
                    <td bgcolor=#3759a2 height=25 align=center valign=middle width="10%"> 
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>VALOR DE REFERENCIA</font>
                    </td>
                    <td bgcolor=#3759a2 height=25 align=center valign=middle width="10%">
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>ESTADO</font>
                    </td>
                    </tr>
                    <tr>
                   
                    <td bgcolor=#5c7ec3 height=25 valign=middle width="40%">
                    <p>
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1></font>
                    <font color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
                    <?php echo ($result["DESC_PRU"]); ?>
                    </font>
                    </p>
                    </td>
                   
                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="20%">
                    <input <?php if($result["ESTADO"]==' ' || $result["ESTADO"]==''||$result["ESTADO"]=='P'){}else{echo "readonly";}?> style="background-color:<?php echo $color;?>;" type="text" value="<?php echo ($result["RESULTADO"]); ?>" id="<?php ECHO $llave;?>" onChange="valor('<?php ECHO $llave;?>','<?php ECHO $perfil;?>','<?php ECHO $paciente;?>','<?php ECHO $tipo;?>','<?php ECHO $alto;?>','<?php ECHO $bajo;?>','<?php echo $result["ESTADO"];?>'); javascript: return false;">
                    </td>
                    
                    <!-- <td bgcolor=#5c7ec3 height=15 align=center valign=middle width="5%">
                    <input type="image" src="imagenes/cross.jpg" width="12" height="12" name="desvalidar" onclick="regresar()">
                    </td> -->
                    
                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="20%">
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
					<?php
					if (trim($result["UNIDADES_MEDIDA"] != "")) 
					{
						echo ($result["UNIDADES_MEDIDA"]);
					}
					else
					{
						echo ("&nbsp;");
					}
					?>
                    </font>
                    </td>
                   
                   
                   
                   
                   
                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="5%">
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
					<?php if (trim($result["RANGO_TEXTO"]) != "") 
					{
						echo ($result["RANGO_TEXTO"]);
					}
					else
					{
						if ((empty($result["VALOR_DESDE"])) or (trim($result["VALOR_DESDE"]) == ""))
						{
							echo ("-");
						}
						else
						{
							
	                    	echo (number_format($result["VALOR_DESDE"],$result["DECIMALES"],".",".")." - ".number_format($result["VALOR_HASTA"],$result["DECIMALES"],".","."));
						}
					}
					?>
					</font>
                    </td>
                    
                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="10%">
                    <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
					<?php
					if (trim($result["ESTADO"] != "")) 
					{
						echo ($result["ESTADO"]);
					}
					else
					{
						echo ("&nbsp;");
					}
					?>
                    </font>
                    </td>
                    
                    </tr>
                    
                    <?php $VL_Compara = $result["NOMBRE_FONASA"];
                } // Fin del Contenido Else
            } // Fin del Contenido While
    ?>
                                 
                              </table>
                            </TD>
                          </TR>
                          <TR> 
                            <TD vAlign=top width="90%">
                              <p><IMG height=12 src="Imagenes/Transparente.gif" width=20><BR>
                                <font size="2"><b>&nbsp;</b></font><b><br>
                                <font size="1">
                                &nbsp;ESTE INFORME NO CONSTITUYE DIAGN�STICO, CONSULTE A SU M�DICO TRATANTE.</font></b></p>
                            </TD>
                          </TR>
                          </TBODY> 
                        </TABLE>
                      </TD>
                    </TR>
                    <TR bgColor=#6e8fd4> 
                      <TD height=2 colspan="2" align=center> 
                          <FONT color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                <B>IMPORTANTE : EL RESULTADO DE ESTE EXAMEN TIENE VALIDEZ SOLO CON INTERPRETACION DEL MEDICO TRATANTE.</B>  <div align="center" class="current_page_item Estilo3"> <em>Un producto mas de Dicipa S.A de C.V.</em></div><BR>
                  </FONT>
                      </TD>
                    </TR>
                    </TBODY> 
                  </TABLE>
                 </TD>
                 </TR>
                 </TBODY>
                </TABLE>
             <!-- <center> <input type="button" value="Generar PDF" align="middle">&nbsp;<input type="button" value="Regresar" onclick=regresar()>&nbsp;<input type="button" value="Salir" onclick=salir()></center> -->
         </form>
          <STYLE type=text/css> {
        FILTER: DropShadow(Color='#000000', OffX=4, OffY=2, Positive=1); FONT: 10pt verdana,arial,helvetic; TEXT-DECORATION: none
    }
    A:hover {
        COLOR: #000000; FONT: 10pt verdana,arial,helvetic; TEXT-DECORATION: none
    }
    </STYLE>
          </TD></TR></TBODY></TABLE>
    <?php      
        }
        else 
        {
           ?>
            <BODY class=main text=#45acf6 vLink=#aaaaaa link=#45acf6 bgColor=black leftMargin=0 topMargin=0 marginheight="0" marginwidth="0">
            <h1 align="center" class="Estilo5"><br>
            SELECCI&Oacute;N DE FOLIOS </h1><br>
            <div align="center">
            <table width="90%" height="56" aling="center" border="1">
            <tr>
                <td><div align="center">
                  <p><font>No hay estudios liberados para este paciente &oacute; no existe el paciente</font></p>
                  <p><font>Por favor intentelo nuevamente</font></p>
                </div></td>
            </tr>
            <tr>
               <td height="25"><font color="#FFFFFF"><center><A HREF='../tabla.php'>- Volver Atr&aacute;s -</A></center></font></td> 
            </tr>
            </table>
            </div>
 <?php
        } 
        odbc_close($db_conn);


?>


<SCRIPT type="text/javascript">
function regresar()
{
	
	window.open("Resultadosxsec.php?Paciente=<?php echo $VL_Buscar;?>","_self","")
}
function validar()
{
	nombre = document.getElementById('resul[3]').value
	
	alert('Mensaje manejado con JavaScript '+ nombre);
    
}
function salir()
{
	
	window.open("../salir.php","_self","")
}
function click(e) {
    // Explorer
    if (IE)
    if (event.button == 2)
    {
        accion() ;
        return false ;
    }
    
    // Netscape
    if (NS)
    if (e.which == 3)
    {
        accion() ;
        return false ;
    }
}

function accion() {
    window.status = 'InfoWeb : Ficha de Resultados de Pacientes';
    if (IE)
        alert('Pulsaci�n de bot�n no permitida'); // Pulsaci�n de bot�n no permitida
        return ;
}

var NS = (document.layers) ;
var IE = (document.all) ;

if (NS) document.captureEvents(Event.MOUSEDOWN) ;
document.onmousedown = click ;
</SCRIPT>



</BODY></HTML>