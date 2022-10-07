// $Id: slider-controlling.js 7354 2007-06-05 22:31:29Z alex $
/**
 *
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 */

/**
 * Sets default state values of the widget.
 */
Zapatec.Slider.prototype.setDefaultState = function() {
	
};

/**
 * Sets the length of the slider's scale background.
 * @param length [number] - number to set as a length of the scale
 * @return - true if success, otherwise false;
 */
Zapatec.Slider.prototype.setScaleLength = function(length) {
	var rescale = false, pos = null;
	if (!this.fireOnState("ready", function() {this.setScaleLength(length);})) {return;}
	//is this first time
	rescale = Boolean(typeof this.tmp.rangePiece == "undefined");
	//setting the length of the scale
	if (this.config.orientation == "V") {
		Zapatec.Utils.setHeight(this.scaleBg, length + Zapatec.Utils.getHeight(this.firstSlider));
	} else {
		Zapatec.Utils.setWidth(this.scaleBg, length + Zapatec.Utils.getWidth(this.firstSlider));
	}
	//calculating range piece
	this.config.length = length;
	this._calcRangePiece();
	//if this is not the first time we set the length we need to 
	//let the programmer know about it as this changes the actual
	//value of sliders
	if (rescale) {
		pos = this.getPos();
		this.fireEvent("onChange", pos.first, pos.second);
	}
};

/**
 * Sets the range of the slider.
 * @param iRangeLeft [number] - left border of the range
 * @param iRangeRight [number] - right border of the range
 */
Zapatec.Slider.prototype.setRange = function(iRangeLeft, iRangeRight) {
	var pos = null;
	if (!this.fireOnState("ready", function() {this.setRange(iRangeLeft, iRangeRight);})) {return;}
	if (this.config.range[0] != iRangeLeft || this.config.range[1] != iRangeRight) {
		pos = this.getPos();
		this.config.range = [iRangeLeft, iRangeRight];
		this._calcRangePiece();
		if (pos.first < iRangeLeft) {
			pos.first = iRangeLeft;
		}
		if (pos.second > iRangeRight) {
			pos.second = iRangeRight;
		}
		this.setPos(pos.first, pos.second);
	}	
};

/**
 * Sets both slider to exact positions from range.
 * @param first [number] - position of the first slider
 * @param second [number] - position of the second slider
 * @return - true if success, otherwise false;
 */
Zapatec.Slider.prototype.setPos = function(first, second) {
	var realSecond = realFirst = 0, x1 = x2 = y1 = y2 = 0;
	if (!this.fireOnState("ready", function() {this.setPos(first, second);})) {return;}
	if (!this.config.dual) {
		second = null;
	}
	//first can not be bigger than second
	if ((second || second === 0) && first > second) {return false;}
	//first should fit the ranges
	if (first > this.config.range[1] || first < this.config.range[0]) {return false;}
	//second should fit the ranges
	if (second && (second > this.config.range[1] || (second < this.config.range[0]))) {return false;}
	// Save position because it can't be calculated precisely enough when range
	// is greater than length
	this.pos1 = first;
	this.pos2 = second;
	realFirst = Math.round((first - this.config.range[0]) * (this.config.length / (this.config.range[1] - this.config.range[0])));
	if (second || second === 0) {
		realSecond = Math.round((second - this.config.range[0]) * (this.config.length / (this.config.range[1] - this.config.range[0])));
		//second can not take the first position on the scale as it is must stay for first
		if (realSecond === 0) {
			return false;
		}
		//We can not go out of slider's length :)
		if (realSecond > this.config.length) {
			if (realSecond - this.config.length < 1) {
				realSecond = this.config.length;
			} else {
				return false;
			}
		}
		//"rounded" calculations may give wrong results so let's correct them
		if (realFirst > realSecond) {
			realFirst = realSecond - 1;
		}
		//this is definately an error!
		if (realFirst == realSecond) {
			return false;
		}
	}
	//fist slider should fit the slider's scale
	if (realFirst < 0 || realFirst > this.config.length) {return false;}
	//assigning needed coordinations depending on slider's orientation
	if (this.config.orientation == "V") {
		y1 = realFirst;	y2 = realSecond;
	} else {
		x1 = realFirst;	x2 = realSecond;
	}
	//moving sliders to needed positions
	if (!Zapatec.Utils.moveTo(this.firstSlider, x1, y1)) {return false;}
	if (second || second === 0) {
		if (!Zapatec.Utils.moveTo(this.secondSlider, x2, y2)) {return false;}
	}
	//restricting their movement
	//was taken out as a method as it is used for DnD dragEnd handler
	this.restrict();
	this.fireEvent("onChange", first, second);
	
	return true;
};

/**
 * Get the position of the slider in its range
 * @return two values as 'first' and 'second' properties of an object
 */
