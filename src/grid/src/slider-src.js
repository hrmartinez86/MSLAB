// $Id: slider.js 5928 2007-01-11 11:48:11Z slip $
/**
 * The Zapatec DHTML Slider
 *
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 *
 * Slider Widget
 * $$
 *
 */

Zapatec.sliderPath = Zapatec.getPath("Zapatec.SliderWidget");
// Include required scripts
Zapatec.Transport.include(Zapatec.zapatecPath + 'button.js', "Zapatec.Button");
Zapatec.Transport.include(Zapatec.zapatecPath + 'zpobjects.js');
Zapatec.Transport.include(Zapatec.zapatecPath + 'dom.js');
Zapatec.Transport.include(Zapatec.zapatecPath + 'movable.js', "Zapatec.Utils.Movable");
Zapatec.Transport.include(Zapatec.zapatecPath + 'draggable.js', "Zapatec.Utils.Draggable");

Zapatec.Transport.include(Zapatec.sliderPath + 'slider-core.js', "Zapatec.Slider");
Zapatec.Transport.include(Zapatec.sliderPath + 'slider-states.js');
Zapatec.Transport.include(Zapatec.sliderPath + 'slider-controlling.js');
Zapatec.Transport.include(Zapatec.sliderPath + 'slider-utils.js');
