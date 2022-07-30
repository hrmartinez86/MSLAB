/*
 * Content code
 * @package Mambo Open Source
 * @Copyright (C) 2000 - 2003 Miro International Pty Ltd
 * @ All rights reserved
 * @ Mambo Open Source is Free Software
 * @ Released under GNU/GPL License : http://www.gnu.org/copyleft/gpl.html
 * @version $Revision: 1.16 $
 */

function validateSchema(msg) {
  try {
    ///verifica el nombre de paciente
    nombre = document.getElementById("nombre").value;
    if (nombre == "") {
      return "Favor de ingresar el nombre del paciente";
    }
    ///verifica el sexo de paciente
    sexo = document.getElementById("Sexo").value;
    if (sexo == "") {
      return "Favor de ingresar el sexo del paciente";
    }
    ///verifica el sexo de paciente
    fechaNacimiento = document.getElementById("Fecha").value;
    if (fechaNacimiento == "") {
      return "Favor de ingresar la fecha de nacimiento";
    }
    ///verifica que existan estudios en la orden
    var table = document.getElementById("tablaExamen");
    console.log(table.rows.length);
    if (table.rows.length < 2) {
      return "Favor de ingresar estudios al paciente";
    }

    ///recupera los codigos de los estudios
    var codigos = "";
    var descripciones = "";
    for (var i = 1; i < table.rows.length; i++) {
      console.log(table.rows[i].cells[2].innerHTML);
      codigos += ", " + table.rows[i].cells[2].innerHTML;
      descripciones += ", " + table.rows[i].cells[3].innerHTML;
    }
    console.log(codigos);
    examenes = document.getElementById("examenes");
    examenesDescripcion = document.getElementById("examenesDescripcion");

    examenes.value = codigos;
    examenesDescripcion.value = descripciones;
    return "S";
  } catch (error) {
    console.log(error);
    return "N";
  }
}
function guardaAtencion() {
  let schemavalidate;
  schemavalidate = validateSchema();
  if (schemavalidate == "S") {
    document.getElementById("Citas").submit();
    console.log("exito");
  } else {
    alert(schemavalidate);
  }
}
function habilitaInput() {
  console.log("habilita");
  document.getElementById("doctorNombres").disabled = false;
  document.getElementById("botonDoctor").disabled = false;
  document.getElementById("doctorNombres").focus();
}
function myFunction(x) {
  alert("Row index is: " + x.rowIndex);
}
function ActualizaPrecioEstudio(llave, valor) {
  var xhttp = new XMLHttpRequest();
  console.log("http" + llave + "=" + valor);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // document.getElementById("demo").innerHTML = this.responseText;
      console.log("completado!!!");
    }
  };
  xhttp.open(
    "GET",
    "../guardaPrecio.php?llave=" + llave + "&precio=" + valor,
    true
  );
  xhttp.send();

  window.close();
}
function calculoPrecios() {
  table = document.getElementById("tablaExamen");
  totalcuenta = 0;
  // table rows
  for (var i = 1; i < table.rows.length; i++) {
    codigo = table.rows[i].cells[2].innerHTML;
    precio = document.getElementById(codigo).value;
    console.log(precio);
    totalcuenta = parseInt(totalcuenta) + parseInt(precio);
    console.log(
      table.rows[i].cells[3].innerHTML + table.rows[i].cells[4].innerHTML
    );
  }
  console.log("total:" + totalcuenta);
  document.getElementById("precioTotal").value = totalcuenta;
  document.getElementById("adelanto").value = totalcuenta;
}
function addRow(tableID, codigo, estudio, precio, fecha, fur, precioTotal) {
  // Get a reference to the table
  let tableRef = document.getElementById(tableID);
  console.log(precioTotal);
  // Insert a row at the end of the table
  let newRow = tableRef.insertRow(-1);

  // Insert a cell in the row at index
  let newBtn = newRow.insertCell(0);
  let newBtnPrecio = newRow.insertCell(1);
  let newCodigo = newRow.insertCell(2);
  let newEstudio = newRow.insertCell(3);
  let newPrecio = newRow.insertCell(4);
  let newDate = newRow.insertCell(5);
  let newFur = newRow.insertCell(6);
  // Append a text node to the cell
  let newCodigoText = document.createTextNode(codigo);
  let newEstudioText = document.createTextNode(estudio);
  let newPrecioText = document.createElement("input");
  newPrecioText.value = precio;
  newPrecioText.disabled = false;
  newPrecioText.id = codigo;

  let btn = document.createElement("button");
  btn.type = "button";
  btn.name = "estudioCodigo";
  btn.onclick = function () {
    // alert("Row index is: ");
    // document.getElementById(tableID).deleteRow(1);
    var table = document.getElementById(tableID),
      rIndex,
      cIndex;

    // table rows
    for (var i = 1; i < table.rows.length; i++) {
      // row cells
      for (var j = 0; j < table.rows[i].cells.length; j++) {
        table.rows[i].cells[j].onclick = function () {
          rIndex = this.parentElement.rowIndex;
          cIndex = this.cellIndex + 1;
          //borramos el renglon
          if (cIndex === 1) {
            let confirmAction = confirm(
              "Desea eliminar el estudio " + estudio + "?"
            );
            if (confirmAction) {
              // alert("Action successfully executed");
              console.log("Row : " + rIndex + " , Cell : " + cIndex);
              console.log(
                document.getElementById(tableID).rows[rIndex].cells[3].innerHTML
              );
              console.log(document.getElementById(codigo).value);
              resta = document.getElementById(codigo).value;
              var totalInput = document.getElementById("precioTotal");
              console.log(totalInput.value);
              precioTotal = totalInput.value - resta;
              var anticipoInput = document.getElementById("adelanto");
              totalInput.value = precioTotal;
              anticipoInput.value = precioTotal;
              document.getElementById(tableID).deleteRow(rIndex);

              console.log(precioTotal);
            }
          }
        };
      }
    }
    // pregunta si desea eliminar el renglon
    console.log();
    return false;
  };

  let DateText = document.createElement("input");
  DateText.type = "date";
  DateText.value = fecha;
  
  let DateTextFur = document.createElement("input");
  DateText.type = "date";
  DateText.value = fecha;

  btn.innerHTML = "-";
  btn.title = "Eliminar estudio";

  let btnPrecio = document.createElement("button");
  btnPrecio.type = "button";
  btnPrecio.name = "estudioCodigo";
  btnPrecio.onclick = function () {
    console.log("cambio de precio");
    var table = document.getElementById(tableID),
      rIndex,
      cIndex;

    // table rows
    for (var i = 1; i < table.rows.length; i++) {
      // row cells
      for (var j = 0; j < table.rows[i].cells.length; j++) {
        table.rows[i].cells[j].onclick = function () {
          rIndex = this.parentElement.rowIndex;
          cIndex = this.cellIndex + 1;
          // cambiamos el precio
          console.log(cIndex);
          if (cIndex === 2) {
            let confirmAction = confirm(
              "Desea realizar el cambio de precio de " + estudio + "?"
            );
            if (confirmAction) {
              // alert("Action successfully executed");
              console.log("Row : " + rIndex + " , Cell : " + cIndex);
              console.log(
                document.getElementById(tableID).rows[rIndex].cells[3]
                  .innerHTML +
                  document.getElementById(tableID).rows[rIndex].cells[2]
                    .innerHTML +
                  document.getElementById(tableID).rows[rIndex].cells[4]
                    .innerHTML
              );
              console.log(codigo);
              console.log(document.getElementById(codigo).value);
              precioModificar = document.getElementById(codigo).value;
              //update de precio
              ActualizaPrecioEstudio(codigo, precioModificar);
              calculoPrecios();
            }
          }
        };
      }
    }
    // pregunta si desea eliminar el renglon
    console.log();
    return false;
  };
  btnPrecio.innerHTML = "$";
  btnPrecio.title = "Cambiar el precio del estudio";

  newCodigo.appendChild(newCodigoText);
  newEstudio.appendChild(newEstudioText);
  newPrecio.appendChild(newPrecioText);
  newBtn.appendChild(btn);
  newBtnPrecio.appendChild(btnPrecio);
  newDate.appendChild(DateText);
  if (fur == 1) {
    newFur.appendChild(DateTextFur);
  }
}
/******************************************************************************/
/* Funcion Choose()		                                                      */
/* Escribe de un listbox a otro un determinado option con su value.           */
/* No recibe ningun parametro.			                                      */
/******************************************************************************/
function seleccionaEstudio() {
  mySelect = document.getElementById("ExamenCatalogo");
  Choose();
  mySelect.selectedIndex = -1;
}
function objetoAjax() {
  var xmlhttp = false;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }

  if (!xmlhttp && typeof XMLHttpRequest != "undefined") {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}
