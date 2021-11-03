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

function folio(){
	
	
		
		 if (document.getElementById('Folio').value!='') {
			 
			var foliox=document.getElementById('Folio').value;
			var tipo=document.getElementById('t').value;
			var foliod=document.getElementById('foliod').value;
			var folioh=document.getElementById('folioh').value;
			var FF=document.getElementById('FF').value;
			var FI=document.getElementById('FI').value;
			var s=document.getElementById('Seccion').value;
			x=open('Resultados_r.php?id='+ foliox + '&t='+tipo + '&foliod='+foliod + '&folioh='+folioh + '&FI='+FI + '&FF='+FF + '&Seccion='+s,'_self'); 
		    x.close; 
		 }
			
		
}
function sig(){
	num=document.getElementById('Folio').selectedIndex;
    num=num+1;
    //alert(num);
    
	var sige=document.getElementById('Folio').options[num].value;
	var tipo=document.getElementById('t').value;
	var foliod=document.getElementById('foliod').value;
	var folioh=document.getElementById('folioh').value;
	var FF=document.getElementById('FF').value;
	var FI=document.getElementById('FI').value;
	var s=document.getElementById('Seccion').value;
	//var sige=document.getElementById('Folio').value;
	//alert(foliod);

		
		x=open('Resultados_r.php?id='+ sige+ '&t='+tipo + '&foliod='+foliod + '&folioh='+folioh + '&FI='+FI + '&FF='+FF + '&Seccion='+s,'_self'); 
	    x.close; 		
    
}
function ant(){
	
	num=document.getElementById('Folio').selectedIndex;
    num=num-1;
    //alert(num);
    
	var sige=document.getElementById('Folio').options[num].value;
	var tipo=document.getElementById('t').value;
	var foliod=document.getElementById('foliod').value;
	var folioh=document.getElementById('folioh').value;
	var FF=document.getElementById('FF').value;
	var FI=document.getElementById('FI').value;
	var s=document.getElementById('Seccion').value;
	//var sige=document.getElementById('Folio').value;
	//alert(foliod);

		
		x=open('Resultados_r.php?id='+ sige+ '&t='+tipo + '&foliod='+foliod + '&folioh='+folioh + '&FI='+FI + '&FF='+FF + '&Seccion='+s,'_self'); 
	    x.close; 		
	
}
function valor3(){
	//alert('hola');
	 if (document.getElementById('Folio').value!=''){
		 
		var exp=document.getElementById('Folio').value;
		x=open('../WEB/anulaagregaxfoliop.php?id='+ exp ,'' ,'width=800,height=400'); 
	    x.close; 
	 }
		
	}
function valor1(){
	//alert('hola');
	 if (document.getElementById('Folio').value!=''){
		 
		var exp=document.getElementById('Folio').value;
		x=open('../WEB/datospacientexfoliop.php?id='+ exp ,'' ,'width=800,height=700'); 
	    x.close; 
	 }
		
	}
function imprimir(){
	console.log(document.getElementById('Folio').value);
	/////RESULT PRINT FUNCTION
	if (document.getElementById('Folio').value!=''){
		
		var exp=document.getElementById('Folio').value
		x=open('../WEB/ResultadosxFolio.php?id='+ exp ,'' ,'width=500,height=800'); 
		x.close; 

	}
		
}
function editar(id){
    var str=id
    var folio=str.toString();
    folio=folio.substr(8);

	x=open('../WEB/datospacientexfolio.php?folio='+ folio ,'' ,'width=800,height=550'); 

}