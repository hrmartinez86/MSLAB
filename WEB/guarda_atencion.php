<script src="js/atencion.js"></script>
<?php
//include_once(RelativePath . "/Barra.php");
session_start();
header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado'] == "ok") {
} else {

  header("Location: ../index.php");
  echo "<html></html>";
}
include('Librerias/conection.php');
include_once('Librerias/consultas.php');

$ODBC = $_SESSION["ODBC"];

//dETERMINAMOS EL TIPO DE PACIENTE

//        echo $ODBC;
//$conection=conectar($ODBC);
$db_conn = conectar($ODBC);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Combrobante de Atenci&oacute;n</title>
</head>
<?php
//captura de variables post
$Tipo = htmlspecialchars($_POST["Tipo"]);
$Doctor = htmlspecialchars($_POST["Doctor"]);
$Expediente = htmlspecialchars($_POST["expediente"]);
$Sexo = htmlspecialchars($_POST["Sexo"]);
$nombre = htmlspecialchars($_POST["nombre"]);
$fecha_de_nacimiento = htmlspecialchars($_POST["theDate2"]);
$array_nacimiento = explode("-", $fecha_de_nacimiento);
$fecha_de_nacimiento=$array_nacimiento[2]."/". $array_nacimiento[1] ."/". $array_nacimiento[0];
$examenes = htmlspecialchars($_POST["examenes"]);
$examenesTotal =htmlspecialchars($_POST["examenesDescripcion"]);
echo $examenesTotal;
$Telefono=htmlspecialchars($_POST["telefono"]);
$Email=htmlspecialchars($_POST["correo"]);
$adelanto=htmlspecialchars($_POST['adelanto']);
$total=htmlspecialchars($_POST['precioTotal']);
$hoy = date("d/m/Y G:i:s");
$CitasProcedencia = htmlspecialchars($_POST["CitasProcedencia"]);
$formaPago=htmlspecialchars($_POST['FormaPago']);
$examenesArray = array();
$fechaEntrega=htmlspecialchars($_POST['fechaEntrega']);
$horaEntrega=htmlspecialchars($_POST['horaEntrega']);
$diagnostico=htmlspecialchars($_POST['diagnostico']);
$observaciones=htmlspecialchars($_POST['observaciones']);
$_SESSION['Tipo'] = $Tipo;
$_SESSION['nombre'] = $nombre;
$_SESSION['doctor'] = $Doctor;
$_SESSION['fechaEntrega']=$fechaEntrega;
$_SESSION['horaEntrega']=$horaEntrega;

if ($adelanto==$total) {
  $nota="PAGADO";
  $pendiente=0;
  $estatusCuenta='X';
}
else
{
  $nota="PENDIENTE";
  $pendiente=$total-$adelanto;
  $estatusCuenta='P';
}
$_SESSION['total']=$total;
$_SESSION['nota']=$nota;
$_SESSION['pendiente']=$pendiente;
$_SESSION['adelanto']=$adelanto;


//creamos el array
$datosPaciente = array($nombre, $Sexo, $Doctor);
// // //pRIMERO CHCO SI EXISTE O NO EL PACIENTE
if ($Expediente != '') {
  $sql_1 = "SELECT     TOP 1 *
    FROM         dat_paciente
    WHERE     (expediente = '" . $Expediente . "')";
  $query_result = odbc_exec($db_conn, $sql_1) or
    die("ERROR : No se puede ejecutar la consulta.");
}

