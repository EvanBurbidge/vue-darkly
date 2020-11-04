# vue-darkly
![GitHub All Releases](https://img.shields.io/github/downloads/EvanBurbidge/vue-darkly/total)

![GitHub top language](https://img.shields.io/github/languages/top/EvanBurbidge/vue-darkly)

This project will give you access to launch darkly apis in your vuejs application

## Project setup
to install the launchdarkly vue client run the following npm command

```bash
  yarn add vue-darkly
  // or
  yarn add vue-darkly
```



### Usage Api

#### Setup
```javascript
import Vue from 'vue';
import App from './App.vue';
import VueDarkly from 'vue-darkly';

Vue.use(VueDarkly, {
  ldKey: process.env.VUE_APP_LD_KEY,
  user: {
    anonymous: true,
  },
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  mounted() {
    setTimeout(() => {
      this.$ldIdentify({
        firstName: 'Bob',
        lastName: 'Loblaw',
        key: 'aa0ceb',
      });
    }, 2000);
  },
}).$mount('#app');

```

```vue

<template>
  <div id="app">
    <pre>
      {{ flagsComputed }}
    </pre>
    <div v-if="flagsComputed['some-flag-name']">
      its on
    </div>
    <div v-else>
      its not on
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$ld.on('ready', () => this.setFlags());
    this.$ld.on('change', () => this.setFlags());
  },
  data: () => ({
    flags: {},
  }),
  methods: {
    setFlags() {
      this.flags = this.$ldFlags();
    },
  },
  computed: {
    flagsComputed() {
      return this.flags;
    },
  },
};
</script>

```

#### $ld
- gives you access to the launch darkly client
```javascript
  this.$ld.allFlags()// returns all flags
```

#### $ldFlush
Internally, the LaunchDarkly SDK keeps an analytics event buffer. These events are flushed periodically (asynchronously). In some situations, you may want to manually call flush to process events immediately.

Note that this method is asynchronous. You may pass a callback or wait for the returned Promise to determine when all events have been flushed.
```javascript
this.$ldFlush()
```
#### $ldFlags
The $ldFlags method will return a key / value map of all your feature flags.

The map will contain null values for any flags that would return the fallback value (the second argument that you normally pass to variation).
```javascript
this.$ldFlags()
```
#### $ldVariation

The ldVariation method determines which variation of a feature flag a user receives.
$ldVariation calls take the feature flag key and a default value.
The default value will only be returned if an error is encountered—for example, if the feature flag key doesn't exist or the user doesn't have a key specified.
```javascript
this.$ldVariation('my-key', true)
```

#### $ldIdentify
You may wish to change the user context dynamically and receive the new set of feature flags for that user or generate events for the new user. For example, on a sign-in page in a single-page app, you might initialize the client with an anonymous user. When the user logs in, you'd want the feature flag settings for the authenticated user. To do this, you can call the identify function:
```javascript
this.$ldIdentify(newUser, hash, () => {
   console.log("New user's flags available");
 });
```
The hash parameter is the hash for the new user, assuming that the user's key has changed. It is only required in secure mode-- if secure mode is not enabled, you can pass in null for the hash.

If you provide a callback function, it will be called (with a map of flag keys and values) once the flag values for the new user are available; after that point, variation() will be using the new values. You can also use a Promise for the same purpose.

Note that the SDK always has one current user. The client-side SDKs are not designed for evaluating flags for different users at the same time.
```javascript
var user = {
  "key": "aa0ceb",
  "firstName": "hello",
  "lastName": "there",
  "email": "test@example.com",
  "custom": {
    "groups": ["Google", "Microsoft"]
  }
};
```


## Events

#### ready
```javascript
this.$ld.on('ready', () => {
  // its ready do some feature flagging
})
```

#### change
```javascript
this.$ld.on('change', (values) => {
  console.log(values);
  // values is an object of values e.g. 
  // { key: { current, previous }}
})
```

#### change:specific-key
```javascript
this.$ld.on('change:specific-key', (value, previous) => {
  // update the ui
})
```
