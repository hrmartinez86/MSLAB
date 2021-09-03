// $Id: slider-core.js 7636 2007-07-31 20:05:51Z vkulov $
/**
 *
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 */

Zapatec.Slider = function(config) {
	//type of the widget - slider in our case :)
	this.widgetType = "slider";
	//array of priorities for states, in other words its the number which points the order
	// of states to be passed.
	this.priorities = {
		//the number of states supported
		count : 7,
		//states priorities
		destroyed : 0,
		created : 1,
		inited : 2,
		loaded : 3,
		ready : 5,
		hidden : 6,
		shown : 7
	};
	//this variable points the state of the widget in general.
	this.widgetState = "created";
	//object for temporary values
	this.tmp = {};
	this.setDefaultState();
	//for backward compability
	if (!config.eventListeners) {
		config.eventListeners = {};
	}
	if (config.onChange) {config.eventListeners.onChange = config.onChange;}
	if (config.newPosition) {config.eventListeners.newPosition = config.newPosition;}
	if (config.div) {config.parent = config.div;}
	config = Zapatec.Hash.remove(config, "div", "onChange", "newPosition");
	//calling super constructor
	Zapatec.Slider.SUPERconstructor.call(this, config);
	//creating SRProp object for manipulating with our object
	this.restorer = new Zapatec.SRProp(this);
	this.create();
};

Zapatec.Slider.id = "Zapatec.Slider";

//Inheriting Zapatec.Widget class
Zapatec.inherit(Zapatec.Slider, Zapatec.Widget);

Zapatec.Slider.prototype.init = function(config) {
	// processing Widget functionality
	Zapatec.Slider.SUPERclass.init.call(this, config);
	//setting state to inited
	this.changeState("inited");
	this.loadData({object : this, action : "loadTemplate"});
	
	return true;
};

/**
 * Sets the default configuration of the object and
 * inits it with user defined values.
 * @param config {object} configuration parameters.
 */
Zapatec.Slider.prototype.configure = function(config) {
	//orientation of the slider: "V"/"H"
	this.defineConfigOption("orientation", "H");
	//length of the sliders scale background
	this.defineConfigOption("length", 100);
	//Is it slider with two lewers
	this.defineConfigOption("dual", false);
	//parent element for the slider
	this.defineConfigOption("parent", document.body);
	//scale range
	this.defineConfigOption("range", null);
	//step :)
	this.defineConfigOption("step", 1);
	//position of the first slider
	this.defineConfigOption("start", null);
	//position of the second slider
	this.defineConfigOption("secondStart", null);
	//configuration for buttons
	this.defineConfigOption("buttonConfig", {});
	//we need the HTML part of our window to be loaded, so defining the source and sourceType
	this.defineConfigOption("template", Zapatec.sliderPath + this.config.orientation + ".html");
	// define default theme path
	this.defineConfigOption("themePath", Zapatec.sliderPath + "../themes/");
	//localization
	this.defineConfigOption("langId",Zapatec.Slider.id);
	//callback source function
	this.defineConfigOption("callbackSource", function(args) {
		//getting window object that requested the load
		var slider = args.object;
		//not a Zapatec.Slider - no load
		if (!slider || slider.widgetType != "slider") {
			return null;
		}
		switch (args.action) {
			//action is loading template
			case "loadTemplate" : {
				return {source : slider.getConfiguration().template + "?" + Math.random(), sourceType : "html/url"};
			}
		}
		return null;
	});
	// processing Widget functionality
	Zapatec.Slider.SUPERclass.configure.call(this, config);
	config = this.getConfiguration();
	//default for range is [0,length]
	if (!config.range) {
		config.range = [0, config.length];
	}
	//default for start is range[0]
	if (!config.start && config.start !== 0) {
		config.start = config.range[0];
	}
	//default for secondStart is range[1]
	if (!config.secondStart && config.secondStart !== 0) {
		config.secondStart = config.range[1];
	}
	//need to load proper template
	if (config.orientation != "H") {
		config.template = Zapatec.sliderPath + config.orientation + ".html";
	}
	//checking if button configuration object is proper
	if (!config.buttonConfig || typeof config.buttonConfig != "object") {
		config.buttonConfig = {};
	}
};

/**
 * Reconfigures the object with new parameters.
 * @param config {object} new configuration parameters.
 */
Zapatec.Slider.prototype.reconfigure = function(config) {
	// Call parent method
	Zapatec.Slider.SUPERclass.reconfigure.call(this, config);
};

/**
 * We overwrite the zpwidgets loadDataHtml method to parse 
 * needed values from given HTML source.
 * @param el [HTML element] - DOM representation of or HTML part.
 */
Zapatec.Slider.prototype.loadDataHtml = function(el) {
	//el is an DOM element created from the struct.html file, which contains HTML part of this widget.
	if (this.parseDom(el)) {
		this.changeState("loaded");
	}
};

/**
 * This function appends the loaded structure to the parent element,
 * sets all the parameters of the visual elements.
 * All its actions are closely connected with config options.
 */
