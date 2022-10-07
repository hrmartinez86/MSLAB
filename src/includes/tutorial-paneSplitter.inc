<p>Classes used:</p>
<ul>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.paneSplitter.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.paneSplitter</a></b> - Main class for the widget.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.paneSplitterPane.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.paneSplitterPane</a></b> - Main class for a pane/frame.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.paneSplitterModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.paneSplitterModel</a></b> - Data source - for the widget.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.paneSplitterPaneModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.paneSplitterPaneModel</a></b> - Data source for a pane. the paneSplitterModel got an array of objects of this type.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.paneSplitterContentModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.paneSplitterContentModel</a></b> - Data source for content/tab inside a pane.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.dynamicContent.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.dynamicContent</a></b> - Used to load content from the server(AJAX).</li>

	</ul>
<p>Demo: The page you're looking at</p>
<p>Default css file: <a href="../css_dhtmlsuite/pane-splitter.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/pane-splitter.css</a></p>
<p>The pane splitter widget gives you an alternative to the &lt;frameset> and &lt;frame> tags. This page doesn't have any frames. Instead we have some resizable divs. These divs can be populated with content from
external files by use of Ajax.</p>
<h2>Configuration</h2>
<p>The first thing we do is to define the content of our frames. Content of frames can be included dynamically from external files, but you can also insert content from existing elements on your page (example: from divs).</p>
<p><b>Insert content from existing elements on the page</b></p>
<p>Here, we define content by use of plain HTML. example:</p>
<pre>
&lt;div id="westContent">This is the content of our west pane.&lt;/div>
&lt;div id="northContent">This is the content of our north pane.&lt;/div>
&lt;div id="southContent">Content of south pane.&lt;/div>
&lt;div id="eastContent">Content of east pane.&lt;/div>
&lt;div id="centerContent">Content of center pane.&lt;/div>
</pre>
<p>We have five divs, each one with it's own unique id.</p>
<p>Now, we need to create the Javascript datasource objects, and point them to the divs above. Example code:</p>
<pre>
var paneModel = new DHTMLSuite.paneSplitterModel();
// Creating west pane
var paneWest = new DHTMLSuite.paneSplitterPaneModel( { position : "west", id:"westPane",size:200,minSize:100,maxSize:300,scrollbars:false } );
paneWest.addContent( new DHTMLSuite.paneSplitterContentModel( { id:"westContent",htmlElementId:'westContent',title:'West',tabTitle:'West pane' } ) );
paneModel.addPane(paneWest);

// Creating east pane
var paneEast = new DHTMLSuite.paneSplitterPaneModel( { position : "east", id:"eastPane",size:150,minSize:100,maxSize:200 } );
paneEast.addContent( new DHTMLSuite.paneSplitterContentModel( { id:"eastContent",htmlElementId:'eastContent',title:'East',tabTitle: 'Tab 1' } ) );
paneModel.addPane(paneEast);

// Creating south pane
var paneSouth = new DHTMLSuite.paneSplitterPaneModel( { position : "south", id:"southPane",size:80,minSize:50,maxSize:200,resizable:true } );
paneSouth.addContent( new DHTMLSuite.paneSplitterContentModel( { id:"southContent",htmlElementId:'southContent',title:'South pane' } ) );
paneModel.addPane(paneSouth);

// Creating north pane
var paneNorth = new DHTMLSuite.paneSplitterPaneModel( { position : "north", id:"northPane",size:40,scrollbars:false,resizable:false } );
paneNorth.addContent( new DHTMLSuite.paneSplitterContentModel( { id:"northContent",htmlElementId:'northContent',title:'' } ) );
paneModel.addPane(paneNorth);

// Creating center pane
var paneCenter = new DHTMLSuite.paneSplitterPaneModel( { position : "center", id:"centerPane",size:150,minSize:100,maxSize:200 } );
paneCenter.addContent( new DHTMLSuite.paneSplitterContentModel( { id: 'center',htmlElementId:'centerContent',title:'Center pane',tabTitle: 'Center pane',closable:false } ) );
paneModel.addPane(paneCenter);

