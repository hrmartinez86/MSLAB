<!--conf
<sample in_favorites="true">
              <product version="1.0" edition="std"/>
                     <modifications>
                            <modified date="071221"/>
                     </modifications>
               <sampledescription><![CDATA[Sample demonstrates how easy you can define sensitive range of dates for calendar. This can be useful if you need to limit the dates user can choose from calendar. ]]></sampledescription></sample>
 --> 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
	<title>Setting sensitive range</title>
	<link rel="STYLESHEET" type="text/css" href="codebase/dhtmlxcalendar.css">
<script>
      window.dhx_globalImgPath="codebase/imgs/";
</script>
<script  src="codebase/dhtmlxcommon.js"></script>
<script  src="codebase/dhtmlxcalendar.js"></script>
	<script>
	var cal1, cal2, mCal, mDCal, newStyleSheet;

	var dateFrom = null;
	var dateTo = null;
	
	window.onload = function () {
		cal1 = new dhtmlxCalendarObject('calendar1');
		cal1.setOnClickHandler(selectDate1);
		cal2 = new dhtmlxCalendarObject('calendar2');
		cal2.setOnClickHandler(selectDate2);
		
		mCal = new dhtmlxCalendarObject('dhtmlxCalendar', false, {isYearEditable: true});
		mCal.setYearsRange(2000, 2500);
		mCal.draw();
	}
	
	function setFrom() {
		dateFrom = new Date(cal1.date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}

	function selectDate1(date) {
		document.getElementById('calInput1').value = cal1.getFormatedDate(null,date);
		document.getElementById('calendar1').style.display = 'none';
		dateFrom = new Date(date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}
	function selectDate2(date) {
		document.getElementById('calInput2').value = cal2.getFormatedDate(null,date);
		document.getElementById('calendar2').style.display = 'none';
		dateTo = new Date(date);
		mCal.setSensitive(dateFrom, dateTo);
		return true;
	}
	
	

	function showCalendar(k) {
		document.getElementById('calendar'+k).style.display = 'block';
	}
	
	

	</script>

<body>
<form action="">
<table cellpadding="10">
  <tr>
    <td valign="top"><strong>Fecha</strong>
		<p>
		from: <br />
			<div style="position:relative; border:1px solid navy; width: 199px"><input
			 type="text" id="calInput1" style="border-width:0px; width: 179px; font-size:12px;"
			 readonly="true"><img style="cursor:pointer;" onClick="showCalendar(1)" src="../../codebase/imgs/calendar.gif" align="absmiddle"><div id="calendar1" style="position:absolute; left:199px; top:0px; display:none"></div></div>
		<br>to: <div style="position:relative; border:1px solid navy; width: 199px"><input
			 type="text" id="calInput2" style="border-width:0px; width: 179px; font-size:12px;"
			 readonly="true"><img style="cursor:pointer;" onClick="showCalendar(2)" src="../../codebase/imgs/calendar.gif" align="absmiddle"><div id="calendar2" style="position:absolute; left:199px; top:0px; display:none"></div></div>

		</p>
		<input type="button" value="set" onClick="setFrom()" />
		</td>
  </tr>
</table>

</form>

</body>
</html>

