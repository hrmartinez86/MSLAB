/**
 * @fileoverview Plugin for Zapatec Grid to provide different data types for
 * cells.
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-convert.js 7586 2007-07-20 12:46:16Z alex $ */

/**
 * Converts cell to string data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertString = function(oCell) {
	if (!(oCell instanceof Object)) {
		oCell = {};
	}
	// Convert to string
	oCell.v += '';
	// Remove multiple whitespaces
	oCell.v = oCell.v.replace(/\s+/g, ' ');
	// Remove leading and trailing space
	oCell.v = oCell.v.replace(/^\s/, '').replace(/\s$/, '');
	oCell.c = oCell.o = oCell.v;
	// Remove HTML tags
	oCell.c = oCell.c.replace(/<[^>]*>/g, '');
	return oCell;
};

/**
 * Converts cell to insensitive string data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertInsensitiveString = function(oCell) {
	oCell = this.convertString(oCell);
	oCell.c = oCell.c.toUpperCase();
	return oCell;
};

/**
 * Searches specified value in the specified cell of insensitive string data
 * type.
 *
 * <pre>
 * Arguments format:
 * {
 *   cell: [object] cell object,
 *   searchValue: [string] value to search for
 * }
 * </pre>
 *
 * @param {object} oArg Arguments
 * @return The index within the cell string representation of the first
 * occurrence of the specified value, or -1 if the value is not found, or
 * undefined in case of invalid arguments
 * @type number
 */
Zapatec.Grid.prototype.searchInsensitiveString = function(oArg) {
	if (!oArg) {
		return;
	}
	var oCell = oArg.cell;
	// Get string to search in
	var sText = this.getCellValueString(oCell);
	// Remove HTML tags
	sText = sText.replace(/<[^>]*>/g, '');
	// Search
	return sText.search(new RegExp(Zapatec.Utils.escapeRegExp(oArg.searchValue),
	 'i'));
};

/**
 * Converts cell to integer data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertInteger = function(oCell) {
	if (oCell && (oCell.v == Infinity || oCell.v == -Infinity)) {
		return oCell;
	}
	oCell = this.convertString(oCell);
	// Get only numbers and decimal
	oCell.c = oCell.c.replace(/[^0-9\.\-]/g, '');
	// Ignore any chars after decimal, no rounding
	oCell.c = oCell.c.replace(/\..*/g, '');
	// Convert to integer
	oCell.c = parseInt(oCell.c);
	if (isNaN(oCell.c)) {
		oCell.c = 0;
	}
	return oCell;
};

/**
 * Converts cell containing number in German format to integer data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertIntegerGerman = function(oCell) {
	if (oCell && (oCell.v == Infinity || oCell.v == -Infinity)) {
		return oCell;
	}
	oCell = this.convertString(oCell);
	// Get only numbers and decimal
	oCell.c = oCell.c.replace(/[^0-9,\-]/g, '');
	// Ignore any chars after decimal, no rounding
	oCell.c = oCell.c.replace(/,.*/g, '');
	// Convert to integer
	oCell.c = parseInt(oCell.c);
	if (isNaN(oCell.c)) {
		oCell.c = 0;
	}
	return oCell;
};