function Choose() {
  var now = new Date();

  console.log(now);
  var dia = now.getDay();
  var mes = now.getMonth() + 1;
  var ano = now.getFullYear();
  var diaActual = now.getDate();
  console.log(diaActual);

  var element = document.getElementById("ExamenCatalogo");
  var textOption = element.options[element.selectedIndex].value;
  const atributes = textOption.split("-->");
  console.log(atributes[4]);
  const diasProceso = parseInt(atributes[4]);
  fecha = EvaluaFecha(dia, mes, ano, diasProceso, diaActual);
  var codigoExamen = document.getElementById("examenes");
  var nombreExamen = document.getElementById("examenesDescripcion");
  var totalInput = document.getElementById("precioTotal");
  var anticipo = document.getElementById("adelanto");
  var precioTotal = parseInt(atributes[2]) + parseInt(totalInput.value);
  totalInput.value = precioTotal;
  adelanto.value = precioTotal;

  // agrega el estudio
  addRow(
    "tablaExamen",
    atributes[1],
    atributes[0],
    atributes[2],
    fecha,
    atributes[3],
    precioTotal
  );
  codigoExamen.value += "," + atributes[1];
  nombreExamen.value += "," + atributes[0];
  displayTime = "18" + ":" + "00";
  console.log(fecha);
  // document.getElementById("fechaEntrega").value = fecha;
  // document.getElementById("horaEntrega").value = displayTime;

  //Extrae los recursos seleccionados y los a�ade a la lista
  for (var i = srcLen - 1; i > -1; i--) {
    console.log("no ma");
    if (
      srcList.options[i].selected &&
      tgt.indexOf("," + srcList.options[i].value + ",") == -1
    ) {
      opt = new Option(srcList.options[i].text, srcList.options[i].value);
      console.log("jfnfjnfjefjenfje");
      tgtList.options[tgtList.length] = opt;
      tgtList[0].selected = true;
      //obtenemos el precio
      var texto = srcList.options[i].text;
      var precio = parseFloat(texto.substring(texto.indexOf("$") + 1));
      precioTotal = precioTotal + precio;
      console.log(precioTotal);
      document.getElementById("precioTotal").value = precioTotal;
      document.getElementById("adelanto").value = precioTotal;
    }
  }
}

