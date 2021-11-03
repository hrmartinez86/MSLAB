// JavaScript Document
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
 
function MostrarConsulta(datos){
        divResultado = document.getElementById('citas');
		
		var datos2=datos+"?fecha_b="+document.Citas.theDate.value;
        ajax=objetoAjax();
        ajax.open("GET", datos2);
        ajax.onreadystatechange=function() {
               if (ajax.readyState==4) {
                       divResultado.innerHTML = ajax.responseText
               }
        }
        ajax.send(null)
}

function paciente(expediente){
	
		divResultado = document.getElementById('expedientes');				
		ajax=objetoAjax();
		var ex=expediente+"?exp="+document.Citas.Expediente.value;
		
		
		
        ajax.open("GET", ex);
		
       
		
		
        ajax.onreadystatechange=function() {
               if (ajax.readyState==4) {
                       divResultado.innerHTML = ajax.responseText
               }
        }
       
        //document.getElementById('Sexo').style.visibility='hidden';
        //document.getElementById('LSexo').style.visibility='hidden';
        ajax.send(null)
        
}

function numero(comp){
	
	divResultado = document.getElementById('numrocita');				
	ajax=objetoAjax();
	var nc=comp+"?cta="+document.Atenciones.num.value
	
    ajax.open("GET", nc);
	
    ajax.onreadystatechange=function() {
           if (ajax.readyState==4) {
                   divResultado.innerHTML = ajax.responseText
           }
    }
    ajax.send(null)
}

function actualiza()
{
	ajax=objetoAjax();
	
//	alert(document.getElementById('Rut').value);
    val="librerias/actualiza.php?exp="+ document.getElementById('Expediente').value + "&sex=" + document.getElementById('Sexo').value + "&nom=" + document.getElementById('CitasNombres').value + "&ape=" +  "&fecha=" + document.getElementById('Fecha').value + "&rut=" + document.getElementById('Rut').value;
	
	ajax.open("GET", val);
    ajax.onreadystatechange=function() {
	if (ajax.readyState==4) {
//	valor.innerHTML = ajax.responseText
        alert('Datos del Paciente Actualizado');
	  }
     }
    ajax.send(null)
}
function actualizafolio(folio)
{
	ajax=objetoAjax();
   
    var val="librerias/actualizafolio.php?sex=" + document.getElementById('Sexo').value + 
            "&nom=" + document.getElementById('CitasNombres').value + 
            "&fecha=" + document.getElementById('Fecha').value + 
            "&rut=" + document.getElementById('Rut').value + "&folio=" + folio;
	ajax.open("GET", val);
    ajax.onreadystatechange=function() {
	if (ajax.readyState==4) {
	    valor.innerHTML = ajax.responseText
        alert('Datos del Paciente Actualizados');
	  }
    }
    ajax.send(null)
}