</pre>
<p>The first thing we do is to create a paneSplitterModel. This is the main datasource for our widget. It will contain an array of paneSplitterPaneModel objects which again will contain an array of paneSplitterContentModel objects. </p>
<p>We add panes to the pane splitter by creating new paneSplitterPaneModel and then by using the addPane method. Content is added to a pane by the addContent method. One pane can contain more than one paneSplitterContentModel objects. When it does,
navigation tabs will appear at the bottom of the pane. </p>
<p>As you can see from lines like this:</p>
<pre>paneWest.addContent( 
	new DHTMLSuite.paneSplitterContentModel( 
	{ id:"westContent",htmlElementId:'westContent',title:'West',tabTitle:'West pane' } 
	) 
);</pre>
<p>, we have defined that the content of this pane is the HTML element on the page where id is "westContent". This is how we point it to the div we added above.</p> 
<p>Now, we have created a paneModel object. It contains several panes which again contains content.</p>
<p>All we have to do now is to create a paneSplitter object, and point it to paneModel.</p>
<pre>
var paneSplitter = new DHTMLSuite.paneSplitter();
paneSplitter.addModel(paneModel);	// Add the data model to the pane splitter
paneSplitter.init();	// Add the data model to the pane splitter
</pre>
<p>Please notice that we have unique ids for our panes and content of the panes. </p>
<p><b>Add content from external files</b></p>
<p>It is also possible to add content from external files. This is something we do a lot when the widget has been created. We can add new tabs to panes easily with the addContent method. That's what happens when 
you select something from the menu at the top of this page.</p>
<p>With this method, we usually use the addContent of the paneSplitter object, and the attribute contentUrl instead of htmlElementId.</p>
<p>Example code:</p>
<pre>
paneSplitter.addContent('west',
	{ id:'newContent',contentUrl:'include/externalFile.php',title:'This is my new tab',tabTitle:'This is the tab title',closable:true } 
);
</pre>
<p>The first argument is the position where content should be inserted. Possible values are "west","east","north","south" and "center". The next argument is an associative array describing the new content tab.</p>
<p>There's also a lot of other methods you can use to add, modify and delete content from the pane splitter. Please see the <a href="../doc/js_docs_out/DHTMLSuite.paneSplitter.html" onclick="var scriptDocWin=window.open(this.href);return false">class documentation</a> for more help.</p>
<h2>Call back functions</h2>
<p>The pane splitter widgets supports call back function for these events:</p>
<ul>
	<li>Show pane</li>
	<li>Hide pane</li>
	<li>Expand pane</li>
	<li>Collapse pane</li>
	<li>Slide out pane</li>
	<li>Slide in pane</li>
	<li>Close pane content</li>
	<li>Tab switch</li>
</ul>
<p>You define a callback function when you create the pane model. Example:</p>
<pre>
var paneSouth = new DHTMLSuite.paneSplitterPaneModel( { position : "south", id:"southPane",size:80,minSize:50,maxSize:200,resizable:true,callbackOnCollapse:'callbackFunction' } );
</pre>
<p>Here, I have defined that a function with the name "callbackFunction" should be called when the south pane is being collapsed. Also notice that I'm only passing the name of that function. </p>
<p>When the pane is collapsed, then pane splitter widget will call this function and send in three arguments:</p>
<ol>
	<li>A reference to the pane model</li>
	<li>A string specifying the action("collapse","expand","show","hide","slideIn","slideOut","closeContent" or "tabSwitch")</li>
	<li>A reference to the content model representing the tab currently displayed in the pane.("Active tab")</li>
</ol>
<p>This is how the callbackFunction could look:</p>
<pre>
/* This is a demo for a call back function for the panes */
function callbackFunction(modelObj,action,contentObj)
{
	self.status = 'Event "' + action + '" triggered for pane with id "' + modelObj.id + '" - content id: ' + contentObj.id;
}
</pre> 
<h2>Size of tabs</h2>
<p>The tab pane uses all it's available horizontal space. If you want a different setup, you can modify css_dhtmlsuite/pane-splitter.css. This is the css creating this feature:</p>
<pre>
.DHTMLSuite_paneTabs table{	/* All tabs are placed inside a table */
	table-layout:fixed;
	width:100%;
}
</pre>
<p>To get the same layout as in the first version of the dhtml suite, change both values("fixed" and "100%") to auto. It is also possible to have different layout for the different panes. For example, let's say you don't
want the tabs to use all it's space in the west pane, add this to the css: </p>
<pre>
#DHTMLSuite_pane_west .DHTMLSuite_paneTabs table{
	table-layout:auto;
	width:auto;
}
</pre>
<p>DHTML Javascript Firefox Internet Explorer CSS</p>
