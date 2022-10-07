<h2>Table widget 1</h2>
<p>All columns except position are sortable. Click on the headers to sort.</p>
<!-- Start of table html -->
<div>
<table id="myTable">
	<thead>
		<tr>
			<td>Name</td>
			<td>Age</td>
			<td>Position</td>
			<td>Income</td>
			<td>Gender</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>John</td>
			<td>37</td>
			<td>Managing director</td>
			<td>90.000</td>
			<td>Male</td>
		</tr>
		<tr>
			<td>Susan</td>
			<td>34</td>
			<td>Partner</td>
			<td>90.000</td>
			<td>Female</td>
		</tr>
		<tr>
			<td>David</td>
			<td>29</td>
			<td>Head of production</td>
			<td>70.000</td>
			<td>Male</td>
		</tr>
		<tr>
			<td>Laura</td>
			<td>29</td>
			<td>Head of marketing</td>
			<td>70.000</td>
			<td>Female</td>
		</tr>
		<tr>
			<td>Kate</td>
			<td>18</td>
			<td>Marketing</td>
			<td>50.000</td>
			<td>Female</td>
		</tr>
		<tr>
			<td>Mona</td>
			<td>21</td>
			<td>Marketing</td>
			<td>53.000</td>
			<td>Female</td>
		</tr>
		<tr>
			<td>Mike</td>
			<td>21</td>
			<td>Marketing</td>
			<td>53.000</td>
			<td>Male</td>
		</tr>
		<tr>
			<td>Mark</td>
			<td>25</td>
			<td>Production</td>
			<td>52.000</td>
			<td>Male</td>
		</tr>
		<tr>
			<td>Peter</td>
			<td>33</td>
			<td>Production</td>
			<td>55.000</td>
			<td>Male</td>
		</tr>
		<tr>
			<td>Jennifer</td>
			<td>24</td>
			<td>Production</td>
			<td>49.000</td>
			<td>Female</td>
		</tr>
		<tr>
			<td>David</td>
			<td>25</td>
			<td>Photography</td>
			<td>51.000</td>
			<td>Male</td>
		</tr>
		<tr>
			<td>Anna</td>
			<td>42</td>
			<td>Head of photography</td>
			<td>56.000</td>
			<td>Female</td>
		</tr>
		<tr>
			<td>Rita</td>
			<td>30</td>
			<td>Photography</td>
			<td>54.000</td>
			<td>Female</td>
		</tr>
		<tr>
			<td>Magnus</td>
			<td>25</td>
			<td>Freelancer</td>
			<td>65.000</td>
			<td>Male</td>
		</tr>
		<tr>
			<td>Johnny</td>
			<td>29</td>
			<td>Freelancer</td>
			<td>63.000</td>
			<td>Male</td>
		</tr>
	
	</tbody>
</table>
</div>




<script type="text/javascript">
var tableWidgetObj = new DHTMLSuite.tableWidget();

tableWidgetObj.setTableId('myTable');
tableWidgetObj.setTableWidth('95%');
tableWidgetObj.setTableHeight(250);
tableWidgetObj.setColumnSort(Array('S','N',false,'N','S'));
tableWidgetObj.init();
tableWidgetObj.sortTableByColumn(0,'descending');	// Initially sort the table by the first column
</script>
<a href="#" onclick="tableWidgetObj.sortTableByColumn(0);tableWidgetObj.addNewColumn(Array('2001','2002','1998','1999','1999','2002','2003','2000','2004','2005','2006','1999','2004','2005','2006'),'Hired','N');this.style.visibility='hidden';return false">Add new column to the table above dynamically</a>
