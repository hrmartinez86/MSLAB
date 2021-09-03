<h2>Roll over effect</h2>
<p>Hello there</p>
	<style type="text/css">
	h1{
		font-size:1.3em;
		margin-bottom:0px;
	}

	/* These classes are used by the script as rollover effect for table 1 and 2 */
	
	.tableRollOverEffect1{
		background-color:#317082;
		color:#FFF;
	}

	.tableRollOverEffect2{
		background-color:#000;
		color:#FFF;
	}
	
	.tableRowClickEffect1{
		background-color:#F00;
		color:#FFF;
	}
	.tableRowClickEffect2{
		background-color:#00F;
		color:#FFF;
	}
	
	</style>
	<script type="text/javascript">
	/************************************************************************************************************
	(C) www.dhtmlgoodies.com, November 2005
	
	This is a script from www.dhtmlgoodies.com. You will find this and a lot of other scripts at our website.	
	
	Terms of use:
	You are free to use this script as long as the copyright message is kept intact. However, you may not
	redistribute, sell or repost it without our permission.
	
	Thank you!
	
	www.dhtmlgoodies.com
	Alf Magne Kalleland
	
	************************************************************************************************************/	
	var arrayOfRolloverCss = new Array();
	var arrayOfClickClasses = new Array();
	var activeRow = false;
	var activeRowClickArray = new Array();
	
	
	var tableRollOverEffect1 = 'background-color:#317082;color:#FFF';
	var tableRollOverEffect2 = 'background-color:#000;color:#FFF';
	var tableRowClickEffect1 = 'background-color:#F00;color:#FFF';
	var tableRowClickEffect2 = 'background-color:#00F;color:#FFF';
	
	function highlightTableRow()
	{
		var tableObj = this.parentNode;
		if(tableObj.tagName!='TABLE')tableObj = tableObj.parentNode;

		if(this!=activeRow){
			this.setAttribute('origCl',this.style.cssText);
			this.origCl = this.style.cssText;
		}
		this.style.cssText = arrayOfRolloverCss[tableObj.id];
		
		activeRow = this;
		
	}
	
	function clickOnTableRow()
	{
		var tableObj = this.parentNode;
		if(tableObj.tagName!='TABLE')tableObj = tableObj.parentNode;		
		
		if(activeRowClickArray[tableObj.id] && this!=activeRowClickArray[tableObj.id]){
			activeRowClickArray[tableObj.id].style.cssText='';
		}
		alert(arrayOfClickClasses[tableObj.id]);
		this.style.cssText = arrayOfClickClasses[tableObj.id];
		
		activeRowClickArray[tableObj.id] = this;
				
	}
	
	function resetRowStyle()
	{
		var tableObj = this.parentNode;
		if(tableObj.tagName!='TABLE')tableObj = tableObj.parentNode;

		if(activeRowClickArray[tableObj.id] && this==activeRowClickArray[tableObj.id]){
			this.style.cssText = arrayOfClickClasses[tableObj.id];
			return;	
		}
		
		var origCl = this.getAttribute('origCl');
		if(!origCl)origCl = this.origCl;
		this.style.cssText=origCl;
		
	}
		
	function addTableRolloverEffect(tableId,whichClass,whichClassOnClick)
	{
		arrayOfRolloverCss[tableId] = whichClass;
		arrayOfClickClasses[tableId] = whichClassOnClick;
		
		var tableObj = document.getElementById(tableId);
		var tBody = tableObj.getElementsByTagName('TBODY');
		if(tBody){
			var rows = tBody[0].getElementsByTagName('TR');
		}else{
			var rows = tableObj.getElementsByTagName('TR');
		}
		for(var no=0;no<rows.length;no++){
			rows[no].onmouseover = highlightTableRow;
			rows[no].onmouseout = resetRowStyle;
			
			if(whichClassOnClick){
				rows[no].onclick = clickOnTableRow;	
			}
		}
		
	}
	</script>	
	
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
	</tbody>
</table>

<h1>Table example 2</h1>
<table id="myTable2">
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
<script type="text/javascript">
addTableRolloverEffect('myTable',tableRollOverEffect1,tableRowClickEffect1);
addTableRolloverEffect('myTable2',tableRollOverEffect2,tableRowClickEffect2);
</script>