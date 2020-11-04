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
