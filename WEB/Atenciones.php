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


$conection = conectar();

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
        <?php include("Header.html") ?>
      </td>
    </tr>
  </table>
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
              <td> <input type="text" id="edad" onChange="cmbioEdad()" ></td>
              <td></td>
            </tr>
            <tr class="Controls">
              <td class="th"><label for="Fecha">Fecha de nacimiento:</label></td>
              <td><input required style="width:50%; " type="date" id="Fecha" value="<?php echo $fecha; ?>" name="theDate2"></td>
              <td></td>
            </tr>

            <tr class="Controls">
              <td class="th"><label for="CitasProcedencia">Procedencia:</label></td>
              <td><select required id="CitasProcedencia" name="CitasProcedencia" style="width:100%; ">
                  <?php
                  echo '<option value="" </option>';
                  $sql = "select * from Procedencia_muestra where activo='S' order by descripcion ";
                  $resultado = $conection->query($sql);
                  while($r=$resultado->fetch_assoc()) {
                    echo '<option  value="' . $r['id'] . '">' . $r['descripcion'] . '</option>';
                  }
                  ?>
                </select>

              </td>
              <td colspan="2" style="text-align:center;"><input type="button" class="btn btn-success" value="+" data-toggle="modal" data-target="#exampleModal"></td>
            </tr>

            <tr class="Controls">
              <td class="th"><label for="Tipo">Tipo de Paciente:</label></td>
              <td><select id="Tipo" name="Tipo" style="width:100%; " required>
                  <?php
                  echo '<option value="" </option>';
                  $sql = "select * from lab_tipo_paciente where clase='B' order by descripcion ";
                  $resultado = $conection->query($sql);
                  while($r=$resultado->fetch_assoc()) {
                    echo '<option value="' . $r['codigo'] . '">' . $r['descripcion'] . '</option>';
                  }
                  ?>
                </select>
              </td>
              <td colspan="2" style="text-align:center;"><input type="button" class="btn btn-success" value="+" data-toggle="modal" data-target="#exampleModal"></td>
            </tr>

            <tr class="Controls">
              <td class="th"><label for="Doctor">M&eacute;dico:</label></td>
              <td><select id="Doctor" name="Doctor" style="width:100%; " required>
                  <?php
                  $sql = "select concat_ws(' ',nombre ,apellidos) as Nombre,llave_doctor from dat_doctores order by Nombre ";
                  $resultado = $conection->query($sql);
                  while($r=$resultado->fetch_assoc()) {
                    echo '<option value="' . $r['llave_doctor'] . '">' . $r['Nombre'] . '</option>';
                  }
                  ?>
                </select>
              </td>
              <td colspan="2" style="text-align:center;"><input type="button" class="btn btn-success" value="+" data-toggle="modal" data-target="#exampleModal"></td>
            </tr>

            

            <tr class="Controls">
              <td class="th"><label for="Correo">Telefono:</label></td>
              <td><input name="telefono" id="telefono" class="Controls" value="" style="width:98%; "></td>
              <td></td>
            </tr>

            <tr class="Controls">
              <td class="th"><label for="Correo">Email:</label></td>
              <td><input name="correo" id="correo" class="Controls" value="" style="width:98%; "></td>
              <td></td>
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
                <select class="selectpicker" data-show-subtext="true" data-live-search="true" size="5" style="width: 450px;" id="ExamenCatalogo" multiple="multiple">
                  <?php
                  ///estudios
                  $sql = "select codigo_fonasa,nombre,costo_examen as precio from caj_codigos_fonasa where activo='S' AND CODIGO_FONASA NOT LIKE 'ANTV%' order by CODIGO_FONASA ";
                  $resultado = $conection->query($sql);
                  while($r=$resultado->fetch_assoc()) {
                    echo '<option value="' . $r['codigo_fonasa'] . '">' . $r['nombre'] . ' --> ' . $r['codigo_fonasa'] . '-GI->$' . $r['precio'] . '</option>';
                  }
                  //agrupaciones
                  $sql = "select codigo,descripcion,precio from agrupaciones where activo='S' order by id ";
                  $resultado = $conection->query($sql);
                  while($r=$resultado->fetch_assoc()) {
                    echo '<option value="' . $r['codigo'] . '-">' . $r['descripcion'] . ' --> ' . $r['codigo'] . ' -->$' . $r['precio'] . '</option>';
                  }
                  ?>
                </select>
                <input type="image" src="img/icons/flechder1.jpg" name="test" value=">>" onClick="Choose(); javascript: return false;" />


                <input type="image" src="img/icons/flechizq1.jpg" name="test2" value="<<" onClick="unChoose(); javascript: return false;" />
              </td>
              <td></td>

    

            </tr>
            <tr class="Controls">

              <td style="width:10%">
                <select  name="ExamenSeleccionado" multiple="multiple" size="5" style="width: 900px;" id="ExamenSeleccionado" multiple required>
                </select> <input required type="hidden"  name="examenes" value="" /><input required type="hidden" name="examenesDescripcion">
              </td>
              <td><input type="text" id="precioTotal" value="0" size="5" readonly>Total</td>

            </tr>

          </table>
          <table align="center">
            <tr>
              <td align="center"><input type="submit" class="btn btn-primary" value='Guardar'></td>
            </tr>

           </table>
        </form>
  <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="">
          <p>kokkook</p>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>                

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