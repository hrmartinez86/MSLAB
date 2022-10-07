<p>Class used: <b><a href="../doc/js_docs_out/DHTMLSuite.tableWidget.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.tableWidget</a></b> - Class for the widget.</p>
<p>Demo: <a href="demo-tablewidget.html" onclick="var demoWin=window.open(this.href);return false">demo-tablewidget.html</a></p>
<p>Default css file: <a href="../css_dhtmlsuite/table-widget.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/table-widget.css</a></p>
<p>The tableWidget class transforms a plain HTML table on your page. It makes it sortable and it also modifies the layout of the table.</p>
<p>This is an example of a table:</p>
<pre>
&lt;div>
&lt;table id="myTable">
	&lt;thead>
		&lt;tr>
			&lt;td>Name&lt;/td>
			&lt;td>Age&lt;/td>
			&lt;td>Position&lt;/td>
			&lt;td>Income&lt;/td>
			&lt;td>Gender&lt;/td>
		&lt;/tr>
	&lt;/thead>
	&lt;tbody>
		&lt;tr>
			&lt;td>John&lt;/td>
			&lt;td>37&lt;/td>
			&lt;td>Managing director&lt;/td>
			&lt;td>90.000&lt;/td>
			&lt;td>Male&lt;/td>
		&lt;/tr>
		&lt;tr>
			&lt;td>Susan&lt;/td>
			&lt;td>34&lt;/td>
			&lt;td>Partner&lt;/td>
			&lt;td>90.000&lt;/td>
			&lt;td>Female&lt;/td>
		&lt;/tr>
		&lt;tr>
			&lt;td>David&lt;/td>
			&lt;td>29&lt;/td>
			&lt;td>Head of production&lt;/td>
			&lt;td>70.000&lt;/td>
			&lt;td>Male&lt;/td>
		&lt;/tr>
		&lt;tr>
			&lt;td>Laura&lt;/td>
			&lt;td>29&lt;/td>
			&lt;td>Head of marketing&lt;/td>
			&lt;td>70.000&lt;/td>
			&lt;td>Female&lt;/td>
		&lt;/tr>
	&lt;/tbody>
&lt;/table>
&lt;/div>
</pre>
<p>Please not the following:</p>
<ul>
	<li>There's a DIV outside the table. </li>
	<li>Headings for the table is inside a &lt;THEAD> tag</li>
	<li>The table got it's unique id.</li>
</ul>
<p>In order to make this table sortable, we create a DHTMLSuite.tableWidget object and point it to the table above:</p>
<pre>
var tableWidgetObj = new DHTMLSuite.tableWidget();
tableWidgetObj.setTableId('myTable');
tableWidgetObj.setTableWidth('95%');
tableWidgetObj.setTableHeight(250);
tableWidgetObj.setColumnSort(Array('S','N',false,'N','S'));
tableWidgetObj.init();
tableWidgetObj.sortTableByColumn(0);	// Initially sort the table by the first column
</pre>
<p>We point it to &lt;TABLE id="myTable"> in the setTableId method. The width of the table iset to 95%(relative size to parent element of outside div). Table height is set to 250pixels. Then we have specified which columns to 
sort and how to sort them. First and last column should be sorted as strings, while second and fourth column should be sorted numerically. The third column is not sortable.</p>
<p>We call the init method to initialize the widget and then the sortTableByColumn method to initially sort it by the first column.</p>