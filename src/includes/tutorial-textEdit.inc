<p>Classes used: </p>
<ul>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.textEdit.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.textEdit</a></b> - Class for the widget.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.textEditModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.textEditModel</a></b> - Datasource for an editable element.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.listModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.listModel</a></b> - used as datasource for select boxes</li>
</ul>
<p>Demo: <a href="demo-text-edit.html" onclick="var demoWin=window.open(this.href);return false">demo-text-edit.html</a></p>
<p>Default css file: <a href="../css_dhtmlsuite/text-edit.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/text-edit.css</a></p>
<p>When using this widget, remember to include ajax.js.</p>
<p>This widget makes standard HTML element editable. Changes done to the elements are sent to the server with Ajax.</p>
<p>In the demo, we have this table:</p>
<pre>
&lt;table>
	&lt;tr>
		&lt;td>&lt;b>Name&lt;/b>&lt;/td>
		&lt;td>&lt;b>Value&lt;/b>&lt;/td>
	&lt;/tr>
	&lt;tr>
		&lt;td>&lt;label id="labelName">Name:&lt;/label>&lt;/td>
		&lt;td>&lt;div id="name">John Doe&lt;/div>&lt;/td>
	&lt;/tr>
	&lt;tr>
		&lt;td>&lt;label id="labelGender">Gender:&lt;/label>&lt;/td>
		&lt;td>&lt;div id="gender">Male&lt;/div>&lt;/td>
	&lt;/tr>
	&lt;tr>
		&lt;td>&lt;label id="labelIncome">Income:&lt;/label>&lt;/td>
		&lt;td>&lt;div id="income">&lt;/div>&lt;/td>
	&lt;/tr>	
&lt;/table>
</pre>
<p>We want to make name, gender and income editable. We want to use a standard text input for the name, while income and gender should be picked from a select list.</p>
<p>The first we do is to create the datasource for our select boxes, gender and income. This can be done by 1) creating the select box markup and 2) create the listModel objects and point
them to the select boxes.</p>
<p>These are the select boxes:</p>
<pre>
&lt;select id="datasource_list">
	&lt;option value="f">Female&lt;/option>
	&lt;option value="m">Male&lt;/option>
&lt;/select>
&lt;select id="datasource_list2">
	&lt;option value="1">0 - 20000&lt;/option>
	&lt;option value="2">20000 - 30000&lt;/option>
	&lt;option value="3">40000 - 50000&lt;/option>
	&lt;option value="4">60000 - 100000&lt;/option>
	&lt;option value="5">100000 - &lt;/option>
&lt;/select>
</pre>
<p>This is the datasource. Now, we create two listModel objects and point them to these two select boxes.</p>
<pre>
var listModelGender = new DHTMLSuite.listModel();
listModelGender.createFromMarkupSelect('datasource_list');
var listModelIncome = new DHTMLSuite.listModel();
listModelIncome.createFromMarkupSelect('datasource_list2');
</pre>
<p>The createFromMarkupSelect method will parse the select box and then hide it afterwards. Argument to this method is the id of the select box.</p>
<p>Now, we create our textEdit object and add elements to it:</p>
<pre>
var textEditObj = new DHTMLSuite.textEdit();	// Create new textEdit object
textEditObj.setServersideFile('includes/saveTextEdit.php');	// Specify server side file

textEditObj.addElement( { labelId: 'labelName',elementId: 'name' } );	// Add element
textEditObj.addElement( { labelId: 'labelGender',elementId: 'gender',listModel:listModelGender } );	// Add element
textEditObj.addElement( { labelId: 'labelIncome',elementId: 'income',listModel:listModelIncome } );	// Add element
textEditObj.init();
</pre>
<p>The setServersideFile method specifies where changes will be sent. A request to this file is sent when you exit edit mode. Three variables are sent to this file:</p>
<ol>
	<li>saveTextEdit - Set to "1"</li>
	<li>textEditElementId - The id of the modified element</li>
	<li>textEditValue - New value of this element.
</ol>
<p>This server side file should save changes to the database and output "OK" when everything worked as it should. demos/includes/saveTextEdit.php shows you an example how to save changes from this widget.</p>
<p>the addElement method is used to add new editable elements. It takes only one argument, which is an associative array, describing the editable element. The keys in this array are:</p>
<ul>
	<li>labelId : Id of label (optional)</li>
	<li>elementId: Id of editable element</li>
	<li>serverFile: Alternative server side file for this element(Optional)</li>
	<li>listModel: Reference to a DHTMLSuite.listModel object(Optional). We will specify this key for gender and income in our example above.</li>
</ul>
<p>Finally, the init() method is called to initialize the widget.</p>
<?
include($_SERVER['DOCUMENT_ROOT']."/config/kontera.php");
?>	