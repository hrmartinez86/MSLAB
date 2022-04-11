// JavaScript Document
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

function agrega() {
  //alert('hols');
}
function Validar(datos) {
  divResultado = document.getElementById("citas");

  var datos2 = datos + "?fecha_b=" + document.Citas.theDate.value;
  ajax = objetoAjax();
  ajax.open("GET", datos2);
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      divResultado.innerHTML = ajax.responseText;
    }
  };
  ajax.send(null);
}

function paciente(expediente) {
  divResultado = document.getElementById("expedientes");
  ajax = objetoAjax();
  var ex = expediente + "?exp=" + document.Citas.Expediente.value;

  ajax.open("GET", ex);
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      divResultado.innerHTML = ajax.responseText;
    }
  };
  ajax.send(null);
}
function validarExistenciaRango(k,t) {
  //validar que la prueba tenga el valor de
  ajax = objetoAjax();
  var val = "librerias/busquedaRangoTexto.php?id=" + k;
  alert(val);
  var llaveFonasa = 0;
  ajax.open("GET", val);
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      data = ajax.responseText;
      if (data) {
        alert('existe rango');
        modificarRango(k,t);
      }
      else{
        alert('sin rango');
      }
    }
  };

  ajax.send();
}
function RangoUpdate(k, t) {
  validarExistenciaRango(k,t);
}
function modificarRango(k,t) {
  switch (t) {
        case 1:
          var resKeyTexto = k + "t";
          var resTexto = document.getElementById(resKeyTexto).value;
          ajax = objetoAjax();
          var val = "librerias/updateRangoTexto.php?id=" + k + "&rest=" + resTexto;
  
          ajax.open("GET", val);
          ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
              valor.innerHTML = ajax.responseText;
              alert("Rango actualizado");
            }
          };
          ajax.send(null);
  
          break;
        case 0:
          var resKeyDesde = k + "d";
          var resDesde = document.getElementById(resKeyDesde).value;
          var resKeyHasta = k + "h";
          var resHasta = document.getElementById(resKeyHasta).value;
  
          ajax = objetoAjax();
          var val =
            "librerias/updateRango.php?id=" +
            k +
            "&resd=" +
            resDesde +
            "&resh=" +
            resHasta;
  
          ajax.open("GET", val);
          ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
              valor.innerHTML = ajax.responseText;
              alert("Rango actualizado");
            }
          };
          ajax.send(null);
  
          break;
  
        default:
          break;
      }
  
}
function valor(k, p, f, t, a, b, est) {
  var valor = document.getElementById(k).value;
  ajax = objetoAjax();
  var val =
    "librerias/numero.php?id=" +
    k +
    "&res=" +
    valor +
    "&per=" +
    p +
    "&pac=" +
    f;
  console.log(val);
  if (est == " " || est == "" || est == "P") {
    if (t == "N") {
      if (isNaN(valor) == true) {
        document.getElementById(k).value = "";

        document.getElementById(k).style.backgroundColor = "#ffffff";
      } else {
        ajax.open("GET", val);
        ajax.onreadystatechange = function () {
          if (ajax.readyState == 4) {
            valor.innerHTML = ajax.responseText;
          }
        };

        if (a == 0) {
        } else {
          if (valor <= a && valor >= b) {
            document.getElementById(k).style.backgroundColor = "#ffffff";
          } else {
            if (valor > a) {
              document.getElementById(k).style.backgroundColor = "#ed6d5a";
            }

            if (valor < b) {
              document.getElementById(k).style.backgroundColor = "##FFD700";
            }
          }
        }

        ajax.send(null);
      }
    } else {
      ajax.open("GET", val);
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
          valor.innerHTML = ajax.responseText;
        }
      };
      ajax.send(null);
    }
  }
}

function validarres(f) {
  var seccion = document.getElementById("Seccioncod").value;

  var elementos = document.getElementsByName("res2");
  var perfiles = document.getElementsByName("perfil2");
  var estados = document.getElementsByName("estado2");
  var estudios = document.getElementsByName("estudio2");
  //alert("Hay " + elementos.length + " elementos con el nombre 'res2'");
  //alert(document.getElementsByName("Resultado").value;);

  var val = "";

  for (x = 0; x < elementos.length; x++) {
    valor = elementos[x].value;

    perfil = perfiles[x].value;
    llave = elementos[x].id;
    estado = estados[x].value;
    estudio = estudios[x].value;

    if ((estado == "" || estado == " " || estado == "T") && valor != "") {
      //alert(estado + ' ' + estudio);
      guarda(llave, valor, perfil, f, estudio);
    }
  }

  var elementos = document.getElementsByName("res");
  var perfiles = document.getElementsByName("perfil");
  var estados = document.getElementsByName("estado");
  var estudios = document.getElementsByName("estudio");

  for (x = 0; x < elementos.length; x++) {
    valor = elementos[x].value;
    perfil = perfiles[x].value;
    llave = elementos[x].id;
    estado = estados[x].value;
    estudio = estudios[x].value;
    if ((estado == "" || estado == " " || estado == "T") && valor != "") {
      //alert(estado + ' ' + estudio);
      guarda(llave, valor, perfil, f, estudio);
    }
  }

  alert("Estudios Validados");
}

