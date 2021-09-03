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
 
function Validar(datos){
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
		var ex=expediente+"?exp="+document.Citas.Expediente.value
		
        ajax.open("GET", ex);
        ajax.onreadystatechange=function() {
               if (ajax.readyState==4) {
                       divResultado.innerHTML = ajax.responseText
               }
        }
        ajax.send(null)
}

function valor(k,p,f,t,a,b,est){
	
	var valor=document.getElementById(k).value;
	ajax=objetoAjax();
	var val="librerias/numero.php?id="+ k + "&res=" + valor + "&per=" + p + "&pac=" + f;
	
	if(est==' ' || est==''){
	if(t=='N'){
		if (isNaN(valor)==true)

	        {
			
			document.getElementById(k).value="";
			
			
			document.getElementById(k).style.backgroundColor="#ffffff";
		    }

	    else
	    {
		ajax.open("GET", val);
	    ajax.onreadystatechange=function() {
		if (ajax.readyState==4) {
		valor.innerHTML = ajax.responseText
		}
	    }
		
		
        if(a==0){
			
		}
        else
		{
			if (valor<=a && valor>=b){
				
				document.getElementById(k).style.backgroundColor="#ffffff";
				;
			}
			else{
				if (valor>a){
					
					document.getElementById(k).style.backgroundColor="#ed6d5a";}
				
				if (valor<b){
					
					document.getElementById(k).style.backgroundColor="#ed6d5a";}
				}
			
	
		}
		
		
        ajax.send(null)
	    }
	}
		else
		{
			ajax.open("GET", val);
			ajax.onreadystatechange=function() {
				if (ajax.readyState==4) {
				valor.innerHTML = ajax.responseText
				}
				}
				ajax.send(null)}
			     
	}		


}



function validarres(f)
{
	ajax=objetoAjax();
    seccion=document.getElementById('Seccioncod').value;
	
   //alert('hola');
	if(seccion=="")
    { 
	alert('Debe Ingresar la Seccion ');
	exit();
    }
	var elementos = document.getElementsByName("res2");
	var perfiles=document.getElementsByName("perfil2");
	var estados=document.getElementsByName("estado2");
	var estudios=document.getElementsByName("estudio2");
	//alert("Hay " + elementos.length + " elementos con el nombre 'res2'");
	//alert(document.getElementsByName("Resultado").value;);
	
	var val= "";
	
	
	for (x=0;x<elementos.length;x++)
	{valor =  elementos[x].value;
	perfil=perfiles[x].value;
	llave=elementos[x].id;
	estado=estados[x].value;
	estudio=estudios[x].value;
	if ((estado=='' || estado==' ') && valor !=''){
		
	alert(estado + ' ' + estudio);
	val="librerias/validanumero.php?id="+ llave + "&res=" + valor +  "&per=" + perfil +"&pac=" + f + "&est=" + estudio;
	//alert(val);
	ajax.open("GET", val);
    
     }
	}
	
	
	var elementos2 = document.getElementsByName("res");
	var perfiles2=document.getElementsByName("perfil");
	var estados2=document.getElementsByName("estado");
	var estudios2=document.getElementsByName("estudio");
	
	
	for (x=0;x<elementos2.length;x++)
	{valor2 =  elementos2[x].value;
	perfil2=perfiles2[x].value;
	llave2=elementos2[x].id;
	estado2=estados2[x].value;
	estudio2=estudios2[x].value;
	if ((estado2=='' || estado2==' ') && valor2 !=''){
		
	alert(estado2 + ' ' + estudio2);
	val2="librerias/validanumero.php?id="+ llave2 + "&res=" + valor2 +  "&per=" + perfil2 +"&pac=" + f + "&est=" + estudio2;
	//alert(val);
	ajax.open("GET", val2);
    
     }
	
	ajax.onreadystatechange=function() {
		if (ajax.readyState==4) {
		valor.innerHTML = ajax.responseText
		  }
	     }
	
	}
	alert('Estudios Validados');
	ajax.send(null)
	
}
	
	
	
    

   












