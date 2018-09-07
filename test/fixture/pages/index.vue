<template>
<div>
  Works!
</div>
</template>

<script>
export default {
  mounted() {
    this.rollbar.debug('YoHo !')
  }
}
</script>
