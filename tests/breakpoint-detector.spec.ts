import { describe, it, beforeEach, expect } from 'vitest';

import { BreakpointDetector } from '../src/main';

describe('BreakpointDetector', () => {
  let detector: BreakpointDetector;

  beforeEach(() => {
    detector = new BreakpointDetector();
  });

  describe('addBreakpoint', () => {
    it('should be able to add a new breakpoint', () => {
      const breakpointKey = 'myBreakpoint';

      let breakpoints = detector.getBreakPoints();

      expect(breakpoints[breakpointKey]).toEqual(undefined);

      detector.addBreakpoint(breakpointKey, { min: 1401, max: 1600 });

      breakpoints = detector.getBreakPoints();

      expect(breakpoints[breakpointKey]).toEqual({ min: 1401, max: 1600 });
    });
  });

  describe('removeBreakpoint', () => {
    it('should remove a breakpoint', () => {
      let breakpoints = detector.getBreakPoints();

      expect(breakpoints['xLarge']).not.toEqual(undefined);

      breakpoints = detector.removeBreakpoint('xLarge');

      expect(breakpoints['xLarge']).toEqual(undefined);
    });
  });

  describe('getBreakPoints', () => {
    it('should returns breakpoints', () => {
      const breakpoints = detector.getBreakPoints();

      expect(Object.keys(breakpoints).length).toEqual(6);
    });
  });

  describe('getCurrentBreakpoint', () => {
    it('should return the current breakpoint', () => {
      expect(detector.getCurrentBreakpoint()).toEqual('medium');
    });
  });
});