/**
 * Converts cell to float data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertFloat = function(oCell) {
	if (oCell && (oCell.v == Infinity || oCell.v == -Infinity)) {
		return oCell;
	}
	oCell = this.convertString(oCell);
	// Get only numbers and decimal
	oCell.c = oCell.c.replace(/[^0-9\.\-]/g, '');
	// Convert to float
	oCell.c = parseFloat(oCell.c);
	if (isNaN(oCell.c)) {
		oCell.c = 0;
	}
	return oCell;
};

/**
 * Converts cell containing number in German format to float data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertFloatGerman = function(oCell) {
	if (oCell && (oCell.v == Infinity || oCell.v == -Infinity)) {
		return oCell;
	}
	oCell = this.convertString(oCell);
	// Get only numbers and decimal
	oCell.c = oCell.c.replace(/[^0-9,\-]/g, '');
	oCell.c = oCell.c.replace(/,/g, '.');
	// Convert to float
	oCell.c = parseFloat(oCell.c);
	if (isNaN(oCell.c)) {
		oCell.c = 0;
	}
	return oCell;
};

/**
 * Converts cell to date data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertDate = function(oCell) {
	oCell = this.convertString(oCell);
	oCell.c = Date.parse(oCell.c);
	return oCell;
};

/**
 * Converts cell to time data type.
 *
 * <pre>
 * Following time formats are recognized:
 * 1) HH:MM:SS
 * 2) HH:MM:SS AM/PM
 * 3) HH:MM
 * 4) HH:MM AM/PM
 * 5) HHMMSS
 * 6) HHMMSS AM/PM
 * 7) HHMM
 * 8) HHMM AM/PM
 *
 * Any type of separator can be used.
 *
 * Examples: 1.40AM, 05-06-02, 3:8:1, 0205[PM], etc.
 * </pre>
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertTime = function(oCell) {
	oCell = this.convertString(oCell);
	// Parse value
	var aMatches =
	 oCell.c.match(/(\d{1,2})\D+(\d{1,2})(\D+(\d{1,2}))?\W*(AM|PM|A|P)?/i);
	if (!aMatches) {
		// Try without separator
		aMatches = oCell.c.match(/(\d{2})(\d{2})((\d{2}))?\W*(AM|PM|A|P)?/i);
	}
	// Get compare value
	if (aMatches && aMatches[1] && aMatches[2]) {
		// Get hour
		var hour = aMatches[1] * 1;
		// Correct hour
		if (aMatches[5]) {
			var sAmPm = aMatches[5].toUpperCase();
			if (sAmPm == 'PM' || sAmPm == 'P') {
				if (hour < 12) {
					hour += 12;
				}
			} else { // AM
				if (hour == 12) {
					hour = 0;
				}
			}
		}
		if (hour < 10) {
			hour = '0' + hour;
		}
		// Get minute
		var minute = aMatches[2] * 1;
		// Correct minute
		if (minute < 10) {
			minute = '0' + minute;
		}
		// Get second
		var second = 0;
		if (aMatches[4]) {
			second = aMatches[4] * 1;
		}
		// Correct second
		if (second < 10) {
			second = '0' + second;
		}
		// Get time
		oCell.c = hour + ':' + minute + ':' + second;
	}
	return oCell;
};

/**
 * Converts cell to UNIX timestamp data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertTimestampLocale = function(oCell) {
	oCell = this.convertString(oCell);
	oCell.v = (new Date(parseInt(oCell.v) * 1000)).toLocaleString();
	return oCell;
};

/**
 * Converts cell to UNIX timestamp data type. Value displayed in MM/DD/YYYY
 * format.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertTimestampMMDDYYYY = function(oCell) {
	oCell = this.convertString(oCell);
	var oDate = new Date(parseInt(oCell.v) * 1000);
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
	oCell.v = sMonth + '/' + sDay + '/' + sYear;
	return oCell;
};

/**
 * Converts cell to UNIX timestamp data type. Value displayed in DD/MM/YYYY
 * format.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertTimestampDDMMYYYY = function(oCell) {
	oCell = this.convertString(oCell);
	var oDate = new Date(parseInt(oCell.v) * 1000);
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
	oCell.v = sDay + '/' + sMonth + '/' + sYear;
	return oCell;
};

/**
 * Converts cell to UNIX timestamp data type. Value displayed in YYYY/MM/DD
 * format.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertTimestampYYYYMMDD = function(oCell) {
	oCell = this.convertString(oCell);
	var oDate = new Date(parseInt(oCell.v) * 1000);
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
	oCell.v = sYear + '/' + sMonth + '/' + sDay;
	return oCell;
};

/**
 * Converts cell to boolean data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertBoolean = function(oCell) {
	oCell = this.convertString(oCell);
	switch (oCell.c.toUpperCase()) {
		case '0':
		case 'F':
		case 'FALSE':
		case 'N':
		case 'NO':
		case Zapatec.Grid.booleanValues[0].toUpperCase():
			oCell.c = 0;
			break;
		default:
			oCell.c = 1;
	}
	oCell.v = Zapatec.Grid.booleanValues[oCell.c];
	return oCell;
};

/**
 * Display values for boolean data type. Since this is static variable,
 * external application is able to substitute it with other values,
 * e.g. ['Non', 'Oui'].
 * @private
 */
