<?php
// RUTINA DE INICIO DE SESION DEL LOGON REALIZADO AL ENVIAR EL FRM .-
$ERROR = 1;
$MSG_ERROR = '';

if (isset($_REQUEST["btn_acceso"]))
{
	extract($_REQUEST);//extraigo todos los txt a variables locales


	if ((isset($usuario)) && (isset($contrasena)))
	{
		
		$regex = '([_a-z0-9-]{2,})+' . '$';

		// VALIDAR DATOS DE ENTRADA DE LOS CAMPOS DE TXT .-
		//$vl_usu = eregi("^[[:alnum:]]{2, 10}$", $usuario );
		//printf ('vl usu:' .$vl_usu);
		if (!eregi($regex, $usuario))
		{
			$ERROR = 1;
		}
		elseif (!eregi($regex, $contrasena))
			{
				$ERROR = 1;
			}
			else
			{
				$ERROR = 0;
			}
	}
	$MSG_ERROR='<font color="green">Atención : El Usuario, Folio de Anteción o Contraseña no son válidos. Reinténtelo.</font>';
	if ($ERROR == 1)
	{
		if (isset($_SESSION['autentificado']))
			$_SESSION["autentificado"] = "NO";
		session_unset();
	}
	else
	{
		// REALIZAR CONEXION CON LA BASE DE DATOS Y RESOLVER SI EL USUARIO ES VALIDO .-
		include ('ConectaP.php');
		$ERROR = 1;
		$ERROR = Conecta($usuario, $contrasena, $folio);
		// printf ('Error conecta : ' .$ERROR);
		// SERROR=1;
	}
	// print ('Session btn_acceso: ' . $_SESSION["autentificado"] );
}
else
{
	// CARGAR X PRIMERA VEZ .-
	session_start ();
	if (isset($_SESSION['autentificado']))
		$_SESSION["autentificado"] = "NO";
	session_unset();
	//print ('Session load frm: ' . $_SESSION["autentificado"] );
}

if ($ERROR == 0)
{
	// CARGAR PAGINA FORMULARIO
	// RUT, FOLIO, FECHA INICIO, FECHA TERMINO .-
	header ("Location: formulario.php");
	exit;
	//header("HTTP/1.0 404 Not Found");
}
else
{ ?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta http-equiv="imagetoolbar" content="no">
<title>Ingreso de Pacientes</title>
<script language="javascript" src="Libreria/xp_progress.js"></script>
<script>
	function F_IniciaConsulta()
	{
		bar1.showBar();
		bar1.togglePause();
		frm_control.submit()
	}
</script>

<style type=text/css>
.enlace{cursor:default;}
</style>
</head>

<body>
<img src="Imagenes/IngresoPaciente.jpg" width="503" height="463" style="position:absolute; left: 11px; top: 15px;" onMouseMove="">
<div style="font-size:19px; font:Tahoma; color:#FFFFFF; position:absolute; top: 20px; left: 28px; width: 108px; height: 26px;">Bienvenidos</div>
<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 408px; height: 21px; left: 59px; top: 81px;">Ingrese sus Apellidos, Número de Folio y Contraseña correspondiente. Como esta en su hoja de atencion</div>

<form name="frm_control" method="post" action="IngresoPaciente.php" target="_self">
<input name="usuario" type="Text" maxlength="50" size="14px" style="position:absolute; top: 190px; left: 245px; width: 84px; height: 20px;">
<input name="folio" type="text" maxlength="8" style="position:absolute; top: 233px; left: 245px; width: 72px; height: 20px;">
<input name="contrasena" type="password" maxlength="50" style="position:absolute; top: 275px; left: 245px; width: 111px; height: 20px;">
<input onclick="F_IniciaConsulta()" name="btn_acceso" value="Ingresar" type="submit" maxlength="12" style="position:absolute; top: 345px; left: 206px; width: 111px; height: 24px;">
</form>
<div style="font-size:11px; font:Tahoma; color:#848282; position:absolute; width: 400px; height: 16px; left: 19px; top: 460px;"><?php printf($MSG_ERROR); ?></div>
<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 329px; height: 20px; left: 100px; top: 404px;">
<script type="text/javascript">
	var bar1= createBar(300,15,'white',1,'lightblack','lightblue',185,7,1,"");
	bar1.togglePause();
	bar1.hideBar();
</script>
</div>
</body>
</html>
<?php
//<a class="enlace" name="btn_acceso" onClick='F_IniciaConsulta()'><input type="F_IniciaConsulta()" value="   Ingresar   " name="btn_acceso" /></a>
//	<input action="F_IniciaConsulta()" value="   Ingresar   " name="btn_acceso" /> // onclick="F_IniciaConsulta()" 75357909A
}
?>