if (odbc_num_rows($query_result) != 0) {
  //Si existe Paciente
  echo '<script> console.log("existe");</script>';
  while ($result = odbc_fetch_array($query_result)) {
  }
} else {
  //agregamos al paciente
  // echo "No existe el expediente " .$Expediente;
  $sql_1 = "SELECT CORRELATIVO_PACIENTES FROM CAJ_CORRELATIVOS";
  $query_result = odbc_exec($db_conn, $sql_1) or
    die("ERROR : No se puede ejecutar la consulta_CORRELATIVOS.");

  while ($result = odbc_fetch_array($query_result)) {
    $correPac = $result["CORRELATIVO_PACIENTES"];
    $correcPac = $correPac + 1;
  }

  //actualizamos el correlativo de paciente
  $sql_1 = "UPDATE CAJ_CORRELATIVOS SET CORRELATIVO_PACIENTES =" . $correcPac;
  $query_result = odbc_exec($db_conn, $sql_1) or
    die("ERROR : No se puede ejecutar la consulta.");

  $sql_1 = "INSERT INTO dat_paciente (cod_empresa, rut, expediente , nombre, apellidos, fecha_nacimiento, 
  calle, telefono, fono_urgencia, contraindicaciones, sexo, ciudad, fecha_ult_examen,curp,rfc,email) 
    VALUES (" . $_SESSION['empresa'] . ", '" . $correPac . "', '" . $Expediente . "','" . $nombre . "', 
    '" . $apellidos . "', convert(datetime,'" . $fecha_de_nacimiento . "',103), '" . $Direccion . "', '" . $Telefono . "', '', ''
    , '" . $Sexo . "', '1',  convert(datetime,GETDATE(),103), '" . $CitasCURP . "', '" . $CitasRFC . "','".$Email."')";

  $rut = $correPac;
  // echo $sql_1;
  $query_result = odbc_exec($db_conn, $sql_1) or
    die("ERROR : No se puede ejecutar la consulta_PACIENTE.<br>".odbc_error());
}
///aumento el correlativo de la atencion
$sql_1 = "SELECT par_correlativo FROM lab_parametros_sistema WHERE cod_empresa =" . $_SESSION['empresa'];
//echo $sql_1;
$query_result = odbc_exec($db_conn, $sql_1) or
  die("ERROR : No se puede ejecutar la consulta.3");

while ($result = odbc_fetch_array($query_result)) {
  $correF = $result["par_correlativo"];
  $correcF = $correF + 1;
}
//para el folio
$cod = str_pad($_SESSION['empresa'], 2, "0", STR_PAD_LEFT);
$folio = str_pad($correF, 6, "0", STR_PAD_LEFT);
$folio = $cod . $folio;
$factual = date("Ymd");
$fecha = date("d/m/Y");
$hora = date("H:i");
$idpaciente = $factual . $folio;
if ($fechan[1] != "") {
  //echo "lleno";
} else {
  //echo $fechan[0];
  $com = explode("/", $fechan[0]);
  $fechamod = $com[2] . "-" . $com[1] . "-" . $com[0];
  $fechan[0] = $fechamod;
}
$fecha_actual = date("Y-m-d");



$array_actual = explode("-", $fecha_actual);


$anos =  $array_actual[0] - $array_nacimiento[0]; // calculamos a�os

$meses = $array_actual[1] - $array_nacimiento[1]; // calculamos meses
$dias =  $array_actual[2] - $array_nacimiento[2]; // calculamos d�as

//ajuste de posible negativo en $d�as
if ($dias < 0) {
  --$meses;

  //ahora hay que sumar a $dias los dias que tiene el mes anterior de la fecha actual
  switch ($array_actual[1]) {
    case 1:
      $dias_mes_anterior = 31;
      break;
    case 2:
      $dias_mes_anterior = 31;
      break;
    case 3:
      if (bisiesto($array_actual[0])) {
        $dias_mes_anterior = 29;
        break;
      } else {
        $dias_mes_anterior = 28;
        break;
      }
    case 4:
      $dias_mes_anterior = 31;
      break;
    case 5:
      $dias_mes_anterior = 30;
      break;
    case 6:
      $dias_mes_anterior = 31;
      break;
    case 7:
      $dias_mes_anterior = 30;
      break;
    case 8:
      $dias_mes_anterior = 31;
      break;
    case 9:
      $dias_mes_anterior = 31;
      break;
    case 10:
      $dias_mes_anterior = 30;
      break;
    case 11:
      $dias_mes_anterior = 31;
      break;
    case 12:
      $dias_mes_anterior = 30;
      break;
  }

  $dias = $dias + $dias_mes_anterior;
}

if ($meses < 0) {

  $meses = $meses + 12;
}

//echo "<br>Tu edad es: $anos a�os con $meses meses y $dias d�as";

function bisiesto($anio_actual)
{
  $bisiesto = false;
  //probamos si el mes de febrero del a�o actual tiene 29 d�as
  if (checkdate(2, 29, $anio_actual)) {
    $bisiesto = true;
  }
  return $bisiesto;
}

