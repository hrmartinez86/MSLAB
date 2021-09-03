<div id="header">
	<img src="../images/logo.png">
</div>
<div id="colorDiv">Color me!</div>
<div id="colorBoxes">

</div>


<script type="text/javascript">
/* START DEMO CODE TO CREATE THE COLOR SCHEMES */

var colorUtil = new DHTMLSuite.colorUtil();
var currentFunc = '';
function clearColorBoxes()
{
	document.getElementById('colorBoxes').innerHTML = '';
}
function getComplementary()
{
	clearColorBoxes();
	var color = colorUtil.getContrastColorByRgb(currentPreviewColor);
	div = document.createElement('DIV');
	div.style.backgroundColor = '#' + color;
	document.getElementById('colorBoxes').appendChild(div);
	currentFunc = 'getComplementary()'
}

function getTriadeColors()
{
	clearColorBoxes();
	var colors = colorUtil.getTriadeColorsByRgb(currentPreviewColor); // Get the two triade colors
	for(var no=0;no<colors.length;no++){
		div = document.createElement('DIV');
		div.style.backgroundColor = '#' + colors[no];
		document.getElementById('colorBoxes').appendChild(div);		
		
	}
	currentFunc = 'getTriadeColors()'
}

function getTetradeColors()
{
	clearColorBoxes();
	var colors = colorUtil.getTetradeColorsByRgb(currentPreviewColor); // Get the two triade colors
	for(var no=0;no<colors.length;no++){
		div = document.createElement('DIV');
		div.style.backgroundColor = '#' + colors[no];
		document.getElementById('colorBoxes').appendChild(div);		
		
	}
	currentFunc = 'getTetradeColors()'
}

function getAnalogicColors()
{
	clearColorBoxes();
	var colors = colorUtil.getAnalogicColors(currentPreviewColor,30); // Get the two triade colors
	for(var no=0;no<colors.length;no++){
		div = document.createElement('DIV');
		div.style.backgroundColor = '#' + colors[no];
		document.getElementById('colorBoxes').appendChild(div);		
		
	}
	currentFunc = 'getAnalogicColors()'
}


</script>
<div id="action">
	<h2>Generate color scheme</h2>
	<a href="#" onclick="getComplementary();return false">Show compelemntary/contrast color</a><br>
	<a href="#" onclick="getTriadeColors();return false">Show triade("Soft contrast) colors"</a><br>
	<a href="#" onclick="getTetradeColors();return false">Show tetrade("Double-contrast") colors</a><br>
	<a href="#" onclick="getAnalogicColors();return false">Show analogic colors</a><br>
	<a href="#" onclick="clearColorBoxes();currentFunc='';return false">No colors</a><br>
	<p><i>These color schemes has been created by some of the methods available in the DHTMLSuite.colorUtil class</i></p>
</div>
<div id="colorWindow" windowProperties="windowsTheme:true,callbackOnClose:deleteWindow,title:Web colors,resizable:true,width:440,height:380,closable:true,maxWidth:900,dragable:true,cookieName:colorWidgetWindow3,xPos:5,yPos:170,minWidth:365,minHeight:250,activeTabId:colorWidget">
	<div id="colorWindowContent1" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Web colors,overflow:hidden">
	</div>
	<div id="colorWidget" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Advanced color picker,overflow:hidden">
	</div>
	<div id="colorWindowContent3" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Named colors,overflow:hidden">

	</div>
	<div id="windowContent4" style="padding:5px" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Tutorial,overflow:auto,contentUrl:includes/tutorial-colorWidget.html">
		
	</div>
</div>


<script type="text/javascript">
 var currentPreviewColor; 
  function deleteWindow(obj)
 {
 		obj.purge();	// Delete the div elements for the window.
 }
function setColorFromPallette(color)
{
	
	colorWidget.setRgbColor(color.rgb);
	setColor(color);

}
function setColor(color)
{
	var obj = document.getElementById('colorDiv');	
	obj.style.backgroundColor = color.rgb;
	currentPreviewColor = color.rgb;	
	if(currentFunc)eval(currentFunc);
	if(color.name)obj.innerHTML = color.name;else obj.innerHTML=color.rgb;
}

/* Step 1 - > Creaet a window widget */
var windowModel = new DHTMLSuite.windowModel();
DHTMLSuite.commonObj.setCssCacheStatus(false)
windowModel.createWindowModelFromMarkUp('colorWindow');

var colorWindow = new DHTMLSuite.windowWidget();

colorWindow.addWindowModel(windowModel);
colorWindow.init();

var webColorPalette = new DHTMLSuite.colorPalette( { callbackOnColorClick:'setColorFromPallette' } );
webColorPalette.addAllWebColors();
webColorPalette.init();

var webColorPalette2 = new DHTMLSuite.colorPalette( { callbackOnColorClick:'setColorFromPallette' } );
webColorPalette2.addGrayScaleColors(32);
webColorPalette2.init();


var namedColorPalette = new DHTMLSuite.colorPalette( {callbackOnColorClick:'setColorFromPallette' } );
namedColorPalette.addAllNamedColors();
namedColorPalette.init();

var colorWidget = new DHTMLSuite.colorWidget({ callbackOnChangeRgb : 'setColor',hueSliderPosition:'horizontal' });
colorWidget.init();
colorWidget.setRgbColor('#AA5033');

colorWindow.appendContent('colorWindowContent1',webColorPalette.getDivElement());
colorWindow.appendContent('colorWindowContent1',webColorPalette2.getDivElement());
colorWindow.appendContent('colorWidget',colorWidget.getDivElement());
colorWindow.appendContent('colorWindowContent3',namedColorPalette.getDivElement());



</script>
	<style type="text/css">
	body{
		margin:0px;
		position:relative;
	}
	#colorDiv{
		width:380px;
		height:50px;
		border:5px solid #000;
		padding:10px;
		text-align:center;
		font-size:1.2em;
		font-weight:bold;
		margin:5px;
	}
	
	#colorBoxes{
		
		border:5px solid #CCC;
		width:390px;
		background-color:#EEE;
		height:106px;
		margin:5px;
		padding-left:10px;
		margin-top:15px;
	}
	#colorBoxes div{
		width:80px;
		height:80px;
		margin-right:10px;
		margin-top:10px;
		border:3px solid #000;
		float:left;
	}
	#action{
		margin-left:10px;
	}
	</style>

