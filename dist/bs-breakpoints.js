const m = {
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
    max: 1399
  },
  xxLarge: {
    min: 1400,
    max: 1 / 0
  }
};
var s = /* @__PURE__ */ ((i) => (i.INIT = "init.bs.breakpoint", i.NEW = "new.bs.breakpoint", i))(s || {});
const d = (i) => i ? window : {
  document: {
    documentElement: {}
  },
  addEventListener: () => null,
  dispatchEvent: () => !0,
  getComputedStyle: () => ({
    getPropertyValue: () => ""
  })
};
class p {
  window;
  breakPoints = { ...m };
  currentBreakpoint = "medium";
  constructor() {
    this.window = d(typeof window < "u"), this.getBreakPoints(), this.getCurrentBreakpoint(), this.dispatchBreakpoint(s.INIT), this.window.addEventListener("resize", () => {
      this.getCurrentBreakpoint(), this.dispatchBreakpoint(s.NEW);
    });
  }
  addBreakpoint(t, e) {
    return this.breakPoints[t] = e, this.breakPoints;
  }
  removeBreakpoint(t) {
    return delete this.breakPoints[t], this.breakPoints;
  }
  getBreakPoints() {
    const t = this.window.document.documentElement, e = parseInt(
      this.window.getComputedStyle(t).getPropertyValue("--bs-breakpoint-sm"),
      10
    ), n = parseInt(
      this.window.getComputedStyle(t).getPropertyValue("--bs-breakpoint-md"),
      10
    ), r = parseInt(
      this.window.getComputedStyle(t).getPropertyValue("--bs-breakpoint-lg"),
      10
    ), o = parseInt(
      this.window.getComputedStyle(t).getPropertyValue("--bs-breakpoint-xl"),
      10
    ), a = parseInt(
      this.window.getComputedStyle(t).getPropertyValue("--bs-breakpoint-xxl"),
      10
    );
    return this.breakPoints.xSmall.max = e - 1, this.breakPoints.small.min = e, this.breakPoints.small.max = n - 1, this.breakPoints.medium.min = n, this.breakPoints.medium.max = r - 1, this.breakPoints.large.min = r, this.breakPoints.large.max = o - 1, this.breakPoints.xLarge.min = o, this.breakPoints.xLarge.max = a - 1, this.breakPoints.xxLarge.min = a, this.breakPoints;
  }
  getCurrentBreakpoint() {
    const t = Math.max(
      this.window.document.documentElement.clientWidth,
      this.window.innerWidth || 0
    ), n = Object.keys(this.breakPoints).find(
      (r) => t <= this.breakPoints[r].max && t >= this.breakPoints[r].min
    );
    return n ? (this.currentBreakpoint = n, n) : this.currentBreakpoint;
  }
  dispatchBreakpoint(t) {
    const e = new CustomEvent(t, {
      detail: {
        breakpoint: this.currentBreakpoint
      }
    });
    this.window.dispatchEvent(e);
  }
}
export {
  p as BreakpointDetector
};
