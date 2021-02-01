import './polyfill'
import { getBreakpointsCssProps } from './utility'

const defaultBreakPoints = {
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

let breakPoints = {}

// Backward compatibility: default breakpoints naming
const nameMapping = {
  xs: 'xSmall',
  sm: 'small',
  md: 'medium',
  lg: 'large',
  xl: 'xLarge'
}

let breakPointsDetected = false
let currentBreakpoint = null

const Events = {
  INIT: 'init.bs.breakpoint',
  NEW: 'new.bs.breakpoint'
}

const getJQuery = () => window.jQuery

const getPropsValue = () => {
  return getBreakpointsCssProps().map((prop) => {
    return {
      name: prop.replace('--breakpoint-', ''),
      value: parseInt(
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue(prop),
        10
      )
    }
  })
}

const getBreakPoints = () => {
  // get breakpoints from Bootstrap CSS variables
  const propsVal = getPropsValue()

  if (propsVal.length) {
    for (const bp in propsVal) {
      const key = nameMapping[propsVal[bp].name]
        ? nameMapping[propsVal[bp].name]
        : propsVal[bp].name
      const nextItem = parseInt(bp) + 1
      key in breakPoints || (breakPoints[key] = {})
      // update Breakpoints
      breakPoints[key].min = propsVal[bp].value
      breakPoints[key].max = propsVal[nextItem]
        ? propsVal[nextItem].value - 1
        : Infinity
    }
  } else {
    // If there are no css variables get the default breakpoints
    breakPoints = defaultBreakPoints
  }

  breakPointsDetected = true
}

const _detectBreakPoint = () => {
  const widthWindow = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )

  for (const key in breakPoints) {
    if (
      widthWindow <= breakPoints[key].max &&
      widthWindow >= breakPoints[key].min
    ) {
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
