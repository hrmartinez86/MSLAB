/*
 * Content code
 * @package Mambo Open Source
 * @Copyright (C) 2000 - 2003 Miro International Pty Ltd
 * @ All rights reserved
 * @ Mambo Open Source is Free Software
 * @ Released under GNU/GPL License : http://www.gnu.org/copyleft/gpl.html
 * @version $Revision: 1.16 $
 */

/******************************************************************************/
/* Funcion Choose()		                                                      */
/* Escribe de un listbox a otro un determinado option con su value.           */
/* No recibe ningun parametro.			                                      */
/******************************************************************************/

/******************************************************************************/
/* Funcion unChoose()	                                                      */
/* Realiza la funcion inversa a Choose()							          */
/* No recibe ningun parametro.			                                      */
/******************************************************************************/
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
      var len = response.length;
      console.log(len);
      //	valor.innerHTML = ajax.responseText
      //        alert('Fecha de entrega actualizada');
      // divResultado.innerHTML = ajax.responseText;
    }
  };
  ajax.send(null);
}
function Valida(e) {
  tecla = document.all ? e.keyCode : e.which;
  console.log(tecla);
  if (tecla == 13) {
    if (document.getElementById("usuario").value == "") {
      alert("Debe Ingresar el Usuario");
      document.ingreso.usuario.focus();
    } else {
      if (document.getElementById("password").value == "") {
        alert("Debe Ingresar la contrase\u00f1a");
        document.ingreso.password.focus();
      } else {
        document.ingreso.submit();
      }
    }
  }
}
function Validas() {
  if (document.getElementById("usuario").value == "") {
    alert("Debe Ingresar el Usuario");
    document.ingreso.usuario.focus();
  } else {
    if (document.getElementById("password").value == "") {
      alert("Debe Ingresar la contrase\u00f1a");
      document.ingreso.password.focus();
    } else {
      document.ingreso.submit();
    }
  }
}

function GuardaUsuario() {
  //    alert('hola');
  if (document.Citas.Codigo.value == "") {
    alert("Debe Ingresar el Codigo");
    document.Citas.Codigo.focus();
  } else if (document.Citas.CitasNombres.value == "") {
    alert("Debe Ingresar el Nombre");
    document.Citas.CitasNombres.focus();
  } else if (document.Citas.Password.value == "") {
    alert("Debe Ingresar el Password");
    document.Citas.Password.focus();
  }
  //
  //    alert(document.Citas.Password2.value=='');
  else if (document.Citas.Password2.value == "") {
    alert("Debe Confirmar el Password");
    document.Citas.Password2.focus();
  } else if (document.Citas.Password.value != document.Citas.Password2.value) {
    alert("Favor de comprobar el Password");
    document.Citas.Password.focus();
  } else {
    document.Citas.submit();
  }
}
function buscarSelect() {
  alert("hol");
}

function GuardaDoctor() {
  evaluamos_datos();
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
function GuardaFolio() {
  if (document.Citas.Codigo.value == "") {
    alert("Debe Ingresar el folio del paciente");
    document.Citas.Codigo.focus();
  } else if (document.Citas.usuario.value == "master") {
    document.Citas.submit();
  }
}
