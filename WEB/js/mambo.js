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

	//Extrae los recursos seleccionados y los a�ade a la lista
	for (var i=srcLen-1; i > -1; i--) {
		if (srcList.options[i].selected && tgt.indexOf( "," + srcList.options[i].value + "," ) == -1) {
			opt = new Option( srcList.options[i].text, srcList.options[i].value );
			tgtList.options[tgtList.length] = opt;
			
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
	for (var i=0, n=document.Citas.ExamenSeleccionado.options.length; i < n; i++)
	{
		temp[i] = document.Citas.ExamenSeleccionado.options[i].value;
	}
	
 	document.Citas.examenes.value = temp.join( ' ' );
 	document.Citas.submit();
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
//	alert('hola');
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
			document.Citas.CitasNombres.focus();
	    }
	    else
	    {
	    	
                    var i=0;

                  i=document.Citas.ExamenSeleccionado.length
//                  alert(i);
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
	var i=0;
	var llave='';

	 for (x=0;x<che.length;x++)
		{
			if(che[x].checked)
			
				{i=1;
				var id=document.getElementById('idpac').value; 
				var llave=llave + llaves[x].value + '-';
                                //hrmd(17/04/2017)
                                //colocamos la fecha de entrega
                                actualiza_fecha(id,llaves[x].value);
				var lf=llaves[x].value;
				}
			
		}

if (i==1)
{	

	//console.log('../Core/MasterImp.php?i='+ id +'&llave=' + llave + '&lf=' + lf,'' ,'width=600,height=500');
	 x=open('../Core/MasterImp.php?i='+ id +'&llave=' + llave + '&lf=' + lf,'' ,'width=600,height=500');
 
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