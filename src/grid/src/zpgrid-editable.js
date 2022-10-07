/**
 * @fileoverview Zapatec Editable Grid widget extension.
 *
 * <pre>
 * Copyright (c) 2004-2007 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-editable.js 7597 2007-07-25 08:32:55Z alex $ */

// Emulate window.event in Mozilla for keydown event
Zapatec.Utils.emulateWindowEvent(['keydown']);

/**
 * Editable Grid extension.
 *
 * <pre>
 * Note: zpgrid-core.js must be included before this module. If plugin modules
 * like zpgrid-xml.js are used, they must be included before this module as
 * well.
 *
 * <strong>Input data formats differences form Zapatec.Grid:</strong>
 *
 * <strong>JSON:</strong>
 *
 * "noedit: true" property in field definition makes column not editable.
 *
 * "list: true" property in field definition means that cells in the column will
 * not be edited directly. Instead there will appear selectbox with the list of
 * possible values for the cell. Cell "v" property should contain select
 * element:
 * <xmp>
 * <select>
 *   <option>value1</option>
 *   <option selected>value2</option>
 *   ...
 * </select>
 * </xmp>
 *
 * Alternatively (deprecated) cell definition may contain "values"
 * property with all possible values:
 * values: ["value1", "value2", ...]
 * "v" property should contain default (selected) value in this case.
 *
 * <strong>HTML:</strong>
 *
 * Special "zpGridTypeNoedit" class makes column not editable.
 *
 * Special "zpGridTypeList" class means that cells in the column will not be
 * edited directly. Instead there will appear selectbox with the list of
 * possible values for the cell. Cell definition should contain select element:
 * <xmp>
 * <select>
 *   <option>value1</option>
 *   <option selected>value2</option>
 *   ...
 * </select>
 * </xmp>
 * Special field types can be used alone or in conjunction with other field
 * types, e.g. class="zpGridTypeInt zpGridTypeNoedit" or
 * class="zpGridTypeFloat zpGridTypeList".
 *
 * <strong>XML:</strong>
 *
 * "noedit=true" attribute in field definition makes column not editable.
 *
 * "list=true" attribute in field definition means that cells in the column will
 * not be edited directly. Instead there will appear selectbox with the list of
 * possible values for the cell. Cell definition should contain select element:
 * <xmp>
 * <select>
 *   <option>value1</option>
 *   <option selected>value2</option>
 *   ...
 * </select>
 * </xmp>
 *
 * <strong>In addition to config options defined in base Zapatec.Widget class
 * and Zapatec.Grid class provides following config options:</strong>
 *
 * <b>callbackCellEdit</b> [function] Callback function to call before grid cell
 * is turned into editable state. Receives Zapatec.EditableGrid and cell object.
 * Return false to stop editing using standard grid editor.
 * 
 * <b>callbackCellReadOnly</b> [function] Callback function to call when grid
 * cell is turned into read-only state. Receives Zapatec.EditableGrid and cell
 * object.
 *
 * <b>externalEditors</b> [object] Array with external editors to use instead of
 * standard editors in following format:
 * [
 *   {
 *     column: [number, optional] column number,
 *     editor: [object, optional] widget object used as external editor,
 *     callback: [function, optional] callback function to pass value for
 *      editing
 *   },
 *   ...
 * ]
 * If "column" property is not set, this editor is used for all columns and the
 * rest of the array members are ignored. If "callback" property is specified,
 * "editor" property is ignored.
 * 
 * <b>autoSaveCell</b> [string] URL of server side script that is used for
 * checking and saving of individual cell.
 * 
 * <b>callbackAutoSaveCell</b> [function] Callback function that is used for
 * checking of server side script response. It receives following object:
 * {
 *   response: [object] XMLHttpRequest object
 * }
 * If cell was saved successfully, callback function must return true.
 *
 * <strong>In addition to events fired from base Zapatec.Grid class fires
 * following events:</strong>
 *
 * <b>gridCellEdit</b> before grid cell is turned into editable state and after
 * calling of callbackCellEdit. Event listener receives cell object that is
 * being modified.
 *
 * <b>gridCellSaved</b> when HTTP success response is received from the server
 * and callbackAutoSaveCell config option is not defined or callback function
 * returns true. Event listener receives following object as argument:
 * {
 *   cell: [object] cell object,
 *   request: [object] XMLHttpRequest object (see
 *    {@link Zapatec.Transport#fetch} for details)
 * }
 *
 * <b>gridCellNotSaved</b> when HTTP error response is received from the server
 * or callbackAutoSaveCell config option is defined and callback function
 * doesn't return true. Event listener receives following object as argument:
 * {
 *   cell: [object] cell object,
 *   error: [object] error object (see {@link Zapatec.Transport#fetch} for
 *    details)
 * }
 *
 * <b>gridCellEdited</b> before turning cell into read-only state if it was
 * changed. Event listener receives following object:
 * {
 *   cell: [object] edited cell,
 *   previousState: [object] cell before editing
 * }
 *
 * <b>gridEdited</b> when grid cell is turned into read-only state and after
 * calling of callbackCellReadOnly. Event listener receives edited cell object
 * as argument.
 * </pre>
 *
 * @constructor
 * @extends Zapatec.Grid
 * @param {object} oArg User configuration
 */
