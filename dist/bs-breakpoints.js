/*!
 * bsBreakpoints v1.0.0 (https://github.com/Johann-S/bs-breakpoints)
 * Copyright 2018 Johann-S <johann.servoire@gmail.com>
 * Licensed under MIT (https://github.com/Johann-S/bs-breakpoints/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.bsBreakpoints = factory());
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
  var currentBreakpoint = null;
  var Events = {
    INIT: 'init.bs.breakpoint',
    NEW: 'new.bs.breakpoint'
  };

  var getJQuery = function getJQuery() {
    return window.$ || window.jQuery;
  };

  var detectBreakPoint = function detectBreakPoint() {
    var widthWindow = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    for (var key in breakPoints) {
      if (widthWindow < breakPoints[key].max && widthWindow >= breakPoints[key].min) {
        return key;
      }
    }

    return currentBreakpoint;
  };

  var dispatchBreakpoint = function dispatchBreakpoint(breakPointKey, eventName) {
    if (eventName === void 0) {
      eventName = Events.NEW;
    }

    if (currentBreakpoint === null || currentBreakpoint !== breakPointKey) {
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
      dispatchBreakpoint(detectBreakPoint(), Events.INIT);
      window.addEventListener('resize', function () {
        dispatchBreakpoint(detectBreakPoint());
      });
    },
    getCurrentBreakPoint: function getCurrentBreakPoint() {
      return currentBreakpoint;
    }
  };

  return bsBreakpoints;

})));
//# sourceMappingURL=bs-breakpoints.js.map
