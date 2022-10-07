<?php
session_start();
//header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado'] == "ok") {
} else {
  header("Location: index.php");
}
$ver_botones = "";
$fecha = date("d , M, y,  H:i a");
include("librerias/conection.php");


$ODBC = $_SESSION["ODBC"];
$conection = conectar($ODBC);
$fecha = date('d/m/Y');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>

  <meta content="text/html; charset=windows-1252" http-equiv="content-type">
  <title>Agregar medico</title>

  <style type="text/css">
    #ad {
      padding-top: 220px;
      padding-left: 10px;
    }

    #Citas table tr td .Record .Bottom td {
      text-align: left;
    }
  </style>
  <meta name="GENERATOR" content="CodeCharge Studio 4.2.00.040">
  <link rel="stylesheet" type="text/css" href="Styles/Core/Style_doctype.css">
  <script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
  <script language="javascript" type="text/javascript" src="js/mambo.js"></script>
  <script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
  <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
  <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.11.2/css/bootstrap-select.min.css'>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/js/bootstrap-select.min.js"></script>
  <link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen">
  </LINK>
  <script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
  <script language="javascript" type="text/javascript" src="js/mambo2.js"></script>
</head>

<body>

  <!-- BEGIN Record Citas -->

  <br></br>
  <form id="Medico" method="post" name="Medico" action="../guarda_d.php">
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td valign="top">
          <table class="Header" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
              <td class="th"><strong>Datos del Medico</strong></td>
              <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <table height="40" cellpadding="0" cellspacing="0" class="Record">

      
   
      <tr class="Controls">
        <td class="th"><label for="nombre">Nombre de medico:</label></td>
        <td><input name="nombre" id="nombre" value="<?php echo $nombre; ?>" size="40" required></td>
        <td><button type="button" class="btn btn-primary" onclick="GuardaMedico()">Agregar medico</button></td>
</tr>
      
    </table>

    
          </form>


</body>

</html>