Zapatec.EditableGrid = function(oArg) {
	// Call constructor of superclass
	Zapatec.EditableGrid.SUPERconstructor.call(this, oArg);
};

// Inherit Grid
Zapatec.inherit(Zapatec.EditableGrid, Zapatec.Grid);

/**
 * Configures editable grid. Extends parent method.
 *
 * @private
 * @param {object} oArg User configuration
 */
Zapatec.EditableGrid.prototype.configure = function(oArg) {
	// Define config options
	this.defineConfigOption('callbackCellEdit');
	this.defineConfigOption('callbackCellReadOnly');
	this.defineConfigOption('externalEditors', []);
	this.defineConfigOption('autoSaveCell');
	this.defineConfigOption('callbackAutoSaveCell');
	// Call parent method
	Zapatec.EditableGrid.SUPERclass.configure.call(this, oArg);
	// Setup autosaving
	var oConfig = this.config;
	if (oConfig.autoSaveCell) {
		this.addEventListener('gridCellEdited', this.saveCell);
		if (typeof this.visualizeCellSaved == 'function') {
			this.addEventListener('gridCellSaved', this.visualizeCellSaved);
		}
		if (typeof this.visualizeCellNotSaved == 'function') {
			this.addEventListener('gridCellNotSaved', this.visualizeCellNotSaved);
		}
	}
};

/**
 * Extends parent method.
 *
 * @private
 * @param {objcet} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.EditableGrid.prototype.convertCell = function(oCell) {
	var oField = this.getFieldByCell(oCell);
	if (oField && oField.list && !oCell.innerHTML) {
		// Parse HTML fragment
		var oTmpContr = Zapatec.Transport.parseHtml(oCell.v);
		if (oTmpContr.firstChild) {
			if (oTmpContr.firstChild.nodeType == 1 &&
			 oTmpContr.firstChild.nodeName.toLowerCase() == 'select') {
				// Save original select tag
				oCell.innerHTML = oCell.v;
				// Remove old value
				var undef;
				oCell.v = undef;
				// Value to display
				var sVal;
				// Iterate over values
				var oOption = oTmpContr.firstChild.firstChild;
				while (oOption) {
					if (oOption.nodeType == 1 && oOption.nodeName.toLowerCase() ==
					 'option') {
						// Opera doesn't set selected property correctly
						if (oOption.selected || oOption.getAttribute('selected') ||
						 typeof oCell.v == 'undefined') {
							// Set selected value
							if (oOption.value.length) {
								oCell.v = oOption.value;
								// Check if value attribute is the same as displayed text
								if (oCell.v != oOption.innerHTML) {
									sVal = oOption.innerHTML;
								}
							} else {
								oCell.v = oOption.innerHTML;
							}
						}
					}
					// Next value
					oOption = oOption.nextSibling;
				}
				// Modify value to display
				if (typeof sVal != 'undefined') {
					oCell = Zapatec.EditableGrid.SUPERclass.convertCell.call(this, oCell);
					oCell.v = sVal;
					return oCell;
				}
			} else if ((oCell.values instanceof Array) && oCell.values.length) {
				// For backward compatibility
				var aHtml = [];
				aHtml.push('<select>');
				for (var iVal = 0; iVal < oCell.values.length; iVal++) {
					var sVal = oCell.values[iVal];
					aHtml.push('<option');
					if (sVal == oCell.v) {
						aHtml.push(' selected');
					}
					aHtml.push('>');
					aHtml.push(sVal);
					aHtml.push('</option>');
				}
				aHtml.push('</select>');
				oCell.innerHTML = aHtml.join('');
			} else {
				// Single value
				oCell.innerHTML = '<select><option selected>' + oCell.v +
				 '</option></select>';
			}
		}
	}
	return Zapatec.EditableGrid.SUPERclass.convertCell.call(this, oCell);
};

// Check if zpgrid-html.js is loaded
if (Zapatec.Grid.prototype.newFieldHtml) {

	/**
	 * Extends parent method.
	 *
	 * @private
	 * @param {object} oCell Element object
	 * @return Field object
	 * @type object
	 */
	Zapatec.EditableGrid.prototype.newFieldHtml = function(oCell) {
		// Call parent method
		var oField =
		 Zapatec.EditableGrid.SUPERclass.newFieldHtml.call(this, oCell);
		// Set noedit flag
		if (oCell.className.indexOf('zpGridTypeNoedit') >= 0) {
			oField.noedit = true;
		}
		// Set list flag
		if (oCell.className.indexOf('zpGridTypeList') >= 0) {
			oField.list = true;
		}
		return oField;
	};

}

