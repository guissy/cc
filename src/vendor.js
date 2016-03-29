// Polyfills
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
// import 'ie-shim'; // Internet Explorer
// import 'es6-shim';
// import 'es6-promise';
// import 'es7-reflect-metadata';
// Prefer CoreJS over the polyfills above
require('core-js');
require('lodash');
require('zone.js/dist/zone-microtask');
//if ('production' === ENV) {
//    // Production
//
//
//} else {
//    // Development
//
//    Error.stackTraceLimit = Infinity;
//
//    require('zone.js/dist/long-stack-trace-zone');
//
//} 
//# sourceMappingURL=vendor.js.map