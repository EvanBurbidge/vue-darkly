/* eslint-disable */
import * as LDClient from 'launchdarkly-js-client-sdk';

const version = '__VERSION__';

const install = (Vue, opts) => {
  let ldClient = {};
  if (opts.ldClient) {
    ldClient = opts.ldClient;
  } else {
    ldClient = LDClient.initialize(opts.ldKey, opts.user, {
      bootstrap: opts.bootstrap || 'localstorage',
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

const plugin = {
  install,
  version,
};

export default plugin;
