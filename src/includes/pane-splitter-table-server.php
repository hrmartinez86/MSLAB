<?
include($_SERVER['DOCUMENT_ROOT']."/config/connect.php");
?>
<h2>Table widget (Sort data on the server)</h2>
<!-- Start of table html -->
<div>
<table id="myTableServer">
	<colgroup>
		<col style="width:20%"></col>
		<col style="width:20%"></col>
		<col style="width:20%"></col>
		<col></col>
		<col></col>
	</colgroup>
	<thead>
		<tr>
			<td sortBy="lastname">Lastname</td>
			<td sortBy="firstname">Firstname</td>
			<td sortBy="position">Position</td>
			<td sortBy="income">Income</td>
			<td sortBy="hired">Employee since</td>
		</tr>
	</thead>
	<tbody>
		<?
		$res = mysql_query("select * from dhtmlsuite_tableWidgetData order by lastname limit 10");
		while($inf = mysql_fetch_array($res)){
			?>
			<TR>
				<TD><? echo $inf["lastname"]; ?></TD>
				<TD><? echo $inf["firstname"]; ?></TD>
				<TD><? echo $inf["position"]; ?></TD>
				<TD><? echo $inf["income"]; ?></TD>
				<TD><? echo $inf["hired"]; ?></TD>

			</TR>		
			<?		
		}		
		?>
	</tbody>
</table>
</div>
<div id="tableWidgetPagina"></div>
<p>This demo uses the DHTMLSuite.tableWidget class for the table. The navigation links below the table is created by the DHTMLSuite.tableWidgetPageHandler class.</p>
<p>A demo of this table can also been seen <a href="demo-tablewidget-server-sort.html" onclick="var w=window.open(this.href);return false">here</a></p>

<script type="text/javascript">

var tableWidgetObjServer = new DHTMLSuite.tableWidget();
tableWidgetObjServer.setTableId('myTableServer');
tableWidgetObjServer.setTableWidth('95%');
tableWidgetObjServer.setTableHeight(230);
tableWidgetObjServer.setServerSideSort(true);
tableWidgetObjServer.setColumnSort(Array('S','S','S','N','N'));	// The value doesn't matter here since we're using server side sort. However, we need to set a value for the sortable columns.
tableWidgetObjServer.setServersideSortFileName('includes/getTableData.php');	// Specify server side file name
tableWidgetObjServer.setServersideSortNumberOfRows(10);	// Receive 10 rows from the server
tableWidgetObjServer.init();
tableWidgetObjServer.updateTableHeader(0,'ascending');

// Creating pagina object

var pagehandler = new DHTMLSuite.tableWidgetPageHandler();
pagehandler.setTargetId('tableWidgetPagina');	// Specify where to insert the paginating object.
pagehandler.setTableRef(tableWidgetObjServer);	// Specify where to insert the paginating object.
pagehandler.setLinkPagePrefix('[');
pagehandler.setLinkPageSuffix(']');
<?
// Get total number of rows from the database */
$res = mysql_query("select count(ID) as countRows from dhtmlsuite_tableWidgetData") or die(mysql_error());
$inf = mysql_fetch_array($res);
?>
pagehandler.setTotalNumberOfRows(<? echo $inf["countRows"]; ?>);
pagehandler.init();
</script>
