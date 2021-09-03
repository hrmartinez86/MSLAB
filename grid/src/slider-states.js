// $Id: slider-states.js 6651 2007-03-19 10:15:22Z slip $
/**
 *
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 */

/**
 * Checks if needed state was reached and tryes to fire function exactly when it needs.
 * @param state [string] - required state;
 * @param func [function] - function needed to be fired
 * @param first [boolean] - should the handler be called first
 * @return true if the state was already reached
 */
Zapatec.Slider.prototype.fireOnState = function(state, func, first) {
	var self = this;
	if (state == "body_loaded") {
		if (!this.stateReached("created")) {
			return false;
		}
		if (!Zapatec.windowLoaded) {
			setTimeout(function() {func.call(self);}, 50);
			return false;
		}
		
		return true;
	}
	if (!this.stateReached(state)) {
		if (!this.stateReached("created")) {
			return false;
		}
		
		this.addEventListener(state, func, first);
		
		return false;
	} else {
		return true;
	}
};

/**
 * Changes the state of the widget, firing all the events planned
 * @param state [string] - state to set.
 * @return true if succeeds, otherwise false
 */
Zapatec.Slider.prototype.changeState = function(state) {
	this.widgetState = state;
	this.fireEvent(state);
	return true;
};

/**
 * This method tells you wether the state you need was reached or maybe already passed.
 * Right now we have following states:
 * 'shown' - object is visible;
 * @param state [string] - the name of the state you need to check;
 * @return - true if the state was reached or already passed, otherwise false
 */
Zapatec.Slider.prototype.stateReached = function(state) {
	//getting current state priority.
	//if there is no such in our priority array we give it the highest priority, 
	//which means count of states avaliable in the array.
	var currentState = this.priorities[this.widgetState] || (this.priorities[this.widgetState] !== 0 ? this.priorities.count : 0);
	//getting passed state priority.
	//if there is no such in our priority array we give it the highest priority, 
	//which means count of states avaliable in the array.
	state = this.priorities[state] || (this.priorities[state] !== 0 ? this.priorities.count : 0);
	//and now compareing them
	if (state > currentState) {return false;}
	return true;
};
