/**
 * @fileoverview Plugin for Zapatec Grid to provide validation methods for cells
 * depending on their data types.
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-validate.js 7323 2007-06-01 21:05:51Z alex $ */

/**
 * Validates cell of integer data type.
 *
 * @param {object} objCell Cell object
 * @return True if valid
 * @type boolean
 */
Zapatec.Grid.prototype.validateInteger = function(objCell) {
	// Infinity is valid
	if (objCell && (objCell.v == Infinity || objCell.v == -Infinity)) {
		return true;
	}
	// Validate original value
	return /^\-?\d+$/.test(objCell.o);
};

/**
 * Validates cell of float data type.
 *
 * @param {object} objCell Cell object
 * @return True if valid
 * @type boolean
 */
Zapatec.Grid.prototype.validateFloat = function(objCell) {
	// Infinity is valid
	if (objCell && (objCell.v == Infinity || objCell.v == -Infinity)) {
		return true;
	}
	// Validate original value
	return /^\-?\d*\.?\d+$/.test(objCell.o);
};

/**
 * Validates cell of date data type.
 *
 * @param {object} objCell Cell object
 * @return True if valid
 * @type boolean
 */
Zapatec.Grid.prototype.validateDate = function(objCell) {
	// Validate original value
	return !isNaN(Date.parse(objCell.o));
};

/**
 * Validates cell of time data type.
 *
 * @param {object} objCell Cell object
 * @return True if valid
 * @type boolean
 */
Zapatec.Grid.prototype.validateTime = function(objCell) {
	// Validate original value
	var arrMatch =
	 objCell.o.match(/(\d{1,2})\D+(\d{1,2})(\D+(\d{1,2}))?\W*(AM|PM)?/i);
	if (!arrMatch) {
		// Try without separator
		arrMatch = objCell.o.match(/(\d{2})(\d{2})((\d{2}))?\W*(AM|PM)?/i);
	}
	if (arrMatch && arrMatch[1] && arrMatch[2]) {
		return true;
	}
	return false;
};

/**
 * Validates cell of timestamp data type.
 *
 * @param {object} objCell Cell object
 * @return True if valid
 * @type boolean
 */
Zapatec.Grid.prototype.validateTimestamp = function(objCell) {
	// Validate original value
	return /^\d+$/.test(objCell.o);
};

/**
 * Validates cell of boolean data type.
 *
 * @param {object} objCell Cell object
 * @return True if valid
 * @type boolean
 */
Zapatec.Grid.prototype.validateBoolean = function(objCell) {
	// Validate original value
	switch (objCell.o.toUpperCase()) {
		case '0':
		case '1':
		case 'F':
		case 'T':
		case 'FALSE':
		case 'TRUE':
		case 'N':
		case 'Y':
		case 'NO':
		case 'YES':
			return true;
	}
	if (Zapatec.Grid.booleanValues) {
		switch (objCell.o.toUpperCase()) {
			case Zapatec.Grid.booleanValues[0].toUpperCase():
			case Zapatec.Grid.booleanValues[1].toUpperCase():
				return true;
		}
	}
	return false;
};

/**
 * Validates cell of booleanTF data type.
 *
 * @param {object} objCell Cell object
 * @return True if valid
 * @type boolean
 */
Zapatec.Grid.prototype.validateBooleanTF = function(objCell) {
	// Validate original value
	switch (objCell.o.toUpperCase()) {
		case '0':
		case '1':
		case 'F':
		case 'T':
		case 'FALSE':
		case 'TRUE':
		case 'N':
		case 'Y':
		case 'NO':
		case 'YES':
			return true;
	}
	if (Zapatec.Grid.booleanTFValues) {
		switch (objCell.o.toUpperCase()) {
			case Zapatec.Grid.booleanTFValues[0].toUpperCase():
			case Zapatec.Grid.booleanTFValues[1].toUpperCase():
				return true;
		}
	}
	return false;
};

/**
 * Associative array to access validation method by data type name.
 * @private
 */
Zapatec.Grid.validateByType = {
	'int': 'validateInteger',
	'integer': 'validateInteger',
	'float': 'validateFloat',
	'date': 'validateDate',
	'time': 'validateTime',
	'timestamp': 'validateTimestamp',
	'timestampMMDDYYYY': 'validateTimestamp',
	'timestampDDMMYYYY': 'validateTimestamp',
	'timestampYYYYMMDD': 'validateTimestamp',
	'boolean': 'validateBoolean',
	'booleanTF': 'validateBooleanTF'
};

/**
 * Returns name of validation method corresponding to data type.
 *
 * @param {string} strType Data type
 * @return Validation method name or undefined if not found
 * @type string
 */
Zapatec.Grid.prototype.getValidateByType = function(strType) {
	return Zapatec.Grid.validateByType[strType];
};

/**
 * Creates validation method for custom data type.
 *
 * @param {function} funcConvert Function that validates cell value
 * @param {string} strTypeName Type name
 */
Zapatec.Grid.createValidation = function(funcValidate, strTypeName) {
	// Check arguments
	if (typeof funcValidate != 'function' || typeof strTypeName != 'string' ||
	 !strTypeName.length) {
		return;
	}
	// Form method name
	var strFuncName = 'validateCustom' + strTypeName.charAt(0).toUpperCase() +
	 strTypeName.substr(1);
	// Add method
	Zapatec.Grid.prototype[strFuncName] = funcValidate;
	Zapatec.Grid.validateByType[strTypeName] = strFuncName;
};
