// $Id: slider-utils.js 7367 2007-06-07 16:21:20Z alex $
/**
 *
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 */

/**
 * Parses given DOM element to save references into objects properties.
 * All the elements to be saved as a reference had to have a word starting
 * with 'area' in there class name. So for example an element with class name
 * areaTitle will be parsed into this.title property and those className will 
 * be removed.
 * @param el [HTML element] - element to parse;
 * @return - true if success, otherwise false;
 */
Zapatec.Slider.prototype.parseDom = function(el) {
	var classes = "";
	//the el needs to be a DOM HTML element
	if (!el || typeof el != "object" || !el.nodeType) {
		return false;
	}
	//seeks the elements with the className starting with word 'area',
	//extracts the rest part of this class name, creates the reference 
	//(a property of the object) with such name, removes this class.
	//I didn't knew which way to mark the elements which needed to have reference
	//in our object, and decided (by advise) to use className starting with 'area'.
	//Example: 'areaContent', 'areaTitle', etc. will create this.content, this.title, etc.
	if (el.className) {
		classes = el.className.match(/area(\w+)/);
		//this way we mark all the elements which belong to the widget with a reference to it.
		el.win = this;
		if (classes) {
			el.id = "zpSlider" + this.id + classes[1];
			classes[1] = classes[1].charAt(0).toLowerCase() + classes[1].substring(1);
			this[classes[1]] = el;
			Zapatec.Utils.removeClass(el, classes[0]);
		}
	}
	//to go through all the childs we use recursive calls of this function for every child.
	var child = el.firstChild;
	while(child) {
		this.parseDom(child);
		child = child.nextSibling;
	}
	
	return true;
};

/**
 * Changes the state of the given element. This is mostly
 * connected with theme classes, such as active, inactive,
 * pressed and hilited. All function does is removing all other
 * classes and adding the one you want to set. As those classes 
 * mostly represent visual state of an element, we have such 
 * strange name for this function :). It may also contain some
 * other usefull actions in the future, that are connected
 * to the state of the element.
 * @param el [HTML element] - element to work with.
 * @param state [string] - a string representing state.
 * @return {boolean} - true if success, otherwise false.
 */
Zapatec.Slider.prototype.setElementState = function(el, state) {
	if (!Zapatec.isHtmlElement(el) || el.state == state) {
		return false;
	}
	if (el.state) {
		Zapatec.Utils.removeClass(el, el.state);
	}
	state = el.className + (state.charAt(0).toUpperCase() + state.slice(1));
	Zapatec.Utils.addClass(el, state);
	el.state = state;
	return true;
};

/**
 * Shows specified button of the slider.
 * @param button {string} name of the button to be shown.
 */
Zapatec.Slider.prototype.showButton = function(button) {
	this.restorer.restoreProp(button + ".getContainer().parentNode.style.display");
};

/**
 * Hides specified button of the slider.
 * @param button {string} name of the button to be hidden.
 */
Zapatec.Slider.prototype.hideButton = function(button) {
	this.restorer.saveProp(button + ".getContainer().parentNode.style.display");
	this[button].getContainer().parentNode.style.display = "none";
};

/**
 * Calculates the amount of pixels that fit 1 in the range.
 * The result is saved to this.tmp.rangePiece property.
 */
Zapatec.Slider.prototype._calcRangePiece = function() {
	var config = this.getConfiguration();
	//calculating range piece
	this.tmp.rangePiece =  (config.range[1] - config.range[0]) / config.length;
};

/**
 * Reconfigurating the object due to the config options.
 * @param now [boolean] - execute now
 */
Zapatec.Slider.prototype.reconfig = function(now) {
	var self = this;
	if (!now && !this.fireOnState("ready", function() {self.reconfig();})) {
		return;
	}

	var config = this.getConfiguration();
	//Prepareing both sliders to move
	if (config.dual) {
		this.hideButton("btnLess");
		this.hideButton("btnMore");
		this.hideButton("btnFirst");
		this.hideButton("btnLast");
		this.restorer.restoreProp("secondSlider.style.display");
	} else {
		this.showButton("btnLess");
		this.showButton("btnMore");
		this.showButton("btnFirst");
		this.showButton("btnLast");
		this.restorer.saveProp("secondSlider.style.display");
		this.secondSlider.style.display = "none";
	}
	
	if (!this.firstSlider.dragObj) {
		this.firstSlider.dragObj = new Zapatec.Utils.Draggable(this.firstSlider, {
			moveLayer : this.scaleBg,
			eventListeners : {
				onDragInit : function() {
					self.setElementState(self.firstSlider, "active");
				},
				onDragMove : function() {
					// Reset saved position to force getPos calculate it
					self.pos1 = null;
					var pos = self.getPos();
					self.fireEvent("onChange", pos.first, pos.second);
				},
				onDragEnd : function(ev) {
					self.restrict();
					var x = ev.clientX + Zapatec.Utils.getPageScrollX() || 0;
					var y = ev.clientY + Zapatec.Utils.getPageScrollY() || 0;
					var sliderPos = Zapatec.Utils.getAbsolutePos(self.firstSlider);
					if (x < sliderPos.x || y < sliderPos.y ||
						x > sliderPos.x + self.firstSlider.offsetWidth ||
						y > sliderPos.y + self.firstSlider.offsetHeight) {
							self.setElementState(self.firstSlider, "inactive");
					}
					// Reset saved position to force getPos calculate it
					self.pos1 = null;
					var pos = self.getPos();
					self.fireEvent("newPosition", pos.first, pos.second);
				}
			},
			direction : (config.orientation == "V" ? "vertical" : "horizontal")
		});
	}
	if (!this.secondSlider.dragObj) {
		this.secondSlider.dragObj = new Zapatec.Utils.Draggable(this.secondSlider, {
			moveLayer : this.scaleBg,
			eventListeners : {
				onDragInit : function() {
					self.setElementState(self.secondSlider, "active");
				},
				onDragMove : function() {
					// Reset saved position to force getPos calculate it
					self.pos1 = null;
					var pos = self.getPos();
					self.fireEvent("onChange", pos.first, pos.second);
				},
				onDragEnd : function(ev) {
					self.restrict();
					var x = ev.clientX + Zapatec.Utils.getPageScrollX() || 0;
					var y = ev.clientY + Zapatec.Utils.getPageScrollY() || 0;
					var sliderPos = Zapatec.Utils.getAbsolutePos(self.secondSlider);
					if (x < sliderPos.x || y < sliderPos.y ||
						x > sliderPos.x + self.secondSlider.offsetWidth ||
						y > sliderPos.y + self.secondSlider.offsetHeight) {
							self.setElementState(self.secondSlider, "inactive");
					}
					// Reset saved position to force getPos calculate it
					self.pos1 = null;
					var pos = self.getPos();
					self.fireEvent("newPosition", pos.first, pos.second);
				}
			},
			direction : (config.orientation == "V" ? "vertical" : "horizontal")
		});
	}
	Zapatec.Utils.makeSafelyMovable(this.firstSlider, this.scaleBg, null);
	Zapatec.Utils.makeSafelyMovable(this.secondSlider, this.scaleBg, null);
	this.setScaleLength(config.length);
	this.setPos(config.start, config.secondStart);
};