//Actualizo el correlativo del folio
$sql_1 = "UPDATE lab_parametros_sistema SET par_correlativo =" . $correcF . " WHERE cod_empresa =" . $_SESSION['empresa'];
$query_result = odbc_exec($db_conn, $sql_1) or
  die("ERROR : No se puede ejecutar la consulta.1");

$final = array();
//rescatamos el listado de peticiones
$ex = explode(",", $examenes);
$j = count($ex);
//almacenamos el numero consecutivo diario
$numeroDiario=numeroDiario($fecha)+1;
// $_SESSION['numero']=$numeroDiario;
$folioComprobante=str_pad($numeroDiario, 3, "0", STR_PAD_LEFT);

echo "<script> console.log('".$numeroDiario."');</script>";

for ($i = 1; $i < $j; $i++) {
  $lastChar = substr($ex[$i], -1);
  //verificar si es agrupación
  if ($lastChar == '-') {
    $really = strlen($ex[$i]) - 1;
    $textoExam = substr($ex[$i], 0, $really);

    //buscamos los estudios de la agrupcion
    $sql_1 = "select ccf.codigo_fonasa from agrupaciones ag
      inner join agrupacion_examenes ae on ae.id_agrupacion=ag.id
      inner join caj_codigos_fonasa ccf on ccf.llave_fonasa=ae.llave_fonasa
      where ag.codigo='" . $textoExam . "'";

    $query_result = odbc_exec($db_conn, $sql_1) or
      die("ERROR : No se puede ejecutar la consulta.4");
    while ($result = odbc_fetch_array($query_result)) {
      $final[] = $result['codigo_fonasa'];
    }
  } else {
    $final[] = $ex[$i];
  }
}

$numFinal = count($final);
//insert a dat_dfipa
$sql_1 = "INSERT INTO dat_dfipa (cod_empresa, fecha, hora, numero,  
           rut, 
           idpaciente, 
           USUARIO_CREACION, 
           procedencia, 
           localizacion, 
           observacion_ficha, 
           tipo, 
           VERIFICA_INGRESO, 
           TIPO_DE_URGENCIA, 
           doctor, 
           MEDICO_ESCRITO, 
           hora_creacion, 
           anos, 
           meses, 
           dias, 
           comentario, 
           fecha_creacion, 
           procedencia_muestra, 
           autoriza_retiro, 
           turno, 
           ID_UNIDAD_PROCEDENCIA, 
           num_cama,
           numero_registro,
           total,
           anticipo,
           pendiente,
           cuentaEstado,
           fechaEntrega,
           horaEntrega,
           FormaPago,
           diagnostico) 
           vALUES (" . $_SESSION['empresa'] . ",
           convert(datetime,'" . $fecha . "',103) , 
           '" . $hora . "', 
           '" . $folio . "', 
           '" . $rut . "', 
           '" . $idpaciente . "', 
           '" . $_SESSION['nivel'] . "', 
           '0', 
           '0', 
           '".$observaciones."', 
           '" . $Tipo . "', 
           'K', 
           'R', 
           " . $Doctor . ", 
           '', 
           '17:17:39', 
           " . $anos . ", 
           " . $meses . ", 
           " . $dias . ", 
           '0',
           convert(datetime,'" . $fecha . "',103), 
           " . $CitasProcedencia . ", 
           '', 
           1, 
           0, 
           '',
           '" . $numeroDiario . "',
           ".$total.",
           ".$adelanto.",
           ".$pendiente.",
           '".$estatusCuenta."',
           convert(datetime,'". date("d/m/Y",strtotime($fechaEntrega))."',103),
           '".$horaEntrega."',
           '".$formaPago."',
           '".$diagnostico."')";


           $query_result = odbc_exec($db_conn, $sql_1) or
  die("ERROR : No se puede ejecutar la consulta.2" . odbc_errormsg() . $sql_1);

