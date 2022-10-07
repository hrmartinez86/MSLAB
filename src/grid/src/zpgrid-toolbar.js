/**
 * @fileoverview Zapatec Grid Toolbar Demo Widget extension. Based on this demo
 * extension you can create more complex control panels.
 *
 * <pre>
 * Copyright (c) 2004-2007 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-toolbar.js 7593 2007-07-24 10:11:45Z alex $ */

/**
 * Grid Toolbar extension.
 *
 * <pre>
 * Note: zpgrid-core.js must be included before this module. If plugin modules
 * like zpgrid-xml.js are used, they must be included before this module as
 * well.
 *
 * This extension requires Zapatec Menu, Window and Slider Widgets to be
 * included.
 *
 * <strong>Adds following config options:</strong>
 *
 * <b>menuSource</b> Value that will be passed to the Menu as <b>source</b>
 * config option.
 *
 * <b>menuSourceType</b> Value that will be passed to the Menu as
 * <b>sourceType</b> config option.
 *
 * <b>menuContainer</b> [string] Value that will be passed to the Menu as
 * <b>container</b> config option.
 *
 * <b>menuTheme</b> [string] Theme name that will be passed to the Menu.
 * Default: 'default'.
 *
 * <b>menuRangeUl</b> [string] Id of the ul element where to insert li elements
 * for "Range" sub-menu.
 *
 * <b>menuFilterOutUl</b> [string] Id of the ul element where to insert li
 * elements for "Filter Out" sub-menu.
 *
 * <b>dialogSort</b> [string] Id of the div element where to get content for
 * dialog "Sort". Select elements with ids dialogSort + "Column1",
 * dialogSort + "Column2", dialogSort + "Column3" and radio input elements with
 * ids dialogSort + "Column1Desc", dialogSort + "Column2Desc",
 * dialogSort + "Column3Desc" must be present on the page.
 *
 * <b>dialogGoToRow</b> [string] Id of the div element where to get content for
 * dialog "Go to Row".
 *
 * <b>dialogSearch</b> [string] Id of the div element where to get content for
 * dialog "Search". Div element with id dialogSearch + "Checkboxes" must be
 * present on the page.
 *
 * <b>dialogRange</b> [string] Id of the div element where to put "Range"
 * dialogs.
 *
 * <b>dialogFilterOut</b> [string] Id of the div element where to put
 * "Filter Out" dialogs.
 *
 * <b>dialogShow</b> [string] Id of the div element where to get content for
 * dialog "Show". Div element with id dialogShow + "Checkboxes" must be present
 * on the page.
 * </pre>
 *
 * @constructor
 * @extends Zapatec.Grid
 * @param {object} oArg User configuration
 */
Zapatec.GridToolbar = function(oArg) {
	// Call constructor of superclass
	Zapatec.GridToolbar.SUPERconstructor.call(this, oArg);
};

// Inherit Grid
Zapatec.inherit(Zapatec.GridToolbar, Zapatec.Grid);

/**
 * Configures the widget. Gets called from init and reconfigure methods of
 * superclass.
 *
 * @private
 * @param {object} oArg User configuration
 */
Zapatec.GridToolbar.prototype.configure = function(oArg) {
	// Define new config options
	this.defineConfigOption('menuSource');
	this.defineConfigOption('menuSourceType', 'html');
	this.defineConfigOption('menuContainer');
	this.defineConfigOption('menuTheme', 'default');
	this.defineConfigOption('menuRangeUl');
	this.defineConfigOption('menuFilterOutUl');
	this.defineConfigOption('dialogSort');
	this.defineConfigOption('dialogGoToRow');
	this.defineConfigOption('dialogSearch');
	this.defineConfigOption('dialogRange');
	this.defineConfigOption('dialogFilterOut');
	this.defineConfigOption('dialogShow');
	// Call parent method
	Zapatec.GridToolbar.SUPERclass.configure.call(this, oArg);
};

