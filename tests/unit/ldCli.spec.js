import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import plugin from '../../src';


const localVue = createLocalVue();
const TestComponent = Vue.component('tester', {
  template: '<div> tester </div>',
});

localVue.use(plugin, {
  user: {
    anonymous: true,
  },
  ldKey: process.env.VUE_APP_LD_KEY,
});

describe('ldPlugin', () => {
  const wrapper = shallowMount(TestComponent, {
    localVue,
  });
  it('should test the vue prototype', () => {
    expect(typeof wrapper.vm.$ld).toBe('object');
    expect(typeof wrapper.vm.$ldFlags).toBe('function');
    expect(typeof wrapper.vm.$ldVariation).toBe('function');
    expect(typeof wrapper.vm.$ldFlush).toBe('function');
    expect(typeof wrapper.vm.$ldTrack).toBe('function');
    expect(typeof wrapper.vm.$ldIdentify).toBe('function');
  });
  it('should get the flags', () => {
    const flags = wrapper.vm.$ldFlags();
    expect(typeof flags).toBe('object');
  });
  it('should test the variation:false', () => {
    const booley = wrapper.vm.$ldVariation('vue-cli-plugin-test', false);
    expect(booley).toBe(false);
  });
  it('should test the variation:true', () => {
    const booley = wrapper.vm.$ldVariation('vue-cli-plugin-test', true);
    expect(booley).toBe(true);
  });
  it('should test the change of identity', () => {
    wrapper.vm.$ldIdentify({
      firstName: 'Bob',
      lastName: 'Loblaw',
      key: 'aa0ceb',
    });
  });
});
