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
//include("librerias/control_citas.php");

$ODBC = $_SESSION["ODBC"];
$conection = conectar($ODBC);

$fecha = date('d/m/Y');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
  <!--AQUI ES DONDE PONEMOS LA INFO PARA LA CAPTURA DE LOS ESTUDIOS "AUTOCOMPLETAR" -->

  <!-- TERMINA "AUTOCOMPLETAR" -->

  <!--c-->
  <script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
  <script language="javascript" type="text/javascript" src="js/mambo.js"></script>
  <script language="javascript" type="text/javascript" src="js/atencion.js"></script>

  <script type="text/javascript">
    // ]]&gt;
  </script>
  <meta content="text/html; charset=windows-1252" http-equiv="content-type">

  <title>**Atenciones**</title>
  <style type="text/css">
    #ad {
      padding-top: 220px;
      padding-left: 10px;
    }

    .button {
      -moz-appearance: none;
      -webkit-appearance: none;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: white;
      border: 1px solid #d3d6db;
      border-radius: 3px;
      color: #222324;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      font-size: 14px;
      height: 32px;
      -webkit-box-pack: start;
      -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      line-height: 24px;
      padding-left: 8px;
      padding-right: 8px;
      position: relative;
      vertical-align: top;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
      white-space: nowrap;
    }

    .button.is-white.is-outlined {
      background-color: transparent;
      border-color: #fff;
      color: #fff;
    }

    .button.is-info.is-outlined {
      background-color: transparent;
      border-color: #42afe3;
      color: #42afe3;
    }

    .button.is-info.is-outlined:hover,
    .button.is-info.is-outlined:focus {
      background-color: #42afe3;
      border-color: #42afe3;
      color: white;
    }

    #Citas table tr td .Record .Bottom td {


      text-align: left;
    }
  </style>
  <meta name="GENERATOR" content="CodeCharge Studio 4.2.00.040">

  <link rel="stylesheet" type="text/css" href="Styles/Core/Style_doctype.css">
  <link rel="icon" type="image/gif" href="../images/core/icon.png">
  <link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen">
  </LINK>
  <script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
  <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
  <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.11.2/css/bootstrap-select.min.css'>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/js/bootstrap-select.min.js"></script>
  <!--<link href="../css/bulma/css/bulma.css" rel="stylesheet" type="text/css" />-->
</head>

<body>
  <table align="center" border="0" cellspacing="0" cellpadding="0">
    <!-- BEGIN Record Citas -->
    <tr>
      <td valign="top">
        <?php 
        include("Header.html"); 
        $dia=date('d');
    // $dia=78;
