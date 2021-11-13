<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<?php
$fecha = date("d , M, y,  H:i a");
?>

<!--

Design by Free CSS Templates
http://www.freecsstemplates.org
Released for free under a Creative Commons Attribution 2.5 License

Title      : Puzzled
Version    : 1.0
Released   : 20080706
Description: A wide two-column design suitable for blogs and small websites.

-->
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Sistema Web Informatico de Análisis Clinico</title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<link href="default.css" rel="stylesheet" type="text/css" />
	<style type="text/css">
		<!--
		.Estilo1 {
			font-size: 24px
		}

		.Estilo3 {
			font-family: "Times New Roman", Times, serif
		}
		-->

	</style>
</head>

<body>
	<!-- start header -->
	<!-- end header -->
	<div id="headerbg">

	</div>
	<!-- start page -->
	<div id="page">
		<!-- start content -->
		<div id="content">
			<!-- start latest-post -->
			<div id="latest-post" class="post">
				<h3 class="title"></h3>
				<p class="meta"><small>Fecha <?php echo $fecha; ?><br />
					</small></p>
				<div class="entry">
					<p style="text-align:center;">
						<?php
						@session_start();
						@session_destroy();
						@session_start();
						@header("Cache-control: private");

						include("librerias/conection.php");
						$conection = conectar();
						$fecha = date("Y-m-d");
						//pRIMERO vALIDO daTOS
						//	$centro= $_POST['centro'];
						$usuario = $_POST['usuario'];
						$password = $_POST['password'];

						//Aqui es donde valida el usuario


						//$sql_1="select * from procedencia_muestra where descripcion='".$login."' and codigo='".$password."' and id=".$id;
						//		$sql_1= "SELECT lab_procedencia.ODBC as ODBC ,descripcion,codigo FROM lab_procedencia WHERE     (lab_procedencia.descripcion = '" .$centro. "')";
						//		$re =  odbc_exec($conection,$sql_1) or die ("no hay resultados");
						$ODBC = "laboratorio";
						$empresa = 1;
						$nombre = "laboratorio";
						$sql_1 = "SELECT * FROM lab_usuarios WHERE     (lab_usuarios.usuario = '" . $usuario . "') AND (lab_usuarios.clave = '" . $password . "')";
						$re =  odbc_exec($conection, $sql_1) or die("no hay resultados");
						//		echo $sql_1 ;
						$clave = odbc_result($re, "clave");
						$nivel = odbc_result($re, "usuario");
						$nombre2 = "";
						$apellidos = "";
						$conec = odbc_connect($ODBC, "sa", "") or die("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA BASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");

						$sql_1 = "SELECT * FROM lab_usuarios WHERE     (lab_usuarios.usuario = '" . $usuario . "') AND (lab_usuarios.clave = '" . $password . "')";
						$re =  odbc_exec($conec, $sql_1) or die("no hay resultados");
						//$msg = "<a href=\"tabla.php?FI=2009-03-18&ff=2009-03-18\">Bienvenido: " . $CENTRO . "  >></a>";
						$nivel = odbc_result($re, "usuario");
						$clave = odbc_result($re, "clave");
						$perfil = odbc_result($re, "perfil");

						if ($nivel == '') {
							$msg = 'Este usuario no pertenece al Centro!!. <a href="index.php">Intentelo de nuevo.</a>';
						} else {
							$msg = "entra";
						}

						echo $nivel . $nombre;

						if ($password == $clave) {

							$_SESSION['estado'] = "ok"; //Coloco la variable de sesión 'estado'
							$_SESSION['nombre'] = $nombre;
							$_SESSION['paciente'] = $nombre2;
							$_SESSION['apellidos'] = $apellidos;
							$_SESSION['login'] = $usuario;
							$_SESSION['passport'] = $password;
							$_SESSION['nivel'] = $nivel;
							$_SESSION['ODBC'] = $ODBC;
							$_SESSION['empresa'] = $empresa;
							$_SESSION['perfil']=$perfil;
							//$_SESSION['usuario']=$nombreU;        
						} elseif ($login == "" && $password == "") {
							$msg = "Sesion Cerrada!!. <a href=\"index.php\">Regresar.</a>";
						} else {


							$msg = 'Datos erroneos, por favor intentelo nuevamente!!. <a href="index.php">Intentelo de nuevo.</a>';
						}
						//echo $centro;
						//if ($centro==''){$msg = 'Datos erroneos, por favor intentelo nuevamente!!. <a href="index.php">Intentelo de nuevo.</a>';}
						// $carpeta = "XML/".$nombre."/";

						// if($carpeta<>"XML//" or $carpeta<>"")
						// {
						// eliminar_recursivo_contenido_de_directorio( $carpeta ) ;
						// }	
						// //función que elimina recursivamente todo el contenido de un directorio dado 
						// function eliminar_recursivo_contenido_de_directorio( $carpeta ){ 
						// @$directorio = opendir($carpeta); 
						// while ($archivo = @readdir($directorio)){ 
						// if( $archivo !='.' && $archivo !='..' ){ 
						// //si es un directorio, volvemos a llamar a la función para que elimine el contenido del mismo 
						// if ( is_dir( $carpeta.$archivo ) ) eliminar_recursivo_contenido_de_directorio( $carpeta.$archivo ); 
						// //si no es un directorio, lo borramos 
						// @unlink($carpeta.$archivo); 
						// } 
						// } 
						// @closedir($directorio); 
						// } 

						/**********************************************************************************************************************************************************/
						?>


						<?php
						if ($msg == "entra") {
							echo '
<p align="center"><img src="images/espera.gif" width="48" height="48" /></p>
		      <p align="center" class="Estilo3">Por favor espere
		      <p align="center" class="Estilo3">Se esta validando el usuario</p>';

							echo '
<script language="javascript">
			  window.open("WEB/Main.php","_self","");	
</script>
';
						} else {
							echo $msg;
						}

						//echo $msg;
						?>


					</p>
					</form>

					</p>
				</div>
			</div>
			<!-- end latest-post -->
			<!-- start recent-posts -->
			<!-- end recent-posts -->
		</div>
		<!-- end content -->
		<!-- start sidebar -->
		<div id="sidebar">
			<div align="center" class="current_page_item Estilo3"> <em>Un producto mas de MultiSystems</em></div>
		</div>
		<!-- end sidebar -->
	</div>
	<!-- end page -->
	<div id="footer">
		<p id="legal">&copy;2008 MultiSystems S.A. de C.V., All Rights Reserved. Designed by <a href="http://www.MultiSystems.com.mx">T.I</a></p>
		<p id="links"><a href="http://www.deltalab.com.mx/bioquimica">Principal</a>&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; <a href="#">Terms</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="http://validator.w3.org/check/referer" title="This page validates as XHTML 1.0 Transitional"><abbr title="eXtensible HyperText Markup Language">XHTML</abbr></a> &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="http://jigsaw.w3.org/css-validator/check/referer" title="This page validates as CSS"><abbr title="Cascading Style Sheets">CSS</abbr></a></p>
	</div>
</body>

</html>


<?PHP /****************************************************************************************************************************************************/ ?>

<html>

<head>
	<title>:: Valida ::</title>
</head>

<body>

</body>

</html>