function objetoAjax(){
        var xmlhttp=false;
        try {
               xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
               try {
                  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
               } catch (E) {
                       xmlhttp = false;
               }
        }
 
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {

               xmlhttp = new XMLHttpRequest();


        }
        return xmlhttp;
}
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

function Choose() {
	var srcList = document.Citas.ExamenCatalogo;
	var tgtList = document.Citas.ExamenSeleccionado;

	var srcLen = document.Citas.ExamenCatalogo.length;
	var tgtLen = document.Citas.ExamenSeleccionado.length;
	var tgt = "x";

	//Construye un arreglo de elementos blanco
	for (var i=tgtLen-1; i > -1; i--) {
		tgt += "," + tgtList.options[i].value + ","
	}

	//Extrae los recursos seleccionados y los añade a la lista
	for (var i=srcLen-1; i > -1; i--) {
		if (srcList.options[i].selected && tgt.indexOf( "," + srcList.options[i].value + "," ) == -1) {
			opt = new Option( srcList.options[i].text, srcList.options[i].value );
			tgtList.options[tgtList.length] = opt;
			var el=srcList.options[i].value;
	    	var num=tgtList.length;
			
			agregaest(el,num);
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
    if(confirm('¿Desea Eliminar el estudio '+ document.Citas.ExamenSeleccionado.value+' ?')){
    	var el=document.Citas.ExamenSeleccionado.value;
    	elimina(el);
    for (var i=srcLen-1; i > -1; i--) {
		if (srcList.options[i].selected) {
			srcList.options[i] = null;
		}
	}
    }
    }


function buscarEstudio() {
	document.Citas.ExamenCodigo.value = document.Citas.ExamenCodigo.value.toUpperCase();
	var estudio = document.Citas.ExamenCodigo.value;
	var listaOrigen = document.Citas.ExamenCatalogo;
	var listaDestino = document.Citas.ExamenSeleccionado;
	var opcion = '';

	var origenLen = document.Citas.ExamenCatalogo.length;
	var destinoLen = document.Citas.ExamenSeleccionado.length;
	var destino = "x";

	//Construye un arreglo de elementos blanco
	for (var i=destinoLen-1; i > -1; i--) {
		destino += "," + listaDestino.options[i].value + ","
	}

	//Extrae los recursos seleccionados y los añade a la lista
	for (var i=origenLen-1; i > -1; i--) {
		if (listaOrigen.options[i].value == estudio && destino.indexOf( "," + listaOrigen.options[i].value + "," ) == -1) 
		{
			opcion = new Option( listaOrigen.options[i].text, listaOrigen.options[i].value );
			listaDestino.options[listaDestino.length] = opcion;
			
		}
	}
	
	if(opcion == '')
	{
		alert('No existe un estudio con la clave ' + document.getElementById('ExamenCodigo').value + ' o ya fue agregado');
	}
	else
	{
		var el=document.getElementById('ExamenCodigo').value;
    	var num=0;
		
		agregaest(el,num);
	}
}

/******************************************************************************/
/* Funcion Assemble()		                                                  */
/* Junta en un campo hidden de un formulario html los valores seleccionados   */
/* en un select multiple.                                                     */
/* No recibe ningun parametro.			                                      */
/******************************************************************************/
function Assemble()
{
	var temp = new Array;
	for (var i=0, n=document.Citas.ExamenSeleccionado.options.length; i < n; i++)
	{
		temp[i] = document.Citas.ExamenSeleccionado.options[i].value;
	}
	
 	document.Citas.examenes.value = temp.join( ' ' );
 	document.Citas.submit();
}
function Valida(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	 if (tecla==13){
		 buscarEstudio();
		 document.getElementById('ExamenCodigo').value='';
	 }
}
function elimina(e)
{
	ajax=objetoAjax();
	//alert('Datos del Paciente Actualizados');
	//alert(document.getElementById('Rut').value);
	
    var val="librerias/eliminaestudio.php?est="+ e + "&folio=" + document.getElementById('folio').value + "&idpaciente=" + document.getElementById('idpaciente').value;
	//alert(val);
	ajax.open("GET", val);
    ajax.onreadystatechange=function() {
	if (ajax.readyState==4) {
	valor.innerHTML = ajax.responseText
	  }
     }
    ajax.send(null)
	
}
function agregaest(e,n)
{
	ajax=objetoAjax();
	//alert('Datos del Paciente Actualizados');
	//alert(document.getElementById('Rut').value);
	
    var val="librerias/agregaestudio.php?est="+ e + "&folio=" + document.getElementById('folio').value + "&idpaciente=" + document.getElementById('idpaciente').value + "&num=" + n;
	//alert(val);
	ajax.open("GET", val);
    ajax.onreadystatechange=function() {
	if (ajax.readyState==4) {
	valor.innerHTML = ajax.responseText
	  }
     }
    ajax.send(null)
	
}

function validar3(){
	
	document.Citas.submit();
}