/**
 * Extends parent method.
 * @private
 */
Zapatec.GridToolbar.prototype.addStandardEventListeners = function() {
	// Call parent method
	Zapatec.GridToolbar.SUPERclass.addStandardEventListeners.call(this);
	// Resize menu when grid is refreshed
	this.addEventListener('gridRefreshed', this.syncToolbar);
	// Resize menu when grid column is resized
	this.addEventListener('gridResizedColumn', this.syncToolbar);
};

/**
 * Synchronizes toolbar width with grid.
 * @private
 */
Zapatec.GridToolbar.prototype.syncToolbar = function() {
	// Resize menu
	this.menu.fitIntoContainer();
};

/**
 * Displays toolbar after grid initialization.
 * @private
 */
Zapatec.GridToolbar.prototype.show = function() {
	// Call parent method
	Zapatec.GridToolbar.SUPERclass.show.call(this);
	// Get number of columns in the Grid
	var iCols = this.getFields().length;
	// Range dialog containers will be placed here
	var oRangeContainer = document.getElementById(this.config.dialogRange);
	// Holds Range dialog objects.
	this.dialogsRange = [];
	// Form ranges
	for (var iCol = 0; iCol < iCols; iCol++) {
		// Get range
		var oRange = this.getColumnRange({column: iCol});
		// Check if range is meaningful for Slider
		if (!oRange || isNaN(oRange.min) || isNaN(oRange.max)) {
			continue;
		}
		// Add dialog container
		oRangeContainer.innerHTML += '<div id="' + this.config.dialogRange + iCol +
		 '" class="zpGridToolbarDialog"><div id="' + this.config.dialogRange +
		 iCol + 'Slider"></div><div id="' + this.config.dialogRange + iCol +
		 'Range" style="text-align: center">' + oRange.minValue + ' - ' +
		 oRange.maxValue + '</div></div>';
		// Create dialog window
		this.dialogsRange[iCol] = Zapatec.GridToolbar.createDialog({
			// Window dimensions
			width: 250, 
			height: 80,
			// Take window content from the div
			divContent: this.config.dialogRange + iCol,
			// Window title
			title: 'Range'
		});
	}
	// Filter Out dialog containers will be placed here
	var oFilterOutContainer =
	 document.getElementById(this.config.dialogFilterOut);
	// Holds Filter Out dialog objects.
	this.dialogsFilterOut = [];
	// Form filter outs
	for (var iCol = 0; iCol < iCols; iCol++) {
		// Add dialog container
		oFilterOutContainer.innerHTML += '<div id="' + this.config.dialogFilterOut +
		 iCol + '" class="zpGridToolbarDialog"></div>';
		// Create dialog window
		this.dialogsFilterOut[iCol] = Zapatec.GridToolbar.createDialog({
			// Window dimensions
			width: 200, 
			height: 210,
			// Take window content from the div
			divContent: this.config.dialogFilterOut + iCol,
			// Window title
			title: 'Filter Out'
		});
		// Add filter out to the Grid
		this.addFilterOut({
			column: iCol,
			container: this.config.dialogFilterOut + iCol
		});
	}
	// Display filter outs
	this.displayFilterOut();
	// Fill uls
	this.fillUlWithColumns(this.config.menuRangeUl, this.dialogsRange);
	this.fillUlWithColumns(this.config.menuFilterOutUl, this.dialogsFilterOut);
	// Fill select boxes
	this.fillSelectWithColumns(this.config.dialogSort + 'Column1');
	this.fillSelectWithColumns(this.config.dialogSort + 'Column2');
	this.fillSelectWithColumns(this.config.dialogSort + 'Column3');
	// Form checkboxes
	this.fillDivWithColumns(this.config.dialogSearch + 'Checkboxes');
	this.fillDivWithColumns(this.config.dialogShow + 'Checkboxes');
	// Initialize Sort window
	this.dialogSort = Zapatec.GridToolbar.createDialog({
		// Window dimensions
		width: 275, 
		height: 270,
		// Take window content from the div
		divContent: this.config.dialogSort,
		// Window title
		title: 'Sort'
	});
	// Initialize Go to Row window
	this.dialogGoToRow = Zapatec.GridToolbar.createDialog({
		// Window dimensions
		width: 180, 
		height: 80,
		// Take window content from the div
		divContent: this.config.dialogGoToRow,
		// Window title
		title: 'Go to Row'
	});
	// Initialize Search window
	this.dialogSearch = Zapatec.GridToolbar.createDialog({
		// Window dimensions
		width: 200, 
		height: 290,
		// Take window content from the div
		divContent: this.config.dialogSearch,
		// Window title
		title: 'Search'
	});
	// Initialize Show window
	this.dialogShow = Zapatec.GridToolbar.createDialog({
		// Window dimensions
		width: 200, 
		height: 250,
		// Take window content from the div
		divContent: this.config.dialogShow,
		// Window title
		title: 'Show'
	});
	// Initialize menu
	this.menu = new Zapatec.GridToolbarMenu({
		source: this.config.menuSource,
		sourceType: this.config.menuSourceType,
		container: this.config.menuContainer,
		theme: this.config.menuTheme,
		// To prevent going of menu under the grid when grid is mouseovered
		zIndex: 10,
		// Bind menu to the grid
		grid: this
	});
};

