# bs-breakpoints

[![npm version](https://img.shields.io/npm/v/bs-breakpoints.svg)](https://www.npmjs.com/package/bs-breakpoints)
[![dependencies Status](https://img.shields.io/david/Johann-S/bs-breakpoints.svg)](https://david-dm.org/Johann-S/bs-breakpoints)
[![devDependencies Status](https://img.shields.io/david/dev/Johann-S/bs-breakpoints.svg)](https://david-dm.org/Johann-S/bs-breakpoints?type=dev)
[![Build Status](https://github.com/Johann-S/bs-breakpoints/workflows/Tests/badge.svg)](https://github.com/Johann-S/bs-breakpoints/actions?workflow=Tests)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![JS gzip size](https://img.badgesize.io/Johann-S/bs-breakpoints/master/dist/bs-breakpoints.min.js?compression=gzip&label=JS+gzip+size)](https://github.com/Johann-S/bs-breakpoints/tree/master/dist/bs-breakpoints.min.js)

A plugin which detect Bootstrap 4 & 5 breakpoints and emit when there is a change.

You can use it on [React](https://stackblitz.com/edit/bs-breakpoints-react) and [Angular](https://stackblitz.com/edit/bs-breakpoints-angular) too because this plugin is written with the most used JavaScript framework: [VanillaJS](http://vanilla-js.com/).

Features:

- Works with Bootstrap 4
- Works with Bootstrap 5
- Works without *dependencies* and **jQuery**
- **Can** work with jQuery if detected
- Detect custom breakpoints in CSS properties
- Built in UMD to be used everywhere
- Small, only **2kb** and less if you gzip it

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
jsDelivr | [`https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.js`](https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.js)
jsDelivr, minified | [`https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.min.js`](https://cdn.jsdelivr.net/npm/bs-breakpoints/dist/bs-breakpoints.min.js)

## How to use it

You should wait for the document ready event and call the `init` method to detect breakpoint changes.
We expose one global variable available everywhere: `bsBreakpoints`

Vanilla JS
```js
document.addEventListener('DOMContentLoaded', function () {
  bsBreakpoints.init()
})
```

With jQuery
```js
$(document).ready(function () {
  bsBreakpoints.init()
})
```

### Use it with npm

```js
import bsBreakpoints from 'bs-breakpoints'
```

For more examples check out [this file](https://github.com/Johann-S/bs-breakpoints/blob/master/tests/index.html).

This library is UMD ready so you can use it everywhere.

## Methods

### init

Will detect the current breakpoint and emit `init.bs.breakpoint` event.

It'll add a listener on the window `resize` event and emit `new.bs.breakpoint` event.

### detectBreakpoint

Detect the current breakpoint and return it.

### getCurrentBreakpoint

Return the current breakpoint.

## Events

### init.bs.breakpoint

Emitted just once when `bsBreakpoints.init()` is called.

This event contains the current breakpoint in the [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) attribute in VanillaJS and for those who use jQuery we add a `breakpoint` key in jQuery's events.

### new.bs.breakpoint

This event is emitted when there is a breakpoint changes.

This event contains the current breakpoint in the [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) attribute in VanillaJS and for those who use jQuery we add a `breakpoint` key in jQuery's events.

## Support me

If you want to thank me, you can support me and become my [Patron](https://www.patreon.com/jservoire)

## License

[MIT](https://github.com/Johann-S/bs-breakpoints/blob/master/LICENSE)