/******************************************************************************/
/* Funcion unChoose()	                                                      */
/* Realiza la funcion inversa a Choose()							          */
/* No recibe ningun parametro.			                                      */
/******************************************************************************/
function unChoose() {
  var srcList = document.Citas.ExamenSeleccionado;
  var srcLen = document.Citas.ExamenSeleccionado.length;

  for (var i = srcLen - 1; i > -1; i--) {
    if (srcList.options[i].selected) {
      texto = srcList.options[i].text;
      var precio = parseFloat(texto.substring(texto.indexOf("$") + 1));
      var precioTotal = parseFloat(
        document.getElementById("precioTotal").value
      );
      var nuevoPrecio = precioTotal - precio;
      document.getElementById("precioTotal").value = nuevoPrecio;
      document.getElementById("adelanto").value = precioTotal;
      srcList.options[i] = null;
    }
  }
}

function buscarEstudio() {
  document.Citas.ExamenCodigo.value =
    document.Citas.ExamenCodigo.value.toUpperCase();

  var estudio = document.Citas.ExamenCodigo.value;
  var listaOrigen = document.Citas.ExamenCatalogo;
  var listaDestino = document.Citas.ExamenSeleccionado;
  var opcion = "";

  var origenLen = document.Citas.ExamenCatalogo.length;
  var destinoLen = document.Citas.ExamenSeleccionado.length;
  var destino = "x";

  console.log("estudio ".estudio);
  console.log("listaorigen ".listaOrigen);
  //Construye un arreglo de elementos blanco
  for (var i = destinoLen - 1; i > -1; i--) {
    destino += "," + listaDestino.options[i].value + ",";
  }

  //Extrae los recursos seleccionados y los a�ade a la lista
  for (var i = origenLen - 1; i > -1; i--) {
    if (
      listaOrigen.options[i].value == estudio &&
      destino.indexOf("," + listaOrigen.options[i].value + ",") == -1
    ) {
      opcion = new Option(
        listaOrigen.options[i].text,
        listaOrigen.options[i].value
      );
      listaDestino.options[listaDestino.length] = opcion;
    }
  }

  if (opcion == "") {
    alert(
      "No existe un estudio con la clave " +
        document.getElementById("ExamenCodigo").value +
        " o ya fue agregado"
    );
  }
}