/**
 * Fills ul with grid's column titles.
 *
 * @private
 * @param {string} sId Id of ul element
 * @param {object} aWindows Array of Window objects
 */
Zapatec.GridToolbar.prototype.fillUlWithColumns = function(sId, aWindows) {
	// Get ul
	var oUl = document.getElementById(sId);
	if (!oUl) {
		return;
	}
	// Form lis
	var aLis = [];
	// Get fields
	var aFields = this.getFields();
	for (var iField = 0; iField < aFields.length; iField++) {
		// Check if Window object exists
		if (!aWindows[iField]) {
			continue;
		}
		// Add li element
		aLis.push('<li><a href="javascript:Zapatec.Widget.callMethod(' +
		 this.getId() + ',\'showDialog\',\'' + sId + '\',' + iField +
		 ')">' + this.getFieldTitle(aFields[iField]) + '</a></li>');
	}
	// Fill ul
	oUl.innerHTML = aLis.join('');
};

/**
 * Fills select box with grid's column titles.
 *
 * @private
 * @param {string} sId Id of select element
 */
Zapatec.GridToolbar.prototype.fillSelectWithColumns = function(sId) {
	// Get select box
	var oSelect = document.getElementById(sId);
	if (!oSelect) {
		return;
	}
	// Form options
	var aOptions = [];
	aOptions.push('<select id="' + sId + '">');
	aOptions.push('<option value="-1" selected>(do not sort)</option>');
	// Get fields
	var aFields = this.getFields();
	for (var iField = 0; iField < aFields.length; iField++) {
		aOptions.push('<option value="' + iField + '">' +
		 this.getFieldTitle(aFields[iField]) + '</option>');
	}
	aOptions.push('</select>');
	// In IE innerHTML of select element doesn't work correctly
	oSelect.parentNode.innerHTML = aOptions.join('');
};

/**
 * Fills div with grid's column titles with checkboxes.
 *
 * @private
 * @param {string} sId Id of div element
 */