// Check if zpgrid-xml.js is loaded
if (Zapatec.Grid.prototype.newFieldXml) {

	/**
	 * Extends parent method.
	 *
	 * @private
	 * @param {object} oCell Source object
	 * @return Field object
	 * @type object
	 */
	Zapatec.EditableGrid.prototype.newFieldXml = function(oCell) {
		// Call parent method
		var oField =
		 Zapatec.EditableGrid.SUPERclass.newFieldXml.call(this, oCell);
		// Set noedit flag
		if (oCell.getAttribute('noedit') == 'true') {
			oField.noedit = true;
		}
		// Set list flag
		if (oCell.getAttribute('list') == 'true') {
			oField.list = true;
		}
		return oField;
	};

}

/**
 * Keydown event handler in editable mode.
 *
 * @private
 * @param {number} iRowId Row id
 * @param {number} iCellId Cell id
 */
Zapatec.EditableGrid.prototype.inputKeyDown = function(iRowId, iCellId) {
	// Get Event object
	if (!window.event) {
		return;
	}
	// Skip Shift, Ctrl and Alt buttons because they are used only as modifiers
	if (window.event.keyCode >= 16 && window.event.keyCode <= 18) {
		return true;
	}
	// Get target element
	var oElement = window.event.srcElement || window.event.target;
	if (!oElement) {
		return;
	}
	// Get row object
	var oRow = this.getRowById(iRowId);
	if (!oRow) {
		return;
	}
	// Get field object
	var oField = this.getFieldById(iCellId);
	if (!oField) {
		return;
	}
	// Get cell object
	var oCell = this.getCellById(iRowId, iCellId);
	if (!oCell) {
		return;
	}
	// Process key
	switch (window.event.keyCode) {
		case 27: // Esc
			return this.inputButtonEsc(oCell, window.event, oElement);
		case 13: // Enter
			return this.inputButtonEnter(oCell, window.event, oElement);
		case 0: // Shift+Tab in Safari only
			if (/Safari/i.test(navigator.userAgent)) {
				return this.inputButtonTab(oCell, window.event, oElement);
			}
			break;
		case 9: // Tab
			return this.inputButtonTab(oCell, window.event, oElement);
	}
};

/**
 * Focus lost event handler for edited cell.
 *
 * @private
 * @param {number} iRowId Row id
 * @param {number} iCellId Cell id
 */
Zapatec.EditableGrid.prototype.inputBlur = function(iRowId, iCellId) {
	// Get cell object
	var oCell = this.getCellById(iRowId, iCellId);
	if (!oCell) {
		return;
	}
	// Make it read-only
	this.readOnlyCell(oCell);
};

/**
 * Esc key handler in editable mode.
 *
 * @private
 * @param {object} oCell Cell object
 * @param {object} oEvent Event object
 * @param {object} oElement Target element
 */
Zapatec.EditableGrid.prototype.inputButtonEsc = function(oCell, oEvent, oElement) {
	// Restore original value
	if (oElement.nodeName.toLowerCase() == 'input') {
		// Checkbox
		oElement.checked = this.getCellValueCompare(oCell) ? true : false;
	} else {
		// Selectbox or textarea
		oElement.value = this.getCellValueOriginal(oCell);
	}
	// Make cell read only
	this.readOnlyCell(oCell);
	// Stop event
	return Zapatec.Utils.stopEvent(oEvent);
};

/**
 * Enter key handler in editable mode.
 *
 * @private
 * @param {object} oCell Cell object
 * @param {object} oEvent Event object
 * @param {object} oElement Target element
 */
Zapatec.EditableGrid.prototype.inputButtonEnter = function(oCell, oEvent, oElement) {
	// Make cell read only
	this.readOnlyCell(oCell);
	// Stop event
	return Zapatec.Utils.stopEvent(oEvent);
};

/**
 * Tab key handler in editable mode.
 *
 * @private
 * @param {object} oCell Cell object
 * @param {object} oEvent Event object
 * @param {object} oElement Target element
 */
