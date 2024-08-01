import { Breakpoint } from './models/breakpoint.model';

export declare class BreakpointDetector {
    private readonly window;
    private breakPoints;
    private currentBreakpoint;
    constructor();
    addBreakpoint(name: string, breakpoint: Breakpoint): Record<string, Breakpoint>;
    removeBreakpoint(name: string): Record<string, Breakpoint>;
    getBreakPoints(): Record<string, Breakpoint>;
    getCurrentBreakpoint(): string;
    isGreaterThan(breakpointKey: string): boolean;
    isLowerThan(breakpointKey: string): boolean;
    private dispatchBreakpoint;
    private getSortedBreakpoints;
}
