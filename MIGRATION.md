# Migration

## From v1 to v2

- Remove support to jQuery
- Code totally rewrote in Typescript
- Node support at least 18
- We do not provide a JS Object like before but a class called `BreakpointDetector`
- On events details now contains an object. Example: `{ breakpoint: 'large' }`