Zapatec.EditableGrid.prototype.inputButtonTab = function(oCell, oEvent, oElement) {
	// Save reference to current cell
	var oPrevCell = oCell;
	// Go to previous/next cell skipping not editable cells
	do {
		var oNextCell = null;
		if (oEvent.shiftKey) {
			// Get previous cell
			if (oCell.i == 0) {
				// Get visible rows
				var aRows = this.applyPaging();
				// Get previous row
				for (var iRow = 0; iRow < aRows.length; iRow++) {
					var oCurrRow = aRows[iRow];
					if (oCurrRow && oCell.r == oCurrRow.i) {
						if (iRow > 0) {
							// Go to last cell of previous row
							var oPrevRow = aRows[iRow - 1];
							if (oPrevRow && oPrevRow.cells instanceof Array) {
								oNextCell = oPrevRow.cells[oPrevRow.cells.length - 1];
							}
						} else if (this.currentPage > 0) {
							// Visual improvement: unselect row and cell before switching page
							this.unselectRow(this.getRowByCell(oPrevCell));
							this.unselectCell(oPrevCell);
							// Go to previous page
							this.gotoPage(this.currentPage - 1);
							// Get visible rows
							aRows = this.applyPaging();
							// Go to last cell
							var oLastRow = aRows[aRows.length - 1];
							if (oLastRow && oLastRow.cells instanceof Array) {
								oNextCell = oLastRow.cells[oLastRow.cells.length - 1];
							}
						}
						break;
					}
				}
			} else {
				// Go to previous cell
				var oRow = this.getRowByCell(oCell);
				if (oRow && oRow.cells instanceof Array) {
					oNextCell = oRow.cells[oCell.i - 1];
				}
			}
		} else {
			// Get next cell
			var oRow = this.getRowByCell(oCell);
			if (oRow && oRow.cells instanceof Array) {
				if (oCell.i == oRow.cells.length - 1) {
					// Get visible rows
					var aRows = this.applyPaging();
					// Get next row
					for (var iRow = 0; iRow < aRows.length; iRow++) {
						var oCurrRow = aRows[iRow];
						if (oCurrRow && oRow.i == oCurrRow.i) {
							if (iRow < aRows.length - 1) {
								// Go to first cell of next row
								var oNextRow = aRows[iRow + 1];
								if (oNextRow && oNextRow.cells instanceof Array) {
									oNextCell = oNextRow.cells[0];
								}
							} else if (this.currentPage < this.totalPages() - 1) {
								// Visual improvement: unselect row and cell before switching
								// page
								this.unselectRow(this.getRowByCell(oPrevCell));
								this.unselectCell(oPrevCell);
								// Go to next page
								this.gotoPage(this.currentPage + 1);
								// Get visible rows
								aRows = this.applyPaging();
								// Go to first cell
								var oFirstRow = aRows[0];
								if (oFirstRow && oFirstRow.cells instanceof Array) {
									oNextCell = oFirstRow.cells[0];
								}
							}
							break;
						}
					}
				} else {
					// Go to next cell
					oNextCell = oRow.cells[oCell.i + 1];
				}
			}
		}
		// Go to previous/next cell
		oCell = oNextCell;
	} while (oCell &&
	 (this.fields[oCell.i].noedit || this.fields[oCell.i].hidden));
	// Do nothing if this is first or last cell in the grid
	if (oCell) {
		// Wait until grid is refreshed
		var oGrid = this;
		setTimeout(function() {
			// Unselect previous cell and turn it into read only state
			oGrid.unselectCell(oPrevCell);
			// Unselect previous row
			oGrid.unselectRow(oGrid.getRowByCell(oPrevCell));
			// Select row
			oGrid.selectRow(oGrid.getRowByCell(oCell));
			// Select cell
			oGrid.selectCell(oCell);
			// Turn cell into editable mode
			oGrid.editCell(oCell);
		}, 0);
	}
	// Stop event
	return Zapatec.Utils.stopEvent(oEvent);
};

/**
 * Turns cell into editable state.
 *
 * <pre>
 * Calls callbackCellEdit function before grid cell is turned into editable
 * state. Callback receives Zapatec.EditableGrid and cell object. If callback
 * returns false, standard grid editor is not used.
 *
 * Fires gridCellEdit event before grid cell is turned into editable state and
 * after calling of callbackCellEdit. Event listener receives cell object that
 * is being modified.
 * </pre>
 *
 * @private
 * @param {object} oCell Cell object
 */
