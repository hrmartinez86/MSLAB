	<div id="header">
		<img src="../images/logo.png">
	</div>	
	<!-- When using a table, remember to have a <div> inside the td, see <div id="gender"> -->
	<table>
		<tr>
			<td><b>Name</b></td>
			<td><b>Value</b></td>
		</tr>
		<tr>
			<td><label id="labelName">Name:</label></td>
			<td><div id="name">John Doe</div></td>
		</tr>
		<tr>
			<td><label id="labelGender">Gender:</label></td>
			<td><div id="gender">Male</div></td>
		</tr>
		<tr>
			<td><label id="labelIncome">Income:</label></td>
			<td><div id="income"></div></td>
		</tr>	
	</table>
	
	<!-- Data source for a list model -->
	<select id="datasource_list">
		<option value="f">Female</option>
		<option value="m">Male</option>
	</select>
	<select id="datasource_list2">
		<option value="1">0 - 20000</option>
		<option value="2">20000 - 30000</option>
		<option value="3">40000 - 50000</option>
		<option value="4">60000 - 100000</option>
		<option value="5">100000 - </option>
	</select>
	
<script type="text/javascript">
// Create list model
var listModelGender = new DHTMLSuite.listModel();
listModelGender.createFromMarkupSelect('datasource_list');
var listModelIncome = new DHTMLSuite.listModel();
listModelIncome.createFromMarkupSelect('datasource_list2');


var textEditObj = new DHTMLSuite.textEdit();	// Create new textEdit object
textEditObj.setServersideFile('includes/saveTextEdit.php');	// Specify server side file

textEditObj.addElement( { labelId: 'labelName',elementId: 'name' } );	// Add element
textEditObj.addElement( { labelId: 'labelGender',elementId: 'gender',listModel:listModelGender } );	// Add element
textEditObj.addElement( { labelId: 'labelIncome',elementId: 'income',listModel:listModelIncome } );	// Add element
textEditObj.init();

</script>
<p>Click on the elements you want to change. Changes are sent to the server when the input loses focus.</p>