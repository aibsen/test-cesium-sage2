//
// SAGE2 application: testcesium
// by: amanda ibsen <amanda.ibsen@inria.cl>
//
// Copyright (c) 2015
//

"use strict";

/* global  */
function addCSS(url, callback) {
	var fileref = document.createElement("link");

	if (callback) {
		fileref.onload = callback;
	}

	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", url);
	document.head.appendChild(fileref);
}

function addScript(url, callback) {
	var script = document.createElement('script');
	if (callback) {
		script.onload = callback;
	}
	script.type = 'text/javascript';
	script.src  = url;
	document.body.appendChild(script);
}


var testcesium = SAGE2_App.extend({
	init: function(data) {
		// Create div into the DOM
		this.SAGE2Init("div", data);
		// Set the DOM id
		this.element.id = "div_" + data.id;

		var cesiumDiv = document.createElement("div");
		cesiumDiv.id = 'cesiumContainer';

		addScript(this.resrcPathPath + "node_modules/cesium/Build/Cesium/Cesium.js");
		addCSS(this.resrcPath + "node_modules/cesium/Build/Cesium/Widgets/widgets.css", function(){

			var viewer = new Cesium.Viewer(cesiumDiv.id);

		});
		this.element.appendChild(cesiumDiv);

		// move and resize callbacks
		this.resizeEvents = "continuous"; // onfinish
		// this.moveEvents   = "continuous";

		// SAGE2 Application Settings
		//
		// Control the frame rate for an animation application
		this.maxFPS = 2.0;
		// Not adding controls but making the default buttons available
		this.controls.finishedAddingControls();
		this.enableControls = true;
	},

	load: function(date) {
		console.log('testcesium> Load with state value', this.state.value);
		this.refresh(date);
	},

	draw: function(date) {
		console.log('testcesium> Draw with state value', this.state.value);
	},

	resize: function(date) {
		// Called when window is resized
		this.refresh(date);
	},

	move: function(date) {
		// Called when window is moved (set moveEvents to continuous)
		this.refresh(date);
	},

	quit: function() {
		// Make sure to delete stuff (timers, ...)
	},

	event: function(eventType, position, user_id, data, date) {
		if (eventType === "pointerPress" && (data.button === "left")) {
			// click
		} else if (eventType === "pointerMove" && this.dragging) {
			// move
		} else if (eventType === "pointerRelease" && (data.button === "left")) {
			// click release
		} else if (eventType === "pointerScroll") {
			// Scroll events for zoom
		} else if (eventType === "widgetEvent") {
			// widget events
		} else if (eventType === "keyboard") {
			if (data.character === "m") {
				this.refresh(date);
			}
		} else if (eventType === "specialKey") {
			if (data.code === 37 && data.state === "down") {
				// left
				this.refresh(date);
			} else if (data.code === 38 && data.state === "down") {
				// up
				this.refresh(date);
			} else if (data.code === 39 && data.state === "down") {
				// right
				this.refresh(date);
			} else if (data.code === 40 && data.state === "down") {
				// down
				this.refresh(date);
			}
		}
	}
});
