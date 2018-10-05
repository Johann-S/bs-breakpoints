import './polyfill'

const breakPoints = {
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
}

let currentBreakpoint = null

const Events = {
  INIT: 'init.bs.breakpoint',
  NEW: 'new.bs.breakpoint'
}

const getJQuery = () => window.$ || window.jQuery

const detectBreakPoint = () => {
  const widthWindow = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

  for (const key in breakPoints) {
    if (widthWindow < breakPoints[key].max && widthWindow >= breakPoints[key].min) {
      return key
    }
  }

  return currentBreakpoint
}

const dispatchBreakpoint = (breakPointKey, eventName = Events.NEW) => {
  if (currentBreakpoint === null || currentBreakpoint !== breakPointKey) {
    currentBreakpoint = breakPointKey
    const $ = getJQuery()

    if ($) {
      const $event = $.Event(eventName, {
        breakpoint: breakPointKey
      })

      $(window).trigger($event)
    } else {
      const event = new window.CustomEvent(eventName, {
        detail: breakPointKey
      })

      window.dispatchEvent(event)
    }
  }
}

const bsBreakpoints = {
  init () {
    dispatchBreakpoint(detectBreakPoint(), Events.INIT)

    window.addEventListener('resize', () => {
      dispatchBreakpoint(detectBreakPoint())
    })
  },

  getCurrentBreakPoint () {
    return currentBreakpoint
  }
}

export default bsBreakpoints