Zapatec.Slider.prototype.getSliderPos = function() {
	var pos1 = Zapatec.Utils.getPos(this.firstSlider);
	var pos2 = Zapatec.Utils.getPos(this.secondSlider);
	var res = {};
	if (this.config.orientation == "V") {
		pos1 = pos1.y;
		pos2 = pos2.y;
	} else {
		pos1 = pos1.x;
		pos2 = pos2.x;
	}
	res.first = pos1 * this.tmp.rangePiece;
	if (this.config.dual) {
		res.second = pos2 * this.tmp.rangePiece;
	} else {
		res.second = null;
	}
	
	return res;
};

/**
 * Moves the slider for one step forward.
 * @return - true if success, otherwise false;
 * @type boolean
 */
Zapatec.Slider.prototype.stepUp = function() {
	//this is only appliable to single slider
	if (this.config.dual) {
		return false;
	}
	if (!this.fireOnState("ready", function() {this.stepUp();})) {return;}
	var res = this.getPos();
	this.setPos(res.first + this.config.step);
	var pos = this.getPos();
	if (pos.first != res.first) {
		this.fireEvent("newPosition", pos.first);
	}
};

/**
 * Moves the slider for one step backward.
 * @return - true if success, otherwise false;
 * @type boolean
 */
Zapatec.Slider.prototype.stepDown = function() {
	//this is only appliable to single slider
	if (this.config.dual) {
		return false;
	}
	if (!this.fireOnState("ready", function() {this.stepDown();})) {return;}
	var res = this.getPos();
	this.setPos(res.first - this.config.step);
	var pos = this.getPos();
	if (pos.first != res.first) {
		this.fireEvent("newPosition", pos.first);
	}
};

/**
 * Moves the slider to the first position.
 * @return - true if success, otherwise false;
 * @type boolean
 */
Zapatec.Slider.prototype.gotoFirst = function() {
	//this is only appliable to single slider
	if (this.config.dual) {
		return false;
	}
	if (!this.fireOnState("ready", function() {this.gotoFirst();})) {return;}
	var res = this.getPos();
	this.setPos(this.config.range[0]);
	var pos = this.getPos();
	if (pos.first != res.first) {
		this.fireEvent("newPosition", pos.first);
	}
};

/**
 * Moves the slider to the last position.
 * @return - true if success, otherwise false;
 * @type boolean
 */
Zapatec.Slider.prototype.gotoLast = function() {
	//this is only appliable to single slider
	if (this.config.dual) {
		return false;
	}
	if (!this.fireOnState("ready", function() {this.gotoLast();})) {return;}
	var res = this.getPos();
	this.setPos(this.config.range[1]);
	var pos = this.getPos();
	if (pos.first != res.first) {
		this.fireEvent("newPosition", pos.first);
	}
};

/**
 * Gets the positions due to step config property
 * @return two values as 'first' and 'second' properties of an object
 */
Zapatec.Slider.prototype.getPos = function() {
	// Use saved position
	if (typeof this.pos1 == 'number') {
		return {
			first: this.pos1,
			second: this.pos2
		};
	}
	// Calculate position only if it wasn't saved yet
	var res = this.getSliderPos();
	res.first = Math.round(res.first / this.config.step) * this.config.step;
	if (res.second) {
		res.second = Math.round(res.second / this.config.step) * this.config.step;
	}
	res.first += this.config.range[0];
	res.second += this.config.range[0];
	
	return res;
};
 
/** 
 * Sets the restrictions for the Draggable sliders
 */
Zapatec.Slider.prototype.restrict = function() {
	if (this.config.dual) {
		if (this.firstSlider.dragObj && this.secondSlider.dragObj) {
			if (this.config.orientation == "V") {
				this.firstSlider.dragObj.reconfigure({limit : {
					minY : 0,
					maxY : Zapatec.Utils.getPos(this.secondSlider).y - 1
				}});
				this.secondSlider.dragObj.reconfigure({limit : {
					minY : Zapatec.Utils.getPos(this.firstSlider).y + 1,
					maxY : this.config.length
				}});
			} else {
				this.firstSlider.dragObj.reconfigure({limit : {
					minX : 0,
					maxX : Zapatec.Utils.getPos(this.secondSlider).x - 1
				}});
				this.secondSlider.dragObj.reconfigure({limit : {
					minX : Zapatec.Utils.getPos(this.firstSlider).x + 1,
					maxX : this.config.length
				}});
			}
		} else {return false;}
	} else {
		if (this.firstSlider.dragObj) {
			if (this.config.orientation == "V") {
				this.firstSlider.dragObj.reconfigure({limit : {
					minY : 0,
					maxY : this.config.length
				}});
			} else {
				this.firstSlider.dragObj.reconfigure({limit : {
					minX : 0,
					maxX : this.config.length
				}});
			}
		} else {return false;}
	}
	
	return true;
};

/**
 * Sets new range for the slider and puts sliders to its
 * "border" values.
 * @param min [number] - minimal border of the range. 
 * @param max [number] - maximum border of the range. 
 */
Zapatec.Slider.prototype.reset = function(min, max) {
	this.setRange(min, max);
	this.setPos(min, max);
};
