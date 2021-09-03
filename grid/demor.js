/**
 * @fileoverview Common functions used in various Zapatec Grid demos.
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: demo.js 7629 2007-07-31 09:44:52Z alex $ */

/**
 * Passed to grid through callbackCellOnClick config option and called when grid
 * cell is clicked.
 * @private
 */
function onCellClick(oGrid, oCell) {
	
	 //'\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(
	// oGrid.getRowByCell(oCell), 0))+
	 //'\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(
	 //oGrid.getRowByCell(oCell), 1))+
	 //'\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(
	 //oGrid.getRowByCell(oCell), 2))+
	//'\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(
	// oGrid.getRowByCell(oCell), 3))+
	// '\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(
	// oGrid.getRowByCell(oCell), 4))+
	// '\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(
	// oGrid.getRowByCell(oCell), 5))+
	// '\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(
	// oGrid.getRowByCell(oCell), 6))
	 window.open("xFolioR.php?folio="+oGrid.getCellValueString(oGrid.getCellByRow(oGrid.getRowByCell(oCell), 0)),"_self","");
	//alert	(" 
	//alert(	"");
}

/**
 * Passed to grid through callbackCellOnRightClick config option and called when
 * grid cell is right clicked.
 * @private
 */
function onCellRightClick(oGrid, oCell) {
	alert('Right mouse button\nRow id is ' + oGrid.getCellRowId(oCell) +
	 '\nCell id is ' + oGrid.getCellId(oCell) +
	 '\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(
	 oGrid.getRowByCell(oCell), 0)));
}

/**
 * Passed to grid through callbackRowOnClick config option and called when grid
 * row is clicked.
 * @private
 */
