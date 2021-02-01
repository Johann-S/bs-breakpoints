/*!
 * bsBreakpoints v1.1.1 (https://github.com/Johann-S/bs-breakpoints)
 * Copyright 2018 - 2021 Johann-S <johann.servoire@gmail.com>
 * Licensed under MIT (https://github.com/Johann-S/bs-breakpoints/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bsBreakpoints = factory());
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

  var getBreakpointsCssProps = function getBreakpointsCssProps() {
    return Array.from(document.styleSheets).filter(function (sheet) {
      return sheet.href === null || sheet.href.startsWith(window.location.origin);
    }).reduce(function (acc, sheet) {
      return acc = [].concat(acc, Array.from(sheet.cssRules).reduce(function (def, rule) {
        return def = rule.selectorText === ':root' ? [].concat(def, Array.from(rule.style).filter(function (name) {
          return name.startsWith('--breakpoint');
        })) : def;
      }, []));
    }, []);
  };

  var defaultBreakPoints = {
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
  var breakPoints = {}; // Backward compatibility: default breakpoints naming

  var nameMapping = {
    xs: 'xSmall',
    sm: 'small',
    md: 'medium',
    lg: 'large',
    xl: 'xLarge'
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

  var getPropsValue = function getPropsValue() {
    return getBreakpointsCssProps().map(function (prop) {
      return {
        name: prop.replace('--breakpoint-', ''),
        value: parseInt(window.getComputedStyle(document.documentElement).getPropertyValue(prop), 10)
      };
    });
  };

  var getBreakPoints = function getBreakPoints() {
    // get breakpoints from Bootstrap CSS variables
    var propsVal = getPropsValue();

    if (propsVal.length) {
      for (var bp in propsVal) {
        var key = nameMapping[propsVal[bp].name] ? nameMapping[propsVal[bp].name] : propsVal[bp].name;
        var nextItem = parseInt(bp) + 1;
        key in breakPoints || (breakPoints[key] = {}); // update Breakpoints

        breakPoints[key].min = propsVal[bp].value;
        breakPoints[key].max = propsVal[nextItem] ? propsVal[nextItem].value - 1 : Infinity;
      }
    } else {
      // If there are no css variables get the default breakpoints
      breakPoints = defaultBreakPoints;
    }

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
