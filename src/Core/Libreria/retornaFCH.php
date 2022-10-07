<?php
function convertirFECHA($cadenaFECHA) {

   $cadena="";
   $temp = explode('-', $cadenaFECHA);


   if ( (isset($temp[0])) && (isset($temp[1])) && (isset($temp[2]) ) ) {
       $cadena = convertirFCH($temp);
   }else{
       $temp = explode('/', $cadenaFECHA);
       if ( (isset($temp[0])) && (isset($temp[1])) && (isset($temp[2]) ) )
          $cadena = convertirFCH($temp);
   }

   return $cadena;
}

function convertirFCH($temp){
      $hecho =false;
      $cadena ="";

      if ( (is_numeric($temp[0])) && (is_numeric($temp[0])) && (is_numeric($temp[0])) ) {
          //obtener año .-
          if ($temp[0] > 1900){
             $ano = $temp[0];
             //obtener mes .-
             if ( ($temp[1] > 0) && ($temp[1] < 13)  ) {
                $mes = $temp[1];
                //obtener dia.-
                if ( ($temp[2] > 0) && ($temp[2] < 31)  ) {
                   $dia=$temp[2];
                   $hecho=true;
                   $cadena="$temp[2]/$temp[1]/$temp[0]";
                }

             }elseif ( ($temp[2] > 0) && ($temp[2] < 13)  ){
                $mes = $temp[2];
                //obtener dia.-
                if ( ($temp[1] > 0) && ($temp[1] < 31)  ) {
                   $dia=$temp[1];
                   $hecho=true;
                   $cadena="$temp[1]/$temp[2]/$temp[0]";
                }

             }

          }elseif ($temp[1] > 1900){
             $ano = $temp[1];

             //obtener mes .-
             if ( ($temp[0] > 0) && ($temp[0] < 13)  ) {
                $mes = $temp[0];
                //obtener dia.-
                if ( ($temp[2] > 0) && ($temp[2] < 31)  ) {
                   $dia=$temp[2];
                   $hecho=true;
                   $cadena="$temp[2]/$temp[0]/$temp[1]";
                }

             }elseif ( ($temp[2] > 0) && ($temp[2] < 13)  ){
                $mes = $temp[2];
                //obtener dia.-
                if ( ($temp[0] > 0) && ($temp[0] < 31)  ) {
                   $dia=$temp[0];
                   $hecho=true;
                   $cadena="$temp[0]/$temp[2]/$temp[1]";
                }

             }

          }elseif ($temp[2] > 1900){
             $ano = $temp[2];

             //obtener mes .-
             if ( ($temp[0] > 0) && ($temp[0] < 13)  ) {
                $mes = $temp[0];
                //obtener dia.-
                if ( ($temp[1] > 0) && ($temp[1] < 31)  ) {
                   $dia=$temp[1];
                   $hecho=true;
                   $cadena="$temp[1]/$temp[2]/$temp[2]";
                }

             }elseif ( ($temp[1] > 0) && ($temp[1] < 13) ) {
                $mes = $temp[1];
                //obtener dia.-
                if ( ($temp[0] > 0) && ($temp[0] < 31)  ) {
                   $dia=$temp[0];
                   $hecho=true;
                   $cadena="$temp[0]/$temp[1]/$temp[2]";
                }

             }

          }
      }
   return $cadena;
}
?>