/******************************************************************************/
/* Funcion Assemble()		                                                  */
/* Junta en un campo hidden de un formulario html los valores seleccionados   */
/* en un select multiple.                                                     */
/* No recibe ningun parametro.			                                      */
/******************************************************************************/
function Assemble() {
  var temp = new Array();
  var temp2 = new Array();
  for (
    var i = 0, n = document.Citas.ExamenSeleccionado.options.length;
    i < n;
    i++
  ) {
    var codigoEstudio = document.Citas.ExamenSeleccionado.options[i].value;
    var texto = document.Citas.ExamenSeleccionado.options[i].text;
    //modificación de agrupaciones

    temp[i] = codigoEstudio;
    temp2[i] = texto;
  }
  var examJson = JSON.stringify(temp2);
  document.Citas.examenes.value = temp.join(" ");
  document.Citas.examenesDescripcion.value = examJson;
  // document.Citas.submit();
}

function Assemble1() {
  var temp = new Array();
  for (
    var i = 0, n = document.Citas.ExamenSeleccionado.options.length;
    i < n;
    i++
  ) {
    temp[i] = document.Citas.ExamenSeleccionado.options[i].value;
  }

  document.Citas.examenes.value = temp.join(" ");
  document.Citas.submit();
}

function Valida() {
  //	alert('hola');

  if (document.getElementById("Tipo").value == "") {
    alert(
      "Debe Ingrasar el Tipo de Paciente" +
        " " +
        document.getElementById("Tipo").value
    );
    document.Citas.Tipo.focus();
  } else {
    i = document.Citas.ExamenSeleccionado.length;
    if (i == 0) {
      alert("Debe Ingresar Estudios");
      document.getElementById("ExamenCodigo").focus();
    } else {
      Assemble();
    }
  }
}
function Valida1() {
  var i = 0;

  i = document.Citas.ExamenSeleccionado.length;
  alert(document.Citas.getElementById("urgente"));
  if (i == 0) {
    document.getElementById("ExamenCatalogo").focus();
    return false;
  } else {
    Assemble();
  }
}

function Valida2() {
  if (document.getElementById("Sexo").value == "") {
    alert("Debe Ingresar el Sexo del Paciente");
    document.Citas.Sexo.focus();
  } else {
    if (document.getElementById("CitasNombres").value == "") {
      alert("Debe Ingresar el Nombre del Paciente");
      document.Citas.nombre.focus();
    } else {
      if (document.getElementById("CitasApellidos").value == "") {
        alert("Debe Ingresar los Apellidos del Paciente");
        document.Citas.apellidos.focus();
      } else {
        if (document.getElementById("CitasProcedencia").value == "") {
          alert("Debe Ingresar Procedencia de la muestra");
          document.Citas.CitasProcedencia.focus();
        } else {
          var i = 0;

          i = document.Citas.ExamenSeleccionado.length;
          if (i == 0) {
            alert("Debe Ingresar Estudios");
            document.getElementById("ExamenCodigo").focus();
          } else {
            Assemble1();
          }
        }
      }
    }
  }
}