Zapatec.Slider.prototype.create = function() {
	var self = this;
	if (!this.fireOnState("body_loaded", function() {this.create();}) || !this.fireOnState("loaded", function() {this.create();})) {
		return;
	}
	
	this.config.parent = Zapatec.Widget.getElementById(this.config.parent);
	if (!Zapatec.isHtmlElement(this.config.parent)) {
		alert(this.getMessage('createWrongParent'));
		return false
	}
	Zapatec.Utils.addClass(this.container, this.getClassName({prefix : "zpSlider", suffix : "Container"}));
	function replaceButton(but, idPrefix, func) {
		var config = Zapatec.Utils.clone(self.getConfiguration().buttonConfig);
		config.className = but.className + " " + but.className + "Inactive";
		config.style = but.style.cssText;
		config.theme = null;
		config.idPrefix = idPrefix;
		config.downAction = func;
		var button = new Zapatec.Button(config);
		var nxtSbl = but.nextSibling;
		var par = but.parentNode;
		par.removeChild(but);
		par.insertBefore(button.getContainer(), nxtSbl);
		return button;
	}
	this.btnLess = replaceButton(this.btnLess, "zpSlider" + self.id + "LessButton", function() {self.stepDown();});
	this.btnMore = replaceButton(this.btnMore, "zpSlider" + self.id + "MoreButton", function() {self.stepUp();});
	this.btnFirst = replaceButton(this.btnFirst, "zpSlider" + self.id + "FirstButton", function() {self.gotoFirst();});
	this.btnLast = replaceButton(this.btnLast, "zpSlider" + self.id + "LastButton", function() {self.gotoLast();});
	this.setElementState(this.firstSlider, "inactive");
	this.setElementState(this.secondSlider, "inactive");
	Zapatec.Utils.addEvent(this.scaleBg, "mousedown", function(ev) {
		if (!self.config.dual) {
			ev || (ev = window.event);
			var shift = null;
			var x = ev.layerX || ev.offsetX;
			var y = ev.layerY || ev.offsetY;
			if (self.config.orientation == "V") {
				shift = y - self.firstSlider.offsetHeight / 2;
			} else {
				shift = x - self.firstSlider.offsetWidth / 2;
			}
			if (shift < 0) shift = 0;
			if (shift > self.config.length) shift = self.config.length;
			shift = shift * ((self.config.range[1] - self.config.range[0]) / self.config.length);
			self.setPos(shift);
			var pos = self.getPos();
			self.fireEvent("newPosition", pos.first);
		}
	});
	Zapatec.Utils.addEvent(this.firstSlider, "mouseover", function(ev) {
		self.setElementState(self.firstSlider, "active");
		self.setElementState(self.secondSlider, "inactive");
	});
	Zapatec.Utils.addEvent(this.firstSlider, "mouseout", function(ev) {
		if (self.firstSlider.dragObj.dragging || self.secondSlider.dragObj.dragging) {
			return;
		}
		self.setElementState(self.firstSlider, "inactive");
	});
	Zapatec.Utils.addEvent(this.firstSlider, "mousemove", function(ev) {
		if (self.config.dual) {
			var pos1 = Zapatec.Utils.getPos(self.firstSlider, self.scaleBg);
			var pos2 = Zapatec.Utils.getPos(self.secondSlider, self.scaleBg);
			if (self.config.orientation == "V") {
				var diff = pos2.y - pos1.y;
				var size = self.firstSlider.offsetHeight;
				var mouse = ev.layerY || ev.offsetY
			} else {
				var diff = pos2.x - pos1.x;
				var size = self.firstSlider.offsetWidth;
				var mouse = ev.layerX || ev.offsetX
			}
			if (diff < size) {
				var whole = diff + size;
				if (mouse > whole / 2) {
					self.setElementState(self.firstSlider, "inactive");
					self.setElementState(self.secondSlider, "active");
				}
			}
		}
	});
	Zapatec.Utils.addEvent(this.secondSlider, "mouseover", function(ev) {
		self.setElementState(self.secondSlider, "active");
		self.setElementState(self.firstSlider, "inactive");
	});
	Zapatec.Utils.addEvent(this.secondSlider, "mouseout", function(ev) {
		if (self.firstSlider.dragObj.dragging || self.secondSlider.dragObj.dragging) {
			return;
		}
		self.setElementState(self.secondSlider, "inactive");
	});
	Zapatec.Utils.addEvent(this.secondSlider, "mousemove", function(ev) {
		if (self.config.dual) {
			var pos1 = Zapatec.Utils.getPos(self.firstSlider, self.scaleBg);
			var pos2 = Zapatec.Utils.getPos(self.secondSlider, self.scaleBg);
			if (self.config.orientation == "V") {
				var diff = pos2.y - pos1.y;
				var size = self.secondSlider.offsetHeight;
				var mouse = ev.layerY || ev.offsetY
			} else {
				var diff = pos2.x - pos1.x;
				var size = self.secondSlider.offsetWidth;
				var mouse = ev.layerX || ev.offsetX
			}
			if (diff < size) {
				var whole = size - diff;
				if (mouse < whole / 2) {
					self.setElementState(self.secondSlider, "inactive");
					self.setElementState(self.firstSlider, "active");
				}
			}
		}
	});
	this.config.parent.appendChild(this.container);
	this.reconfig(true);
	this.changeState("ready");
	
	return true;
};
