<template>
  <div id="app">
    <router-view class="router-view" v-transition></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    watch: {
      $route() {
        setTimeout(
          () => {
            this.$wu.hideToast();
            }, 10000)
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  @import "~common/wu-ui/wu-ui";

  .router-view {
    height: 100vh;
  }
</style>