Zapatec.GridToolbar.prototype.fillDivWithColumns = function(sId) {
	// Get div
	var oDiv = document.getElementById(sId);
	if (!oDiv) {
		return;
	}
	// Form checkboxes
	var aCheckboxes = [];
	// "All" checkbox
	aCheckboxes.push('<input type="checkbox" id="' + sId +
	 'All" checked="checked" onclick="Zapatec.GridToolbar.checkAll(\'' + sId +
	 '\', this.checked)"/> <label for="' + sId + 'All">All</label><br/>');
	// Get fields
	var aFields = this.getFields();
	for (var iField = 0; iField < aFields.length; iField++) {
		aCheckboxes.push('<input type="checkbox" id="' + sId + iField +
		 '" checked="checked" onclick="Zapatec.GridToolbar.setAllCheckbox(\'' +
		 sId + '\', false)"/> <label for="' + sId + iField + '">' +
		 this.getFieldTitle(aFields[iField]) + '</label><br/>');
	}
	// Fill div
	oDiv.innerHTML = aCheckboxes.join('');
};

/**
 * Creates dialog window with predefined common options.
 *
 * @private
 * @param {object} oArg Arguments passed to the Window constructor
 * @return Window object
 * @type object
 */
Zapatec.GridToolbar.createDialog = function(oArg) {
	// Disable maximize and minimize buttons
	oArg.showMaxButton = false;
	oArg.showMinButton = false;
	// Disable status bar
	oArg.showStatus = false;
	// Initially hide
	oArg.initialState = 'hidden';
	// Do not destroy window on close
	oArg.hideOnClose = true;
	// Create Window object
	return Zapatec.Window.setup(oArg);
};

/**
 * Shows Sort dialog.
 */
Zapatec.GridToolbar.prototype.showDialogSort = function() {
	if (this.dialogSort) {
		this.dialogSort.show();
	}
};

/**
 * Hides Sort dialog.
 */
Zapatec.GridToolbar.prototype.hideDialogSort = function() {
	if (this.dialogSort) {
		this.dialogSort.hide();
	}
};

/**
 * Shows Go to Row dialog.
 */
Zapatec.GridToolbar.prototype.showDialogGoToRow = function() {
	if (this.dialogGoToRow) {
		this.dialogGoToRow.show();
	}
}

/**
 * Hides Go to Row dialog.
 */
Zapatec.GridToolbar.prototype.hideDialogGoToRow = function() {
	if (this.dialogGoToRow) {
		this.dialogGoToRow.hide();
	}
};

/**
 * Shows Search dialog.
 */
Zapatec.GridToolbar.prototype.showDialogSearch = function() {
	if (this.dialogSearch) {
		this.dialogSearch.show();
	}
};

/**
 * Hides Search dialog.
 */
Zapatec.GridToolbar.prototype.hideDialogSearch = function() {
	if (this.dialogSearch) {
		this.dialogSearch.hide();
	}
};

/**
 * Shows Show dialog.
 */
Zapatec.GridToolbar.prototype.showDialogShow = function() {
	if (!this.dialogShow) {
		return;
	}
	// Update checkboxes
	var iCheckbox = 0;
	var bAllChecked = true;
	var oCheckbox;
	while (oCheckbox = document.getElementById(this.config.dialogShow +
	 'Checkboxes' + iCheckbox)) {
		// Get field object
		var oField = this.getFieldById(iCheckbox);
		// Check if it is hidden
		if (oField && this.getFieldHidden(oField)) {
			// Hidden column
			oCheckbox.checked = false;
			bAllChecked = false;
		} else {
			// Visible column
			oCheckbox.checked = true;
		}
		// Next checkbox
		iCheckbox++;
	}
	// Check "All" checkbox
	Zapatec.GridToolbar.setAllCheckbox(this.config.dialogShow + 'Checkboxes',
	 bAllChecked);
	// Show window
	this.dialogShow.show();
};

/**
 * Hides Show dialog.
 */
Zapatec.GridToolbar.prototype.hideDialogShow = function() {
	if (this.dialogShow) {
		this.dialogShow.hide();
	}
};

/**
 * Converts number of milliseconds since January 1, 1970, 00:00:00.000 into
 * a date string in MM/DD/YY format.
 *
 * @param {number} iTimestamp Milliseconds since 01/01/1970 00:00:00.000
 * @return Date
 * @type string
 */
