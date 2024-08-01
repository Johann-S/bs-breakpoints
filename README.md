# bs-breakpoints

[![npm version](https://img.shields.io/npm/v/bs-breakpoints.svg)](https://www.npmjs.com/package/bs-breakpoints)
[![Build Status](https://github.com/Johann-S/bs-breakpoints/workflows/Tests/badge.svg)](https://github.com/Johann-S/bs-breakpoints/actions?workflow=Tests)
[![JS gzip size](https://img.badgesize.io/Johann-S/bs-breakpoints/master/dist/bs-breakpoints.js?compression=gzip&label=JS+gzip+size)](https://github.com/Johann-S/bs-breakpoints/tree/master/dist/bs-breakpoints.js)

A plugin which detect Bootstrap 5 breakpoints and emit when there is a change.

You can use it on [React](https://stackblitz.com/edit/bs-breakpoints-react) and [Angular](https://stackblitz.com/edit/bs-breakpoints-angular) too because this plugin is written with the most used JavaScript framework: [VanillaJS](http://vanilla-js.com/).

Features:

- Works with Bootstrap 5
- Works without *dependencies*
- Detect custom breakpoints in CSS properties
- Built in **ES** and **UMD** to be used everywhere
- Small, only **2kb** and less if you gzip it
- Allow to add or remove breakpoints

## Table of contents

- [Install](#install)
- [How to use it](#how-to-use-it)
- [Methods](#methods)
- [Events](#events)
- [Support me](#support-me)
- [License](#license)

## Install

### With npm or yarn

```sh
npm install bs-breakpoints --save

// yarn
yarn add bs-breakpoints
```

### CDN

CDN | Link
------------ | -------------
jsDelivr ES version | [`https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.js`](https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.js)
jsDelivr UMD version | [`https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.umd.cjs`](https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.umd.cjs)

## How to use it

You should wait for the document ready event and call the `init` method to detect breakpoint changes.
We expose one global variable available everywhere: `bsBreakpoints`

In browser with UMD version:
```js
document.addEventListener('DOMContentLoaded', function () {
  const detector = new bsBreakpoints.BreakpointDetector();
})
```

### Use it with npm

```js
import { BreakpointDetector } from 'bs-breakpoints';
```

For UMD examples check out [this file](https://github.com/Johann-S/bs-breakpoints/blob/master/tests/index.html).

This library is ES and UMD ready so you can use it everywhere.

## Methods

### constructor

Will detect the current breakpoint and emit `init.bs.breakpoint` event.

It'll add a listener on the window `resize` event and emit `new.bs.breakpoint` event.

### addBreakpoint

Allow you to add a new breakpoint.

```js
import { BreakpointDetector } from 'bs-breakpoints';

const detector = new BreakpointDetector();

detector.addBreakpoint('largest', { min: 1600, max: Infinity });
```

### removeBreakpoint

Allow you to remove an existing breakpoint.

```js
import { BreakpointDetector } from 'bs-breakpoints';

const detector = new BreakpointDetector();

detector.removeBreakpoint('largest');
```

### getBreakPoints

Detect and update breakpoints base on CSS properties

### getCurrentBreakpoint

Detect and return the current breakpoint.

### isGreaterThan

Allow you to know if the current breakpoint is greater than the one supplied.

### isLowerThan

Allow you to know if the current breakpoint is lower than the one supplied.

## Events

### init.bs.breakpoint

Emitted just once when a new instance of `BreakpointDetector` is created.

This event contains the current breakpoint in the [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) attribute.

### new.bs.breakpoint

This event is emitted when there is a breakpoint changes.

This event contains the current breakpoint in the [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) attribute.

## License

[MIT](https://github.com/Johann-S/bs-breakpoints/blob/master/LICENSE)
