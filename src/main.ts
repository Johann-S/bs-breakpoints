import { Breakpoint } from './models/breakpoint.model';
import { bs5BreakPoints } from './bs5-breakpoints';
import { BsBreakpointsEvents } from './const';
import { getWindow } from './util';

export class BreakpointDetector {
  private readonly window: Window;
  private breakPoints: Record<string, Breakpoint> = { ...bs5BreakPoints };
  private currentBreakpoint = 'medium';

  constructor() {
    this.window = getWindow(typeof window !== 'undefined');
    this.getBreakPoints();
    this.getCurrentBreakpoint();
    this.dispatchBreakpoint(BsBreakpointsEvents.INIT);

    this.window.addEventListener('resize', () => {
      this.getCurrentBreakpoint();
      this.dispatchBreakpoint(BsBreakpointsEvents.NEW);
    });
  }

  addBreakpoint(name: string, breakpoint: Breakpoint) {
    this.breakPoints[name] = breakpoint;

    return this.breakPoints;
  }

  removeBreakpoint(name: string) {
    delete this.breakPoints[name];

    return this.breakPoints;
  }

  getBreakPoints() {
    const domDocument = this.window.document.documentElement;

    const minSmall = parseInt(
      this.window.getComputedStyle(domDocument).getPropertyValue('--bs-breakpoint-sm'),
      10,
    ) || this.breakPoints.small.min;
    const minMedium = parseInt(
      this.window.getComputedStyle(domDocument).getPropertyValue('--bs-breakpoint-md'),
      10,
    ) || this.breakPoints.medium.min;
    const minLarge = parseInt(
      this.window.getComputedStyle(domDocument).getPropertyValue('--bs-breakpoint-lg'),
      10,
    ) || this.breakPoints.large.min;
    const minExtraLarge = parseInt(
      this.window.getComputedStyle(domDocument).getPropertyValue('--bs-breakpoint-xl'),
      10,
    ) || this.breakPoints.xLarge.min;
    const minXxLarge = parseInt(
      this.window.getComputedStyle(domDocument).getPropertyValue('--bs-breakpoint-xxl'),
      10,
    ) || this.breakPoints.xxLarge.min;;

    // update xSmall
    this.breakPoints.xSmall.max = minSmall - 1;

    // update small
    this.breakPoints.small.min = minSmall;
    this.breakPoints.small.max = minMedium - 1;

    // update medium
    this.breakPoints.medium.min = minMedium;
    this.breakPoints.medium.max = minLarge - 1;

    // update large
    this.breakPoints.large.min = minLarge;
    this.breakPoints.large.max = minExtraLarge - 1;

    // update XL
    this.breakPoints.xLarge.min = minExtraLarge;
    this.breakPoints.xLarge.max = minXxLarge - 1;

    // update XXL
    this.breakPoints.xxLarge.min = minXxLarge;

    return this.breakPoints;
  }

  getCurrentBreakpoint(): string {
    const widthWindow = Math.max(
      this.window.document.documentElement.clientWidth,
      this.window.innerWidth || 0
    );
    const breakpointsKeys = Object.keys(this.breakPoints);
    const newCurrentBreakpoint = breakpointsKeys.find(
      (fKey: string) => widthWindow <= this.breakPoints[fKey].max
        && widthWindow >= this.breakPoints[fKey].min
    );

    if (!newCurrentBreakpoint) {
      return this.currentBreakpoint;
    }

    this.currentBreakpoint = newCurrentBreakpoint;

    return newCurrentBreakpoint;
  }

  isGreaterThan(breakpointKey: string): boolean {
    if (!this.breakPoints[breakpointKey]) {
      throw new Error(`unknown breakpoint: ${breakpointKey}`);
    }

    const currentBreakpointKey = this.getCurrentBreakpoint();
    const breakpointsOrder = this.getSortedBreakpoints();

    return breakpointsOrder.indexOf(currentBreakpointKey) > breakpointsOrder.indexOf(breakpointKey);
  }

  isLowerThan(breakpointKey: string): boolean {
    if (!this.breakPoints[breakpointKey]) {
      throw new Error(`unknown breakpoint: ${breakpointKey}`);
    }

    const currentBreakpointKey = this.getCurrentBreakpoint();
    const breakpointsOrder = this.getSortedBreakpoints();

    return breakpointsOrder.indexOf(currentBreakpointKey) < breakpointsOrder.indexOf(breakpointKey);
  }

  private dispatchBreakpoint(eventName: BsBreakpointsEvents) {
    const event = new CustomEvent(eventName, {
      detail: {
        breakpoint: this.currentBreakpoint,
      },
    });

    this.window.dispatchEvent(event);
  }

  private getSortedBreakpoints() {
    return Object
      .keys(this.breakPoints)
      .sort(
        (bpKey1: string, bpKey2: string) =>
          this.breakPoints[bpKey1].min - this.breakPoints[bpKey2].min
      );
  }
}
