<template>
  <div class="nav">
    <mu-bottom-nav>
      <mu-bottom-nav-item title="转单" icon=":iconfont icon-dingdan" to="/orders"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="销售顾问" icon=":iconfont icon-xiaoshouguanli" to="/sales"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="客户" icon=":iconfont icon-kehu" to="/client"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";

  .nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .iconfont{
       font-size:px2rem(25)
  }

</style>
