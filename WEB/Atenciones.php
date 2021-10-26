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
    
    body {
  padding-top: 50px;
  }
  .bootstrap-select {
    max-width: 900px;
  }
.bootstrap-select .btn {
  background-color: #fff;
  border-style: solid;
  border-left-width: 3px;
  border-left-color: #00DDDD;
  border-top: none;
  border-bottom: none;
  border-right: none;
  color: black;
  font-weight: 200;
  padding: 12px 12px;
  font-size: 16px;
  margin-bottom: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.bootstrap-select .dropdown-menu {
  margin: 15px 0 0;
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

</head>
<?php echo '<script type="text/javascript">',
     'window.addEventListener("load", function () {   precargar("EXAMEN MANEJADOR DE ALIMENTOS --> EMA -->$0","EMA-")  })',
     '</script>'
;?>
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
  <div class="container">
  <table class="Header" border="0" cellspacing="0" cellpadding="0" width="40%">
    <tr>
      <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
      <td class="th"><strong>Atenciones</strong></td>
      <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
    </tr>
  </table>
  <form action="" id="Atencion">  
  <table class="table table-bordered">
    <thead >
      <tr class="table-primary">
        <th >Nombre</th>
        <th >Sexo</th>
        <th >Edad</th>
        <th >Procedencia</th>
        <th >Médico</th>
        <th>Telefono</th>
        <th >Correo</th>
        <th >Forma de pago</th>
      </tr>
      
    </thead>
    <tbody>
    <tr>
      <td><input name="nombre" id="CitasNombres" value=""  required></td>          
              <td><select id="Sexo" name="Sexo" style="width:100%;" required>
                  <option value="" selected></option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  </select>
              </td>
              <td> <input type="text" name="edad" id="edad" onChange="cmbioEdad()" size="5"><input type="date" id="Fecha" value=""></td>
              <td><input type="text"  required id="CitasProcedencia" name="CitasProcedencia" style="width:100%; "></td>

              <td><select id="Doctor" name="Doctor" style="width:100%; " required>
                  <?php
                  $sql = "select concat_ws(' ',nombre ,apellidos) as Nombre,llave_doctor from dat_doctores order by Nombre ";
                  $resultado = $conection->query($sql);
                  while($r=$resultado->fetch_assoc()) {
                    echo '<option value="' . $r['llave_doctor'] . '">' . $r['Nombre'] . '</option>';
                  }
                  ?>
                </select>
              <td><input name="telefono" id="telefono" class="Controls" value="" style="width:98%; "></td>
              <td><input name="correo" id="correo" class="Controls" value="" style="width:98%; "></td>
              <td><select id="FormaPago" name="FormaPago" style="width:100%; ">
                  <option value="" selected></option>
                  <option value="efe">Efectivo</option>
                  <option value="tc">Tarjeta de crédito</option>
                  <option value="td">Tarjeta de debito</option>
                </select></td>
      </tr>
    </tbody>
    
  </form>     
     
</div>
<div class="container">
  <form id="Citas" method="post" name="Citas" action="guarda_atencion.php" onsubmit="Valida1()">
          <table class="Header" border="0" cellspacing="0" cellpadding="0" width="40%">
            <tr>
              <td class="HeaderLeft"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
              <td class="th"><strong>Estudios</strong></td>
              <td class="HeaderRight"><img border="0" alt="" src="Styles/Core/Images/Spacer.gif"></td>
            </tr>
          </table>
          <table height="90" cellpadding="0" cellspacing="0" class="Record" width="50">
            <tr class="Controls">


              <td style="width: 80;">
                <!--c-->
                <strong>Descripción</strong>
                <select class="selectpicker"  data-live-search="true" id="ExamenCatalogo" onchange="seleccionaEstudio()">
                  <?php
                  ///estudios
                  $sql = "select codigo_fonasa,nombre,costo_examen as precio from caj_codigos_fonasa where activo='S' AND CODIGO_FONASA NOT LIKE 'ANTV%' order by CODIGO_FONASA ";
                  $resultado = $conection->query($sql);
                  echo '<option value=""></option>';
                  while($r=$resultado->fetch_assoc()) {
                    echo '<option value="' . $r['codigo_fonasa'] . '">' . $r['nombre'] . ' --> ' . $r['codigo_fonasa'] . '-GI->$' . $r['precio'] . '</option>';
                  }
                  //agrupaciones
                  $sql = "select codigo,descripcion,precio from agrupaciones where activo='S' order by id ";
                  $resultado = $conection->query($sql);
                  while($r=$resultado->fetch_assoc()) {
                    echo '<option value="' . $r['codigo'] . '-">' .  $r['descripcion'] . ' --> ' . $r['codigo'] . ' -->$' . $r['precio'] . '</option>';
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
              <td align="center"><input type="hidden" class="btn btn-primary" value='Guardar'></td>
            </tr>

           </table>
        </form>
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