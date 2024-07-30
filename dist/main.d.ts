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
    private dispatchBreakpoint;
}
