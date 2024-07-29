const s = {
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
var a = /* @__PURE__ */ ((r) => (r.INIT = "init.bs.breakpoint", r.NEW = "new.bs.breakpoint", r))(a || {});
class m {
  breakPoints = { ...s };
  currentBreakpoint = "medium";
  constructor() {
    typeof window > "u" || (this.getBreakPoints(), this.getCurrentBreakpoint(), this.dispatchBreakpoint(a.INIT), window.addEventListener("resize", () => {
      this.getCurrentBreakpoint(), this.dispatchBreakpoint(a.NEW);
    }));
  }
  addBreakpoint(t, e) {
    return this.breakPoints[t] = e, this.breakPoints;
  }
  removeBreakpoint(t) {
    return delete this.breakPoints[t], this.breakPoints;
  }
  getBreakPoints() {
    const t = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--bs-breakpoint-sm"), 10), e = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--bs-breakpoint-md"), 10), n = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--bs-breakpoint-lg"), 10), i = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--bs-breakpoint-xl"), 10), o = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--bs-breakpoint-xxl"), 10);
    return this.breakPoints.xSmall.max = t - 1, this.breakPoints.small.min = t, this.breakPoints.small.max = e - 1, this.breakPoints.medium.min = e, this.breakPoints.medium.max = n - 1, this.breakPoints.large.min = n, this.breakPoints.large.max = i - 1, this.breakPoints.xLarge.min = i, this.breakPoints.xLarge.max = o - 1, this.breakPoints.xxLarge.min = o, this.breakPoints;
  }
  getCurrentBreakpoint() {
    const t = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), n = Object.keys(this.breakPoints).find(
      (i) => t <= this.breakPoints[i].max && t >= this.breakPoints[i].min
    );
    return n ? (this.currentBreakpoint = n, n) : this.currentBreakpoint;
  }
  dispatchBreakpoint(t) {
    const e = new CustomEvent(t, {
      detail: {
        breakpoint: this.currentBreakpoint
      }
    });
    window.dispatchEvent(e);
  }
}
export {
  m as BreakpointDetector
};
