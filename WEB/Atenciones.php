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

  <meta name="GENERATOR" content="CodeCharge Studio 4.2.00.040">

  <!-- <link rel="stylesheet" type="text/css" href="Styles/Core/Style_doctype.css"> -->
  <link rel="icon" type="image/gif" href="../images/core/icon.png">
  </LINK>
  <!-- <script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script> -->
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
    <section class="content">
      <div class="row">
        <div class="col-lg-5 col-xs-12">
          
          <div class="box box-success">
            
            <div class="box-header with-border"></div>

            <form role="form" method="post" class="formularioVenta">

              <div class="box-body">
    
                <div class="box">

                  <!--=====================================
                  ENTRADA DEL VENDEDOR
                  ======================================-->
              
                  <div class="form-group">
                  
                    <div class="input-group">
                      
                      <span class="input-group-addon"><i class="fa fa-user"></i></span> 

                      <input type="text" class="form-control" id="nuevoVendedor" value="<?php echo $_SESSION["nombre"]; ?>" readonly>

                      <input type="hidden" name="idVendedor" value="<?php echo $_SESSION["id"]; ?>">

                    </div>

                  </div> 

                  <!--=====================================
                  ENTRADA DEL PACIENTE
                  ======================================-->
                  <!-- expediente del paciente -->
                  <div class="form-group">
                  
                    <div class="input-group">
                      
                      <span class="input-group-addon"><i class="fa fa-address-book"></i></span> 

                      <input type="text" class="form-control" id="nuevoExpediente" value="" placeholder="Expediente">

                    </div>

                  </div> 

                  <!-- Nombre del paciente -->
                  
                  <div class="form-group">
                  
                    <div class="input-group">
                      
                      <span class="input-group-addon"><i class="fa fa-address-card"></i></span> 

                      <input type="text" class="form-control" id="nuevoPaciente" value="" placeholder="Nombre completo del paciente">

                    </div>

                  </div> 

                  <!-- sexo del paciente -->
                  
                  <div class="form-group">
                  
                    <div class="input-group">
                      
                      <span class="input-group-addon"><i class="fa fa-address-card"></i></span> 

                      <select class="form-control" id="seleccionarSexo" name="seleccionarSexo" required>
                        
                        <option value="" >Sexo del paciente</option>  

                        <option value="M" >Masculino</option>  

                        <option value="F" >Femenino</option>    

                      </select>

                    </div>

                  </div> 

                  <!-- fecha de nacimiento del paciente -->
                  <div class="form-group">
                  
                    <div class="input-group">
                      
                      <span class="input-group-addon"><i class="fa fa-address-card"></i></span> 

                      <input type="text" class="form-control" id="nuevoFechaNacimiento" value="" placeholder="Fecha de nacimiento">

                    </div>

                  </div> 

                  <!--=====================================
                  ENTRADA DEL parametros de la atención
                  ======================================--> 
                  <!-- Tipo de paciente -->
                  
                  <div class="form-group">
                  
                    <div class="input-group">
                      
                      <span class="input-group-addon"><i class="fa fa-address-card"></i></span> 

                      <select class="form-control" id="seleccionarTipoPaciente" name="seleccionarTipoPaciente" required>
                        
                        <option value="" >Tipo de paciente</option>  

                        <option value="1" >Urgencias</option>  

                        <option value="2" >Rutina</option>    

                      </select>

                    </div>

                  </div> 

                  <!-- Doctor tratante -->
                  
                  <div class="form-group">
                  
                    <div class="input-group">
                      
                      <span class="input-group-addon"><i class="fa fa-address-card"></i></span> 

                      <select class="form-control" id="seleccionarDoctor" name="seleccionarDoctor" required>
                        
                        <option value="" >Doctor tratante</option>  

                        <option value="1" >Dr Ruben Martinez</option>  

                        <option value="2" >Dr xxxxxxxxxxxxxx</option>    

                      </select>

                    </div>

                  </div> 

                  <!--=====================================
                  ENTRADA DEL CLIENTE 
                  ======================================--> 

                  <div class="form-group">
                    
                    <div class="input-group">
                      
                      <span class="input-group-addon"><i class="fa fa-users"></i></span>
                      
                      <select class="form-control" id="seleccionarCliente" name="seleccionarCliente" required>

                      <option value="">Seleccionar cliente</option>

                      </select>
                      
                      <span class="input-group-addon"><button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#modalAgregarCliente" data-dismiss="modal">Agregar cliente</button></span>
                    
                    </div>
                  
                  </div>

                  <!--=====================================
                  ENTRADA PARA AGREGAR PRODUCTO
                  ======================================--> 

                  <div class="form-group row nuevoProducto">

                  

                  </div>

                  <input type="hidden" id="listaProductos" name="listaProductos">

                  <!--=====================================
                  BOTÓN PARA AGREGAR PRODUCTO
                  ======================================-->

                  <button type="button" class="btn btn-default hidden-lg btnAgregarProducto">Agregar producto</button>

                  <hr>

                  <div class="row">

                    <!--=====================================
                    ENTRADA IMPUESTOS Y TOTAL
                    ======================================-->
                    
                    <div class="col-xs-8 pull-right">
                      
                      <table class="table">

                        <thead>

                          <tr>
                            <th hidden="true">Impuesto</th>
                            <th>Total</th>      
                          </tr>

                        </thead>

                        <tbody>
                        
                          <tr>
                            
                            <td style="width: 50%">
                              
                              <div class="input-group">
                            
                                <input type="hidden" class="form-control input-lg" min="0" id="nuevoImpuestoVenta" name="nuevoImpuestoVenta" placeholder="0" >

                                <input type="hidden" name="nuevoPrecioImpuesto" id="nuevoPrecioImpuesto" >

                                <input type="hidden" name="nuevoPrecioNeto" id="nuevoPrecioNeto" >

                                <!--<span class="input-group-addon"><i class="fa fa-percent"></i></span>-->
                          
                              </div>

                            </td>

                            <td style="width: 50%">
                              
                              <div class="input-group">
                            
                                <span class="input-group-addon"><i class="ion ion-social-usd"></i></span>

                                <input type="text" class="form-control input-lg" id="nuevoTotalVenta" name="nuevoTotalVenta" total="" placeholder="00000" readonly required>

                                <input type="hidden" name="totalVenta" id="totalVenta">
                                
                          
                              </div>

                            </td>

                          </tr>

                        </tbody>

                      </table>

                    </div>

                  </div>

                  <hr>

                  <!--=====================================
                  ENTRADA MÉTODO DE PAGO
                  ======================================-->

                  <div class="form-group row">
                    
                    <div class="col-xs-6" style="padding-right:0px">
                      
                      <div class="input-group">
                    
                        <select class="form-control" id="nuevoMetodoPago" name="nuevoMetodoPago" required>
                          <option value="">Seleccione método de pago</option>
                          <option value="Efectivo">Efectivo</option>
                          <option value="TC">Tarjeta Crédito</option>
                          <option value="TD">Tarjeta Débito</option>                  
                        </select>    

                      </div>

                    </div>

                    <div class="cajasMetodoPago"></div>

                    <input type="hidden" id="listaMetodoPago" name="listaMetodoPago">

                  </div>

                  <br>
        
                </div>

            </div>

            <div class="box-footer">

              <button type="submit" class="btn btn-primary pull-right">Guardar venta</button>

            </div>

            </form> 

          </div>
              
        </div>
      </div>
    </section>
    
    <div class="form-group">
      <label for=""></label>
      <input type="email" class="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="">
      <small id="emailHelpId" class="form-text text-muted">Help text</small>
    </div>
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
              <td colspan="1" class="th"><label for="expediente">Expediente:</label></td>
              <td colspan="3"><input name="expediente" id="expediente" value="" style="width:100%;"></td>
            </tr>

            <tr class="Controls">
              <td colspan="1" class="th"><label for="nombre">Nombre del paciente:</label></td>
              <td colspan="3"><input name="nombre" id="nombre" value="" style="width:100%;" required></td>
            </tr>

            <tr class="Controls">
              <td colspan="1"class="th"><label for="CitasSexo">Sexo:</label></td>
              <td colspan="3"><select id="Sexo" name="Sexo" style="width:100%;" required>
                  <option value="" selected></option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>

                </select></td>
            </tr>

            <tr class="Controls">
              <td colspan="1" class="th"><label for="edad">Edad:</label></td>
              <td colspan="3"> <input type="text" id="edad" onChange="cmbioEdad()" >Años</td>
            </tr>

            <tr class="Controls">
              <td colspan="1"class="th"><label for="Fecha">Fecha de nacimiento:</label></td>
              <td colspan="3"><input required style="width:50%; " type="date" id="Fecha" value="<?php echo $fecha; ?>" name="theDate2"></td>
            </tr>

            <tr class="Controls">
              <td colspan="1" class="th"><label for="CitasProcedencia">Procedencia:</label></td>
              <td colspan="3"><select required id="CitasProcedencia" name="CitasProcedencia" style="width:100%; ">
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
            </tr>

            <tr class="Controls">
              <td colspan="1"class="th"><label for="Tipo">Tipo de Paciente:</label></td>
              <td colspan="3"><select id="Tipo" name="Tipo" style="width:100%; " required>
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
              <td colspan="1"class="th"><label for="Doctor">M&eacute;dico:</label></td>
              <td colspan="3"><select id="Doctor" name="Doctor" style="width:100%; " required>
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
              <td colspan="1"class="th"><label for="telefono">Telefono:</label></td>
              <td colspan="3"><input name="telefono" id="telefono" class="Controls" value="" style="width:98%; "></td>

            </tr>

            <tr class="Controls">
              <td colspan="1" class="th"><label for="Correo">Email:</label></td>
              <td colspan="3" ><input name="correo" id="correo" class="Controls" value="" style="width:98%; "></td>

            </tr>

            <tr class="Controls">
              <td colspan="1" class="th"><label for="FormaPago">Forma de pago:</label></td>
              <td colspan="3"><select id="FormaPago" name="FormaPago" style="width:100%; ">
                  <option value="" selected></option>
                  <option value="efe">Efectivo</option>
                  <option value="tc">Tarjeta de crédito</option>
                  <option value="td">Tarjeta de debito</option>
                </select>
              </td>
              
            </tr>

            <tr class="Controls">
              <td colspan="1" class="th"><label for="Diagnostico">Diagnostico:</label></td>
              
              
              <td colspan="3"><input name="diagnostico" id="diagnostico" class="Controls" value="" style="width:98%; "></td>
              
             
            </tr>
            
            <tr class="Controls">
              <td colspan="1" class="th"><label for="observaciones">Observaciones:</label></td>
              <td colspan="3"><input name="observaciones" id="observaciones" class="Controls" value="" style="width:98%; "></td>

            </tr>

            <tr class="Controls">
              <td colspan="1" class="th"><label for="urgente">Urgente:</label>
              <input type="checkbox" name="urgente" id="urgente" class="Controls" value="" style="width:98%; "></td>
              <td colspan="2" class="th"><label for="whatsapp">WhatsApp:</label>
              <input type="checkbox" name="whatsapp" id="whatsapp" class="Controls" value="" style="width:98%; "></td>        
              <td colspan="1" class="th"><label for="correoOp">Correo:</label>
              <input type="checkbox" name="correoOp" id="correoOp" class="Controls" value="" style="width:98%; "></td>        
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
                <select class="selectpicker" virtualScroll="true" data-live-search="true" id="ExamenCatalogo"  onchange="seleccionaEstudio()">
                  <?php
                  ///estudios
                  $sql = "select codigo_fonasa,nombre,costo_examen as precio,nivel_1,dias_proceso  from caj_codigos_fonasa where activo='S' AND CODIGO_FONASA NOT LIKE 'ANTV%' order by CODIGO_FONASA ";
                  $query = odbc_exec($conection, $sql);
                  while ($result = odbc_fetch_array($query)) {
                    echo '<option value="' . $result['nombre'] . ' --> ' . $result['codigo_fonasa'] . '-->' . $result['precio'] . '-->' . $result['nivel_1'] . '-->' . $result['dias_proceso'] . '">' . $result['codigo_fonasa'] . ' --> '  . $result['nombre'] .  '</option>';
                  }
                  //agrupaciones
                  $sql = "select codigo,descripcion,precio from agrupaciones where activo='S' order by id ";
                  $query = odbc_exec($conection, $sql);
                  while ($result = odbc_fetch_array($query)) {
                    echo '<option value="' . $result['codigo'] . '-">' . $result['descripcion'] . ' --> ' . $result['codigo'] . ' -->' . $result['precio'] . '</option>';
                  }
                  ?>
                </select>
               
              </td>
              <td><input type="text" name="adelanto" id="adelanto" value="0" size="5" >Anticipo</td><td><input type="text" name="precioTotal" id="precioTotal" value="0" size="5" >Total</td>

    

            </tr>
            <tr class="Controls">

              <td colspan="3">
              <table id="tablaExamen">
                <tr>
                  <th></th>
                  <th>Codigo</th>
                  <th>Estudio</th>
                  <th>Precio</th>
                  <th>Fecha Entrega</th>
                  <th>FUR</th>
                </tr>

              </table>
              </td>
                <input required type="hidden" id="examenes" name="examenes" value="" /><input required type="hidden" id="examenesDescripcion" name="examenesDescripcion">
              
            </tr>

          </table>
          <table align="center">
            <tr>
              <td align="center"><input type="submit" class="btn btn-primary" value='Guardar'></td>
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