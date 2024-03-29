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
  <title>Datos del Paciente</title>

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
  <?php
  $folio = $_GET['folio'];


  $sql = "SELECT dat_dfipa.fecha AS Fecha,dat_dfipa.idpaciente, dat_paciente.rfc,dat_paciente.rut,dat_paciente.CURP,dat_paciente.expediente,dat_paciente.telefono,
  dat_paciente.calle,dat_paciente.ciudad,dat_dfipa.numero AS Folio, dat_paciente.nombre ,dat_paciente.apellidos , dat_paciente.sexo as Sexo, ";
  $sql .= " dat_doctores.nombre + ' ' + dat_doctores.apellidos AS Medico ,  procedencia_muestra.id as procedencia, dat_paciente.fecha_nacimiento , dat_paciente.email,
  lab_tipo_paciente.codigo AS Tipo ";
  $sql .= " FROM         dat_dfipa INNER JOIN ";
  $sql .= " dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN ";
  $sql .= " dat_doctores ON dat_dfipa.doctor = dat_doctores.llave_doctor  INNER JOIN ";
  $sql .= " procedencia_muestra ON dat_dfipa.procedencia_muestra = procedencia_muestra.id INNER JOIN ";
  $sql .= "  lab_tipo_paciente ON dat_dfipa.tipo = lab_tipo_paciente.codigo ";
  $sql .= " WHERE     (dat_dfipa.numero=" . $folio . ") ";
  // echo $sql;
  $eje = odbc_exec($conection, $sql);
  $count = 0;
  while ($res = odbc_fetch_array($eje)) {
    $sexo = $res['Sexo'];
    $idpaciente = $res['idpaciente'];
    $nombre = $res['nombre'];
    $apellidos = $res['apellidos'];
    $fec = explode(" ", $res['fecha_nacimiento']);
    $fecs = explode("-", $fec[0]);
    $fm = $fecs[2] . "/" . $fecs[1] . "/" . $fecs[0];
    $calle = $res['calle'];
    $ciudad = $res['ciudad'];
    $telefono = $res['telefono'];
    $email=$res['email'];
    $rfc = $res['rfc'];
    $curp = $res['CURP'];
    $expe = $res['expediente'];
    $Rut = $res['rut'];
    $procedencia = $res['procedencia'];
    $tipo = $res['Tipo'];
  }
  ?>
  <input type="hidden" id="folio" value="<?php echo $folio ?>"></input>
  <form id="Paciente" method="post" name="Paciente" action="">
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td valign="top">
          <table class="Header" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
              <td class="th"><strong>Datos del Paciente</strong></td>
              <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <table height="150" cellpadding="0" cellspacing="0" class="Record">

      <tr class="Controls">
        <td class="th"><label id="LSexo" for="CitasSexo">Sexo:</label></td>
        <td><select id="Sexo" name="Sexo">
            <?php echo $sexo;
            if ($sexo == "M") {
              echo '<option value="M" selected>Masculino</option>
                  <option value="F">Femenino</option>';
            } else {
              echo '    <option value="M" >Masculino</option>
                  <option value="F" selected>Femenino</option>';
            } ?>

          </select></td>
        <td></td>
      </tr>

      <tr class="Controls">
        <td class="th"><label for="CitasNombres">Nombre de paciente:</label></td>
        <td><input name="nombre" id="CitasNombres" value="<?php echo $nombre; ?>" size="70"></td>
        <td></td>
      </tr>

      <tr class="Controls">

        <td>Fecha de Nacimiento: </td>
        <td><input type="text" id="Fecha" value="<?php echo $fm; ?>" name="theDate2"><img type="button" src="Styles/Core/Images/DatePicker.gif" onclick="displayCalendar(document.forms[0].theDate2,'dd/mm/yyyy',this)">A&ntilde;os<input id="anos" size="1" onBlur="calculaf()" value=0>Meses<input id="meses" size="1" value=0>Dias<input id="dias" size="1" value=0></td>
        <td></td>
      </tr>

      <tr class="Controls">
        <td class="th"><label for="telefono">Teléfono:</label></td>
        <td><input name="telefono" id="telefono" value="<?php echo $telefono; ?>" size="70"></td>
        <td></td>
      </tr>

      <tr class="Controls">
        <td class="th"><label for="correo">Correo:</label></td>
        <td><input name="email" id="email" value="<?php echo $email; ?>" size="70"></td>
        <td></td>
      </tr>

      <tr class="Controls">
        <td class="th"><label for="Doctor">M&eacute;dico:</label></td>
        <td><select id="Doctor" name="Doctor"> -->
            <?php
            //obtenemos la llave del doctor
            $sql = "select doctor from dat_dfipa where numero='" . $folio . "'";
            $query = odbc_exec($conection, $sql);

            while ($result = odbc_fetch_array($query)) {
              $doctor = $result['doctor'];
            }

            $sql = "select nombre + ' ' + apellidos as Nombre,llave_doctor from dat_doctores  order by Nombre ";
            $query = odbc_exec($conection, $sql);

            while ($result = odbc_fetch_array($query)) {
              if ($result['llave_doctor'] == $doctor) {
                echo '<option value="' . $result['llave_doctor'] . '" selected>' . $result['Nombre'] . '</option>';
              } else {
                echo '<option value="' . $result['llave_doctor'] . '">' . $result['Nombre'] . '</option>';
              }
            }
            ?>
          </select>
        </td>
      </tr>

      <tr class="Controls">
        <td class="th"><label for="Procedencia">Procedencia:</label></td>
        <td><select class="selectpicker" data-show-subtext="true" data-live-search="true" id="procedencia" name="procedencia"> -->
            <?php
            
            $sql = "select id,descripcion from procedencia_muestra order by descripcion";
            $query = odbc_exec($conection, $sql);

            while ($result = odbc_fetch_array($query)) {
              if ($result['id'] == $procedencia) {
                echo '<option value="' . $result['id'] . '" selected>' . $result['descripcion'] . '</option>';
              } else {
                echo '<option value="' . $result['id'] . '">' . $result['descripcion'] . '</option>';
              }
            }
            ?>
          </select>
        </td>
      </tr>


      <tr class="Controls">

        <td><input type="hidden" name="Rut" class="Row" id="Rut" value="<?php echo $Rut; ?>"></td>

      </tr>
    </table>

    <?php
    $sql = "SELECT     dat_dfipa.numero, dat_dfipa.idpaciente,caj_det_prestaciones.llave_fonasa, dat_paciente.nombre as NOMBRE, dat_paciente.apellidos as APELLIDOS, caj_codigos_fonasa.codigo_fonasa
    FROM         dat_dfipa INNER JOIN
                          caj_det_prestaciones ON dat_dfipa.idpaciente = caj_det_prestaciones.idpaciente INNER JOIN
                          dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN
                          caj_codigos_fonasa ON caj_det_prestaciones.llave_fonasa = caj_codigos_fonasa.llave_fonasa
    WHERE     (dat_dfipa.idpaciente = '" . $idpaciente . "')";
    $examenes = 0;

    $query = odbc_exec($conection, $sql);
    
    while ($result = odbc_fetch_array($query)) {
      $exa[$examenes] = $result["codigo_fonasa"];
      $examenes = $examenes + 1;
      $idpaciente = $result['idpaciente'];
      $nombre = $result['NOMBRE'] . " " . $result['APELLIDOS'];
      $folio = $result['numero'];
    }

    ?>
    <input id="folio" type="hidden" value="<?php echo $folio; ?>"></input>
    <input id="idpaciente" type="hidden" value="<?php echo $idpaciente; ?>"></input>
    
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td valign="top">

          <br></br>
          <form id="Citas" method="post" name="Citas" action="">
            <table class="Header" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
                <td class="th"><strong>Estudios</strong></td>
                <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
              </tr>
            </table>
            <table height="200" width="500" cellpadding="0" cellspacing="0" class="Record">
              <tr class="Controls">
                
                <td>
                <select class="selectpicker" data-show-subtext="true" data-live-search="true" size="5" style="width: 450px;" id="ExamenCatalogo" onchange="seleccionaEstudio()" >
                  <?php
                  ///estudios
                  $sql = "select codigo_fonasa,nombre,costo_examen as precio from caj_codigos_fonasa where activo='S' AND CODIGO_FONASA NOT LIKE 'ANTV%' order by CODIGO_FONASA ";
                  $query = odbc_exec($conection, $sql);
                  while ($result = odbc_fetch_array($query)) {
                    echo '<option value="' . $result['codigo_fonasa'] . '">' . $result['nombre'] . ' --> ' . $result['codigo_fonasa'] . '-->$' . $result['precio'] . '</option>';
                  }
                  //agrupaciones
                  $sql = "select codigo,descripcion,precio from agrupaciones where activo='S' order by id ";
                  $query = odbc_exec($conection, $sql);
                  while ($result = odbc_fetch_array($query)) {
                    echo '<option value="' . $result['codigo'] . '-">' . $result['descripcion'] . ' --> ' . $result['codigo'] . ' -->$' . $result['precio'] . '</option>';
                  }
                  ?>
                </select>
                </td>
                <td>
                  <input type="image" src="img/icons/flechder1.jpg" name="test" value=">>" onClick="Choose(); javascript: return false;" />
                  <input type="image" src="img/icons/flechizq1.jpg" name="test2" value="<<" onClick="unChoose(); javascript: return false;" />
                </td>
                <td>
                  <select name="ExamenSeleccionado" multiple="multiple" size="9" style="width: 500px;" id="ExamenSeleccionado">
                    <?php
                    for ($i = 1; $i <= $examenes; $i++) {
                      $sql = "select * from caj_codigos_fonasa where codigo_fonasa='" . $exa[$i - 1] . "' order by descripcion ";
                      $query = odbc_exec($conection, $sql);
                      while ($result = odbc_fetch_array($query)) {
                        echo '<option value="' . $result['codigo_fonasa'] . '">' . $result['nombre'] . ' --> ' . $result['codigo_fonasa'] . '</option>';
                      }
                    }
                    ?>
                  </select> <input type="hidden" name="examenes" value="" />
                </td>

              </tr>


            </table>

            <input type="image" src="img/icons/bagregpac.jpg" onClick="actualizafolio(<?php echo $idpaciente; ?>)" />



          </form>


</body>

</html>