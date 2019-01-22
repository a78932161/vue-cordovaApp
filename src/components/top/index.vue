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
  .iconfont{
    font-size:24px;
  }
  .top{
    width: 100%;
    height: 50px;
  }
</style>
