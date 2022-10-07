<?php
	setlocale(LC_ALL, 'es-ES');
    if (isset($_GET['Paciente']) > 0) 
    {
        header("Location: Pacientes.php?IdProc=".$Paciente."&FI=".$VLF_FechaInicio."&FT=".$VLF_FechaTermino);
    }
    else
    {
    	$Paciente ='';
    }

    if (empty($VLF_Rut))
    {
		if (empty($VLF_Folio))
		{
			if (empty($VLF_CMC))
			{
        		$VL_Informacion = 0;
			}
			else
			{
				$VL_Informacion = 1;
			}
		}
		else
		{
			$VL_Informacion = 1;
		}
    }
    else
    {
        $VL_Informacion = 1;
    }
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta http-equiv="imagetoolbar" content="no">
<title>Selección de Pacientes</title>
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
.MensajeError {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 14px;
	font-style: italic;
	color: #0000CC;
}
</style>
</head>
<body>
<?php
    if ($VL_Informacion == 1)
    {
        include ('Libreria/ConectarDB.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .
        $db_conn=conectarDB();

        $sql = "SISTEMA_WEB_ATENCIONES ";
        $SP = mssql_init($sql, $db_conn);

		if (empty($VLF_Rut))
		{
			if (empty($VLF_Folio))
			{
		        $VL_CMC = $VLF_CMC;
		        mssql_bind($SP, "@CMCPACIENTE", $VL_CMC, SQLVARCHAR);
				// No debería pasar por aki
			}
			else
			{
		        $VL_Folio = $VLF_Folio;
		        mssql_bind($SP, "@Folio", $VL_Folio, SQLVARCHAR);
			}
		}
		else
		{
			if (empty($VLF_Folio))
			{
        		$VL_Rut = $VLF_Rut;
        		mssql_bind($SP, "@RUT_PACIENTE", $VL_Rut, SQLVARCHAR);
			}
			else
			{
        		$VL_Rut = $VLF_Rut;
		        $VL_Folio = $VLF_Folio;
		        mssql_bind($SP, "@RUT_PACIENTE", $VL_Rut , SQLVARCHAR);
		        mssql_bind($SP, "@Folio", $VL_Folio, SQLVARCHAR);
			}
		}
        $VL_FechaInicio = $VLF_FechaInicio;
        $VL_FechaTermino = $VLF_FechaTermino;
        
        mssql_bind($SP, "@FechaInicio", $VL_FechaInicio, SQLVARCHAR);
        mssql_bind($SP, "@FechaTermino", $VL_FechaTermino, SQLVARCHAR);

        $query_result= mssql_execute ($SP) or die("Error en la Transacción");

        if (mssql_num_rows($query_result)!=0) 
        { 
        ?>
			<img src="Imagenes/Demografia.jpg" width="503" height="463" style="position:absolute; left: 11px; top: 15px;"  alt="" border="0">
			<div style="font-size:19px; font:Tahoma; color:#FFFFFF; position:absolute; top: 20px; left: 28px; width: 196px; height: 25px;">Selecci&oacute;n de Folios</div>
			<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 408px; height: 21px; left: 59px; top: 81px;">Seleccione el Folio del paciente que desee visualizar.</div>

			<form name="form" method='POST' target = RUTA action='Ficha_Paciente.php'>
			<select id='Paciente' name='Paciente' align=right onchange='if(this[this.selectedIndex].value != -1) this.form.submit(); ' style="position:absolute; top: 336px; left: 206px; width: 167px; height: 20px;">
            <option value='-1'>Seleccione el Folio</option>
           <?php
           $VL_Numero="";
           while($result=mssql_fetch_array($query_result))
           {
                $Rut = $result["rut_paciente"];
                $Nombre = $result["nombre"]." ".$result["apellidos"];
				$CMC = $result["cmc"];
                $fecha = $result["fecha_nacimiento"];
				$fecha = substr($result["fecha_nacimiento"],0,10);
                $FechaNacimiento = $fecha;
                if ($result["sexo"] == "F")
				{
                    $Sexo = "FEMENINO";
					$VL_Imagen = "Mujer";
                }
				else
				{
                    $Sexo = "MASCULINO";
					$VL_Imagen = "Hombre";
                } 
            
                if ($VL_Numero != $result["numero"])
				{
                    echo("<option value=".$result["idpaciente"].">".$result["numero"]."</option>");
                    $VL_Numero=$result["numero"];
                }
           }
?>
			</select>
			<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 34px; height: 20px; left: 25px; top: 120px;"><IMG alt='Paciente' src='Imagenes/<?php echo ($VL_Imagen); ?>.gif' border=0></div>
			<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 118px; height: 20px; left: 207px; top: 171px;"><?php echo ($CMC); ?></div>
			<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 118px; height: 20px; left: 207px; top: 215px;"><?php echo ($Rut); ?></div>
			<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 118px; height: 20px; left: 207px; top: 257px;"><?php echo ($Sexo); ?></div>
			<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 118px; height: 20px; left: 207px; top: 299px;"><?php echo $FechaNacimiento; ?></div>
			<div style="font-size:14px; font:Tahoma; color:#848282; position:absolute; width: 285px; height: 20px; left: 207px; top: 129px;"><?php echo ($Nombre); ?></div>
            
        <?php
        }
        else
        {
		?>
			<table border="0" width="100%" height=100% border=0 cellspacing=0 cellpadding=0>
			<tr height="24">
				<td background="Imagenes/Fondo.jpg" class="TituloInformacion">&nbsp;Seleccion de Pacientes</td>
			</tr>
			<tr height="12">
				<td background="Imagenes/FondoDegradadoAR.jpg" class="TituloInformacion">&nbsp;</td>
			</tr>
			<tr>
				<td bgcolor="#FFFFFF">
				<br><br><center><b class='MensajeError'>No se encontraron registros con la informaci&oacute;n entregada.<br><br>
				<A HREF='javascript:history.back()'>- Volver Atr&aacute;s -</A></center></b></center><br><br>
				</td>
			</tr>
			<tr height="14">
				<td background="Imagenes/FondoDegradadoAB.jpg" align="right" class="TituloInformacion"><img src="Imagenes/Pcs.gif" width="32" height="32"></td>
			</tr>
			</table>
        <?php
        	mssql_close($db_conn);
        }
    }
    else
    { ?>
			<table border="0" width="100%" height=100% border=0 cellspacing=0 cellpadding=0>
			<tr height="24">
				<td background="Imagenes/Fondo.jpg" class="TituloInformacion">&nbsp;Seleccion de Pacientes</td>
			</tr>
			<tr height="12">
				<td background="Imagenes/FondoDegradadoAR.jpg" class="TituloInformacion">&nbsp;</td>
			</tr>
			<tr>
				<td bgcolor="#FFFFFF">
				<br><br><center><b class='MensajeError'>Debe Ingresar alguno de los parámetros para la búsqueda.<br><br>Tales como Procedencia, C.M.C., R.U.T. o FOLIO del Paciente<br><br>
				<A HREF='javascript:history.back()'>- Volver Atr&aacute;s -</A></center></b></center><br><br>
				</td>
			</tr>
			<tr height="14">
				<td background="Imagenes/FondoDegradadoAB.jpg" align="right" class="TituloInformacion"><img src="Imagenes/Pcs.gif" width="32" height="32"></td>
			</tr>
			</table>
        <?php
    }
        ?>
</form>
</body>
</html>
