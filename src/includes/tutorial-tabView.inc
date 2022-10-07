<p>Classes used: </p>
<ul>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.tabView.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.textEdit</a></b> - Class for the widget.</li>
</ul>
<p>Demos:</p>
<ul>
	<li><a href="demo-tabs-1.html" onclick="var demoWin=window.open(this.href);return false">demo-tabs-1.html</a></li>
	<li><a href="demo-tabs-1.html" onclick="var demoWin=window.open(this.href);return false">demo-tabs-2.html</a></li>
</ul>
<p>Default css file: <a href="../themes/blue/css/tab-view.css" onclick="var demoWin=window.open(this.href);return false">tab-view.css</a></p>
<p>When using this widget, remember to include ajax.js.</p>
<p>This widget is used to transform plain HTML into a tab view. The first you have to do is to create the HTML. This is an example:</p>
<pre>
&lt;div id="DHTMLSuite_tabView">
	&lt;div class="DHTMLSuite_aTab">
		This is the content of the first tab
	&lt;/div>
	&lt;div class="DHTMLSuite_aTab">
		Another tab
	&lt;/div>
	&lt;div class="DHTMLSuite_aTab">
		Content of tab 3&lt;br>
	&lt;/div>
	&lt;div class="DHTMLSuite_aTab">
		Content of tab 4&lt;br>
	&lt;/div>		
&lt;/div>
</pre>
<p>The div with id "DHTMLSuite_tabView" is the main div for a tab view. What id you assign it to is not important as long as it's unique. Inside of this div, we have defined four tabs by assigning them to the class "DHTMLSuite_aTab". </p>
<p>Now, we need to create the tabView javascript object. This is done with this code:</p>
<pre>
&lt;SCRIPT type="text/javascript">
var tabViewObj = new DHTMLSuite.tabView();
tabViewObj.setParentId('DHTMLSuite_tabView');
tabViewObj.setTabTitles(Array('HTML','CSS','Javascript','DHTML'));
tabViewObj.setIndexActiveTab(2);
tabViewObj.setWidth('400');
tabViewObj.setHeight('200');
tabViewObj.init();
&lt;/SCRIPT>
</pre>
<p>var tabViewObj = new DHTMLSuite.tabView() creates the tabView object. We connect it with our html by calling the setParentId method. Notice that the id sent by this method corresponds with the id of the main div in the HTML above. We
have then defined the tab titles "HTML","CSS", "Javascript" and "DHTML" in the setTabTitles method. </p>
<p>tabViewObj.setIndexActiveTab(2) specifies that the third tab should be initially active(first tab has index 0). We also set the size of the tab view to 400x200 pixels. You can also send in percentage values here. </p>
<p>The init method will initalize the widget.</p>