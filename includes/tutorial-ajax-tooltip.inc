<p>Class used: <b><a href="../doc/js_docs_out/DHTMLSuite.dynamicTooltip.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.dynamicTooltip</a></b></p>
<p>Demo: <a href="demo-dyn-tooltip-1.html" onclick="var demoWin=window.open(this.href);return false">demo-dyn-tooltip-1.html</a></p>
<p>Default css file: <a href="../css_dhtmlsuite/dynamic-tooltip.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/dynamic-tooltip.css</a></p>
<p>What you have to is to create an object of this class and use it in mouseover and mouseout events on your page.</p>
<P>Example:</p>
<pre>
&lt;script type="text/javascript">
tooltipObj = new DHTMLSuite.dynamicTooltip();	// Create ONE tooltip object.
&lt;/script>


&lt;a href="#" 
onmouseover="tooltipObj.displayTooltip('file.html',this);return false" 
onmouseout="tooltipObj.hideTooltip()">Info&lt;/a>
</pre>
<p>The displayTooltip method takes two arguments. The first one is the path to the file you want to show in the tooltip. The second argument is always "this", which is a reference
to the tag triggering the event.</p>
<p>Remember that the content of this file will be inserted into a div on your page. This means that you don't need &lt;HTML>,&lt;HEAD> and &lt;BODY> tags in it.</p>