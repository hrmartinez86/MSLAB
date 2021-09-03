<ul>
	<li>Class used: <b><a href="../doc/js_docs_out/DHTMLSuite.infoPanel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.infoPanel</a></b> - Main class for the widget.</li>
	<li>Demo: <a href="demo-info-pane-1.html" onclick="var demoWin=window.open(this.href);return false">demo-info-pane-1.html</a></li>
	<li>Default css file: <a href="../css_dhtmlsuite/info-pane.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/info-pane.css</a></li>
</ul>
<p>The info pane widget creates a expandable/collapsable panel. </p>
<p>To create a panel, the first thing we have to do is to write the HTML for it. Example:</p>
<pre>
&lt;div id="pane1">
	&lt;div>
		&lt;!-- Start content of pane -->
		Content line 1&lt;br>
		Content line 2&lt;br>
		Content line 3&lt;br>
		&lt;!-- End content -->
	&lt;/div>
&lt;div id="pane2">
	&lt;div>
		&lt;!-- Start content of pane -->
		Content line 1&lt;br>
		&lt;!-- End content -->
	&lt;/div>		
&lt;/div>
</pre>
<p>It's a simple div with a sub div. It's important the first div got it's unique id.</p>
<p>This is the content of a panel. The Javascript code looks like this:</p>
<pre>
var infoPane = new DHTMLSuite.infoPanel();
infoPane.addPane('pane1','Panel 1',true,'cookie_pane1');
infoPane.addPane('pane2','Panel 2',true,'cookie_pane2');
infoPane.init();
</pre>
<p>It creates a new DHTMLSuite.infoPanel object and then adds the pane with the addPane method. Arguments to this method are:</p>
<ul>
	<li>idOfPane - Id of the div on our page</li>
	<li>labelOfPane - Heading</li>
	<li>state - True = expanded, false = collapsed</li>
	<li>nameOfCookie - Name of cookie where state is saved.</li>
	<li>width - width of pane (optional)</li>
</ul>
<?
include($_SERVER['DOCUMENT_ROOT']."/config/kontera.php");
?>	