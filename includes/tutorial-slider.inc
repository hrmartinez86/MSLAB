<p>Class used: <b><a href="../doc/js_docs_out/DHTMLSuite.slider.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.slider</a></b></p>
<p>Demo: <a href="demo-slider-1.html" onclick="var demoWin=window.open(this.href);return false">demo-slider-1.html</a></p>
<p>Default css file: <a href="../css_dhtmlsuite/slider.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/slider.css</a></p>
<p>The slider widget inserts a horizontal or vertical slider into a HTML element on your page.</p>
<p>Simple example:</p>
<pre>
&lt;div id="redSlider">&lt;/div>
&lt;div id="valueOfRedSlider" class="sliderInputDiv">
	&lt;input type="text" size="3" name="red" value="30" onchange="setSliderValue(this.value)">
&lt;/div>
&lt;SCRIPT type="text/javascript">		
var sliderObj = new DHTMLSuite.slider();
sliderObj.setSliderTarget('redSlider');
sliderObj.setSliderName('red');
sliderObj.setOnChangeEvent('setFormFieldValue');
sliderObj.setInitialValue(30);
sliderObj.setSliderMaxValue(255);
sliderObj.setSliderReversed();
sliderObj.init();
&lt;/SCRIPT>
</pre>
<p>This code will insert a slider into the HTML tag with id "redSlider", example &lt;DIV id="redSlider">&lt;/DIV>. When changes are made to the slider, the function
with name setFormFieldValue will be called (specified by the setOnChangeEvent method). Arguments to this function will be the value of the slider and the name of the slider (set by the setSliderName method).</p>
<p>This function may look like this:</p>
<pre>
function setFormFieldValue(value,nameOfSlider)
{
	document.forms[0].elements[nameOfSlider].value = value;
}
</pre>
<p>So when you move the slider, this function will be called. It will update the text input with name "red" with the value of the slider.</p>
<p>As you can see from the HTML code above, a function called setSliderValue is called when you change the value of the text input "red". This is done in order to synchronize the slider
with with the text input. </p>
<p>This function looks like this:</p>
<pre>
function setSliderValue(whichEl,newValue){
	sliderObj.setSliderValue(newValue);
}
</pre>
<p>It simply call the setSliderValue method which will update the arrow position on the slider.</p>