function onRowClick(oGrid, oRow) {
	alert('Left mouse button\nRow id is ' + oGrid.getRowId(oRow) +
	 '\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(oRow, 0)));
};

/**
 * Passed to grid through callbackRowOnRightClick config option and called when
 * grid row is right clicked.
 * @private
 */
function onRowRightClick(oGrid, oRow) {
	alert('Right mouse button\nRow id is ' + oGrid.getRowId(oRow) +
	 '\nItem number is ' + oGrid.getCellValueString(oGrid.getCellByRow(oRow, 0)));
};

/**
 * Converts number of milliseconds since January 1, 1970, 00:00:00.000 into
 * a date string.
 * @private
 */
function fromTimestamp(iTimestamp) {
	var oDate = new Date(Math.round(iTimestamp));
	var sMonth = oDate.getMonth() + 1;
	if (sMonth < 10) {
		sMonth = '0' + sMonth;
	}
	var sDay = oDate.getDate();
	if (sDay < 10) {
		sDay = '0' + sDay;
	}
	var sYear = oDate.getYear();
	if (sYear < 1900) {
		sYear += 1900;
	}
	sYear += '';
	sYear = sYear.substr(2);
	return sMonth + '/' + sDay + '/' + sYear;
};

/**
 * Holds ids of the fields used for sliders. Gives ability to change them
 * dynamically.
 * @private
 */
var oSliderFields = {
	rangeOfDates: 1,
	rangeOfMinutes: 5
};

/**
 * Range of items slider "onChange" event listener. Called when slider position
 * is changed programmatically.
 * @private
 */
function onRangeOfDatesChange(iMinValue, iMaxValue) {
	// Display scale
	document.getElementById('rangeOfDates').innerHTML =
	 fromTimestamp(iMinValue) + ' - ' + fromTimestamp(iMaxValue);
}

/**
 * Range of items slider "newPosition" event listener. Called when slider is
 * drag-n-dropped.
 * @private
 */
function onRangeOfDatesDrag(iMinValue, iMaxValue) {
	if (typeof oGrid == 'undefined') {
		oGrid = objGrid;
	}
	onRangeOfDatesChange(iMinValue, iMaxValue);
	// Limit range of items
	oGrid.limitRange({
		column: oSliderFields.rangeOfDates,
		min: iMinValue,
		max: iMaxValue
	});
}

/**
 * Range of minutes slider "onChange" event listener. Called when slider
 * position is changed programmatically.
 * @private
 */
function onRangeOfMinutesChange(iMinValue, iMaxValue) {
	iMinValue = Math.round(iMinValue);
	iMaxValue = Math.round(iMaxValue);
	// Display scale
	document.getElementById('rangeOfMinutes').innerHTML =
	 iMinValue + ' - ' + iMaxValue;
}

/**
 * Range of minutes slider "newPosition" event listener. Called when slider is
 * drag-n-dropped.
 * @private
 */
function onRangeOfMinutesDrag(iMinValue, iMaxValue) {
	if (typeof oGrid == 'undefined') {
		oGrid = objGrid;
	}
	onRangeOfMinutesChange(iMinValue, iMaxValue);
	// Limit range of items
	oGrid.limitRange({
		column: oSliderFields.rangeOfMinutes,
		minValue: iMinValue,
		maxValue: iMaxValue
	});
}

/**
 * Holds items slider object.
 * @private
 */
var oDateSlider;

/**
 * Holds minutes slider object.
 * @private
 */
var oMinuteSlider;

/**
 * Passed to the grid through eventListeners config option as 'gridInitialized'
 * event listener and called when grid is initialized. Grid object can be
 * accessed through "this" because function is called in scope of grid object.
 * @private
 */
function onGridInit() {
	// Get range of dates
	var oDateRange = this.getColumnRange({column: oSliderFields.rangeOfDates});
	if (oDateRange) {
		document.getElementById('rangeOfDates').innerHTML = 
			fromTimestamp(oDateRange.min) + ' - ' + fromTimestamp(oDateRange.max);
		if (oDateSlider) {
			// Update slider
			oDateSlider.reset(oDateRange.min, oDateRange.max);
		} else {
			// Draw items slider
			oDateSlider = new Zapatec.Slider({
				div: 'rangeOfDatesScale', 
				length: 99,
				dual: true, 
				orientation: 'H',
				step: 1,
				range : [oDateRange.min, oDateRange.max],
				eventListeners: {
					'onChange': onRangeOfDatesChange,
					'newPosition': onRangeOfDatesDrag
				}
			});
		}
	}
	// Get range of minutes
	var oMinuteRange = this.getColumnRange({column: oSliderFields.rangeOfMinutes});
	if (oMinuteRange) {
		document.getElementById('rangeOfMinutes').innerHTML = 
		 oMinuteRange.min + ' - ' + oMinuteRange.max;
		if (oMinuteSlider) {
			// Update slider
			oMinuteSlider.reset(oMinuteRange.min, oMinuteRange.max);
		} else {
			// Draw minutes slider
			oMinuteSlider = new Zapatec.Slider({
				div: 'rangeOfMinutesScale', 
				length: 99,
				dual: true, 
				orientation: 'H',
				step: 1,
				range : [oMinuteRange.min, oMinuteRange.max],
				eventListeners: {
					'onChange': onRangeOfMinutesChange,
					'newPosition': onRangeOfMinutesDrag
				}
			});
		}
	}
}

/**
 * Passed to the grid through eventListeners config option as 'gridMovedColumn'
 * event listener and called when grid column is moved.
 * @private
 */
function onGridMovedColumn(oMove) {
	// Fix sliders using special static method of the grid
	oSliderFields.rangeOfDates = Zapatec.Grid.getNewColumnNumber({
		fieldId: oSliderFields.rangeOfDates,
		move: oMove
	});
	oSliderFields.rangeOfMinutes = Zapatec.Grid.getNewColumnNumber({
		fieldId: oSliderFields.rangeOfMinutes,
		move: oMove
	});
}

/**
 * Sets filter to the grid.
 * @private
 */
function filter(oForm) {
	if (typeof oGrid == 'undefined') {
		oGrid = objGrid;
	}
	if (oGrid) {
		if (oForm.isRegExp.checked) {
			oGrid.setFilter({
				regexp: oForm.textFilter.value
			});
		} else {
			oGrid.setFilter({
				text: oForm.textFilter.value
			});
		}
	}
	return false;
}

/**
 * Removes all filters from the grid.
 * @private
 */
function resetControls(oForm) {
	if (typeof oGrid == 'undefined') {
		oGrid = objGrid;
	}
	// Reset form
	oForm.textFilter.value = '';
	// Reset all sliders
	var aWidgets = Zapatec.Widget.all;
	var iWidgets = aWidgets.length;
	var oWidget;
	for (var iWidget = 0; iWidget < iWidgets; iWidget++) {
		oWidget = aWidgets[iWidget];
		if (oWidget.constructor == Zapatec.Slider) {
			oWidget.setPos(oWidget.config.range[0], oWidget.config.range[1]);
		}
	}
	// Reset filters
	if (oGrid) {
		oGrid.resetFilters();
	}
}