if ($_SESSION['licencia']=='N'&& $dia<15) {
    echo '<h1>La licencia de MSLAB esta proxima a vencer</h1>';
}
if ($_SESSION['licencia']=='N'&& $dia>15) {
    echo '<h1>La licencia de MSLAB ya esta vencida</h1>';
    echo '<script>
    alert("Licencia MSLAB vencida!!!");
    window.open("main.php","_self","")
    </script>'
;
} ?>
      </td>
    </tr>
  </table>
  <p id="demo"></p>
  <br>
  <form id="Citas" method="post" name="Citas" action="guarda_atencion.php" onsubmit="Valida1()">
    <table align="center" border="0" cellspacing="0" cellpadding="10" width="60%">
      <tr>
        <td valign="top">
          <table class="Header" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
              <td class="th"><strong>Atenciones</strong></td>
              <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
            </tr>
          </table>

          <table cellpadding="0" cellspacing="0" class="Record">

            <tr class="Controls">
              <td class="th"><label for="CitasNombres">Nombre del paciente:</label></td>
              <td><input name="nombre" id="CitasNombres" value="" style="width:100%;" required></td>
              <td></td>
            </tr>

            <tr class="Controls">
              <td class="th"><label for="CitasSexo">Sexo:</label></td>
              <td><select id="Sexo" name="Sexo" style="width:100%;" required>
                  <option value="" selected></option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>

                </select></td>
              <td></td>
            </tr>

            <tr class="Controls">
              <td class="th"><label for="edad">Edad:</label></td>
              <td> <input type="text" id="edad" onChange="cmbioEdad()" >Años</td>

            </tr>
            <tr class="Controls">
              <td class="th"><label for="Fecha">Fecha de nacimiento:</label></td>
              <td><input required style="width:50%; " type="date" id="Fecha" value="<?php echo $fecha; ?>" name="theDate2"></td>
            </tr>

            <tr class="Controls">
              <td class="th"><label for="CitasProcedencia">Procedencia:</label></td>
              <td><select required id="CitasProcedencia" name="CitasProcedencia" style="width:100%; ">
                  <?php
                  echo '<option value="" </option>';
                  $sql = "select * from Procedencia_muestra where activo='S' order by descripcion ";
                  $query = odbc_exec($conection, $sql);
                  $cont = 0;
                  while ($result = odbc_fetch_array($query)) {
                    if ($result['descripcion'] =="EXTERNO") {
                      echo '<option  value="' . $result['id'] . '" selected>' . $result['descripcion'] . '</option>';
                    }
                    else{
                      echo '<option  value="' . $result['id'] . '">' . $result['descripcion'] . '</option>';
                    }
                    
                  }

                  ?>
                </select>

              </td>
              <td></td>
            </tr>

            <tr class="Controls">
              <td class="th"><label for="Tipo">Tipo de Paciente:</label></td>
              <td><select id="Tipo" name="Tipo" style="width:100%; " required>
                  <?php
                  echo '<option value="" </option>';
                  $sql = "select * from lab_tipo_paciente where clase='B' order by descripcion ";
                  $query = odbc_exec($conection, $sql);
                  while ($result = odbc_fetch_array($query)) {
                    if ($result['descripcion'] =="EXTERNO") {
                      echo '<option value="' . $result['codigo'] . '" selected>' . $result['descripcion'] . '</option>';
                    } else {
                      echo '<option value="' . $result['codigo'] . '">' . $result['descripcion'] . '</option>';
                    }
                  }
                  ?>
                </select>
              </td>
            </tr>

            <tr class="Controls">
              <td class="th"><label for="Doctor">M&eacute;dico:</label></td>
              <td><select id="Doctor" name="Doctor" style="width:100%; " required>
                  <?php
                  $sql = "select nombre + ' ' + apellidos as Nombre,llave_doctor from dat_doctores  order by Nombre ";
                  $query = odbc_exec($conection, $sql);
                  while ($result = odbc_fetch_array($query)) {
                    echo '<option value="' . $result['llave_doctor'] . '">' . $result['Nombre'] . '</option>';
                  }
                  ?>
                </select>
              </td>
            </tr>

            

            <tr class="Controls">
              <td class="th"><label for="Correo">Telefono:</label></td>
              <td><input name="telefono" id="telefono" class="Controls" value="" style="width:98%; "></td>

            </tr>

            <tr class="Controls">
              <td class="th"><label for="Correo">Email:</label></td>
              <td><input name="correo" id="correo" class="Controls" value="" style="width:98%; "></td>

            </tr>

            <tr class="Controls">
              <td class="th"><label for="FormaPago">Forma de pago:</label></td>
              <td><select id="FormaPago" name="FormaPago" style="width:100%; ">
                  <option value="" selected></option>
                  <option value="efe">Efectivo</option>
                  <option value="tc">Tarjeta de crédito</option>
                  <option value="td">Tarjeta de debito</option>
                </select></td>
              <td></td>
            </tr>

          </table>
          <br>
          <table class="Header" border="0" cellspacing="0" cellpadding="0" width="40%">
            <tr>
              <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
              <td class="th"><strong>Estudios</strong></td>
              <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
            </tr>
          </table>
          <table height="90" cellpadding="0" cellspacing="0" class="Record" width="50">
            <tr class="Controls">


              <td>
                <!--c-->
                <strong>Descripción</strong>
                <select class="selectpicker" data-show-subtext="true" data-live-search="true" size="5" style="width: 450px;" id="ExamenCatalogo"  onchange="seleccionaEstudio()">
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
                <input type="image" src="img/icons/flechder1.jpg" name="test" value=">>" onClick="Choose(); javascript: return false;" />


                <input type="image" src="img/icons/flechizq1.jpg" name="test2" value="<<" onClick="unChoose(); javascript: return false;" />
                <label for="fechaEntrega">Fecha de entrega:</label><input type="date" name="fechaEntrega" id="fechaEntrega"><input type="time" name="horaEntrega" id="horaEntrega">
              </td>
              <td></td>

    

            </tr>
            <tr class="Controls">

              <td style="width:10%">
                <select  name="ExamenSeleccionado" multiple="multiple" size="5" style="width: 900px;" id="ExamenSeleccionado" multiple required>
                </select> <input required type="hidden"  name="examenes" value="" /><input required type="hidden" name="examenesDescripcion">
              </td>
              <td>
                <table>
                  <tr>
                    <td><input type="text" name="precioTotal" id="precioTotal" value="0" size="5" >Total</td>
                  </tr>
                  <tr>
                    <td><input type="text" name="adelanto" id="adelanto" value="0" size="5" >Anticipo</td>
                  </tr>
                </table>
                
              </td>

            </tr>

          </table>
          <table align="center">
            <tr>
              <td align="center"><input id="guardar" type="submit" class="btn btn-primary" value='Guardar'></td>
            </tr>

           </table>
        </form>
 

  <script>
    function myFunction() {
      // creamos un variable que hace referencia al select
      //--c
      var select = document.getElementById("ExamenCatalogo");



      // obtenemos el valor a buscar

      var buscar = document.getElementById("buscar").value;

      console.log(select.options[4].text);

      // recorremos todos los valores del select

      for (var i = 1; i < select.length; i++)

      {

        if (select.options[i].text == buscar)

        {

          // seleccionamos el valor que coincide

          select.selectedIndex = i;

        }

      }
    }
  </script>
</body>

</html>