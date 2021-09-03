<p>Classes used:</p>
<ul>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.tableWidget.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.tableWidget</a></b> - Class for the widget.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.tableWidgetPageHandler.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.tableWidgetPageHandler</a></b> - Class for the "page" links(table navigation).</li>
</ul>
<p>Demo: <a href="demo-tablewidget-server-sort.html" onclick="var demoWin=window.open(this.href);return false">demo-tablewidget-server-sort.html</a></p>
<p>Default css file: <a href="../css_dhtmlsuite/table-widget.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/table-widget.css</a></p>
<p>SQL queries used in this demo: <a href="includes/tableWidgetServerSortDbDump.txt" onclick="var demoWin=window.open(this.href);return false">tableWidgetServerSortDbDump.txt</a>. In order to run the demo on your local
server, create a database(mySQL), then create the table by copying and pasting the content of this txt file into your db concole. Finally, create a database connection at the top of demos/includes/getTableData.php.</p>
<p>This tutorial will show you how to use the tableWidget class for tables where data are sorted on the server instead of on the client. </p>
<p>First, we create the &lt;TABLE> by following the description given in the Table Widget client sort tutorial. </p>
<p>The methods used for the tableWidget are also pretty much the same as in the previous example:</p>
<pre>
var tableWidgetObj = new DHTMLSuite.tableWidget();
tableWidgetObj.setTableId('myTable');
tableWidgetObj.setTableWidth('95%');
tableWidgetObj.setTableHeight(230);
tableWidgetObj.setServerSideSort(true);
// The value doesn't matter here since we're using server side sort. 
// However, we need to set a value for the sortable columns in order
// to get onclick events on the header cells.
tableWidgetObj.setColumnSort(Array('S','S','S','S','S'));	
tableWidgetObj.setServersideSortFileName('includes/getTableData.php');	// Specify server side file name
tableWidgetObj.setServersideSortNumberOfRows(10);	// Receive 10 rows from the server
tableWidgetObj.init();
tableWidgetObj.updateTableHeader(0,'ascending');
</pre>
<p>Now, the table widget is created. We have specified that we want to sort data on the server by calling the</p>
<ul>
	<li>setServerSideSort, </li>
	<li>setServersideSortFileName and</li>
	<li>setServersideSortNumberOfRows methods</li>
</ul>
<p>The setServerSideSort method is used only to specify that we want to sort data on the server. The setServersideSortFileName is used to specify where want our script to get new
sorted data from. At last, setServersideSortNumberOfRows specifies that we want to get 10 rows of data in the response from the server.</p>
<h2>Format of data from server</h2>
<p>The data from the server is returned in the following format:</p>
<p>cell content###cell content 2|||cell content new row###cell content</p>
<p>Each cell is separated by ### and each new row is separated by |||.</p>
<h2>The tableWidgetPageHandler object</h2>
<p>The tableWidgetPageHandler class is used to create a table navigation bar for our table.</p>
<p>In our example, it is created by this code:</p>
<pre>
var pagehandler = new DHTMLSuite.tableWidgetPageHandler();
pagehandler.setTargetId('tableWidgetPagina');	// Specify where to insert the paginating object.
pagehandler.setTableRef(tableWidgetObj);	// Specify where to insert the paginating object.
pagehandler.setTotalNumberOfRows(40);
pagehandler.init();
</pre>
<ul>
	<li>The setTargetId method specifies where we want to insert the page handler. example: &lt;DIV id="tableWidgetPagina">&lt;/DIV>.</li>
	<li>setTableRef is used to connect the pageHandler with the tableWidgetObj so that they can communicate with each other.</li>
	<li>setTotalNumberOfRows specifies the total number of records in the entire dataset</li>
	<li>init initalizes the pageHandler widget</li>
</ul>
