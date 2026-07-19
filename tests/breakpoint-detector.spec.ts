import { describe, it, beforeEach, expect, vi } from 'vitest';

import { BreakpointDetector } from '../src/main';
import { BsBreakpointsEvents } from '../src/const';

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
      expect(detector.getCurrentBreakpoint()).toEqual('large');
    });
  });

  describe('isGreaterThan', () => {
    it('should say current breakpoint is greater', () => {
      expect(detector.isGreaterThan('small')).toEqual(true);
    });

    it('should say current breakpoint is greater with a custom breakpoint added', () => {
      detector.addBreakpoint('xSmall', { min: 300, max: 575 });
      detector.addBreakpoint('xxSmall', { min: 0, max: 299 });

      vi.spyOn(detector, 'getCurrentBreakpoint').mockImplementation(() => 'xSmall');

      expect(detector.isGreaterThan('xxSmall')).toEqual(true);
    });

    it('should throw error on unknown breakpoint', () => {
      const fakeBreakpoint = 'Eiffel tower';

      expect(() => {
        detector.isGreaterThan(fakeBreakpoint);
      }).toThrowError(`unknown breakpoint: ${fakeBreakpoint}`);
    });

    it('should say current breakpoint is not greater', () => {
      expect(detector.isGreaterThan('xxLarge')).toEqual(false);
    });
  });

  describe('isLowerThan', () => {
    it('should say current breakpoint is lower', () => {
      expect(detector.isLowerThan('xLarge')).toEqual(true);
    });

    it('should say current breakpoint is lower with a custom breakpoint added', () => {
      detector.addBreakpoint('xSmall', { min: 300, max: 575 });
      detector.addBreakpoint('xxSmall', { min: 0, max: 299 });

      vi.spyOn(detector, 'getCurrentBreakpoint').mockImplementation(() => 'xSmall');

      expect(detector.isLowerThan('small')).toEqual(true);
    });

    it('should throw error on unknown breakpoint', () => {
      const fakeBreakpoint = 'Eiffel tower';

      expect(() => {
        detector.isLowerThan(fakeBreakpoint);
      }).toThrowError(`unknown breakpoint: ${fakeBreakpoint}`);
    });

    it('should say current breakpoint is not lower', () => {
      expect(detector.isLowerThan('small')).toEqual(false);
    });
  });
});

describe('BreakpointDetector resize events', () => {
  it('emits a new-breakpoint event only when the breakpoint changes', () => {
    const initialWidth = window.innerWidth;
    let resizeListener: EventListener | undefined;
    const addEventListener = window.addEventListener.bind(window);
    const addEventListenerSpy = vi
      .spyOn(window, 'addEventListener')
      .mockImplementation((type, listener, options) => {
        if (type === 'resize') {
          resizeListener = listener as EventListener;
          return;
        }

        addEventListener(type, listener, options);
      });
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');

    try {
      new BreakpointDetector();
      expect(resizeListener).toBeDefined();

      dispatchEventSpy.mockClear();
      resizeListener!(new Event('resize'));
      expect(
        dispatchEventSpy.mock.calls.filter(([event]) => event.type === BsBreakpointsEvents.NEW),
      ).toHaveLength(0);

      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 500,
      });
      resizeListener!(new Event('resize'));
      resizeListener!(new Event('resize'));

      const breakpointEvents = dispatchEventSpy.mock.calls
        .map(([event]) => event)
        .filter((event) => event.type === BsBreakpointsEvents.NEW);
      expect(breakpointEvents).toHaveLength(1);
      expect((breakpointEvents[0] as CustomEvent).detail.breakpoint).toBe('xSmall');
    } finally {
      addEventListenerSpy.mockRestore();
      dispatchEventSpy.mockRestore();
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: initialWidth,
      });
    }
  });
});
