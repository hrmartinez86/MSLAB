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
include('Librerias/conection.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .   
include('librerias/consultas.php');
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
$Expediente = htmlspecialchars($_POST["Expediente"]);
$Sexo = htmlspecialchars($_POST["Sexo"]);
$nombre = htmlspecialchars($_POST["nombre"]);
$edad = htmlspecialchars($_POST["edad"]);
$fecha_de_nacimiento = htmlspecialchars($_POST["theDate2"]);
$array_nacimiento = explode("-", $fecha_de_nacimiento);
$fecha_de_nacimiento=$array_nacimiento[2]."/". $array_nacimiento[1] ."/". $array_nacimiento[0];
$examenes = htmlspecialchars($_POST["examenes"]);
$examenesTotal =json_decode($_POST["examenesDescripcion"],false);
$Telefono=htmlspecialchars($_POST["telefono"]);
$Email=htmlspecialchars($_POST["correo"]);
$hoy = date("d/m/Y");
$CitasProcedencia = htmlspecialchars($_POST["CitasProcedencia"]);
$examenesArray = array();
$_SESSION['Tipo'] = $Tipo;
$_SESSION['nombre'] = $nombre;
$_SESSION['doctor'] = $Doctor;
$n=rescataNumero();
$ns=$n+1;
$nc=str_pad($ns,3,"0",STR_PAD_LEFT);
echo "<script> console.log('".$nc."');</script>";
$json = file_get_contents("Ingreso.json");
$data = json_decode($json);
$array = Array (
  "{$n}" => Array (
      "id" => "{$nc}",
      "name" => $nombre,
      "doctor" => $Doctor,
      "tipo"=>$Tipo,
      "procedencia"=>$CitasProcedencia,
      "telefono"=>$Telefono,
      "email"=>$Email,
      "examenes" => $examenes,
      "edad" => $edad,
      "fecha"=>$hoy
  )  
);
$data[] = $array;
file_put_contents("Ingreso.json", json_encode($data));
// data strored in array
// // encode array to json
// $json = json_encode($array);
// $file="Ingreso".$n.".json";
// $bytes = file_put_contents($file, $json); 
// echo "The number of bytes written are $bytes.";
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
            <td class="th"><strong>Folio:<?php echo $nc; ?></strong></td>
            <?php actualizaNumero($n);?>
            <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
          </tr>
        </table>

        <table height="10" cellpadding="0" cellspacing="0" class="Record">

          <tr class="Controls">
            <td WIDTH=800>Fecha/Hora Creacion: <?php echo date("d/m/Y"); ?></td>
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
  <a href="imprimirComprobante.php" target="_blank"><img title="Imprimir" width="32" height="32" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" alt="{Link4}" src="images/fileprint.gif"></a>
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