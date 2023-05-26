/*!
 * bsBreakpoints v1.1.1 (https://github.com/Johann-S/bs-breakpoints)
 * Copyright 2018 - 2023 Johann-S <johann.servoire@gmail.com>
 * Licensed under MIT (https://github.com/Johann-S/bs-breakpoints/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.bsBreakpoints = factory());
}(this, (function () { 'use strict';

  (function () {
    // Add polyfill for Custom Events
    function CustomEvent(ev, params) {
      var evt = document.createEvent('CustomEvent');
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      evt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    if (typeof window.CustomEvent !== 'function') {
      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent;
    }
  })();

  var breakPoints = {
    xSmall: {
      min: 0,
      max: 575
    },
    small: {
      min: 576,
      max: 767
    },
    medium: {
      min: 768,
      max: 991
    },
    large: {
      min: 992,
      max: 1199
    },
    xLarge: {
      min: 1200,
      max: Infinity
    }
  };
  var breakPointsDetected = false;
  var currentBreakpoint = null;
  var Events = {
    INIT: 'init.bs.breakpoint',
    NEW: 'new.bs.breakpoint'
  };

  var getJQuery = function getJQuery() {
    return window.jQuery;
  };

  var getBreakPoints = function getBreakPoints() {
    var minSmall = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-sm'), 10);
    var minMedium = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md'), 10);
    var minLarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-lg'), 10);
    var minXlarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-xl'), 10);

    if (isNaN(minSmall) && isNaN(minMedium) && isNaN(minLarge) && isNaN(minXlarge)) {
      // Bootstrap 5 adds a prefix to the breakpoints
      minSmall = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm'), 10);
      minMedium = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md'), 10);
      minLarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg'), 10);
      minXlarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl'), 10);
    } // update xSmall


    breakPoints.xSmall.max = minSmall - 1; // update small

    breakPoints.small.min = minSmall;
    breakPoints.small.max = minMedium - 1; // update medium

    breakPoints.medium.min = minMedium;
    breakPoints.medium.max = minLarge - 1; // update large

    breakPoints.large.min = minLarge;
    breakPoints.large.max = minXlarge - 1; // update XL

    breakPoints.xLarge.min = minXlarge;
    breakPointsDetected = true;
  };

  var _detectBreakPoint = function _detectBreakPoint() {
    var widthWindow = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    for (var key in breakPoints) {
      if (widthWindow <= breakPoints[key].max && widthWindow >= breakPoints[key].min) {
        return key;
      }
    }

    return currentBreakpoint;
  };

  var dispatchBreakpoint = function dispatchBreakpoint(breakPointKey, eventName) {
    if (eventName === void 0) {
      eventName = Events.NEW;
    }

    if (!currentBreakpoint || currentBreakpoint !== breakPointKey) {
      currentBreakpoint = breakPointKey;
      var $ = getJQuery();

      if ($) {
        var $event = $.Event(eventName, {
          breakpoint: breakPointKey
        });
        $(window).trigger($event);
      } else {
        var event = new window.CustomEvent(eventName, {
          detail: breakPointKey
        });
        window.dispatchEvent(event);
      }
    }
  };

  var bsBreakpoints = {
    init: function init() {
      getBreakPoints();
      dispatchBreakpoint(_detectBreakPoint(), Events.INIT);
      window.addEventListener('resize', function () {
        dispatchBreakpoint(_detectBreakPoint());
      });
    },
    detectBreakpoint: function detectBreakpoint() {
      if (!breakPointsDetected) {
        getBreakPoints();
      }

      currentBreakpoint = _detectBreakPoint();
      return currentBreakpoint;
    },
    getCurrentBreakpoint: function getCurrentBreakpoint() {
      return currentBreakpoint;
    }
  };

  return bsBreakpoints;

})));
//# sourceMappingURL=bs-breakpoints.js.map