Zapatec.EditableGrid.prototype.editCell = function(oCell) {
	// Check arguments
	if (!oCell || oCell.editing) {
		return;
	}
	// Check if editing of this column is allowed
	var oField = this.getFieldByCell(oCell);
	if (!oField || oField.noedit) {
		return;
	}
	// Edit callback
	var bVisualize;
	if (typeof this.config.callbackCellEdit == 'function') {
		bVisualize = this.config.callbackCellEdit(this, oCell);
	}
	// Fire event
	this.fireEvent('gridCellEdit', oCell);
	// Mark cell as editable
	oCell.editing = true;
	// Save reference
	this.editingCell = oCell;
	// Get cell id
	var iCellId = this.getCellId(oCell);
	// Check external editors
	if (this.config.externalEditors && this.config.externalEditors.length) {
		for (var iEE = 0; iEE < this.config.externalEditors.length; iEE++) {
			var oEE = this.config.externalEditors[iEE];
			if (typeof oEE.column == 'undefined' || oEE.column == iCellId) {
				if (typeof oEE.callback == 'function') {
					// Callback
					oEE.callback(this.getCellValueOriginal(oCell));
				} else if (oEE.widget && typeof oEE.widget.receiveData == 'function') {
					// Widget
					oEE.widget.receiveData({
						data: this.getCellValueOriginal(oCell)
					});
				}
				return;
			}
		}
	}
	// Check if we are responsible for visualisation
	if (!(this.visualize && (bVisualize || typeof bVisualize == 'undefined'))) {
		return;
	}
	// Display input field
	var aCl;
	var sGridId = this.id.toString();
	var iRowId = this.getCellRowId(oCell);
	// Get table row element
	var oTr = document.getElementById('zpGrid' + sGridId + 'Row' + iRowId);
	if (oTr) {
		// Vertical grid
		// Update className
		aCl = [];
		aCl.push(' zpGridRowEditable zpGridRowEditable');
		aCl.push(iRowId);
		aCl.push(' zpGridRowEditable');
		aCl.push(oTr.className.indexOf('zpGridRowOdd') >= 0 ? 'Odd' : 'Even');
		if (oTr.className.indexOf('zpGridRowLast') >= 0) {
			// Last row
			aCl.push(' zpGridRowEditableLast');
		}
		var sClass = aCl.join('');
		oTr.className += sClass;
		// Get fixed part of the row
		oTr = document.getElementById('zpGrid' + sGridId + 'Row' + iRowId + 'Fixed');
		if (oTr) {
			oTr.className += sClass;
		}
	} else {
		oTr = document.getElementById('zpGrid' + sGridId + 'Col' + iCellId);
		if (oTr) {
			// Horizontal grid
			// Update className
			aCl = [];
			aCl.push(' zpGridColEditable zpGridColEditable');
			aCl.push(iCellId);
			aCl.push(' zpGridColEditable');
			aCl.push(oTr.className.indexOf('zpGridColOdd') >= 0 ? 'Odd' : 'Even');
			if (oTr.className.indexOf('zpGridColLast') >= 0) {
				// Last row
				aCl.push(' zpGridColEditableLast');
			}
			oTr.className += aCl.join('');
		}
	}
	// Get table cell element
	var oTd = document.getElementById('zpGrid' + sGridId + 'Row' + iRowId +
	 'Cell' + iCellId);
	// Can be on different page
	if (oTd && oTd.firstChild) {
		// Get number of visible columns
		var iCols = this.fields.length;
		for (var iFld = 0; iFld < this.fields.length; iFld++) {
			var oFld = this.fields[iFld];
			if (!oFld || oFld.hidden) {
				iCols--;
			}
		}
		// Update className
		aCl = [];
		aCl.push(' zpGridCellEditable zpGridCellEditable');
		aCl.push(iCellId);
		aCl.push(' zpGridCellEditable');
		aCl.push(iCellId % 2 == 1 ? 'Odd' : 'Even');
		if (iCellId == iCols - 1) {
			// Last cell
			aCl.push(' zpGridCellEditableLast');
		}
		oTd.className += aCl.join('');
		// Display form element depending from cell data type to edit cell value
		var sDataType = this.getCellDataType(oCell);
		if (sDataType && sDataType.indexOf('boolean') == 0) {
			// Checkbox
			var aHtml = [];
			aHtml.push('<div style="position:relative;height:0px"><div style="position:absolute;top:0px;left:0px;width:');
			aHtml.push(oTd.firstChild.offsetWidth);
			aHtml.push('px;height:');
			aHtml.push(oTd.firstChild.offsetHeight);
			aHtml.push('px;text-align:center"><input type="checkbox" class="zpGridInput" onkeydown="Zapatec.Widget.callMethod(');
			aHtml.push(sGridId);
			aHtml.push(",'inputKeyDown',");
			aHtml.push(iRowId);
			aHtml.push(',');
			aHtml.push(iCellId);
			aHtml.push(')" ');
			if (this.getCellValueCompare(oCell)) {
				aHtml.push('checked="checked" ');
			}
			aHtml.push('onblur="Zapatec.Widget.callMethod(');
			aHtml.push(sGridId);
			aHtml.push(",'inputBlur',");
			aHtml.push(iRowId);
			aHtml.push(',');
			aHtml.push(iCellId);
			aHtml.push(')"/></div></div>');
			// Original content is needed to keep cell size and position form
			// element correctly
			aHtml.push('<div style="overflow:hidden;visibility:hidden">');
			aHtml.push(oTd.firstChild.innerHTML);
			aHtml.push('</div>');
			oTd.innerHTML = aHtml.join('');
		} else if (oField.list) {
			// Selectbox
			var iWidth = oTd.firstChild.offsetWidth;
			var aHtml = [];
			aHtml.push('<div style="position:relative;height:0px"><div style="position:absolute;top:0px;left:0px">')
			aHtml.push(oCell.innerHTML);
			aHtml.push('</div></div>');
			// Original content is needed to keep cell size and position form element
			// correctly
			aHtml.push('<div style="overflow:hidden;visibility:hidden">');
			aHtml.push(oTd.firstChild.innerHTML);
			aHtml.push('</div>');
			oTd.innerHTML = aHtml.join('');
			// Set attributes
			var oSelect = oTd.firstChild.firstChild.firstChild;
			if (oSelect.className) {
				oSelect.className += ' zpGridSelect';
			} else {
				oSelect.className = 'zpGridSelect';
			}
			oSelect.onkeydown = new Function('Zapatec.Widget.callMethod(' + sGridId +
			 ",'inputKeyDown'," + iRowId + ',' + iCellId + ')');
			oSelect.onblur = new Function('Zapatec.Widget.callMethod(' + sGridId +
			 ",'inputBlur'," + iRowId + ',' + iCellId + ')');
			oSelect.style.width = iWidth + 'px';
			// Go to previously selected value
			if (typeof oCell.selectedIndex != 'undefined') {
				oSelect.selectedIndex = oCell.selectedIndex;
			}
		} else {
			// Textarea
			var aHtml = [];
			aHtml.push('<div style="position:relative;height:0px"><div style="position:absolute;top:0px;left:0px"><textarea class="zpGridTextarea" onkeydown="Zapatec.Widget.callMethod(');
			aHtml.push(sGridId);
			aHtml.push(",'inputKeyDown',");
			aHtml.push(iRowId);
			aHtml.push(',');
			aHtml.push(iCellId);
			aHtml.push(')" onkeyup="this.style.height=this.scrollHeight+\'px\';this.style.width=this.scrollWidth+\'px\'" onblur="Zapatec.Widget.callMethod(');
			aHtml.push(sGridId);
			aHtml.push(",'inputBlur',");
			aHtml.push(iRowId);
			aHtml.push(',');
			aHtml.push(iCellId);
			aHtml.push(')" style="width:');
			aHtml.push(oTd.firstChild.offsetWidth);
			aHtml.push('px;height:');
			aHtml.push(oTd.firstChild.offsetHeight);
			aHtml.push('px"></textarea></div></div>');
			// Original content is needed to keep cell size and position form
			// element correctly
			this.outputCellValue(aHtml, this.getFieldByCell(oCell), oCell, true);
			oTd.innerHTML = aHtml.join('');
			// Edit original value
			oTd.firstChild.firstChild.firstChild.innerHTML =
			 this.getCellValueOriginal(oCell);
		}
		var oInput = oTd.firstChild.firstChild.firstChild;
		// IE needs small delay
		setTimeout(function() {
			if (oInput.tagName.toLowerCase() == 'textarea') {
				oInput.style.height = oInput.scrollHeight + 'px';
				oInput.style.width = oInput.scrollWidth + 'px';
				// IE needs focus twice for large grids
				oInput.focus();
				oInput.select();
			}
			oInput.focus();
			// Prevent possible memory leak in IE
			oInput = null;
		}, 0);
	}
};