function valor() {
  if (
    document.getElementById("Expediente").value != "" &&
    document.getElementById("p").value == 1
  ) {
    var exp = document.getElementById("Expediente").value;
    x = open("datospaciente.php?exp=" + exp, "", "width=600,height=500");
    x.close;
  }
}
function cambia() {
  if (document.getElementById("Expediente").value != "") {
    alert(
      "Datos del Expediente" + " " + document.getElementById("Expediente").value
    );
    document.getElementById("Sexo").value =
      document.getElementById("SexoR").value;
    document.getElementById("CitasNombres").value =
      document.getElementById("CitasNombresR").value;
    document.getElementById("CitasApellidos").value =
      document.getElementById("CitasApellidosR").value;
    document.getElementById("Fecha").value =
      document.getElementById("FechaR").value;
    document.getElementById("Direccion").value =
      document.getElementById("DireccionR").value;
    document.getElementById("CiudadCit").value =
      document.getElementById("CiudadCitR").value;
    document.getElementById("Telefono").value =
      document.getElementById("TelefonoR").value;
    document.getElementById("CitasRFC").value =
      document.getElementById("CitasRFCR").value;
    document.getElementById("CitasCURP").value =
      document.getElementById("CitasCURPR").value;
  }
}
function Valida() {
  console.log("enter");
  tecla = document.all ? e.keyCode : e.which;
  if (tecla == 13) {
    buscarEstudio();
    document.getElementById("ExamenCodigo").value = "";
  }
}
function calculaf() {
  var an = document.getElementById("anos").value;
  var me = document.getElementById("meses").value;
  var dia = document.getElementById("dias").value;
  var fecha = new Date();
  //alert (fecha);
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1;
  var ano = fecha.getFullYear();

  var fecha = document.getElementById("Fecha").value;

  array_fecha = fecha.split("/");

  anoa = ano - an;
  document.getElementById("Fecha").value =
    array_fecha[0] + "/" + array_fecha[1] + "/" + anoa;
}

function check() {
  var t = document.getElementsByName("todos");
  if (t[0].checked) {
    var che = document.getElementsByName("option");
    for (x = 0; x <= che.length; x++) {
      liberado = che[x].value;
      if (liberado.trim() == "S") {
        che[x].checked = true;
      } else {
        che[x].checked = false;
      }
    }
  } else {
    var che = document.getElementsByName("option");

    for (x = 0; x <= che.length; x++) {
      if (che[x].value == "S") {
        che[x].checked = false;
      } else {
        che[x].checked = false;
      }
    }
  }
}

function imp() {
  var che = document.getElementsByName("option");
  var llaves = document.getElementsByName("curvas");
  var codigos = document.getElementsByName("codigos");
  var descripcion = document.getElementsByName("descripcion");
  var i = 0;
  var llave = "";
  var id = document.getElementById("idpac").value;

  const keyExam = [];
  const keyCodigos = [];
  const keyDescripcion = [];
  for (x = 0; x < che.length; x++) {
    if (che[x].checked) {
      i = 1;

      keyExam.push(llaves[x].value);
      keyCodigos.push(codigos[x].value);
      keyDescripcion.push(descripcion[x].value);
      var llave = llave + llaves[x].value + "-";

      actualiza_fecha(id, llaves[x].value);

      var lf = llaves[x].value;
    }
  }

  document.getElementById("lf").value = keyExam;
  document.getElementById("llave").value = keyCodigos;
  document.getElementById("descripcion_").value = keyDescripcion;
  if (i == 1) {
    doc = "A QUIEN CORRESPONDA";
    //console.log('../Core/MasterImp.php?i='+ id +'&llave=' + llave + '&lf=' + lf,'' ,'width=600,height=500');

    console.Lista.submit();
    //  x=open('MasterImp.php?i='+ id + '&lf=' + keyExam + '&doc=' + doc,'' ,'width=600,height=500');
  } else {
    alert("Sin Estudios Seleccionados");
  }
}

function GuardaDoctor() {
  //    alert('hola');
  evaluamos_datos();
}

function GuardaMedico(Nombre) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "../guardaMedico.php?nombre=" + Nombre, true);
  xhttp.send();

  window.close();
}

