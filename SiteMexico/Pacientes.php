<?php
/* ------------------------------------------------------+
 * datos primarios de proceso, bienen de la pagina padre |
 * corresponde a la primera llamada, la cual entrega:    |
 * IdProc, FI, FT por metodo GET o POST (reenvio)        |
 *-------------------------------------------------------+
 */
$Pachi = 0;
$VL_FecIni = ""; //"01/01/2000"; //$_GET['FI'];
$VL_FecTer = ""; //"01/12/2004"; //$_GET['FT'];
$VL_patron = "";
$VL_patron = "";

/* DEFINIR ESTILO DE LA CELDA AL ESTAR EL FOCO SOBRE ESTA */
$color_off = "#dfe6ef";
$color_on = "#C4DAFF";
//$estilo  = " onMouseOver=\"this.style.backgroundColor='".$color_on. "';\" ";
//$estilo .= " onMouseOut=\"this.style.backgroundColor='".$color_off."';\" ";
$estilo = "onMouseOver=\"efectoCELDA(this,'".$color_on."');\" onMouseOut=\"efectoCELDA(this,'".$color_off ."');\" ";

if (isset($_GET['IdProc']))
{
	$Pachi = $_GET['IdProc'];
	// rescatar rangos, fecha ini y fin .-
	if (isset($_GET['FI']))
		$VL_FecIni = $_GET['FI'];
	if (isset($_GET['FT']))
		$VL_FecTer = $_GET['FT'];
}
if (isset($_POST['IDPROC']))
{
   $Pachi = $_POST['IDPROC'];
   $VL_FecIni = $_POST['FI'];
   $VL_FecTer = $_POST['FT'];
}

// DATOS DE REENVIO DEL DOCUMENTO  .-
// CAMBIO DE PAGINA O PRESIONA BTN_ENVIA SIN CASILLAS SELECCIONADAS .-
//********************************************************************
$ERROR = 0;    //control de flujo .-
$pagina = 1;   //pagina actual .-
$paginas = 0;  //total de paginas a presentar .-

if (isset($_GET["pagina"]))
{
	$pagina  = $_GET["pagina"];
	$paginas = $_GET["paginas"];
//echo ("Pagina: $pagina Paginas: $paginas <br>");
}
else if (isset($_POST["txt_pag"]))
{
	$pagina  =  $_POST["txt_pag"];
	$paginas = $_POST["txt_pags"];
}

//echo ("Pagina: $pagina Paginas: $paginas <br>");


/* ANALISIS DE LA PAGINA ENVIADA COMO POST, desde el btn_envia
 * evaluar los contenidos de los chks, para
 * construir el arreglo, necesario para construir la paginacion de documentos PDF
 * de acuerdo a las filas seleccionadas.-
 *
 * El arreglo generado entrega un subarreglo, cuyo primer elemento posicion 0,
 * es el rut de la fila luego los distintos idpacientes contenidos .-
 *
 * Los resultados entregados por la consulta SQL, son desplegados en una tabla
 * paginda, de acuerdo a la variable $TAMANO_PAGINA, de esta forma, seran
 * generadas tantas paginas de resultado como sean necesarias, para contener
 * el total de filas obtenidas .
 *
 * La informacion a ser procesada, se encuentra definida en objetos hidden,
 * los cuales seran rescatados por metodo POST, en tanto la informacion
 * de pagina y total de paginas asi como la procedenaca, seran tratados
 * por GET .-
 *
 *DEPENDENCIAS:
 *    Libreria/conectarDB.php .-
 *    Archivos/Est_Pacientes.css
 *    SP: EXECUTE PAW_Selecciona_Folios idProcedencia (9), Rut (X), FchIni (X), Fchfin (X)
 */

session_cache_limiter('private'); 
session_start ();
// DESTRUIR CONTENEDOR DEL ARRAY .
if (isset($_SESSION["ARREGLO"]))
{
	unset ($_SESSION["ARREGLO"]);
}

// PAGINA DE REGRESO CON LAS CASILLAS CHEKADAS .-
extract($_REQUEST);
if (isset($_POST["txt_search"]))
{
	$VL_patron = $_POST["txt_search"];
}
else if (isset($_GET["patron"]))
{
	$VL_patron = $_GET["patron"];
}