/**
 * Returns currently edited cell object.
 *
 * @return Edited cell object
 * @type object
 */
Zapatec.EditableGrid.prototype.getEditingCell = function() {
	return this.editingCell;
};

/**
 * Receives data back from other widget previosly passed to it using its
 * {@link Zapatec.Widget#receiveData} method.
 *
 * <pre>
 * Arguments object format:
 * {
 *   data: [string] edited original value of the cell
 * }
 * </pre>
 *
 * @param {object} oArg Arguments
 */
Zapatec.EditableGrid.prototype.acceptData = function(oArg) {
	// Call parent method
	Zapatec.EditableGrid.SUPERclass.acceptData.call(this, oArg);
	// Check argument
	if (typeof oArg != 'object') {
		oArg = {};
	}
	// Update edited cell
	this.setCellReadOnly(this.editingCell, oArg.data);
};

/**
 * Deprecated. Use {@link Zapatec.EditableGrid#acceptData} instead.
 */
Zapatec.EditableGrid.prototype.editDataReceive =
 Zapatec.EditableGrid.prototype.acceptData;

/**
 * Turns cell into read-only state and assigns new value.
 *
 * @private
 * @param {object} oCell Cell object
 */
Zapatec.EditableGrid.prototype.readOnlyCell = function(oCell) {
	// Check arguments
	if (!oCell || !oCell.editing) {
		return;
	}
	// Mark cell as read-only
	oCell.editing = false;
	// Remove reference
	this.editingCell = null;
	// Get new value if we are responsible for visualisation
	var val;
	var sVal;
	if (this.visualize) {
		// Get table cell element
		var oTd = document.getElementById('zpGrid' + this.id + 'Row' +
		 this.getRowId(this.getRowByCell(oCell)) + 'Cell' +
		 this.getCellId(oCell));
		// Can be on different page
		if (oTd && oTd.firstChild && oTd.firstChild.firstChild) {
			var oInput = oTd.firstChild.firstChild.firstChild;
			// Check if this is input element
			if (oInput && typeof oInput.value != 'undefined') {
				// Get cell value from input element
				var sDataType = this.getCellDataType(oCell);
				if (sDataType && sDataType.indexOf('boolean') == 0) {
					// Checkbox
					val = oInput.checked;
				} else if (typeof oInput.selectedIndex != 'undefined') {
					// Selectbox
					var iIndex = oInput.selectedIndex;
					if (iIndex != -1) {
						var oOption = oInput.options[iIndex];
						if (oOption) {
							val = oOption.value;
							if (val && val.length) {
								// Check if value attribute is the same as displayed text
								if (val != oOption.innerHTML) {
									sVal = oOption.innerHTML;
								}
							} else {
								val = oOption.innerHTML;
							}
						}
						// Save selected index
						oCell.selectedIndex = oInput.selectedIndex;
					}
				} else {
					// Textarea
					val = oInput.value;
					// Unselect: required for tab navigation in IE
					if (document.selection && document.selection.empty) {
						document.selection.empty();
					}
				}
			}
		}
	}
	// Turn cell into read-only state
	this.setCellReadOnly(oCell, val, sVal);
};

