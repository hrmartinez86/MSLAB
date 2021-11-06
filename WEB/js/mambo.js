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
function seleccionaEstudio() {
	mySelect = document.getElementById("ExamenCatalogo");
	Choose();
	mySelect.selectedIndex = -1; 
	
}
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
	var precioTotal=parseFloat( document.getElementById("precioTotal").value);
	var now = new Date();
	var dia=now.getDay();
	var mes=now.getMonth()+1;
	var ano=now.getFullYear();
	var diaActual=now.getUTCDay();
	// dia=30;
	// mes=6;
	// diaActual=6
	fecha=EvaluaFecha(dia,mes,ano,1,diaActual);

	displayTime = "18" + ":" + "00"; 
	document.getElementById('fechaEntrega').value=fecha;
	document.getElementById('horaEntrega').value=displayTime;
	//Extrae los recursos seleccionados y los a�ade a la lista
	for (var i=srcLen-1; i > -1; i--) {
		if (srcList.options[i].selected && tgt.indexOf( "," + srcList.options[i].value + "," ) == -1) {
			opt = new Option( srcList.options[i].text, srcList.options[i].value );
			tgtList.options[tgtList.length] = opt;
			tgtList[0].selected=true;
			//obtenemos el precio
			var texto=srcList.options[i].text;
			var precio = parseFloat(texto.substring(texto.indexOf("$")+1));
			precioTotal = precioTotal+precio;
			console.log(precioTotal);
			document.getElementById("precioTotal").value=precioTotal;
			document.getElementById("adelanto").value=precioTotal;
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
    
    for (var i=srcLen-1; i > -1; i--) {
		if (srcList.options[i].selected) {
			texto=srcList.options[i].text;
			var precio = parseFloat(texto.substring(texto.indexOf("$")+1));
			var precioTotal=parseFloat( document.getElementById("precioTotal").value);
			var nuevoPrecio=precioTotal-precio;
			document.getElementById("precioTotal").value=nuevoPrecio;
			document.getElementById("adelanto").value=precioTotal;
			srcList.options[i] = null;
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

	console.log('estudio '.estudio);
	console.log('listaorigen '.listaOrigen);
	//Construye un arreglo de elementos blanco
	for (var i=destinoLen-1; i > -1; i--) {
		destino += "," + listaDestino.options[i].value + ","
	}

	//Extrae los recursos seleccionados y los a�ade a la lista
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
	var temp2 = new Array;
	for (var i=0, n=document.Citas.ExamenSeleccionado.options.length; i < n; i++)
	{
		 var codigoEstudio=document.Citas.ExamenSeleccionado.options[i].value;
		 var texto=document.Citas.ExamenSeleccionado.options[i].text;;
		//modificación de agrupaciones
		
			temp[i] = codigoEstudio;
			temp2[i] = texto;
		
	}
	var examJson = JSON.stringify(temp2);
 	document.Citas.examenes.value = temp.join( ' ' );
	document.Citas.examenesDescripcion.value=examJson;
 	// document.Citas.submit();
}

function Assemble1()
{
	var temp = new Array;
	for (var i=0, n=document.Citas.ExamenSeleccionado.options.length; i < n; i++)
	{
		temp[i] = document.Citas.ExamenSeleccionado.options[i].value;
	}
	
 	document.Citas.examenes.value = temp.join( ' ' );
 	document.Citas.submit();
}

function Valida()
{
//	alert('hola');
	
	if (document.getElementById('Tipo').value == '') 
	{
		alert('Debe Ingrasar el Tipo de Paciente'+ ' ' + document.getElementById('Tipo').value );
		document.Citas.Tipo.focus();
	}
	else
	{
		i=document.Citas.ExamenSeleccionado.length
		if (i==0)
		{
			alert('Debe Ingresar Estudios');
			document.getElementById('ExamenCodigo').focus();
		}
			else
			{
				Assemble();
				
				}
		
	}
}
function Valida1()
{		
	var i=0;

	i=document.Citas.ExamenSeleccionado.length

	if (i==0)
	{
		document.getElementById('ExamenCatalogo').focus();
		return false;
	}
	else
	{
		Assemble();
	}

}
		   

	    

function Valida2()
{
	
	
	
	
	if (document.getElementById('Sexo').value=='')
	{
		alert('Debe Ingresar el Sexo del Paciente');
		document.Citas.Sexo.focus();
	}
	else
	{	
	    if (document.getElementById('CitasNombres').value=='')
	    {
	    	alert('Debe Ingresar el Nombre del Paciente');
			document.Citas.nombre.focus();
	    }
	    else
	    {
	    	if (document.getElementById('CitasApellidos').value=='')
		    {
		    	alert('Debe Ingresar los Apellidos del Paciente');
				document.Citas.apellidos.focus();
		    }
	    	else
	    	{
	    		if (document.getElementById('CitasProcedencia').value == '') 
	    	    {
	    		   alert('Debe Ingresar Procedencia de la muestra');
	    		   document.Citas.CitasProcedencia.focus();
	    	     }
	    		else
	    		{
		
		           var i=0;
		
			       i=document.Citas.ExamenSeleccionado.length
			       if (i==0)
			       {
				     alert('Debe Ingresar Estudios');
				      document.getElementById('ExamenCodigo').focus();
			       }
			       else
			         {
				     Assemble1();
			         }
				
		
	           }
	         }	   
	    }
	}
}

function valor(){
	
 if (document.getElementById('Expediente').value!='' && document.getElementById('p').value==1){
	 
	var exp=document.getElementById('Expediente').value;
	x=open('datospaciente.php?exp='+ exp ,'' ,'width=600,height=500'); 
    x.close; 
 }
	
}
function cambia(){
	
	if(document.getElementById('Expediente').value!=''){
	alert('Datos del Expediente'+ ' '+document.getElementById('Expediente').value);
	document.getElementById('Sexo').value=document.getElementById('SexoR').value
	document.getElementById('CitasNombres').value=document.getElementById('CitasNombresR').value;
	document.getElementById('CitasApellidos').value=document.getElementById('CitasApellidosR').value;
	document.getElementById('Fecha').value=document.getElementById('FechaR').value;
	document.getElementById('Direccion').value=document.getElementById('DireccionR').value;
	document.getElementById('CiudadCit').value=document.getElementById('CiudadCitR').value;
	document.getElementById('Telefono').value=document.getElementById('TelefonoR').value;
	document.getElementById('CitasRFC').value=document.getElementById('CitasRFCR').value;
	document.getElementById('CitasCURP').value=document.getElementById('CitasCURPR').value;
	}
}
function Valida(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	 if (tecla==13){
		 buscarEstudio();
		 document.getElementById('ExamenCodigo').value='';
	 }
}
function calculaf(){
    var an=document.getElementById('anos').value;
    var me=document.getElementById('meses').value;
    var dia=document.getElementById('dias').value;
    var fecha=new Date();
    //alert (fecha);
    var dia=fecha.getDate();
    var mes=(fecha.getMonth() +1);
    var ano=fecha.getFullYear();
    
  
    var fecha=document.getElementById('Fecha').value;
    
    array_fecha = fecha.split("/") ;
    
    anoa=ano-an;
    document.getElementById('Fecha').value=array_fecha[0]+'/'+array_fecha[1]+'/'+anoa
}

function check()
{
	var t=document.getElementsByName('todos')
	if (t[0].checked) {
		
		var che=document.getElementsByName('option');
		
		for (x=0;x<=che.length;x++)
		{
			if(che[x].value=='S')
			{
				che[x].checked=true
			}
			else
			{
				che[x].checked=false
			}
		}
    }
	else
	{
		var che=document.getElementsByName('option');
		
		for (x=0;x<=che.length;x++)
		{
			if(che[x].value=='S')
			{
				che[x].checked=false
			}
			else
			{
				che[x].checked=false
			}
		}
		
	}
	
}

function imp()
{
	var che=document.getElementsByName('option');
	var llaves=document.getElementsByName('curvas');
	var codigos=document.getElementsByName('codigos');
	var i=0;
	var llave='';
	var id=document.getElementById('idpac').value; 
	alert(id);

	const keyExam=[];
	const keyCodigos=[];
	 for (x=0;x<che.length;x++)
		{
			if(che[x].checked)
			
				{
					i=1;
					alert(codigos[x].value);
					
					keyExam.push(llaves[x].value);
					keyCodigos.push(codigos[x].value);
					var llave=llave + llaves[x].value + '-';

					actualiza_fecha(id,llaves[x].value);

					var lf=llaves[x].value;
				}
			
		}

document.getElementById('lf').value=keyExam;
document.getElementById('llave').value=keyCodigos;
if (i==1)
{	
	doc="A QUIEN CORRESPONDA";
	//console.log('../Core/MasterImp.php?i='+ id +'&llave=' + llave + '&lf=' + lf,'' ,'width=600,height=500');

	// console.Lista.submit();
	//  x=open('MasterImp.php?i='+ id + '&lf=' + keyExam + '&doc=' + doc,'' ,'width=600,height=500');
 
}
else
{
alert('Sin Estudios Seleccionados');
}
}


function GuardaDoctor()
{
//    alert('hola');
    evaluamos_datos();
    
}

function evaluamos_datos(){
    if(document.Citas.Codigo.value=='')
    {
        alert('Debe Ingresar el Codigo');
        document.Citas.Codigo.focus();
    }
    else
    if(document.Citas.CitasNombres.value=='')
    {
        alert('Debe Ingresar el nombre');
        document.Citas.CitasNombres.focus();
    }
    else
        if(document.Citas.CitasApellidos.value=='')
    {
        alert('Debe Ingresar los apellidos');
        document.Citas.CitasApellidos.focus();
    }
    else
    {
        document.Citas.submit();
    }
}
function actualiza_fecha(id,llave)
{
//    alert(id);
//    alert(llave);
    		ajax=objetoAjax();
	divResultado = document.getElementById('resultado');
//	alert(document.getElementById('Rut').value);
    val="../Core/librerias/fecha_entrega.php?id="+ id + "&llave=" + llave;
	
	ajax.open("GET", val);
    ajax.onreadystatechange=function() {
	if (ajax.readyState==4) {
//	valor.innerHTML = ajax.responseText
//        alert('Fecha de entrega actualizada');
        divResultado.innerHTML = ajax.responseText
	  }
     }
    ajax.send(null)
}
function EvaluaFecha(d,m,y,a,dd){
	if (dd!=6) {
		dt=d+a;
	}
	else{
		dt=d+2;
	}
	
	if ((m==1||m==3||m==5||m==7||m==8||m==10||m==12)&&dt>31) {
		if (m==12) {
			m=1;
			dt=dt-31;
			y++;
		}
		else{
			m++;
			dt=dt-31;
		}
	}
	if ((m==4||m==6||m==5||m==9||m==11)&&dt>30) {
		m++;
		dt=dt-30;
	}
	if ((m==2)&&dt>28) {
		m++;
	}
	fecha=y+"-"+zfill(m,2)+'-'+zfill(dt,2);
	// fecha='2021-11-04';
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
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}