if (isset($_REQUEST["btn_envia"]))
{
	//RECORRER LOS CHK .-
	$cont_mtz = 0;
	$matriz = array($cont_mtz); //inicializar la matriz .-
	$total_chks = 0;
	if (isset($_POST["txt_chks"]))
		$total_chks = $_POST["txt_chks"];

	for ($cont_1 = 0; $cont_1 < $total_chks; $cont_1++)
	{
		$cadena="chk_".$cont_1;
		if (isset($_POST[$cadena]))
		{
			$dato = $_POST[$cadena];
			if ($dato == "on")
			{
				// chk seleccionado, recuperar los rut y idpacientes != isset
				$cont_2 = 0;
				$cadena2 = $cadena."rutpaciente";
			
				$array_in = array($cont_2); //inicializar el array .-
				$array_in[$cont_2] = $_POST[$cadena2];
			
				$cadena2 = $cadena."idpaciente_".$cont_2;
				while(isset($_POST[$cadena2]))
				{
					$array_in[] = $_POST[$cadena2];  //asiganar los idpacientes .-
					$cont_2++;
					$cadena2 = $cadena."idpaciente_".$cont_2;
				}
				$matriz[$cont_mtz] = $array_in;
				$cont_mtz++;
			}
		}
	}

	if ($cont_mtz > 0)
	{
		// existen casillas chekadas, asignar arreglo a var SESSION y redirigir la pagina... .-
		if (isset($_SESSION["ARREGLO"]))
			$_SESSION["ARREGLO"] = $matriz;
		else
			$_SESSION["ARREGLO"] = $matriz;
		
		//PAGINA DONDE ENVIAR EL ARREGLO PARA SER PROCESADO .
		$ERROR = 3;
		//print_r($matriz );
	}
	else
	{
	// no selecciono ningun chk, retornar a pagina X, presentada
	// al momento de presionar el btn .-
		$ERROR = 0;
	}
// PAGINA ENVIADA DESDE EL BTN BUSCAR .-
}
else if (isset($_REQUEST["btn_search"]))
{
	// REALIZAR PAGINACION DE ACUERDO AL PATRON SOLICITADO .-
	if (!empty($_POST["txt_search"]))
		$VL_patron = $_POST["txt_search"];	
	// DESTRUIR CONTENEDOR DEL ARRAY .
	if (isset($_SESSION["INFO"]))
		unset ($_SESSION["INFO"]);
	
	$ERROR = 0;    //control de flujo .-
	$pagina = 1;   //pagina actual .-
	$paginas = 0;  //total de paginas a presentar .-
}

/******************************************************************************
 * LLEGADO A ESTE PUNTO, LA PAGINA A PRESENTAR SERA ESTA                     .-
 * EVALUAR QUE PAGINA DEBE MOSTRARSE, JUNTO AL CONJUNTO DE RESULTADOS        .-
 *                                                                           .-
 * ES POSIBLE QUE ESTE RETORNANDO DEL METODO POST, SIN CONTENIDOS CHEKADOS   .-
 * SI ES EL CASO ENTREGAR LA MISMA PAGINA PRESENTADA                         .-
 *                                                                           .-
 *24/06/2005                                                                 .-
 ******************************************************************************
 */

