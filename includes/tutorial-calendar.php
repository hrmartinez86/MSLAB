<p>Classes used:</p>
<ul>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.calendar.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.calendar</a></b> - Main class for the widget.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.calendarModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.calendarModel</a></b> - Handle calendar data.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.calendarLanguageModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.calendarLanguageModel</a></b> - Calendar language parameters.</li>
</ul>
<p>Demo: </p>
<ul>
	<li><a href="demo-calendar-1.html" onclick="var demoWin=window.open(this.href);return false">demo-calendar-1.html</a></li>
</ul>
<p>Default css file: <a href="../css_dhtmlsuite/calendar.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/calendar.css</a></p>
<h2>Introduction</h2>
<p>The calendar widget displays a calendar somewhere on your page. It offers you some call back functions which makes it possible for you to perform certain actions when a user action has been
triggered from it(example: click on day, switching month, close).</p>
<p>We are now going to look at a couple of examples on how to use it. The first example simply shows you how to display the calendar inside a HTML tag on your page. </p>
<p>This is the code:</p>
<pre>
&lt;div id="calendarDiv">&lt;/div>
&lt;script type="text/javascript">
var myCalendarModel = new DHTMLSuite.calendarModel({ initialYear:2004,initialMonth:5,initialDay:20,languageCode:'no' });
var myCalendar = new DHTMLSuite.calendar({ callbackFunctionOnMonthChange:'calendarMonthChange',displayCloseButton:false,numberOfRowsInYearDropDown:12,calendarModelReference:myCalendarModel,targetReference:'calendarDiv' } );
myCalendar.display();
&lt;/script>
</pre>
<p>As you notice, we are creating two objects here. First we create a calendarModel. A calendar model is the data source for the calendar. I'm sending an associative array to the constructor. 
In that array, I specified that the calendar should start
displaying days from May, 2004. In addition, the 20th of May should be highlighted as a "selected" day. </p>
<p>I have also specified that I want a "Norwegian" version of the calendar. The class DHTMLSuite.calendarLanguageModel is used to handle language parameters for the calendar. </p>
<p>Currently, these languages are supported:</p>
<ul>
	<li>"ge" = German</li>
	<li>"no" = Norwegian</li> 
	<li>"nl" = Dutch</li>
	<li>"es" = Spanish</li>
	<li>"fr" = French</li>
	<li>"da" = Danish</li>
	<li>"it" = Italian</li>
	<li>"pt-br" = Brazilien Portuguese</li>
	<li>"sv" = Swedish</li>
</ul>
<p>The constructor of the calendarModel class supports these attributes at the moment:</p>
<ul>
	<li>initialYear = Initial year, i.e. the year to show when you open the calendar</li>
	<li>initialMonth = Initial month</li>
	<li>initialDay = Initial day</li>
	<li>initialHour = Initial hour</li>
	<li>initialMinute = Initial minute</li>
	<li>languageCode = Language code</li>
</ul>
<p>The second thing we do is to create the calendar object. As you can see, we are also here sending in an associative array to the constructor. This custructor supports more parameters than the calendarModel. These are the ones
you can use:</p>
<ul>
	<li>id: Unique identifier for the calendar object (Optional)</li>
	<li>targetReference: Reference to HTML element/tag where the calendar will be inserted.</li>
	<li>calendarModelReference: Reference to a DHTMLSuite.calendarModel object.</li>
	<li>callbackFunctionOnDayClick: Name of call back function to call when someone clicks on a day inside the calendar.</li>
	<li>callbackFunctionOnMonthChange: Name of call back function to call when someone changes to another month inside the calendar.</li>
	<li>callbackFunctionOnClose: Name of call back function to call when the calendar is being closed.</li>
	<li>displayCloseButton: Boolean attribute, true if you want to show the close button, false otherwise(default value is true).</li>
	<li>displayNavigationBar: Boolean attribute, true if you want to show the navigationbar with the arrows below the heading (default value is true).</li>
	<li>displayTimeBar: Boolean attribute, true if you want to show the time bar at the bottom of the calendar (default value is false).</li>
	<li>displayTodaysDateInNavigationBar: Boolean attribute. True if you want to show a link saying "Today" in the navigation bar (default value is true).</li>
	<li>minuteDropDownInterval: Interval between minutes in the minute drop down box. (default = 5).</li>
	<li>numberOfRowsInHourDropDown: Number of rows displayed in hour drop down. (default = 10).</li>
	<li>numberOfRowsInMinuteDropDown: Number of rows displayed in minute drop down. (default = 10).</li>
	<li>numberOfRowsInYearDropDown: Number of rows displayed in minute drop down. (default = 10).</li>
	<li>isDragable: Boolean attribute. true if you want the calendar to be dragable, false otherwise.</li>
