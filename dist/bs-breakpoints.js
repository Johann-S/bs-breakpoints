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
const k = (i) => i ? window : {
  document: {
    documentElement: {}
  },
  addEventListener: () => null,
  dispatchEvent: () => !0,
  getComputedStyle: () => ({
    getPropertyValue: () => ""
  })
};
class d {
  window;
  breakPoints = { ...m };
  currentBreakpoint = "medium";
  constructor() {
    this.window = k(typeof window < "u"), this.getBreakPoints(), this.getCurrentBreakpoint(), this.dispatchBreakpoint(s.INIT), this.window.addEventListener("resize", () => {
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
    ) || this.breakPoints.small.min, n = parseInt(
      this.window.getComputedStyle(t).getPropertyValue("--bs-breakpoint-md"),
      10
    ) || this.breakPoints.medium.min, r = parseInt(
      this.window.getComputedStyle(t).getPropertyValue("--bs-breakpoint-lg"),
      10
    ) || this.breakPoints.large.min, o = parseInt(
      this.window.getComputedStyle(t).getPropertyValue("--bs-breakpoint-xl"),
      10
    ) || this.breakPoints.xLarge.min, a = parseInt(
      this.window.getComputedStyle(t).getPropertyValue("--bs-breakpoint-xxl"),
      10
    ) || this.breakPoints.xxLarge.min;
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
  isGreaterThan(t) {
    if (!this.breakPoints[t])
      throw new Error(`unknown breakpoint: ${t}`);
    const e = this.getCurrentBreakpoint(), n = this.getSortedBreakpoints();
    return n.indexOf(e) > n.indexOf(t);
  }
  isLowerThan(t) {
    if (!this.breakPoints[t])
      throw new Error(`unknown breakpoint: ${t}`);
    const e = this.getCurrentBreakpoint(), n = this.getSortedBreakpoints();
    return n.indexOf(e) < n.indexOf(t);
  }
  dispatchBreakpoint(t) {
    const e = new CustomEvent(t, {
      detail: {
        breakpoint: this.currentBreakpoint
      }
    });
    this.window.dispatchEvent(e);
  }
  getSortedBreakpoints() {
    return Object.keys(this.breakPoints).sort(
      (t, e) => this.breakPoints[t].min - this.breakPoints[e].min
    );
  }
}
export {
  d as BreakpointDetector
};
