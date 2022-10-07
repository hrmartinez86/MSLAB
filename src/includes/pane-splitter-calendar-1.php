	<h2>3 connected calendars </h2>
	<style type="text/css">
	/* CSS for the demo. CSS needed for the scripts are loaded dynamically by the scripts */

	#connectedCalendars{
		height:220px;
		width:690px;
	}
	#connectedCalendars #calendarDiv,#connectedCalendars #calendarDiv2,#connectedCalendars #calendarDiv3{
		margin-right:5px;
		float:left;
	}
	#calendarForForm{

	}
	</style>

	<script type="text/javascript">
	function calendarMonthChange(inputArray)
	{
		var calendarRef = inputArray.calendarRef;
		
		var month = inputArray.month;
		var year = inputArray.year;
		month++;
		if(month>12){
			month=1;
			year++;
		}
		
		var objectToChange = false;
		switch(calendarRef.id)
		{
			case "calendar1":
				objectToChange = myCalendar2;
				break;
			case "calendar2":	
				objectToChange = myCalendar3;
				break;
			case "calendar3":
				month-=3;
				if(month<1){
					month=12 + month;
					year--;	
				}
				objectToChange = myCalendar;
				break;
		}
		if(objectToChange){
			objectToChange.setDisplayedMonth(month);
			objectToChange.setDisplayedYear(year);
		}		
	}
	</script>
	<div id="calendarContainer">
	
	<div id="connectedCalendars">	
		<div id="calendarDiv"></div>
		<div id="calendarDiv2"></div>
		<div id="calendarDiv3"></div>
	</div>
	<script type="text/javascript">
	
	var myCalendarModel = new DHTMLSuite.calendarModel({ initialYear:2004,initialMonth:5,initialDay:20 });
	myCalendarModel.setLanguageCode('no');
	var myCalendar = new DHTMLSuite.calendar({ id:'calendar1', callbackFunctionOnMonthChange:'calendarMonthChange',displayCloseButton:false,numberOfRowsInYearDropDown:12 } );
	myCalendar.setCalendarModelReference(myCalendarModel);
	myCalendar.setTargetReference('calendarDiv');
	myCalendar.display()
	
	
	var myCalendarModel2 = new DHTMLSuite.calendarModel({ initialYear:2004,initialMonth:6,initialDay:11 });
	myCalendarModel2.setWeekStartsOnMonday(false);
	myCalendarModel2.setLanguageCode('en');
	var myCalendar2 = new DHTMLSuite.calendar({ id:'calendar2', callbackFunctionOnMonthChange:'calendarMonthChange',displayCloseButton:false });
	myCalendar2.setCalendarModelReference(myCalendarModel2);
	myCalendar2.setTargetReference('calendarDiv2');
	myCalendar2.display();
	
	var myCalendarModel3 = new DHTMLSuite.calendarModel({ initialYear:2004,initialMonth:7,initialDay:15 });
	myCalendarModel3.setLanguageCode('en');
	var myCalendar3 = new DHTMLSuite.calendar({ id:'calendar3', callbackFunctionOnMonthChange:'calendarMonthChange',displayCloseButton:false,displayTodaysDateInNavigationBar:false });
	myCalendar3.setCalendarModelReference(myCalendarModel3);
	myCalendar3.setTargetReference('calendarDiv3');
	myCalendar3.display();
	
	</script>
	<!-- A DATE PICKER FOR FORMS -->
	<div id="calendarForForm">
	<h2>A date picker for form</h2>
	<script type="text/javascript">
	var calendarObjForForm = new DHTMLSuite.calendar({minuteDropDownInterval:10,numberOfRowsInHourDropDown:5,callbackFunctionOnDayClick:'getDateFromCalendar',isDragable:true,displayTimeBar:true}); 
	function pickDate(buttonObj,inputObject)
	{
		calendarObjForForm.setCalendarPositionByHTMLElement(inputObject,0,inputObject.offsetHeight+2);	// Position the calendar right below the form input
		calendarObjForForm.setInitialDateFromInput(inputObject,'yyyy-mm-dd hh:ii');	// Specify that the calendar should set it's initial date from the value of the input field.
		calendarObjForForm.addHtmlElementReference('myDate',inputObject);	// Adding a reference to this element so that I can pick it up in the getDateFromCalendar below(myInput is a unique key)
		if(calendarObjForForm.isVisible()){
			calendarObjForForm.hide();
		}else{
			calendarObjForForm.resetViewDisplayedMonth();	// This line resets the view back to the inital display, i.e. it displays the inital month and not the month it displayed the last time it was open.
			calendarObjForForm.display();
		}
		
	}	
	/* inputArray is an associative array with the properties
	year
	month
	day
	hour
	minute
	calendarRef - Reference to the DHTMLSuite.calendar object.
	*/
	function getDateFromCalendar(inputArray)
	{
		var references = calendarObjForForm.getHtmlElementReferences(); // Get back reference to form field.
		references.myDate.value = inputArray.year + '-' + inputArray.month + '-' + inputArray.day + ' ' + inputArray.hour + ':' + inputArray.minute;
		calendarObjForForm.hide();	
		
	}	
	</script>
		<form name="myForm">
		<table>
			<tr>
				<td>Select a date:</td>
				<td><input type="text" name="myDate" value="2004-12-24 12:00" onclick=""></td>
				<td><input type="button" value="Pick date" onclick="pickDate(this,this.form.myDate);"></td>
			</tr>
		</table>
	</div>
	
</div>
