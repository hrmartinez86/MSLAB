<?php
function cabecera($info, $x, $y, $tamaño, $font)
{

	#echo "datos de cabecera:  ".$info." X: ".$x." Y: ".$y." Font:".$tamaño."  Tamaño:".$font."<br>";
}
function footer($info, $x, $y, $tamaño, $estilo,$font)
{

	#echo "datos de pie de pagina:  ".$info." X: ".$x." Y: ".$y." Font:".$tamaño."  Tamaño:".$font." Estilo".$estilo."<br>";
}

function body($idpaciente,$rep)
{
for ($i=0;$i<=count($rep);$i++)
{
	$consulta="SISTEMA_WEB_RESULTADOS ".$idpaciente.",".$rep[$i].","."InfoWeb".", 1000";
	echo $consulta."<br>";

}



}
?>
