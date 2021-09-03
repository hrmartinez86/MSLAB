/**
 * @fileoverview Zapatec Grid widget. Include this file in your HTML page.
 * Includes base Zapatec Grid modules: zpgrid-core.js, zpgrid-convert.js,
 * zpgrid-html.js, zpgrid-output.js. To extend grid with other features like
 * XML, query, editing, export, or make it compatible with previous version,
 * include respective modules manually in your HTML page.
 *
 * <pre>
 * Copyright (c) 2004-2007 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid.js 7580 2007-07-19 15:53:01Z alex $ */

/**
 * Path to Zapatec Grid scripts.
 * @private
 */
Zapatec.gridPath = Zapatec.getPath('Zapatec.GridWidget');

// Include required scripts
Zapatec.include(Zapatec.gridPath + '../lang/eng.js');
Zapatec.include(Zapatec.gridPath + 'zpgrid-core.js', 'Zapatec.Grid');
Zapatec.include(Zapatec.gridPath + 'zpgrid-convert.js');
Zapatec.include(Zapatec.gridPath + 'zpgrid-html.js');
Zapatec.include(Zapatec.gridPath + 'zpgrid-output.js');
Zapatec.include(Zapatec.gridPath + 'zpgrid-aggregate.js');
