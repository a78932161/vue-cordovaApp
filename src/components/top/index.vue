<template>
  <mu-appbar class="top" color="primary">
    <mu-button icon slot="left">
      <span class="iconfont icon-caidan"></span>
    </mu-button>
    <mu-button flat slot="right">
      <span class="iconfont icon-sousuo"></span>
    </mu-button>
  </mu-appbar>

</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";
  .iconfont{
    font-size:px2rem(25);
  }
  .top{
    width: 100%;
    height: px2rem(50)
  }
</style>
