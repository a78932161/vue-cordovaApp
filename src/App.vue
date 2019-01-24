<template>
  <div id="app">
    <router-view class="router-view" v-transition></router-view>
  </div>
</template>

<script>
  import Tab from 'components/tab/tab';

  export default {
    name: 'App',
    components: {
      Tab
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  @import "~common/wu-ui/wu-ui";

  .router-view {
    height: 100vh;
  }
</style>
