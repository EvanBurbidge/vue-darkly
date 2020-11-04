<template>
  <div id="app">
    <pre>
      {{ flags }}
    </pre>
    <div v-if="flags['some-flag-name']">
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
};
</script>
