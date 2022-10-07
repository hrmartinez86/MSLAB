	<div id="header">
		<img src="../images/logo.png">
	</div>
<h2>Tab view example (With table widgets inside tabs)</h2>
<div id="DHTMLSuite_tabView6">
	<div class="DHTMLSuite_aTab">
	<!-- Start content tab 1 -->
		<h2>Table widget 1</h2>	
		<div class="widget_tableDiv">
		<table id="myTableDemo2">
			<thead>
				<tr>
					<td>Name</td>
					<td>Age</td>
					<td>Position</td>
					<td>Income</td>
					<td>Gender</td>
				</tr>
			</thead>
			<tbody class="scrollingContent">
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
		<a href="#" onclick="tabViewTableWidget.sortTableByColumn(0);tabViewTableWidget.addNewColumn(Array('2001','2002','1998','1999','1999','2002','2003','2000','2004','2005','2006','1999','2004','2005','2006'),'Hired','N');this.style.visibility='hidden';return false">Add new column to the table above dynamically</a>
			
				
		<!-- End content tab 1 -->
	</div>
	<div class="DHTMLSuite_aTab">
	<!-- Content of second tab -->
		<h2>Table widget 2</h2>
		<p>This second table shows you how you can sort dates as string. Look for the hidden &lt;SPAN> tags in the source code.</p>
		
		<!-- Start of table html -->
		<div class="widget_tableDiv">
		<table id="myTableDemo22">
			<thead>
				<tr>
					<td>Name</td>
					<td>Position</td>
					<td>Born</td>
				</tr>
			</thead>
			<tbody class="scrollingContent">
				<tr>
					<td>John</td>
					<td>Managing director</td>
					<td><span style="display:none">1973-03-02</span>March, 2nd, 1973</td>
				</tr>
				<tr>
					<td>Susan</td>
					<td>Partner</td>
					<td><span style="display:none">1985-12-12</span>December, 12th, 1985</td>
				</tr>
				<tr>
					<td>David</td>
					<td>Head of production</td>
					<td><span style="display:none">1964-11-16</span>November, 16th, 1964</td>
				</tr>
				<tr>
					<td>Laura</td>
					<td>Head of marketing</td>
					<td><span style="display:none">1971-04-03</span>April, 3rd, 1971</td>
				</tr>
				<tr>
					<td>Kate</td>
					<td>Marketing</td>
					<td><span style="display:none">1966-09-29</span>September, 29th, 1966</td>
				</tr>
				<tr>
					<td>Mona</td>
					<td>Marketing</td>
					<td><span style="display:none">1955-08-21</span>August, 21st, 1955</td>
				</tr>
				<tr>
					<td>Mike</td>
					<td>Marketing</td>
					<td><span style="display:none">1978-01-30</span>January, 30th, 1978</td>
				</tr>
				<tr>
					<td>Mark</td>
					<td>Production</td>
					<td><span style="display:none">1983-11-08</span>November, 8th, 1983</td>
				</tr>
				<tr>
					<td>Peter</td>
					<td>Production</td>
					<td><span style="display:none">1984-12-02</span>December, 2nd, 1984</td>
				</tr>
				<tr>
					<td>Jennifer</td>
					<td>Production</td>
					<td><span style="display:none">1987-10-15</span>October, 15th, 1987</td>
				</tr>
				<tr>
					<td>David</td>
					<td>Photography</td>
					<td><span style="display:none">1982-10-31</span>October, 31st, 1982</td>
				</tr>
				<tr>
					<td>Anna</td>
					<td>Head of photography</td>
					<td><span style="display:none">1976-04-28</span>April, 28th, 1976</td>
				</tr>
				<tr>
					<td>Rita</td>
					<td>Photography</td>
					<td><span style="display:none">1981-03-02</span>March, 2nd, 1981</td>
				</tr>
				<tr>
					<td>Magnus</td>
					<td>Freelancer</td>
					<td><span style="display:none">1980-05-17</span>May, 17th, 1980</td>
				</tr>
				<tr>
					<td>Johnny</td>
					<td>Freelancer</td>
					<td><span style="display:none">1972-10-12</span>October, 12th, 1972</td>
				</tr>
			
			</tbody>
		</table>
		</div>
		<br>
		<a href="#" onclick="tabViewTableWidget_demo2.addNewRow(Array('Tommy','Freelancer','<span style=\'display:none\'>1990-01-11</span>January, 11th, 1990'));return false">Add Tommy, the freelancer dynamically to the table above.</a>

		<!-- End content of second tab-->
	
	</div>
	<div class="DHTMLSuite_aTab">
		<!-- Start of content for tab 3 -->
		
			<h2>Table widget 3</h2>
			<p>Same table as in example 2 but without any layout settings</p>
			
			<!-- Start of table html -->
			<div class="widget_tableDiv">
			<table id="myTableDemo23">
				<thead>
					<tr>
						<td><b>Name</b></td>
						<td><b>Position</b></td>
						<td><b>Born</b></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>John&nbsp;</td>
						<td>Managing director&nbsp;</td>
						<td><span style="display:none">1973-03-02</span>March, 2nd, 1973&nbsp;</td>
					</tr>
					<tr>
						<td>Susan&nbsp;</td>
						<td>Partner&nbsp;</td>
						<td><span style="display:none">1985-12-12</span>December, 12th, 1985&nbsp;</td>
					</tr>
					<tr>
						<td>David&nbsp;</td>
						<td>Head of production&nbsp;</td>
						<td><span style="display:none">1964-11-16</span>November, 16th, 1964&nbsp;</td>
					</tr>
					<tr>
						<td>Laura&nbsp;</td>
						<td>Head of marketing&nbsp;</td>
						<td><span style="display:none">1971-04-03</span>April, 3rd, 1971&nbsp;</td>
					</tr>
					<tr>
						<td>Kate&nbsp;</td>
						<td>Marketing&nbsp;</td>
						<td><span style="display:none">1966-09-29</span>September, 29th, 1966&nbsp;</td>
					</tr>
					<tr>
						<td>Mona&nbsp;</td>
						<td>Marketing&nbsp;</td>
						<td><span style="display:none">1955-08-21</span>August, 21st, 1955&nbsp;</td>
					</tr>
					<tr>
						<td>Mike&nbsp;</td>
						<td>Marketing&nbsp;</td>
						<td><span style="display:none">1978-01-30</span>January, 30th, 1978&nbsp;</td>
					</tr>
					<tr>
						<td>Mark&nbsp;</td>
						<td>Production&nbsp;</td>
						<td><span style="display:none">1983-11-08</span>November, 8th, 1983&nbsp;</td>
					</tr>
					<tr>
						<td>Peter&nbsp;</td>
						<td>Production&nbsp;</td>
						<td><span style="display:none">1984-12-02</span>December, 2nd, 1984&nbsp;</td>
					</tr>
					<tr>
						<td>Jennifer&nbsp;</td>
						<td>Production&nbsp;</td>
						<td><span style="display:none">1987-10-15</span>October, 15th, 1987&nbsp;</td>
					</tr>
					<tr>
						<td>David&nbsp;</td>
						<td>Photography&nbsp;</td>
						<td><span style="display:none">1982-10-31</span>October, 31st, 1982&nbsp;</td>
					</tr>
					<tr>
						<td>Anna&nbsp;</td>
						<td>Head of photography&nbsp;</td>
						<td><span style="display:none">1976-04-28</span>April, 28th, 1976&nbsp;</td>
					</tr>
					<tr>
						<td>Rita&nbsp;</td>
						<td>Photography&nbsp;</td>
						<td><span style="display:none">1981-03-02</span>March, 2nd, 1981&nbsp;</td>
					</tr>
					<tr>
						<td>Magnus&nbsp;</td>
						<td>Freelancer&nbsp;</td>
						<td><span style="display:none">1980-05-17</span>May, 17th, 1980&nbsp;</td>
					</tr>
					<tr>
						<td>Johnny&nbsp;</td>
						<td>Freelancer&nbsp;</td>
						<td><span style="display:none">1972-10-12</span>October, 12th, 1972&nbsp;</td>
					</tr>				
				</tbody>
			</table>
			</div>
			<a href="#" onclick="tabViewTableWidget_demo3.sortTableByColumn(0);tabViewTableWidget_demo3.addNewColumn(Array('2001','2002','1998','1999','1999','2002','2003','2000','2004','2005','2006','1999','2004','2005','2006'),'<b>Hired</b>','N');this.style.visibility='hidden';return false">Add new column to the table above dynamically</a>
			
			<!-- End content tab 3 -->
	</div>
	<div class="DHTMLSuite_aTab">
		<!-- Start content tab 4 -->
		This demo demonstrates how the DHTMLSuite.tabView class works. It also shows you how you can put table widgets(objects of class DHTMLSuite.dragDrop) inside tabs.<br>
		<!-- End content tab 4 -->
	</div>
