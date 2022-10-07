<p><b>Classes used</b></p>
<ul>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.windowWidget.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.windowWidget</a></b> - Main class for the widget.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.windowTabModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.windowTabModel</a></b> - Data source/Model for a tab.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.windowModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.windowModel</a></b> - Data source/Model for the window.</li>
</ul>
<p><b>Demos:</b></p>
<ul>
	<li><a href="demo-window.html" onclick="var demoWin=window.open(this.href);return false">demo-window.html</a></li>
	<li><a href="demo-window-theme-windows.html" onclick="var demoWin=window.open(this.href);return false">demo-window-theme-windows.html</a></li>
	<li><a href="demo-color-widget-1.html" onclick="var demoWin=window.open(this.href);return false">demo-color-widget-1.html</a> - Color widgets inside window tabs.</li>
</ul>
<p><b>Css file:</b></p>
<ul>
	<li>Default css file: <a href="../themes/blue/window.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/window.css</a></li>
	<li>Default css file: <a href="../themes/blue/window-theme-windows.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/window.css</a></li>
</ul>
<p><b>Js files:</b></p>
<ul>
	<li><b>Alternative 1</b>: Include dhtml-suite-for-applications.js</li>
	<li><b>Alternative 2</b>: Include dhtml-suite-for-applications-without-comments.js</li>
	<li><b>Alternative 3</b>: Include 
		<ul>
			<li>separateFiles/dhtmlSuite-common.js</li>
			<li>separateFiles/dhtmlSuite-windowWidget.js</li>
			<li>separateFiles/dhtmlSuite-resize.js</li>
			<li>separateFiles/dhtmlSuite-dragDropSimple.js</li>
			<li>separateFiles/dhtmlSuite-dynamicContent.js</li>
		</ul>
	</li>
</ul>
<p>The main class for a window widget is the DHTMLSuite.windowWidget class. It's relative easy to create a new window. The first we do is to write the HTML markup for the window. The HTML markup describes the window and could look like this:</p>
<pre>
&lt;div id="colorWindow" windowProperties="callbackOnClose:deleteWindow,title:Web colors,resizable:true,width:440,height:380,closable:true,maxWidth:900,dragable:true,cookieName:colorWidgetWindow3,xPos:5,yPos:170,minWidth:365,minHeight:250,activeTabId:colorWidget"><br>
	&lt;div id="windowContent1" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Web colors,overflow:hidden"><br>
	&lt;/div><br>
	&lt;div id="colorWidget" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Advanced color picker,overflow:hidden"><br>
	&lt;/div><br>
	&lt;div id="windowContent3" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Named colors,overflow:hidden"><br>
	&lt;/div><br>
	&lt;div id="colorSlider" style="padding:5px" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Color slider"><br>
	&lt;/div>	<br>
	&lt;div id="windowContent4" style="padding:5px" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Tutorial,overflow:auto,contentUrl:includes/tutorial-colorWidget.html"><br>
	&lt;/div><br>
&lt;/div>
</pre>
<p>Here, we have a div with some inner divs. The main div is the div describing the window. The sub divs here are divs describing the tabs of this window. As you can see, we have some custom attributes here. "windowProperties" is used
to describe the window. The value of this property is a commaseparated list of properties. You can choose from these option:</p>
<ul>
	<li>isClosable - Is the window closable - default = true (Optional)</li>
	<li>isDragable - Is the window dragable - default = true (Optional)</li>
	<li>isResizable - Is the window resizable - default = true (Optional)</li>
	<li>isMinimizable - Is the window minimizable - default = true (Optional)</li>
	<li>cookieName - Cookie name where properties are remembered (Optional)</li>
	<li>title - Title inside title bar (Optional)</li>
	<li>icon - Icon in window title bar(Not yet supported)</li>
	<li>width - Initial width of window - this value may be overridden by value stored in cookie</li>
	<li>height - Initial height of window - this value may be overridden by value stored in cookie</li>
	<li>xPos - X position of window</li>
	<li>yPos - Y position of window</li>
	<li>activeTabId - Id of active window tab (Optional)</li>
	<li>minWidth - Minimium width of window (Optional)</li>
	<li>maxWidth - Maximum width of window (Optional)</li>
	<li>minHeight - Min height of window (Optional)</li>
	<li>maxHeight - Max height of window (Optional)</li>
	<li>windowsTheme - Display window with windows theme (true or false) (Optional)</li>
	<li>callbackOnClose - Call back to execute when the window is closed. (Optional)</li>
</ul>	
<p>Most of these attributes are optional.</p>
<p>Also notice that we have given the window an unique id.</p>
<p>The inner divs are used to describe window tabs. Example:</p>
<pre>&lt;div id="windowContent4" style="padding:5px" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Tutorial,overflow:auto,contentUrl:includes/myFile.html"></pre>
<p>You should notice that this div has been assigned to the DHTMLSuite_windowContent class. The script looks for this class, and will not recognize a div as a tab unless it's assigned to this class.</p>
<p>It's also important to specify the id of the tab. This is done in the "id" attribute. Other tab properties are defined in the custom attribute "tabProperties". This is also a commaseparated list of keys + value. In the
example above, the tab will have the title "Tutorial", it will display a scrollbar when content is larger than the visible area inside the window and it will initially display content from the external file includes/myfile.html.</p>
<p>the tabProperties attribute can contain one or more of these properties:</p>
<ul>
	<li>tabTitle - Title of tab</li>
	<li>contentUrl - Url to load from the server (Optional)</li>
	<li>id - Id of tab</li>
	<li>htmlElementId - Id of HTML element. (Optional)</li>
	<li>isDeleted - Is the tab flagged as deleted, i.e. not visible(Optional)</li>
	<li>overflow - What to do when content is wider or higher than the window - css overflow attribute like "auto","scroll" or "hidden". Default is "auto" (Optional)</li>
</ul>
<p>Once we have created the markup, we need to create a window model and point it to our markup. This can be done like this:</p>
<pre>
var windowModel = new DHTMLSuite.windowModel();
windowModel.createWindowModelFromMarkUp('colorWindow');
</pre>
<p>All we do here is to create the window model object and point it to the HTML markup we just created("colorWindow" is the id of the main div in our markup).</p>
<p>Now, we create the windowWidget object and points it to the windowModel object:</p>
<pre>
var colorWindow = new DHTMLSuite.windowWidget();
colorWindow.addWindowModel(windowModel);
colorWindow.init();
</pre>
<p>From this code, the script will create a window with five tabs. The content of the last tab will be loaded from external files while the other ones will be empty. In the color widget demo, where this code is from, I
have appended elements dynamically to the empty tabs by use of the appendContent method. Example:</p>
<pre>
var colorSlider = new DHTMLSuite.colorSlider({callbackOnChangeRgb:'setColor' });
colorSlider.init();
colorWindow.appendContent('colorSlider',colorSlider.getDivElement());
</pre>
<p>This code creates a color slider and appends the DIV for the color slider to one of the empty window tabs.</p>
<?
include($_SERVER['DOCUMENT_ROOT']."/config/kontera.php");
?>	