for ($i = 0; $i < $numFinal; $i++) {
  //--Para el Ingreso de los Estudios                 
  $sql_1 = "SELECT llave_fonasa FROM CAJ_codigos_fonasa where codigo_fonasa='" . trim($final[$i]) . "'
            and activo='S'";
  $query_result = odbc_exec($db_conn, $sql_1) or
    die("ERROR : No se puede ejecutar la consulta.4");

  while ($result = odbc_fetch_array($query_result)) {
    $llave = $result["llave_fonasa"];
  }

  ///hay que evaluar si es una agrupación
  $contEs=$i+1;
  $sql_1 = "INSERT INTO CAJ_DET_PRESTACIONES (cod_empresa,IDPACIENTE, ID, LLAVE_FONASA, VALOR_PARTICULAR, VALOR_PREVISION, VALOR_PAGADO, USUARIO_CREACION, FECHA_ENTREGA, URGENTE, FECHA_CREACION,LIBERADO) 
		            VALUES (" . $_SESSION['empresa'] . ", '" . $idpaciente . "', " . $contEs . ", " . $llave . ", 0, 0, 0, '" . $_SESSION['nivel'] . "', convert(datetime,'" . $fecha . "',103), '', CONVERT(DATETIME, GETDATE(), 103),'N' )";
  $query_result = odbc_exec($db_conn, $sql_1) or
    die("ERROR : No se puede ejecutar la consulta.5" . odbc_errormsg());

  $sql_1 = "SELECT llave_perfil From lab_relac_fonasa_perfil Where llave_fonasa = " . $llave;
  $query_result = odbc_exec($db_conn, $sql_1) or
    die("ERROR : No se puede ejecutar la consulta.6" . odbc_errormsg());
  while ($result = odbc_fetch_array($query_result)) {
    $perfil = $result["llave_perfil"];
  }

  $sql_1 = "Execute x_Sistema_Busca_Detalle_Perfil @xllave_per =" . $perfil;
  // echo "<br>.$sql_1.<br>";
  $query_result = odbc_exec($db_conn, $sql_1) or
    die("ERROR : No se puede ejecutar la consulta." . odbc_errormsg() . $sql_1);
  while ($result = odbc_fetch_array($query_result)) {
    $sql_1 = "INSERT INTO dat_dpcod (dat_dpcod.perfil, dat_dpcod.Llave_Perfil, dat_dpcod.prueba, dat_dpcod.Llave_prueba, dat_dpcod.cod_empresa, dat_dpcod.Idpaciente, dat_dpcod.usuario, dat_dpcod.fecha_creacion, dat_dpcod.resultado) 
			        	VALUES ('" . $result["perfil"] . "', " . $result["llave_perfil"] . ", '" . $result["prueba"] . "', " . $result["llave_prueba"] . ", " . $_SESSION['empresa'] . ", '" . $idpaciente . "', '" . $_SESSION['nivel'] . "', CONVERT(DATETIME, GETDATE(), 103), '' )";
    //			        	echo $sql_1." **";
    $query_result2 = odbc_exec($db_conn, $sql_1) or
      die("ERROR : No se puede ejecutar la consulta.8");
  }
}
/*********************************************************************************************************************/

?>
<link rel="stylesheet" type="text/css" href="Styles/Core/Style_doctype.css">

<body>
  <table align="center">
    <tr>
      <td><?php include("Header.html") ?></td>
    </tr>
  </table>

  <table width="800" align="center" class="Header" border="0" cellspacing="0" cellpadding="0">
    <tr>

      <td width="768" class="th">
        <div align="center"><strong> COMPROBANTE DE ATENCION</strong></div>
      </td>

    </tr>
  </table>
  <table align="center" width="800" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
            <td class="th"><strong>Fecha:<?php echo date("d/m/Y"); ?></strong></td>
            <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
          </tr>
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
            <td class="th"><strong>Folio:<?php echo $folioComprobante; ?></strong></td>
            <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
          </tr>
        </table>

        <table height="10" cellpadding="0" cellspacing="0" class="Record">

          <tr class="Controls">
            <td WIDTH=800>Fecha/Hora Creacion: <?php echo $fecha_actual . "-" . $hora; ?></td>
            <TD ALIGN="right" WIDTH=800>Teléfono:<?php echo $Telefono;?></TD>

          </tr>
          <tr class="Controls">
            <TD ALIGN="right" WIDTH=200> Nombre Completo: <?php echo $nombre . " " . $apellidos; ?></TD>
            <td WIDTH=500>Fecha de Nacimiento: <?php echo $fecha_de_nacimiento; ?> </td>


          </tr>
          <tr class="Controls">
            <TD ALIGN="right" WIDTH=200> Email: <?php echo $Email; ?></TD>
            <td WIDTH=500>Sexo: <?php if ($Sexo == "F") {
                                  echo "FEMENINO";
                                } else {
                                  echo "MASCULINO";
                                } ?> </td>


          </tr>

    </tr>
    <!--         <tr class="Controls">
         <TD ALIGN="right" WIDTH=200> Procedencia: <?php
                                                    $sql_1 = "SELECT     *