Zapatec.GridToolbar.rangeConverterDate = function(iTimestamp) {
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
 * Sets precision float numbers.
 *
 * @param {number} dNumber Float number
 * @return Float number
 * @type number
 */
Zapatec.GridToolbar.rangeConverterFloat = function(dNumber) {
	// Set precision
	return Zapatec.Utils.setPrecision(dNumber, 2);
};

/**
 * Used to find range converter function by column data type.
 * @private
 */
Zapatec.GridToolbar.rangeConverters = {
	'date': Zapatec.GridToolbar.rangeConverterDate,
	'float': Zapatec.GridToolbar.rangeConverterFloat
};

/**
 * Shows Range or Filter Out dialog.
 *
 * @param {string} sId Id of ul element to determine dialog type
 * @param {number} iCol Zero-based column number
 */
Zapatec.GridToolbar.prototype.showDialog = function(sId, iCol) {
	// Get dialog depending on its type
	var oDialog;
	if (sId == this.config.menuRangeUl) {
		oDialog = this.dialogsRange[iCol];
	} else if (sId == this.config.menuFilterOutUl) {
		oDialog = this.dialogsFilterOut[iCol];
	}
	if (!oDialog) {
		return;
	}
	// Show dialog
	oDialog.show();
	// Initialize Slider if this is Range dialog
	if (sId == this.config.menuRangeUl) {
		// Get range
		var oRange = this.getColumnRange({column: iCol});
		if (oRange) {
			if (!this.sliders) {
				// Holds Slider objects
				this.sliders = [];
			}
			if (this.sliders[iCol]) {
				// Update Slider
				this.sliders[iCol].reset(oRange.min, oRange.max);
			} else {
				// Initialize Slider
				this.sliders[iCol] = new Zapatec.GridToolbarSlider({
					div: this.config.dialogRange + iCol + 'Slider', 
					length: 200,
					dual: true, 
					orientation: 'H',
					step: (oRange.max - oRange.min) / 200,
					range: [oRange.min, oRange.max],
					// Bind slider to the grid column
					grid: this,
					gridColumn: iCol,
					// Bind range container div to the slider
					rangeContainer: this.config.dialogRange + iCol + 'Range',
					// Bind range conversion callback to the slider
					rangeConverter: Zapatec.GridToolbar.rangeConverters[
					 this.getFieldType(this.getFieldById(iCol))],
					// Add some event listeners
					eventListeners: {
						'onChange': Zapatec.GridToolbarSlider.onChange,
						'newPosition': Zapatec.GridToolbarSlider.newPosition
					}
				});
			}
		}
	}
};

/**
 * Sorts the grid by several columns.
 */
Zapatec.GridToolbar.prototype.multiSort = function() {
	// Hide dialog window
	this.hideDialogSort();
	// Sorted flag
	var bSorted = false;
	// Form argument for sort
	var aArg = [];
	for (var iSel = 1; iSel <= 3; iSel++) {
		var oSelect = document.getElementById(this.config.dialogSort + 'Column' +
		 iSel);
		if (!oSelect) {
			continue;
		}
		var iCol = oSelect[oSelect.selectedIndex].value;
		if (iCol >= 0) {
			var oDesc = document.getElementById(this.config.dialogSort + 'Column' +
			 iSel + 'Desc');
			if (!oDesc) {
				continue;
			}
			aArg.push({
				column: iCol,
				desc: oDesc.checked
			});
		}
	}
	// Sort and refresh grid
	if (aArg.length) {
		this.sort(aArg);
		this.refresh();
	}
};

/**
 * Goes to the first row.
 */
Zapatec.GridToolbar.prototype.goToFirstRow = function() {
	Zapatec.Grid.firstPage(this.getId());
};

/**
 * Goes to the last row.
 */
Zapatec.GridToolbar.prototype.goToLastRow = function() {
	Zapatec.Grid.lastPage(this.getId());
};

/**
 * Goes to the specified row.
 *
 * @param {number} iRow Row number (starting from 1)
 */
Zapatec.GridToolbar.prototype.goToRowNumber = function(iRow) {
	// Check row number
	iRow *= 1;
	if (isNaN(iRow)) {
		alert(this.getMessage('errorInvalidInput'));
		return;
	}
	// Hide dialog window
	this.hideDialogGoToRow();
	// Grid counts rows starting from 0
	iRow--;
	// Get total row number
	var iTotalRows = this.recordsDisplayed();
	// Get total page number
	var iTotalPages = this.totalPages();
	// Calculate page number
	var iPage;
	if (iRow >= iTotalRows) {
		iPage = iTotalPages - 1;
	} else {
		iPage = Math.floor(iRow / this.config.rowsPerPage);
	}
	// Go to the page
	this.gotoPage(iPage);
};

/**
 * Searches grid.
 *
 * @param {string} sPattern Search pattern
 * @param {boolean} bRegExp Use regular expression
 */
Zapatec.GridToolbar.prototype.searchColumns = function(sPattern, bRegExp) {
	// Hide dialog window
	this.hideDialogSearch();
	// Check state of each checkbox
	var iCheckbox = 0;
	var oCheckbox;
	var aChecked = [];
	while (oCheckbox = document.getElementById(this.config.dialogSearch +
	 'Checkboxes' + iCheckbox)) {
		if (oCheckbox.checked) {
			aChecked.push(iCheckbox);
		}
		iCheckbox++;
	}
	// Clear previous search
	this.setFilter({
		regexp: '',
		text: ''
	});
	// Search grid
	if (bRegExp) {
		this.setFilter({
			regexp: sPattern,
			columns: aChecked
		});
	} else {
		this.setFilter({
			text: sPattern,
			columns: aChecked
		});
	}
};

/**
 * Shows or hides grid columns.
 */
Zapatec.GridToolbar.prototype.showHideColumns = function() {
	// Hide dialog window
	this.hideDialogShow();
	// Check state of each checkbox
	var iCheckbox = 0;
	var oCheckbox;
	while (oCheckbox = document.getElementById(this.config.dialogShow +
	 'Checkboxes' + iCheckbox)) {
		if (oCheckbox.checked) {
			// Show column
			this.showColumns({
				// Columns to show
				columns: [iCheckbox],
				// Do not show changes immediatly
				noRefresh: true
			});
		} else {
			// Hide column
			this.hideColumns({
				// Columns to hide
				columns: [iCheckbox],
				// Do not show changes immediatly
				noRefresh: true
			});
		}
		iCheckbox++;
	}
	// Show changes
	this.refresh();
};

/**
 * Removes all filters from the grid.
 */
Zapatec.GridToolbar.prototype.resetControls = function() {
	// Unhide all columns
	var iCols = this.getFields().length;
	var aCols = [];
	for (var iCol = 0; iCol < iCols; iCol++) {
		aCols.push(iCol);
	}
	this.showColumns({
		columns: aCols,
		noRefresh: true
	});
	// Reset all sliders
	for (var iWidget = 0; iWidget < Zapatec.Widget.all.length; iWidget++) {
		var oWidget = Zapatec.Widget.all[iWidget];
		if (oWidget.constructor == Zapatec.Slider) {
			oWidget.setPos(oWidget.config.range[0], oWidget.config.range[1]);
		}
	}
	// Reset all filters
	this.resetFilters();
};

/**
 * Checks or unchecks checkbox set.
 *
 * @private
 * @param {string} sId Common part of id for all checkboxes
 * @param {boolean} bChecked Check all if true, uncheck otherwise
 */
Zapatec.GridToolbar.checkAll = function(sId, bChecked) {
	var iCheckbox = 0;
	var oCheckbox;
	while (oCheckbox = document.getElementById(sId + iCheckbox)) {
		oCheckbox.checked = bChecked;
		iCheckbox++;
	}
};

/**
 * Checks or unchecks "All" checkbox.
 *
 * @private
 * @param {string} sId Common part of id for all checkboxes
 * @param {boolean} bChecked Check all if true, uncheck otherwise
 */
Zapatec.GridToolbar.setAllCheckbox = function(sId, bChecked) {
	document.getElementById(sId + 'All').checked = bChecked;
};

/**
 * Customized Menu for Grid Toolbar.
 *
 * <pre>
 * <strong>Adds following config options:</strong>
 *
 * <b>grid</b> [object] Reference to the Grid object.
 * </pre>
 *
 * @constructor
 * @extends Zapatec.Menu
 * @param {object} oArg User configuration
 */
Zapatec.GridToolbarMenu = function(oArg) {
	// Call constructor of superclass
	Zapatec.GridToolbarMenu.SUPERconstructor.call(this, oArg);
};

// Inherit Menu
Zapatec.inherit(Zapatec.GridToolbarMenu, Zapatec.Menu, {keepPath: true});

/**
 * Configures the widget. Gets called from init and reconfigure methods of
 * superclass.
 *
 * @private
 * @param {object} oArg User configuration
 */
Zapatec.GridToolbarMenu.prototype.configure = function(oArg) {
	// Define new config options
	this.defineConfigOption('grid');
	// Call parent method
	Zapatec.GridToolbarMenu.SUPERclass.configure.call(this, oArg);
};

/**
 * Sets initial position of dialog windows after menu is shown.
 *
 * @private
 * @param {number} iLeft Optional. Left position of trigger menu
 * @param {number} iTop Optional. Top position of trigger menu
 */
Zapatec.GridToolbarMenu.prototype.showMenu = function() {
	// Call parent init
	Zapatec.GridToolbarMenu.SUPERclass.showMenu.apply(this, arguments);
	// Resize menu
	this.fitIntoContainer();
	// Check configuration
	if (!this.config.grid) {
		return;
	}
	// Get top menu element
	var oMenuTop = this.top_parent;
	// Calculate menu border height
	var iBorderHeight = oMenuTop.offsetHeight - oMenuTop.clientHeight;
	// Get menu container absolute position and dimensions
	var oMenuOffset = Zapatec.Utils.getElementOffset(oMenuTop);
	// Calculate left position
	var iLeft = oMenuOffset.left;
	// Calculate top position
	var iTop = oMenuOffset.top + oMenuTop.offsetHeight + iBorderHeight;
	// List of dialogs to modify
	var aDialogs = [
		this.config.grid.dialogSort,
		this.config.grid.dialogGoToRow,
		this.config.grid.dialogSearch,
		this.config.grid.dialogShow
	];
	// Append range dialogs
	aDialogs = aDialogs.concat(this.config.grid.dialogsRange);
	// Append filter out dialogs
	aDialogs = aDialogs.concat(this.config.grid.dialogsFilterOut);
	// Pass additional options to each window object
	for (var iDialog = 0; iDialog < aDialogs.length; iDialog++) {
		if (aDialogs[iDialog]) {
			aDialogs[iDialog].setState({
				// Window left position
				x: iLeft,
				// Window top position
				y: iTop,
				// Prevent appearing of dialog under the menu (menu still can appear
				// above the window when it is mouseovered)
				zIndex: 20
			});
		}
	}
};

/**
 * Fits menu into its container to synchronize it with grid.
 * @private
 */
Zapatec.GridToolbarMenu.prototype.fitIntoContainer = function() {
	// Get top menu element
	var oMenuTop = this.top_parent;
	if (!oMenuTop) {
		// Menu is not ready yet
		return;
	}
	// Get menu container element
	var oMenuContainer = oMenuTop.parentNode;
	if (!oMenuContainer) {
		// Menu is not ready yet
		return;
	}
	oMenuContainer = oMenuContainer.parentNode;
	if (!oMenuContainer || !oMenuContainer.clientWidth) {
		// Something wrong
		return;
	}
	// Reset menu width
	oMenuTop.style.width = '';
	// Calculate menu border width
	var iBorderWidth = oMenuTop.offsetWidth - oMenuTop.clientWidth;
	// Calculate new width of menu
	oMenuTop.style.width = (oMenuContainer.clientWidth - iBorderWidth) + 'px';
	// Check width
	if (oMenuContainer.clientWidth != oMenuTop.offsetWidth) {
		// May be in IE in non standards-compliant mode
		oMenuTop.style.width = oMenuContainer.clientWidth + 'px';
	}
	// Correct top menu style
	oMenuTop.style.background = '#e7e7d6';
};

/**
 * Customized Slider for Grid Toolbar.
 *
 * <pre>
 * <strong>Adds following config options:</strong>
 *
 * <b>grid</b> [object] Reference to the Grid object.
 *
 * <b>gridColumn</b> [number] Grid column number.
 *
 * <b>rangeContainer</b> [string] Id of the element where to put range text.
 *
 * <b>rangeConverter</b> [function] Optional. Callback function to convert range
 * when it is displayed.
 * </pre>
 *
 * @constructor
 * @extends Zapatec.Slider
 * @param {object} oArg User configuration
 */
Zapatec.GridToolbarSlider = function(oArg) {
	// Call constructor of superclass
	Zapatec.GridToolbarSlider.SUPERconstructor.call(this, oArg);
};

// Inherit Menu
Zapatec.inherit(Zapatec.GridToolbarSlider, Zapatec.Slider, {keepPath: true});

/**
 * Configures the widget. Gets called from init and reconfigure methods of
 * superclass.
 *
 * @private
 * @param {object} oArg User configuration
 */
Zapatec.GridToolbarSlider.prototype.configure = function(oArg) {
	// Define new config options
	this.defineConfigOption('grid');
	this.defineConfigOption('gridColumn');
	this.defineConfigOption('rangeContainer');
	this.defineConfigOption('rangeConverter');
	// Call parent method
	Zapatec.GridToolbarSlider.SUPERclass.configure.call(this, oArg);
};

/**
 * Slider "onChange" event listener. Gets called when slider position is changed
 * programmatically. Gets called in scope of the Slider object.
 *
 * @private
 * @param {number} iMinValue Min value in the range
 * @param {number} iMaxValue Max value in the range
 */
Zapatec.GridToolbarSlider.onChange = function(iMinValue, iMaxValue) {
	if (typeof this.config.rangeConverter == 'function') {
		iMinValue = this.config.rangeConverter(iMinValue);
		iMaxValue = this.config.rangeConverter(iMaxValue);
	} else {
		iMinValue = Math.round(iMinValue);
		iMaxValue = Math.round(iMaxValue);
	}
	// Display scale
	var oContainer = document.getElementById(this.config.rangeContainer);
	if (oContainer) {
		oContainer.innerHTML = iMinValue + ' - ' + iMaxValue;
	}
};

/**
 * Slider "newPosition" event listener. Gets called when slider is
 * drag-n-dropped. Gets called in scope of the Slider object.
 *
 * @private
 * @param {number} iMinValue Min value in the range
 * @param {number} iMaxValue Max value in the range
 */
Zapatec.GridToolbarSlider.newPosition = function(iMinValue, iMaxValue) {
	// Update range container
	Zapatec.GridToolbarSlider.onChange.call(this, iMinValue, iMaxValue);
	// Limit range of items
	if (this.config.grid) {
		this.config.grid.limitRange({
			column: this.config.gridColumn,
			min: iMinValue,
			max: iMaxValue
		});
	}
};
