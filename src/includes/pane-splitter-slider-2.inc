
	
	<form name="sliderForm">
	<div id="header">
		<img src="../images/logo.png">
	</div>	
	<div id="mainContainer">
		<!-- Start horizontal sliders -->
		<div id="redSlider"></div>
		<div id="valueOfRedSlider" class="sliderInputDiv"><input type="text" size="3" name="red" value="30" onchange="setSliderValue('red',this.value)"></div>
		
		<div class="clear"></div>
		
		<div id="greenSlider"></div>
		<div id="valueOfGreenSlider" class="sliderInputDiv"><input type="text" size="3" name="green" value="0" onchange="setSliderValue('green',this.value)"></div>
		
		<div class="clear"></div>
		
		<div id="blueSlider"></div>
		<div id="valueOfBlueSlider" class="sliderInputDiv"><input type="text" size="3" name="blue" value="30" onchange="setSliderValue('blue',this.value)"></div>
		
		<div class="clear"></div>	
		<br>
		<!-- Start vertical sliders -->
		<div class="ver_slider">
			<div id="ver_slide1"></div>
			<div id="val_slide1"><input type="text" name="ver_slide1" size="3" value="0"></div>
		</div>	
		<div class="ver_slider">
			<div id="ver_slide2"></div>
			<div id="val_slide2"><input type="text" name="ver_slide2" size="3" value="0"></div>
		</div>	
		<div class="ver_slider">
			<div id="ver_slide3"></div>
			<div id="val_slide3"><input type="text" name="ver_slide3" size="3" value="55"></div>
		</div>	

		
		<div class="clear"></div>	
	</div>
	</form>
<script type="text/javascript">

function setFormFieldValue(value,nameOfSlider)
{
	document.forms['sliderForm'].elements[nameOfSlider].value = value;
}

function setSliderValue(whichEl,newValue)
{
	var el;
	switch(whichEl){
		case "red":
			el = sliderObj;
			break;
		case "green":
			el = sliderObj2;
			break;
		case "blue":
			el = sliderObj3;
			break;
	}	
	
	el.setSliderValue(newValue);
	
}

var sliderObj = new DHTMLSuite.slider();
sliderObj.setSliderTarget('redSlider');
sliderObj.setOnChangeEvent('setFormFieldValue');
sliderObj.setSliderName('red');
sliderObj.setInitialValue(30);
sliderObj.setSliderMaxValue(255);
sliderObj.setSliderReversed();
sliderObj.init();

var sliderObj2 = new DHTMLSuite.slider();
sliderObj2.setSliderTarget('greenSlider');
sliderObj2.setOnChangeEvent('setFormFieldValue');
sliderObj2.setSliderName('green');
sliderObj2.setInitialValue(30);
sliderObj2.setSliderMaxValue(255);
sliderObj2.init();

var sliderObj3 = new DHTMLSuite.slider();
sliderObj3.setSliderTarget('blueSlider');
sliderObj3.setSliderName('blue');
sliderObj3.setInitialValue(2);
sliderObj3.setSliderMaxValue(10);
sliderObj3.setNumberOfSliderSteps(10);
sliderObj3.setOnChangeEvent('setFormFieldValue');
sliderObj3.init();

// Start code for vertical sliders

var sliderObj_v1 = new DHTMLSuite.slider();
sliderObj_v1.setSliderTarget('ver_slide1');
sliderObj_v1.setSliderName('ver_slide1');
sliderObj_v1.setSliderMaxValue(20);
sliderObj_v1.setSliderMinValue(10);
sliderObj_v1.setNumberOfSliderSteps(10);
sliderObj_v1.setSliderDirection('ver');
sliderObj_v1.setOnChangeEvent('setFormFieldValue');
sliderObj_v1.init();

var sliderObj_v2 = new DHTMLSuite.slider();
sliderObj_v2.setSliderTarget('ver_slide2');
sliderObj_v2.setSliderName('ver_slide2');
sliderObj_v2.setSliderMaxValue(255);
sliderObj_v2.setSliderDirection('ver');
sliderObj_v2.setOnChangeEvent('setFormFieldValue');
sliderObj_v2.init();

var sliderObj_v3 = new DHTMLSuite.slider();
sliderObj_v3.setSliderTarget('ver_slide3');
sliderObj_v3.setSliderName('ver_slide3');
sliderObj_v3.setSliderMaxValue(255);
sliderObj_v3.setInitialValue(55);
sliderObj_v3.setSliderReversed();
sliderObj_v3.setSliderDirection('ver');
sliderObj_v3.setOnChangeEvent('setFormFieldValue');
sliderObj_v3.init();



</script>

	<style type="text/css">
	/* CSS for the demo. CSS needed for the scripts are loaded dynamically by the scripts */

	
	#mainContainer{
		width:600px;
		margin:0 auto;
		margin-top:10px;
		border:1px double #000;
		padding:3px;

	}

	#valueOfRedSlider,#valueOfGreenSlider,#valueOfBlueSlider{
		width:50px;
		float:left;
	}
	#redSlider,#greenSlider,#blueSlider{
		width:200px;
		height:20px;
		float:left;
		margin-right:5px;
	
	}
	#sliderInputDiv{
		width:30px;
		height:20px;
	}
	
	.clear{
		clear:both;

	}

	
	.ver_slider{
		height:230px;
		width:30px;
		float:left;
	}
	#ver_slide1,#ver_slide2,#ver_slide3{
		width:30px;
		height:200px;
		margin-bottom:3px;
	}
	</style>