FROM         procedencia_muestra
WHERE     (id = " . $CitasProcedencia . ")";
                                                    $query_result = odbc_exec($db_conn, $sql_1) or
                                                      die("ERROR : No se puede ejecutar la consulta.9");
                                                    while ($result = odbc_fetch_array($query_result)) {
                                                      echo $result["descripcion"];
                                                    }
                                                    ?> </TD>
         <td WIDTH=500>Usuaro de Creaci&oacute;n: <?php echo $_SESSION['nivel']; ?> </td>
         

         </tr>
			-->


  </table>
  <table class="Header" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td width="32" class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
      <td width="768" class="th">
        <div align="center"><strong> EXAMENES</strong></div>
      </td>
      <td width="32" class="th"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif" /></td>
    </tr>
  </table>
  

  <table height="10" cellpadding="0" cellspacing="0" class="Record">
    <?php
    for ($i = 0; $i < count($examenesTotal); $i++) {

    ?>
      <tr class="Controls">
        <TD ALIGN="right" WIDTH=200> <?php echo $examenesTotal[$i];
                                      array_push($datosPaciente, $examenesTotal[$i]); ?></TD>

      </tr>
    <?php
    }
    echo "<input type='hidden' id='datosPaciente' value='" . json_encode($datosPaciente) . "'> </input>";
    $_SESSION['examenes'] = $examenesTotal;
    ?>
  </table>
  <br>
  <table class="Record">
    <tr class="Controls">
      <td><?php if ($formaPago!='') {

                  switch ($formaPago) {
                    case 'efe':
                      $descripcion="Efectivo";
                      break;
                    case 'tc':
                      $descripcion="Tarjeta de crédito";
                      break;
                    case 'td':
                      $descripcion="Tarjeta de debito";
                      break;
                    default:
                      $descripcion="";
                      break;
                  }
                  $_SESSION['formaPago']=$descripcion;
                  echo "Forma de pago:".$descripcion."<br>";
                }
      
                echo $nota."<br>";
                echo "Total->".$total."<br>";
                echo "Anticipo->".$adelanto."<br>";
                echo "Pendiente->".$pendiente."<br>";
                ?></td>
    </tr>

  </table>
  <form action="imprimirComprobante.php" method="post" id="ComprobanteAtencion">
    <table>
      <tr>
        <td>
          <input type="hidden" id="nombrePaciente" name="nombrePaciente" value="<?php echo $nombre;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="notaCuenta"  name="notaCuenta" value="<?php echo $nota;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="totalCuenta" name="totalCuenta" value="<?php echo $total;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="pendienteCuenta" name="pendienteCuenta" value="<?php echo $pendiente;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="adelantoCuenta" name="adelantoCuenta" value="<?php echo $adelanto;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="examenesCuenta" name="examenesCuenta" value="<?php  echo implode(",", $examenesTotal);?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="numeroCuenta" name="numeroCuenta" value="<?php  echo $numeroDiario;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="fpCuenta" name="fpCuenta" value="<?php  echo $formaPago;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="feCuenta" name="feCuenta" value="<?php  echo $fechaEntrega;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="heCuenta" name="heCuenta" value="<?php  echo $horaEntrega;?>">
        </td>
      </tr>
    </table>
  </form>
  <img title="Imprimir" onclick="ComprobanteAtencion()" width="32" height="32" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link4}" src="images/fileprint.gif">
  <a href="atenciones.php"><img title="Nueva Atenci&oacute;n" width="32" height="32" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link4}" src="images/regresar.jpg"></a>
  <a href="Main.php"><img title="Principal" width="32" height="32" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link4}" src="images/home.gif"></a>

  <a href="javascript:abrir_ventana('Etiqueta.php?num=<?php echo $correF; ?>','450','350')">
    <img title="Etiquetas de la atención" width="32" height="32" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link4}" src="images/codigo_b.png">
  </a>
  <script language="javascript">
    function abrir_ventana(url, largo, ancho) {

      window.open(url, '', 'top=50,left=150,width=' + largo + ',height=' + ancho + '');

    }
  </script>
</body>

</html>