function guarda(llave2, valor2, perfil2, f, estudio2) {
  ajax = objetoAjax();

  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");

  val =
    "librerias/validanumero.php?id=" +
    llave2 +
    "&res=" +
    valor2 +
    "&per=" +
    perfil2 +
    "&pac=" +
    f +
    "&est=" +
    estudio2;
  console.log(val);

  ajax.open("GET", val);
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      valor.innerHTML = ajax.responseText;
    }
  };
  ajax.send(null);
}

function validarres_r(f) {
  seccion = document.getElementById("Secciond").value;

  //alert(seccion);

  var elementos = document.getElementsByName("res2");
  var perfiles = document.getElementsByName("perfil2");
  var estados = document.getElementsByName("estado2");
  var estudios = document.getElementsByName("estudio2");
  //alert("Hay " + elementos.length + " elementos con el nombre 'res2'");
  //alert(document.getElementsByName("Resultado").value;);

  var val = "";

  for (x = 0; x < elementos.length; x++) {
    valor = elementos[x].value;

    perfil = perfiles[x].value;
    llave = elementos[x].id;
    estado = estados[x].value;
    estudio = estudios[x].value;
    if (
      (estado == "" || estado == " " || estado == "P" || estado == "T") &&
      valor != ""
    ) {
      //alert(estado + ' ' + estudio);
      guarda(llave, valor, perfil, f, estudio);
    }
  }

  var elementos = document.getElementsByName("res");
  var perfiles = document.getElementsByName("perfil");
  var estados = document.getElementsByName("estado");
  var estudios = document.getElementsByName("estudio");

  for (x = 0; x < elementos.length; x++) {
    valor = elementos[x].value;

    perfil = perfiles[x].value;
    llave = elementos[x].id;
    estado = estados[x].value;
    estudio = estudios[x].value;
    if (
      (estado == "" || estado == " " || estado == "P" || estado == "T") &&
      valor != ""
    ) {
      //alert(estado + ' ' + estudio);
      guarda(llave, valor, perfil, f, estudio);
    }
  }

  alert("Estudios Validados");
}

function desvalidarres_r(f) {
  var elementos = document.getElementsByName("res2");
  var perfiles = document.getElementsByName("perfil2");
  var estados = document.getElementsByName("estado2");
  var estudios = document.getElementsByName("estudio2");
  var des = document.getElementsByName("des2");

  for (x = 0; x < elementos.length; x++) {
    valor = elementos[x].value;
    perfil = perfiles[x].value;
    llave = elementos[x].id;
    estado = estados[x].value;
    estudio = estudios[x].value;
    if (des[x].checked) {
      DES(llave, valor, perfil, f, estudio);
    }
  }

  var elementos = document.getElementsByName("res");
  var perfiles = document.getElementsByName("perfil");
  var estados = document.getElementsByName("estado");
  var estudios = document.getElementsByName("estudio");
  var des = document.getElementsByName("des");

  for (x = 0; x < elementos.length; x++) {
    valor = elementos[x].value;
    perfil = perfiles[x].value;
    llave = elementos[x].id;
    estado = estados[x].value;
    estudio = estudios[x].value;
    if (des[x].checked) {
      DES(llave, valor, perfil, f, estudio);
    }
  }
  alert("Estudios Desvalidados");
}

function DES(llave2, valor2, perfil2, f, estudio2) {
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");
  valor2 = valor2.replace("+", "?");
  valor2 = valor2.replace("++", "??");
  valor2 = valor2.replace("+++", "???");
  valor2 = valor2.replace("++++", "????");
  valor2 = valor2.replace("+++++", "?????");

  ajax = objetoAjax();
  val =
    "librerias/desvalidanumero.php?id=" +
    llave2 +
    "&res=" +
    valor2 +
    "&per=" +
    perfil2 +
    "&pac=" +
    f +
    "&est=" +
    estudio2;
  //alert(val);
  ajax.open("GET", val);
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      valor.innerHTML = ajax.responseText;
    }
  };
  ajax.send(null);
}
