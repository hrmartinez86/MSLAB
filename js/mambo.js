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


function Valida(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	 if (tecla==13){
	if(document.getElementById('centro').value=='<Sin Procedencia>')
	{
		alert('Debe Ingresar el Centro de Salud');
		document.ingreso.centro.focus();
	}
	else
	{
		if(document.getElementById('usuario').value=='')
		{
			alert('Debe Ingresar el Usuario');
			document.ingreso.usuario.focus();
		}
		else
		{
			if(document.getElementById('password').value=='')
			{
				alert('Debe Ingresar la contrase\u00f1a');
				document.ingreso.password.focus();
			}
			else
			{
				document.ingreso.submit();
			}
	    }
	}
}
}
function Validas()
{

	
		if(document.getElementById('usuario').value=='')
		{
			alert('Debe Ingresar el Usuario');
			document.ingreso.usuario.focus();
		}
		else
		{
			if(document.getElementById('password').value=='')
			{
				alert('Debe Ingresar la contrase\u00f1a');
				document.ingreso.password.focus();
			}
			else
			{
				document.ingreso.submit();
			}
	    }
	}

function GuardaUsuario()
{
//    alert('hola');
    if(document.Citas.Codigo.value=='')
    {
        alert('Debe Ingresar el Codigo');
        document.Citas.Codigo.focus();
    }
    else
        
    if(document.Citas.CitasNombres.value=='')
    {
        alert('Debe Ingresar el Nombre');
        document.Citas.CitasNombres.focus();
    }
    
    else
        
    if(document.Citas.Password.value=='')
    {
        alert('Debe Ingresar el Password');
        document.Citas.Password.focus();
    }
    else
//        
//    alert(document.Citas.Password2.value=='');
    if(document.Citas.Password2.value=='')
    {
        alert('Debe Confirmar el Password');
        document.Citas.Password2.focus();
    }
    else
        
    if(document.Citas.Password.value!=document.Citas.Password2.value)
    {
        alert('Favor de comprobar el Password');
        document.Citas.Password.focus();
    }
    
    else
    {
        document.Citas.submit();
    }
}
function buscarSelect()
{
    alert("hol");
}

function GuardaDoctor()
{
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
function GuardaFolio()
{
    if(document.Citas.Codigo.value=='')
    {
        alert('Debe Ingresar el folio del paciente');
        document.Citas.Codigo.focus();
    }
    
    else
        if(document.Citas.usuario.value=='master')
    {
        document.Citas.submit();
    }
}