/**
 * Turns cell into read-only state and assigns new value. If new value is
 * undefined, cell value is not changed.
 *
 * <pre>
 * Fires gridCellEdited event before turning cell into read-only state if it was
 * changed. Event listener receives following object:
 * {
 *   cell: [object] edited cell,
 *   previousState: [object] cell before editing
 * }
 *
 * Calls callbackCellReadOnly function when grid cell is turned into read-only
 * state. Callback receives Zapatec.EditableGrid and cell object.
 *
 * Fires gridEdited event when grid cell is turned into read-only state and
 * after calling of callbackCellReadOnly. Event listener receives edited cell
 * object as argument.
 * </pre>
 *
 * @param {object} oCell Cell object
 * @param {any} val Optional. New cell value
 * @param {string} sVal Optional. Value to display unless it is the same as val
 * after conversion according to the data type. Normally this argument should be
 * omitted
 */
Zapatec.EditableGrid.prototype.setCellReadOnly = function(oCell, val, sVal) {
	// Check arguments
	if (!oCell) {
		return;
	}
	// Mark cell as read-only
	oCell.editing = false;
	// Remove reference
	this.editingCell = null;
	// Set new value
	if (typeof val != 'undefined') {
		var sPrevVal = oCell.v;
		this.setCellValue(oCell, val);
		// Modify value to display
		if (typeof sVal != 'undefined') {
			oCell.v = sVal;
		}
		if (sPrevVal != oCell.v) {
			this.fireEvent('gridCellEdited', {
				cell: oCell,
				previousState: oCell.previousState
			});
		}
	}
	// Refresh cell without refreshing whole grid
	this.refreshCell({
		cell: oCell
	});
	// Read-only callback
	if (typeof this.config.callbackCellReadOnly == 'function') {
		this.config.callbackCellReadOnly(this, oCell);
	}
	// Fire event
	this.fireEvent('gridEdited', oCell);
};

/**
 * Refreshes a cell without refreshing whole grid.
 *
 * <pre>
 * Arguments format:
 * {
 *   cell: [object] cell object
 * }
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments
 */
Zapatec.EditableGrid.prototype.refreshCell = function(oArg) {
	// Check arguments
	var oCell = oArg.cell;
	if (!oCell) {
		return;
	}
	// Display updates if we are responsible for visualisation
	if (this.visualizeCellReadOnly && this.visualize) {
		this.visualizeCellReadOnly(oCell);
	}
	// Redraw totals
	if (this.redrawTotals) {
		this.redrawTotals({
			column: this.getCellId(oCell)
		});
	}
	// Redraw filter out forms
	this.displayFilterOut();
};

