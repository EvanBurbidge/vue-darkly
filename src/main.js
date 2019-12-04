import Vue from 'vue';
import App from './App.vue';
import plugin from './index';

Vue.use(plugin, {
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
