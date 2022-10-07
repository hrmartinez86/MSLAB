<?php
//*FUNCIONES GENERALES*//
function tablajax($columnas,$datos,$titulo)
{
echo 
"
<h1 align=\"center\" >".$titulo."</h1>
";

echo 
'
	<script>
	function doOnRowSelected(rowID,celInd)
	{
	window.open("busqueda.php?class=rescama&idpaciente="+rowID,"_self","");
	}
	</script>
<center>
';
$height=37+(count($datos)*25);	
echo '<div id="gridbox" style="height:'.$height.'px;width:750px;" ></div></center>
<script>
													
															mygrid = new dhtmlXGridObject("gridbox");
															mygrid.setImagePath("codebase/imgs/");
															mygrid.setEditable(true);
															mygrid.setSkin("modern");
															';
											echo '			mygrid.setHeader("'.$columnas.'");
															mygrid.setInitWidths("85,200,80,80,150,50,50,*");';
											echo' 
															mygrid.setColTypes("");
															mygrid.setColAlign("center,center,center,center,center,center,center,center");
															mygrid.setColSorting("str,str,na,na,na,na,na,na");
															mygrid.enableResizing("true,true,true,true,true,true,true,true");
															mygrid.attachEvent("onRowSelect",doOnRowSelected);
															mygrid.init();';
															
															for ($i=0;$i<=count($datos);$i++)
															{
																echo $datos[$i];
															}
															
											echo '			</script><br>';
}
function tablajax2 ($columnas,$datos,$titulo)
{

$height=37+(count($datos)*25);	
echo'
<center>
								<div id="gridbox" style="height:'.$height.'px;width:448px;" ></div></center>
										<script>
										
												mygrid = new dhtmlXGridObject("gridbox");
												mygrid.setImagePath("codebase/imgs/");
												mygrid.setEditable(true);
												mygrid.setSkin("modern");
												';									
								echo '			mygrid.setHeader("'.$columnas.'");
												mygrid.setInitWidths("85,200,90,70");';
						 	    echo' 
												mygrid.setColTypes("");
 											    mygrid.setColAlign("center,center,center,center,center,center");
												mygrid.setColSorting("str,str,na,na,na,na");
												mygrid.enableResizing("true,true,true,true,true,true");
												mygrid.init();';
												for ($i=0;$i<=count($datos);$i++)
												{
													echo $datos[$i];
												}			
											echo '			</script><br>';
}
function tablajax3($columnas,$datos,$titulo)
{
echo 
"
<h1 align=\"center\" >".$titulo."</h1>
";

echo 
'
	<script>
	function doOnRowSelected(rowID,celInd)
	{
	window.open("busqueda.php?class=rescama&idpaciente="+rowID,"_self","");
	}
	</script>
<center>
';
$height=37+(count($datos)*25);	
echo '<div id="gridbox" style="height:'.$height.'px;width:590px;" ></div></center>
<script>
													
															mygrid = new dhtmlXGridObject("gridbox");
															mygrid.setImagePath("codebase/imgs/");
															mygrid.setEditable(true);
															mygrid.setSkin("modern");
															';
											echo '			mygrid.setHeader("'.$columnas.'");
															mygrid.setInitWidths("130,60,150,60,120,*");';
											echo' 
															mygrid.setColTypes("");
															mygrid.setColAlign("center,center,center,center,center,center,center,center,center");
															mygrid.setColSorting("str,str,na,na,na,na,na,na,na");
															mygrid.enableResizing("true,true,true,true,true,true,true,true,true");
															mygrid.attachEvent("onRowSelect",doOnRowSelected);
															mygrid.init();';
															
															for ($i=0;$i<=count($datos);$i++)
															{
																echo $datos[$i];
															}
															
											echo '			</script><br>';
}

function tablajax4($columnas,$datos,$titulo)
{
echo 
"
<h1 align=\"center\" >".$titulo."</h1>
";

echo 
'
	<script>
	function doOnRowSelected(rowID,celInd)
	{
	window.open("busqueda.php?class=rescama&idpaciente="+rowID,"_self","");
	}
	</script>
<center>
';
$height=37+(count($datos)*25);	
echo '<div id="gridbox" style="height:'.$height.'px;width:670px;" ></div></center>
<script>
													
															mygrid = new dhtmlXGridObject("gridbox");
															mygrid.setImagePath("codebase/imgs/");
															mygrid.setEditable(true);
															mygrid.setSkin("modern");
															';
											echo '			mygrid.setHeader("'.$columnas.'");
															mygrid.setInitWidths("120,170,80,80,150,70");';
											echo' 
															mygrid.setColTypes("");
															mygrid.setColAlign("center,center,center,center,center,center");
															mygrid.setColSorting("str,str,na,na,na,na");
															mygrid.enableResizing("true,true,true,true,true,true");
															mygrid.attachEvent("onRowSelect",doOnRowSelected);
															mygrid.init();';
															
															for ($i=0;$i<=count($datos)-1;$i++)
															{
																echo $datos[$i]."\n";
															}
															
											echo '			</script><br>';
}

?>