function evaluamos_datos() {
  if (document.Citas.Codigo.value == "") {
    alert("Debe Ingresar el Codigo");
    document.Citas.Codigo.focus();
  } else if (document.Citas.CitasNombres.value == "") {
    alert("Debe Ingresar el nombre");
    document.Citas.CitasNombres.focus();
  } else if (document.Citas.CitasApellidos.value == "") {
    alert("Debe Ingresar los apellidos");
    document.Citas.CitasApellidos.focus();
  } else {
    document.Citas.submit();
  }
}
function actualiza_fecha(id, llave) {
  //    alert(id);
  //    alert(llave);
  ajax = objetoAjax();
  divResultado = document.getElementById("resultado");
  //	alert(document.getElementById('Rut').value);
  val = "../Core/librerias/fecha_entrega.php?id=" + id + "&llave=" + llave;

  ajax.open("GET", val);
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      //	valor.innerHTML = ajax.responseText
      //        alert('Fecha de entrega actualizada');
      divResultado.innerHTML = ajax.responseText;
    }
  };
  ajax.send(null);
}
function cambiaEstudio() {
  console.log('Llenamos los datos de los estudios de la seccion');
  // obyenemos el cod_llave de la seccion
  cod_llave=document.getElementById('seccion').value;
  console.log(cod_llave);
  // obtenemos por ajax los estudios
  ajax = objetoAjax();
  val = "EstudiosXseccion.php?cod_llave=" + cod_llave ;

  ajax.open("GET", val);
  ajax.onreadystatechange = function (response) {
    if (ajax.readyState == 4) {
      console.log(response);
      var len = response.target.response.length;
      console.log(len);
      for (var i = 0; i < len; i++) {
        console.log(response.target.response);
        var llave_perfil = response.target.response[i]["llave_perfil"];
        var nombre = response.target.response[i]["nombre"];
        document.getElementById('estudios').append(
          "<option value='" + llave_perfil + "'>" + nombre + "</option>"
        );
        
      }
    }
  };
  ajax.send(null);
}
function refrescaDoctores() {
  $.ajax({
    url: "DoctoresCatalogo.php",
    type: "get",
    dataType: "json",
    success: function (response) {
      var len = response.length;
      for (var i = 0; i < len; i++) {
        var llave_doctor = response[i]["llave_doctor"];
        var nombre = response[i]["nombre"];

        $("#Doctor").append(
          "<option value='" + llave_doctor + "'>" + nombre + "</option>"
        );
        $("#Doctor").selectpicker("refresh");
      }
    },
  });
}
function guardaMedico() {
  doctorNombre = document.getElementById("doctorNombres").value;
  if (doctorNombre != "") {
    GuardaMedico(doctorNombre);
    console.log("limpia select");
    var select = document.getElementById("Doctor");
    var length = select.options.length;
    for (i = length - 1; i >= 0; i--) {
      select.options[i].remove(1);
    }
  }
  refrescaDoctores();

  document.getElementById("doctorNombres").disabled = true;
  document.getElementById("doctorNombres").value = "";
  document.getElementById("botonDoctor").disabled = true;
}
function EvaluaFecha(d, m, y, a, dd) {
  if (dd != 6) {
    dt = dd + a;
  } else {
    dt = dd + 2;
  }

  if (
    (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) &&
    dt > 31
  ) {
    if (m == 12) {
      m = 1;
      dt = dt - 31;
      y++;
    } else {
      m++;
      dt = dt - 31;
    }
  }
  if ((m == 4 || m == 6 || m == 5 || m == 9 || m == 11) && dt > 30) {
    m++;
    dt = dt - 30;
  }
  if (m == 2 && dt > 28) {
    m++;
  }
  fecha = y + "-" + zfill(m, 2) + "-" + zfill(dt, 2);
  // fecha='2021-11-04';
  console.log(fecha);
  return fecha;

  //enero 31 1-
  //febrero 28
  //marzo 31 3-
  //abril 30
  //mayo 31 5-
  //junio 30
  //julio 31 7-
  //agosto 31 8-
  //septiembre 30
  //octubre 31 10-
  //noviembre 30
  //diciembre 31 12-
}
function zfill(number, width) {
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = number.toString().length; /* Largo del número */
  var zero = "0"; /* String de cero */

  if (width <= length) {
    if (number < 0) {
      return "-" + numberOutput.toString();
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return "-" + zero.repeat(width - length) + numberOutput.toString();
    } else {
      return zero.repeat(width - length) + numberOutput.toString();
    }
  }
}
