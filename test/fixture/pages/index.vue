<template>
  <div>
    Works!
  </div>
</template>

<script>
import Vue from "vue";

export default {
  asyncData(ctx) {
    ctx.$rollbar.debug("YoHo !");
  },
  mounted() {
    this.$rollbar.debug("YoHo !");
    Vue.rollbar.debug("YoHo !");
  }
};
</script>