//echo ("error: $ERROR, patron: $VL_patron pagina: $pagina paginas: $paginas <br>");
//echo ("proc:$Pachi ini:$VL_FecIni ter:$VL_FecTer patron:$VL_patron  <br>");
if ($ERROR == 3)
{
	if (isset($_SESSION["ARREGLO"])) 
		header("Location: MasterImpGral.php?".SID);
	else
		header("Location: MasterImpGral.php?CadenaVacia");
}
else if ($ERROR == 0)
{
	//Limito la busqueda
	$TAMANO_PAGINA = 10;
	
	include ('Libreria/ConectarDB.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .
	$db_conn=conectarDB();
	
	$sql = "SISTEMA_WEB_ATENCIONES ";
	
	$SP = mssql_init($sql, $db_conn);
	//enviar parametros 'param' :
	mssql_bind($SP, "@Procedencia", $Pachi,SQLVARCHAR);
	mssql_bind($SP, "@FechaInicio", $VL_FecIni, SQLVARCHAR);
	mssql_bind($SP, "@FechaTermino", $VL_FecTer, SQLVARCHAR);
	mssql_bind($SP, "@Patron", $VL_patron, SQLVARCHAR);
	
	//$rs=mssql_query($sql,$db_conn) or exit("$SP");
	$rs = mssql_execute ($SP);

	$VL_rut = "";
	$VL_cont = 0;
	$INFO_in = array($VL_cont); // CONTRUIR ARREGLO DE RUTS.-

	while($result = mssql_fetch_array($rs))
	{
		if ($VL_rut != $result["idpaciente"])
		{
			$VL_rut = $result["idpaciente"];
			$VL_cont++;
			$INFO_in[$VL_cont] = $VL_rut;
		}
	}

    // CREAR SESSION CON LOS RUTS RESCATADOS .-
	if ($VL_cont > 0 )
	{
		$INFO_in[0] = $VL_cont;
		
		if (isset($_SESSION["INFO"]))
		{
			unset ($_SESSION ["INFO"]);
			$_SESSION["INFO"] = $INFO_in;
		}
		else
		{
			$_SESSION["INFO"] = $INFO_in;
		}
	}
	//cerramos el conjunto de resultado .-
	mssql_free_result($rs);
	
	//calculo el total de páginas a mostrar .-
	$paginas = ceil($VL_cont / $TAMANO_PAGINA);
}

?>
<html>
<head>
<title>Selección de pacientes</title>
<meta http-equiv="imagetoolbar" content="no">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<style type="text/css">
.FondoVentana {background-color: #003366}
.TituloInformacion {
	font-family:Verdana;
	font-size:12px;
	color:#FFFFFF;
	text-decoration:none;
	text-transform: uppercase;
	background-position: center center;
}
.Informacion {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
	font-style: normal;
	text-transform: uppercase;
}
.MensajeError {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 14px;
	font-style: italic;
	color: #0000CC;
}
</style>
<script>
/* METODO PARA ACTIVAR TODAS LAS CASILLAS A TRUE */
function selectTODOS(campo)
{
	var f = document.forms[0];
	var tot = f.txt_chks.value;
	var pos = 0;
	var sino = false;
	var cadena = "";
	
	if (campo.checked == true)
		sino = true;
	
	for (pos = 0; pos < tot; pos++)
	{
		cadena = "chk_" + pos;
		f.elements[cadena].checked = sino;
	}
}

/* METODO PARA ACTIVAR LA CASILLA DE LA CELDA ACTIVA */
function sobreTD(campo)
{
	var pos = campo.id;
	var etiqueta = parseInt(pos);
	var f = document.forms[0];
	var casilla = 'chk_' + etiqueta;
	var sino = false;
	
	if (f.elements[casilla].checked == false)
		sino = true;
	
	f.elements[casilla].checked = sino;
}

/* EFECTO : CAMBIO DE COLOR DE LA FILAS ACTIVA DE ACUERDO A LA POS DE LA CELDA */
function efectoCELDA(campo, color)
{	
	var ms = navigator.appVersion.indexOf("MSIE");
	
	var pos = campo.id;
	var cadena = parseInt(pos);
	etiqueta = '' + cadena +'A';
	
	if (ms<0)
	{
		// codigo para mozilla
		var celda1 = document.getElementById(etiqueta);
		etiqueta = '' + cadena + 'B';
		var celda2 = document.getElementById(etiqueta);
		etiqueta = '' + cadena + 'C';
		var celda3 = document.getElementById(etiqueta);
		etiqueta = '' + cadena + 'D';
		var celda4 = document.getElementById(etiqueta);
		etiqueta = '' + cadena + 'E';
		var celda5 = document.getElementById(etiqueta);
		etiqueta = '' + cadena + 'F';
		var celda6 = document.getElementById(etiqueta);
	}
	else if (ms > 0 )
	{
		// codigo para IE	
		var celda1 = document.all[etiqueta];
		etiqueta = '' + cadena + 'B';
		var celda2 = document.all[etiqueta];
		etiqueta = '' + cadena + 'C';
		var celda3 = document.all[etiqueta];
		etiqueta = '' + cadena + 'D';
		var celda4 = document.all[etiqueta];
		etiqueta = '' + cadena + 'E';
		var celda5 = document.all[etiqueta];
		etiqueta = '' + cadena + 'F';
		var celda6 = document.all[etiqueta];
	}
	celda1.style.backgroundColor=color;
	celda2.style.backgroundColor=color;
	celda3.style.backgroundColor=color;
	celda4.style.backgroundColor=color;
	celda5.style.backgroundColor=color;
	celda6.style.backgroundColor=color;
}
</script>
</head>

<BODY>
<table border="0" width="100%" height=100% border=0 cellspacing=0 cellpadding=0>
<tr height="24">
	<td background="Imagenes/Fondo.jpg" class="TituloInformacion">Seleccion de Pacientes</td>
</tr>
<tr height="12">
	<td background="Imagenes/FondoDegradadoAR.jpg" class="TituloInformacion">&nbsp;</td>
</tr>
<tr>
	<td bgcolor="#FFFFFF">
<?php
    /* CONSTRUCTOR DE LA PAGINA */
if (isset($_SESSION["INFO"]))
{
	$INFO_out=array();
	$INFO_out= $_SESSION["INFO"] ;
	
	$filas_fin= $TAMANO_PAGINA * $pagina + 1;  // ultima fila a recuperar .-
	$filas_ini= $filas_fin - $TAMANO_PAGINA;   // primero fila a recuperar .-
	
	if ($INFO_out[0] > 0 )
	{
		$VL_cont = 0;
		$VL_cont_in = null;
		?>
		<form action="pacientes.php" name="frm_pacientes" method="post">
		<TABLE width="95%" BORDER=1 align="center">
			<TR align="center" bgcolor="#0066CC" class="pagecurrent" height="20">
				<!-- CABECERAS TITULOS -->
				<Td width="3%" >&nbsp;</TD>
				<Td width="37%" noWrap><b class="TituloInformacion">Nombre del Paciente</b></Td>
				<Td width="11%" noWrap><b class="TituloInformacion">R.U.T.</b></Td>
				<Td width="13%" noWrap><b class="TituloInformacion">Fecha Examen</b></Td>
				<Td width="9%" noWrap><b class="TituloInformacion">Sexo</b></Td>
				<Td width="24%" noWrap><b class="TituloInformacion">Procedencia</b></Td>
				<Td width="3%" nowrap><input type="checkbox" name="chk_todos0" onclick="selectTODOS(this);" /></TD>
			</TR>
		<?php
		//recorrer todos los elementos de la matriz de ruts .-
		for ($cont_1=$filas_ini; $cont_1<$filas_fin; $cont_1++)
		{
		//controla no pasar del total de registros, para no tener celdas vacias .-
			if ($cont_1>$INFO_out[0])
			{
				break;
			}
			else
			{
				$sql = "SISTEMA_WEB_ATENCIONES ";
				$SP = mssql_init($sql, $db_conn);
				//enviar parametros 'param' :
				mssql_bind($SP, "@Procedencia", $Pachi, SQLVARCHAR);
				mssql_bind($SP, "@ID_PACIENTE", $INFO_out[$cont_1], SQLVARCHAR);
				mssql_bind($SP, "@FechaInicio", $VL_FecIni, SQLVARCHAR);
				mssql_bind($SP, "@FechaTermino", $VL_FecTer, SQLVARCHAR);
				
				$rs = mssql_execute ($SP);
				
				$VL_rut = "";
				$VL_salida ="\n";
				$VL_salida .="<TR height='20'>\n";
		
				$result = mssql_fetch_array($rs);
		
				while($result)
				{
					// 1er registro del rut solicitado .-
					if ($VL_rut=="")
					{
						$VL_rut = $result["idpaciente"];
						$VL_cont_in = 0;
						
						if ($result["sexo"] == "M")
							$VL_Imagen = "Hombre";
						else              
							$VL_Imagen = "Mujer";
						$cadena = "chk_".$VL_cont ;    //forma el nombre identificador de los obj hidden .-
						$VL_salida .= "<TD id='".$VL_cont."' bgcolor='#dfe6ef' class=Informacion align=middle><IMG alt='Paciente' src='Imagenes/".$VL_Imagen.".gif' border=0></TD>";
						$VL_salida .= "\n<TD bgcolor='#dfe6ef' class=Informacion vAlign=center onClick='sobreTD(this);' id='".$VL_cont."A' $estilo>";
						$VL_salida .= $result["nombre"]." ".$result["apellidos"]." </TD>";
						$VL_salida .= "\n<TD bgcolor='#dfe6ef' class=Informacion align=middle onClick='sobreTD(this);' id='".$VL_cont."B' $estilo>".$result["rut_paciente"]."</TD>";
						
						$fecha = $result["fecha"];//substr($result["fecha"],0,strpos($result["fecha"]," ")); //date('d-m-Y', substr($result["fecha"],10));
			
						$VL_salida .= "\n<TD bgcolor='#dfe6ef' class=Informacion align=middle onClick='sobreTD(this);' id='".$VL_cont."C' $estilo>".$fecha ."</TD>";
						$VL_salida .= "\n<TD bgcolor='#dfe6ef' class=Informacion align=middle onClick='sobreTD(this);' id='".$VL_cont."D' $estilo>";
						if ($result["sexo"]=="M")
							$VL_salida .= "Masculino";
						else              
							$VL_salida .= "Femenino";
						
						$VL_salida .= "</TD>";
						$VL_salida .= "\n<TD bgcolor='#dfe6ef' class=Informacion align=middle onClick='sobreTD(this);' id='".$VL_cont."E' $estilo>";
						$VL_salida .= "<SPAN>".$result["descripcion"]."</SPAN>";
						$VL_salida .= "</TD>";
						$VL_salida .= "\n<TD bgcolor='#dfe6ef' class=Informacion align=middle  id='".$VL_cont."F' $estilo >";
						$VL_salida .= "<input type='checkbox' name='".$cadena."'/>";
						$VL_salida .= "\n<input type='hidden' name='".$cadena."rutpaciente' value='$VL_rut'/>";
						$VL_salida .= "\n<input type='hidden' name='".$cadena."idpaciente_".$VL_cont_in."' value='".$result["idpaciente"]."'/>";
						$VL_cont++;
					}
					else
					{
						// registros restantes, siempre con el mismo rut, estos son hidden .-
						$VL_cont_in++;
						$VL_salida .= "\n<input type='hidden' name='".$cadena."idpaciente_".$VL_cont_in."' value='".$result["idpaciente"]."'/>";
					}
					$result = mssql_fetch_array($rs);
				}
				$VL_salida .= "</TD>\n</TR>";
				printf ($VL_salida);
				mssql_free_result($rs);
			}
		}
		// objetos para el control de flujo, tot casillas, pag actual, tot paginas .-
		$VL_salida ="\n<input type='hidden' name='txt_chks' value='$VL_cont'/>\n";
		$VL_salida .="\n<input type='hidden' name='txt_pag' value='$pagina'/>\n";
		$VL_salida .="\n<input type='hidden' name='txt_pags' value='$paginas'/>\n";
		$VL_salida .="\n<input type='hidden' name='IDPROC' value='$Pachi'/>\n";
		$VL_salida .="\n<input type='hidden' name='FI' value='$VL_FecIni'/>\n";
		$VL_salida .="\n<input type='hidden' name='FT' value='$VL_FecTer'/>\n";
		printf ($VL_salida);
		?>
			<TR>
				<TD height="2" colSpan=7 class=catend></TD> 
				<!--  < echo ($VL_cont); >   -->
			</TR>
			<tr>
				<Td width="3%" height="43" align=middle></TD>
				<Td class="Informacion" width="37%" noWrap bordercolor="#ffffff">&nbsp;PatrÓn de bÚsqueda&nbsp
				<input type="text" name="txt_search" size="20" value="<?php echo ($VL_patron); ?>"/>&nbsp;
				</Td>
				<Td width="11%" align=center noWrap bordercolor="#ffffff"><input type="submit" name="btn_search" value="Buscar"/></Td>
				<Td width="13%" align=middle noWrap></Td>
				<Td width="9%" align=middle noWrap></Td>
				<Td width="24%" align=center noWrap bordercolor="#ffffff"><input type="submit" name="btn_envia" value="Visualizar"/></Td>
				<Td width="3%" align=middle nowrap></TD>	
			</tr>
		</TABLE>
		</form>
		<?php
		//muestro los distintos índices de las páginas, si es que hay varias páginas
		if ($paginas > 1)
		{
			echo "<div class='Informacion'>Nº de Página [ ";
			for ($i=1;$i<=$paginas;$i++)
			{
				if ($pagina == $i)
				//si muestro el índice de la página actual, no coloco enlace
					echo $pagina . " ";
				else
				//si el índice no corresponde con la página mostrada actualmente, coloco el enlace para ir a esa página
					echo "<a href='pacientes.php?IdProc=$Pachi&FI=$VL_FecIni&FT=$VL_FecTer&pagina=$i&paginas=$paginas&patron=$VL_patron'>" . $i . "</a> ";
			}
			echo " ]<br></div>";
		}
	}
}
else
{
	echo("<br><br><center><b class='MensajeError'>No se encontraron registros de Pacientes<br><br>con la información entregada.</b></center><br><br>");
}

mssql_close ($db_conn);
session_write_close ();
?>
	</td>
</tr>
<tr height="14">
	<td background="Imagenes/FondoDegradadoAB.jpg" align="right" class="TituloInformacion"><img src="Imagenes/Pcs.gif" width="32" height="32"></td>
</tr>
</table>
</BODY>
</html>

