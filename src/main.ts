import { Breakpoint } from './models/breakpoint.model';
import { bs5BreakPoints } from './bs5-breakpoints';
import { BsBreakpointsEvents } from './const';

export class BreakpointDetector {
  private breakPoints: Record<string, Breakpoint> = { ...bs5BreakPoints };
  private currentBreakpoint = 'medium';

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    this.getBreakPoints();
    this.getCurrentBreakpoint();
    this.dispatchBreakpoint(BsBreakpointsEvents.INIT);

    window.addEventListener('resize', () => {
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
    const minSmall = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm'), 10);
    const minMedium = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md'), 10);
    const minLarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg'), 10);
    const minExtraLarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl'), 10);
    const minXxLarge = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xxl'), 10);

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
    const widthWindow = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const breakpointsKeys = Object.keys(this.breakPoints);
    const newCurrentBreakpoint = breakpointsKeys.find(
      (fKey: string) => widthWindow <= this.breakPoints[fKey].max && widthWindow >= this.breakPoints[fKey].min
    );

    if (!newCurrentBreakpoint) {
      return this.currentBreakpoint;
    }

    this.currentBreakpoint = newCurrentBreakpoint;

    return newCurrentBreakpoint;
  }

  private dispatchBreakpoint(eventName: BsBreakpointsEvents) {
    const event = new CustomEvent(eventName, {
      detail: {
        breakpoint: this.currentBreakpoint,
      },
    });

    window.dispatchEvent(event);
  }
}