/**
 * Extends parent method. 
 *
 * @private
 * @param {object} oCell Cell object
 */
Zapatec.EditableGrid.prototype.unselectCell = function(oCell) {
	// Editable cell is always selected as well. When cell is unselected, it must
	// be turned into read-only state.
	this.readOnlyCell(oCell);
	// Call parent method
	Zapatec.EditableGrid.SUPERclass.unselectCell.call(this, oCell);
};

/**
 * Extends parent method.
 * @private
 */
Zapatec.EditableGrid.prototype.refresh = function() {
	// If there is editable cell, its value must be updated. Otherwise changes
	// will be lost.
	this.readOnlyCell(this.editingCell);
	// Call parent method
	Zapatec.EditableGrid.SUPERclass.refresh.call(this);
};

/**
 * Extends parent method.
 *
 * @private
 * @param {number} iRowId Id of row that was clicked
 * @param {number} iCellId Id of cell that was clicked
 */
Zapatec.EditableGrid.prototype.rowOnDblClick = function(iRowId, iCellId) {
	// Call parent method
	Zapatec.EditableGrid.SUPERclass.rowOnDblClick.call(this, iRowId, iCellId);
	// Turn cell that is currently edited into read-only state
	if (this.editingCell) {
		this.readOnlyCell(this.editingCell);
	}
	// Turn cell into editable state
	this.editCell(this.getCellById(iRowId, iCellId));
};

/**
 * Sends contents of a cell to the server. Waits for server response and
 * restores previous cell value if successful response is not received.
 *
 * <pre>
 * Using POST method sends to the server script specified in autoSaveCell config
 * option following arguments:
 *
 * <b>i</b> cell id
 * <b>r</b> row id
 * <b>o</b> input value
 *
 * If callbackAutoSaveCell config option is defined, it is used for checking of
 * server response. Otherwise only HTTP success response is checked.
 * callbackAutoSaveCell must return true is cell was saved successfully.
 *
 * Server script may return any content, which is passed to the gridCellSaved
 * event listeners.
 *
 * Fires following events:
 *
 * <b>gridCellSaved</b> when HTTP success response is received from the server
 * and callbackAutoSaveCell config option is not defined or callback function
 * returns true. Event listener receives following object as argument:
 * {
 *   cell: [object] cell object,
 *   request: [object] XMLHttpRequest object (see
 *    {@link Zapatec.Transport#fetch} for details)
 * }
 *
 * <b>gridCellNotSaved</b> when HTTP error response is received from the server
 * or callbackAutoSaveCell config option is defined and callback function
 * doesn't return true. Event listener receives following object as argument:
 * {
 *   cell: [object] cell object,
 *   error: [object] error object (see {@link Zapatec.Transport#fetch} for
 *    details)
 * }
 *
 * Arguments format:
 * {
 *   cell: [object] cell object
 * }
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments
 */
Zapatec.EditableGrid.prototype.saveCell = function(oArg) {
	// Validate cell
	var oCell = oArg.cell;
	if (!this.validateCell(oCell)) {
		return;
	}
	// Form content
	var sContent = [
		'i=',
		this.getCellId(oCell),
		'&r=',
		this.getCellRowId(oCell),
		'&o=',
		escape(this.getCellValueOriginal(oCell))
	].join('');
	// Send changes to the server
	var oGrid = this;
	Zapatec.Transport.fetch({
		// Server-side script
		url: this.config.autoSaveCell,
		// Use POST method
		method: 'POST',
		// Arguments string
		content: sContent,
		// onLoad handler
		onLoad: function(oRequest) {
			var fCallback = oGrid.config.callbackAutoSaveCell;
			if (typeof fCallback == 'function' && !fCallback({request: oRequest})) {
				// Cancel editing
				oCell = oGrid.revertCell({
					cell: oCell
				});
				// Show previous state
				oGrid.refreshCell({
					cell: oCell
				});
				// Inform listeners about error
				oGrid.fireEvent('gridCellNotSaved', {
					cell: oCell,
					request: oRequest
				});
			} else {
				// Inform listeners about success
				oGrid.fireEvent('gridCellSaved', {
					cell: oCell,
					request: oRequest
				});
			}
		},
		// onError handler
		onError: function(oError) {
			// Cancel editing
			oCell = oGrid.revertCell({
				cell: oCell
			});
			// Show previous state
			oGrid.refreshCell({
				cell: oCell
			});
			// Inform listeners about error
			oGrid.fireEvent('gridCellNotSaved', {
				cell: oCell,
				error: oError
			});
		},
		// Show "Saving" animated GIF
		busyContainer: this.container,
		// Use standard "Saving" animated GIF
		busyImage: 'zpsaving.gif'
	});
};
