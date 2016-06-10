[![npm version](https://badge.fury.io/js/router5-rxjs.svg)](https://badge.fury.io/js/router5-rxjs)
[![Build Status](https://travis-ci.org/router5/router5-rxjs.svg?branch=master)](https://travis-ci.org/router5/router5-rxjs?branch=master)
[![Coverage Status](https://coveralls.io/repos/router5/router5-rxjs/badge.svg?branch=master&service=github)](https://coveralls.io/github/router5/router5-rxjs?branch=master)

__NOT PUBLISHED YET__: waiting for router5 4.0.0 to be published

# router5-rxjs

RxJS 5+ plugin for router5: http://router5.github.io

```sh
npm install --save router5-rxjs
```

### Usage

```js
import rxPlugin from 'router5-rxjs';

router
    .usePlugin(rxPlugin());
    .start(());

router.rx.route$.map((route) => { /* ... */ })
```

### Available observables

This plugin adds a `rx` object to your router instance, containing the following:
- `route$`: an observable of your application route
- `transitionRoute$`: an observable of the currently transitioning route
- `transitionError$`: an observable of transition errors
- `routeNode(nodeName)`: a function returning an observable of route updates for the specified node. See [understanding router5](http://router5.github.io/docs/understanding-router5.html).

### Related

- [RxJS 4 plugin](https://github.com/router5/router5-rx)
- [xstream plugin](https://github.com/router5/xstream-plugin)

### Contributing

Please read [contributing guidelines](https://github.com/router5/router5/blob/master/CONTRIBUTING.md) on router5 repository.
