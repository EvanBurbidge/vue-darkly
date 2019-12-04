/*!
 * ld-cli v1.0.0 
 * (c) 2019 Evan Burbidge thewebuiguy@gmail.com
 * Released under the UNLICENSED License.
 */
'use strict';

var LDClient = require('launchdarkly-js-client-sdk');

/* eslint-disable */
var version = '1.0.0';

var install = function install(Vue, opts) {
  var ldClient = {};

  if (opts.ldClient) {
    ldClient = opts.ldClient;
  } else {
    ldClient = LDClient.initialize(opts.ldKey, opts.user, {
      bootstrap: 'localStorage'
    });
  }
  /* eslint-disable */


  Vue.prototype.$ld = ldClient;
  Vue.prototype.$ldFlush = ldClient.flush;
  Vue.prototype.$ldTrack = ldClient.track;
  Vue.prototype.$ldFlags = ldClient.allFlags;
  Vue.prototype.$ldVariation = ldClient.variation;
  Vue.prototype.$ldIdentify = ldClient.identify;
};

var plugin = {
  install: install,
  version: version
};

module.exports = plugin;
