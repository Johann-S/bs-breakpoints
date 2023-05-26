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

let breakPointsDetected = false
let currentBreakpoint = null

const Events = {
  INIT: 'init.bs.breakpoint',
  NEW: 'new.bs.breakpoint'
}

const getJQuery = () => window.jQuery

const getBreakPoints = () => {
  let minSmall = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-sm'), 10)
  let minMedium = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md'), 10)
  let minLarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-lg'), 10)
  let minXlarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-xl'), 10)

  if (isNaN(minSmall) && isNaN(minMedium) && isNaN(minLarge) && isNaN(minXlarge)) { // Bootstrap 5 adds a prefix to the breakpoints
    minSmall = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm'), 10);
    minMedium = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md'), 10);
    minLarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg'), 10);
    minXlarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl'), 10);
  }

  // update xSmall
  breakPoints.xSmall.max = minSmall - 1

  // update small
  breakPoints.small.min = minSmall
  breakPoints.small.max = minMedium - 1

  // update medium
  breakPoints.medium.min = minMedium
  breakPoints.medium.max = minLarge - 1

  // update large
  breakPoints.large.min = minLarge
  breakPoints.large.max = minXlarge - 1

  // update XL
  breakPoints.xLarge.min = minXlarge

  breakPointsDetected = true
}

const _detectBreakPoint = () => {
  const widthWindow = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

  for (const key in breakPoints) {
    if (widthWindow <= breakPoints[key].max && widthWindow >= breakPoints[key].min) {
      return key
    }
  }

  return currentBreakpoint
}

const dispatchBreakpoint = (breakPointKey, eventName = Events.NEW) => {
  if (!currentBreakpoint || currentBreakpoint !== breakPointKey) {
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
    getBreakPoints()
    dispatchBreakpoint(_detectBreakPoint(), Events.INIT)

    window.addEventListener('resize', () => {
      dispatchBreakpoint(_detectBreakPoint())
    })
  },

  detectBreakpoint () {
    if (!breakPointsDetected) {
      getBreakPoints()
    }

    currentBreakpoint = _detectBreakPoint()
    return currentBreakpoint
  },

  getCurrentBreakpoint () {
    return currentBreakpoint
  }
}

export default bsBreakpoints