</ul>
<p>More attributes may be added to the list later on.</p>
<p>In our example, we have only set a few of these attributes. We have specified that we want to call a function named "calendarMonthChange" when someone changes month inside the calendar. We have also specified that we don't want a close button. Number of rows in the drop down box for "years" have been set to 12, and we are connecting the calendar object with the calendarModel 
with the calendarModelReference attribute. Finally, we specify that we want the calendar to be inserted into an element on our page with the id "calendarDiv".</p>


<h2>Call back functions</h2>
<p>The calendar widget offser support for various call back functions. Support for more will be added later on if needed. As you can see, you are only passing the name of a call back function. When the call back function is called, it
will call a function with that name and send an associative array as argument to it. This associative array will contain these properties:</p>
<ul>
	<li>year:	Currently displayed year in calendar</li>
	<li>month:	Currently displayed month in the calendar</li>
	<li>day: 	Currently highlighted month in the calendar</li>
	<li>hour:	Currently selected hour in the calendar</li>
	<li>minute: Currently selected minute in the calendar</li>
	<li>calendarRef: A reference to the calendar object calling the call back function</li>
</ul>
<h2>Use the calendar to populate form fields</h2>
<p>Here, I will show you an example how you can use the calendar to populate form inputs with dates. </p>
<p>This is the HTML code for my input:</p>
<pre>
&lt;table>
	&lt;tr>
		&lt;td>Select a date:&lt;/td>
		&lt;td>&lt;input type="text" name="myDate" value="2004-12-24 12:00" onclick="">&lt;/td>
		&lt;td>&lt;input type="button" value="Pick date" onclick="pickDate(this,document.forms[0].myDate);">&lt;/td>
	&lt;/tr>
&lt;/table>
</pre>
<p>What I want to do is to use the make the calendar visible when my users clicks on the "Pick date" button. Then I want the date selected by the users to be inserted into the form field.</p>
<p>So the first thing I do is to create a custom function which I call pickDate. This is how it looks</p>
<pre>
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
</pre>
<p>First I create the calendar object. I have done that outside of the function in order to make it global. I have described that I want to call a function called "getDateFromCalendar" when a user
clicks on a day in the calendar. This is the most important property to remember here.</p>
<p>The first thing I do inside the pickDate function is to specify where I want to the calendar to be positioned. Notice, that I'm not specifying a target reference here. Instead, by using this method,
the calendar will be absolute positioned and not positioned. What I'm saying with the line:</p>
<pre>calendarObjForForm.setCalendarPositionByHTMLElement(inputObject,0,inputObject.offsetHeight+2);</pre>
<p>is that I want the calendar to be positioned right below the position of my form input(inputObject). The setCalendarPositionByHTMLElement method takes three arguments:</p>
<ol>
	<li>A reference to an HTML element. The script will determine the x and y position of this element automatically.</li>
	<li>Offset X - Offset on the x axis. Example: 5 will position the calendar 5 pixel to the right of the html element specified in the first argument.</li>
	<li>Offset Y - Offset on the y axis. </li>
</ol>
<p>As you can see, I'm passing in the height of the form input as "Offset Y" in order to make it appear below and not over the form input.</p>
<p>I'm using the value of the form input to set the initial date of the calendar. This is done by the setInitialDateFromInput method. This method takes two arguments:</p>
<ol>
	<li>A reference to a form input</li>
	<li>A string describing the format of the date in the form input.</li>
