<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<?php
$fecha = date("d , M, y,  H:i a");
?>

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
						include("librerias/conection.php");
						$conection = conectar();
						$fecha = date("Y-m-d");
						//pRIMERO vALIDO daTOS
						//	$centro= $_POST['centro'];
						$usuario = $_POST['usuario'];
						$password = $_POST['password'];
						//Aqui es donde valida el usuario
						$sql_1 = "SELECT * FROM lab_usuarios WHERE     (lab_usuarios.usuario = '" . $usuario . "') AND (lab_usuarios.clave = '" . $password . "')";
						echo $sql_1 ;
						$data = $conection->query($sql_1)->fetchAll();
						// and somewhere later:
						foreach ($data as $row) {
							$clave=$row['clave'];
						}		

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
							$msg = "entra";
						} elseif ($login == "" && $password == "") {
							$msg = "Sesion Cerrada!!. <a href=\"index.php\">Regresar.</a>";
						} else {


							$msg = 'Datos erroneos, por favor intentelo nuevamente!!. <a href="index.php">Intentelo de nuevo.</a>';
						}
						
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