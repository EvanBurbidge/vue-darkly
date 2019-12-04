/*!
 * ld-cli v1.0.0 
 * (c) 2019 Evan Burbidge thewebuiguy@gmail.com
 * Released under the UNLICENSED License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('launchdarkly-js-client-sdk')) :
  typeof define === 'function' && define.amd ? define(['launchdarkly-js-client-sdk'], factory) :
  (global = global || self, global.LdCli = factory(global.LDClient));
}(this, function (LDClient) { 'use strict';

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

  return plugin;

}));