</div>

<script type="text/javascript">

// Creating object for table widget 1

var tabViewTableWidget = new DHTMLSuite.tableWidget();
tabViewTableWidget.setTableId('myTableDemo2');
tabViewTableWidget.setTableWidth('95%');
tabViewTableWidget.setTableHeight(250);
tabViewTableWidget.setColumnSort(Array('S','N',false,'N','S'));
tabViewTableWidget.init();
tabViewTableWidget.sortTableByColumn(0);	// Initially sort the table by the first column

// Creating object for table widget 2

var tabViewTableWidget_demo2 = new DHTMLSuite.tableWidget();
tabViewTableWidget_demo2.setTableId('myTableDemo22');
tabViewTableWidget_demo2.setTableWidth(350);
tabViewTableWidget_demo2.setTableHeight(250);
tabViewTableWidget_demo2.setColumnSort(Array('S','S','S'));
tabViewTableWidget_demo2.init();
tabViewTableWidget_demo2.sortTableByColumn(1);// Initially sort the table by the second column

// Creating object for table widget 3
var tabViewTableWidget_demo3 = new DHTMLSuite.tableWidget();
tabViewTableWidget_demo3.setTableId('myTableDemo23');
tabViewTableWidget_demo3.setNoCssLayout();
tabViewTableWidget_demo3.setColumnSort(Array('S','S','S'));
tabViewTableWidget_demo3.init();
tabViewTableWidget_demo3.sortTableByColumn(2);// Initially sort the table by the third column	


var tabViewObj_demo2 = new DHTMLSuite.tabView();
tabViewObj_demo2.setParentId('DHTMLSuite_tabView6');
tabViewObj_demo2.setTabTitles(Array('Table example 1','Table example 2','Table example 3','Help'));
tabViewObj_demo2.setIndexActiveTab(1);
tabViewObj_demo2.setWidth('800');
tabViewObj_demo2.setHeight('500');
tabViewObj_demo2.init();


	
</script>