Zapatec.Grid.booleanValues = ['No', 'Yes'];

/**
 * Sets display values for boolean data type.
 *
 * @param {string} sNo Replacement for "No"
 * @param {string} sYes Replacement for "Yes"
 */
Zapatec.Grid.prototype.setBooleanValues = function(sNo, sYes) {
	if (typeof sNo == 'string') {
		Zapatec.Grid.booleanValues[0] = sNo;
	}
	if (typeof sYes == 'string') {
		Zapatec.Grid.booleanValues[1] = sYes;
	}
};

/**
 * Converts cell to boolean data type.
 *
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertBooleanTF = function(oCell) {
	oCell = this.convertString(oCell);
	switch (oCell.c.toUpperCase()) {
		case '0':
		case 'F':
		case 'FALSE':
		case 'N':
		case 'NO':
		case Zapatec.Grid.booleanTFValues[0].toUpperCase():
			oCell.c = 0;
			break;
		default:
			oCell.c = 1;
	}
	oCell.v = Zapatec.Grid.booleanTFValues[oCell.c];
	return oCell;
};

/**
 * Display values for booleanTF data type.
 * @private
 */
Zapatec.Grid.booleanTFValues = ['False', 'True'];

/**
 * Sets display values for booleanTF data type.
 *
 * @param {string} sFalse Replacement for "False"
 * @param {string} sTrue Replacement for "True"
 */
Zapatec.Grid.prototype.setBooleanTFValues = function(sFalse, sTrue) {
	if (typeof sFalse == 'string') {
		Zapatec.Grid.booleanTFValues[0] = sFalse;
	}
	if (typeof sTrue == 'string') {
		Zapatec.Grid.booleanTFValues[1] = sTrue;
	}
};

/**
 * Associative array to access conversion method by data type name.
 * @private
 */
Zapatec.Grid.convertByType = {
	'string': 'convertString',
	'istring': 'convertInsensitiveString',
	'int': 'convertInteger',
	'intGerman': 'convertIntegerGerman',
	'integer': 'convertInteger',
	'integerGerman': 'convertIntegerGerman',
	'float': 'convertFloat',
	'floatGerman': 'convertFloatGerman',
	'date': 'convertDate',
	'time': 'convertTime',
	'timestamp': 'convertTimestampLocale',
	'timestampMMDDYYYY': 'convertTimestampMMDDYYYY',
	'timestampDDMMYYYY': 'convertTimestampDDMMYYYY',
	'timestampYYYYMMDD': 'convertTimestampYYYYMMDD',
	'boolean': 'convertBoolean',
	'booleanTF': 'convertBooleanTF'
};

/**
 * Returns name of convert method corresponding to data type.
 *
 * @param {string} sType Data type
 * @return Convert method name or undefined if not found
 * @type string
 */
Zapatec.Grid.prototype.getConvertByType = function(sType) {
	return Zapatec.Grid.convertByType[sType];
};

/**
 * Associative array to get class name by data type.
 * @private
 */
