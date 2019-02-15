<template>
  <div class="home">
    <top></top>
    <router-view v-transition class="view"></router-view>
    <bottomNav></bottomNav>
  </div>

</template>

<script>
  import bottomNav from 'components/bottom-navigation/index'
  import top from 'components/top/index'
  export default {
    data() {
      return {}
    },
    components: {
      bottomNav,
      top
    },
  }


</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/global";

  .view {
    height: 86%;
    overflow: auto;
    -webkit-overflow-scrolling: touch
  }
</style>
