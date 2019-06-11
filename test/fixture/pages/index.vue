<template>
  <div>
    Works!
  </div>
</template>

<script>
export default {
  asyncData(ctx) {
    ctx.$rollbar.debug("YoHo !");
  },
  mounted() {
    this.$rollbar.debug("YoHo !");
  }
};
</script>