</ol>
<p>I'm also storing a reference to the form input in the calendar object so that I can pick it up in my call back function. </p>
<p>The lines:</p>
<pre>
if(calendarObjForForm.isVisible()){
	calendarObjForForm.hide();
}else{
	calendarObjForForm.resetViewDisplayedMonth();	// This line resets the view back to the inital display, i.e. it displays the inital month and not the month it displayed the last time it was open.
	calendarObjForForm.display();
}	
</pre>
<p>are used to show and hide the calendar. A click on the "Pick date" function can either show or hide the calendar. If it's allready visible, then I'm hiding it with the hide() method. If it's not visible,
then I'm showing it with the display() method. resetViewDisplayedMonth() is used to open the calendar with the month specified in the form input. If you omit this method, the calendar will
open showing the same month as last time it was visible(i.e. after 1) show 2) Hide without selecting date and 3) Showing it again.</p>
</p>
<p>My call back function getDateFromCalendar looks like this:</p>
<pre>
function getDateFromCalendar(inputArray)
{
	var references = calendarObjForForm.getHtmlElementReferences(); // Get back reference to form field.
	references.myDate.value = inputArray.year + '-' + inputArray.month + '-' + inputArray.day + ' ' + inputArray.hour + ':' + inputArray.minute;
	calendarObjForForm.hide();	
	
}
</pre>
<p>It picks up the reference to the form input stored by the addHtmlElementReference method and sets the value of the form input to the year, month, day, hour and input selected in the calendar.</p>
<p>Finally, it hides the calendar.</p>
<h2>A "chain" of calendars</h2>
<p>Our final example will show you how to connect 3 calendars together with use of "On Month Change" call back functions. What I want to accomplish is that when I change month in the first
calendar, the second and third calendar should also change month automatically. I.e. if I select May 2004 in the first calendar, the second calendar should display June 2004 and the third one
July 2004.</p>
<p>I want these three calendars to be inserted into exiting div elements on my page:</p>
<pre>
&lt;div id="calendarDiv">&lt;/div>
&lt;div id="calendarDiv2">&lt;/div>
&lt;div id="calendarDiv3">&lt;/div>
</pre>
<p>This is the Javascript code I use to create these calendars:</p>
<pre>
&lt;script type="text/javascript">

var myCalendarModel = new DHTMLSuite.calendarModel({ initialYear:2004,initialMonth:5,initialDay:20,languageCode:'no' });
var myCalendar = new DHTMLSuite.calendar({ id:'calendar1', callbackFunctionOnMonthChange:'calendarMonthChange',displayCloseButton:false,numberOfRowsInYearDropDown:12 } );
myCalendar.setCalendarModelReference(myCalendarModel);
myCalendar.setTargetReference('calendarDiv');
myCalendar.display()


var myCalendarModel2 = new DHTMLSuite.calendarModel({ initialYear:2004,initialMonth:6,initialDay:11,languageCode:'en' });
myCalendarModel2.setWeekStartsOnMonday(false);
var myCalendar2 = new DHTMLSuite.calendar({ id:'calendar2', callbackFunctionOnMonthChange:'calendarMonthChange',displayCloseButton:false });
myCalendar2.setCalendarModelReference(myCalendarModel2);
myCalendar2.setTargetReference('calendarDiv2');
myCalendar2.display();

var myCalendarModel3 = new DHTMLSuite.calendarModel({ initialYear:2004,initialMonth:7,initialDay:15 });
var myCalendar3 = new DHTMLSuite.calendar({ id:'calendar3', callbackFunctionOnMonthChange:'calendarMonthChange',displayCloseButton:false,displayTodaysDateInNavigationBar:false });
myCalendar3.setCalendarModelReference(myCalendarModel3);
myCalendar3.setTargetReference('calendarDiv3');
myCalendar3.display();
&lt;/script>
</pre>
<p>Most of the properties and methods here have been described above. You should notice that there are usual two ways of assigning properties to calendarModel-, and calendar objects. You can 
send them in an associative array to the constructor, but for most attributes, you can also use "set" method. Example: the setCalendarModelReference method used here. </p>
<p>Also, notice that I have given each calendar it's unique id and that I have specified the same function name as callback function for all three calendars.</p>
<p>This is my callback function named "calendarMonthChange":</p>
<pre>
function calendarMonthChange(inputArray)
{		
	var month = inputArray.month;
	var year = inputArray.year;
	month++;
	if(month>12){
		month=1;
		year++;
	}		
	var objectToChange = false;
	
	var calendarRef = inputArray.calendarRef;
	
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
	objectToChange.setDisplayedMonth(month);
	objectToChange.setDisplayedYear(year);
}
</pre>
<p>The first thing this function does is to increase the month by 1. The it determines which calendar triggered the call back function. If the first or second calendar triggered the action, then I'm 
sending in the incremented date to the second calendar. If the third calendar triggered the event, then I'm sending in a decremented date to the first calendar. (ps! month - 3 is used since I've allready 
incremented the monty by 1 earlier in the function). </p>
<p><b>A word of warning here</b>. Be careful when you connect calendars together like this. It is very easy to end up with some endless loops.</p>	