Zapatec.Grid.classByType = {
	'string': 'zpGridTypeString',
	'istring': 'zpGridTypeStringInsensitive',
	'int': 'zpGridTypeInt',
	'intGerman': 'zpGridTypeIntGerman',
	'integer': 'zpGridTypeInt',
	'integerGerman': 'zpGridTypeIntGerman',
	'float': 'zpGridTypeFloat',
	'floatGerman': 'zpGridTypeFloatGerman',
	'date': 'zpGridTypeDate',
	'time': 'zpGridTypeTime',
	'timestamp': 'zpGridTypeTimestampLocale',
	'timestampMMDDYYYY': 'zpGridTypeTimestampMMDDYYYY',
	'timestampDDMMYYYY': 'zpGridTypeTimestampDDMMYYYY',
	'timestampYYYYMMDD': 'zpGridTypeTimestampYYYYMMDD',
	'boolean': 'zpGridTypeBoolean',
	'booleanTF': 'zpGridTypeBooleanTF'
};

/**
 * Returns class name corresponding to data type.
 *
 * @param {string} sType Data type
 * @return Class name or undefined if not found
 * @type string
 */
Zapatec.Grid.prototype.getClassByType = function(sType) {
	return Zapatec.Grid.classByType[sType];
};

/**
 * Associative array to get data type by class name.
 * @private
 */
Zapatec.Grid.typeByClass = {
	'zpGridTypeString': 'string',
	'zpGridTypeStringInsensitive': 'istring',
	'zpGridTypeInt': 'int',
	'zpGridTypeIntGerman': 'intGerman',
	'zpGridTypeFloat': 'float',
	'zpGridTypeFloatGerman': 'floatGerman',
	'zpGridTypeDate': 'date',
	'zpGridTypeTime': 'time',
	'zpGridTypeTimestampLocale': 'timestamp',
	'zpGridTypeTimestampMMDDYYYY': 'timestampMMDDYYYY',
	'zpGridTypeTimestampDDMMYYYY': 'timestampDDMMYYYY',
	'zpGridTypeTimestampYYYYMMDD': 'timestampYYYYMMDD',
	'zpGridTypeBoolean': 'boolean',
	'zpGridTypeBooleanTF': 'booleanTF'
};

/**
 * Returns data type corresponding to class name. Default is "string".
 *
 * @param {string} sClass className attribute value
 * @return Data type
 * @type string
 */
Zapatec.Grid.prototype.getTypeByClass = function(sClass) {
	// className may contain several classes
	var aClasses = sClass.split(/\s+/);
	// Search first applicable class
	for (var iClass = 0; iClass < aClasses.length; iClass++) {
		var sType = Zapatec.Grid.typeByClass[aClasses[iClass]];
		if (typeof sType != 'undefined') {
			return sType;
		}
	}
	// Default is "string"
	return 'string';
};

/**
 * Creates custom data type.
 *
 * @param {function} funcConvert Function that converts cell value
 * @param {string} sTypeName Type name
 * @param {string} sTypeClass Optional. Class name
 */
Zapatec.Grid.createType = function(funcConvert, sTypeName, sTypeClass) {
	// Check arguments
	if (typeof funcConvert != 'function' || typeof sTypeName != 'string' ||
	 !sTypeName.length) {
		return;
	}
	// Form method name
	var sFuncName = 'convertCustom' + sTypeName.charAt(0).toUpperCase() +
	 sTypeName.substr(1);
	// Add method
	Zapatec.Grid.prototype[sFuncName] = funcConvert;
	// Add type
	Zapatec.Grid.convertByType[sTypeName] = sFuncName;
	// Add class
	if (typeof sTypeClass == 'string' && sTypeClass.length) {
		Zapatec.Grid.classByType[sTypeName] = sTypeClass;
		Zapatec.Grid.typeByClass[sTypeClass] = sTypeName;
	}
};

/**
 * Associative array to get search method by data type.
 * @private
 */
Zapatec.Grid.searchByType = {
	'istring': 'searchInsensitiveString'
};

/**
 * Returns search method name corresponding to data type.
 *
 * @param {string} sType Data type
 * @return Search method name or undefined if not found
 * @type string
 */
Zapatec.Grid.prototype.getSearchByType = function(sType) {
	return Zapatec.Grid.searchByType[sType];
};
