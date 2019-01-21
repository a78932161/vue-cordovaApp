<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Tab from 'components/tab/tab';
export default {
  name: 'App',
  components:{
      Tab
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
</style>
