<template>
  <div class="nav" v-show="hidshow">
    <mu-bottom-nav>
      <mu-bottom-nav-item title="看单" icon=":iconfont icon-dingdan" to="/orders"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="销售顾问" icon=":iconfont icon-xiaoshouguanli" to="/sales"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="客户" icon=":iconfont icon-kehu" to="/client"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hidshow: true  //显示或者隐藏footer
      };
    },
    mounted() {
      // window.onresize监听页面高度的变化
      window.onresize = () => {
        return (() => {
          this.showHeight = document.body.clientHeight;
        })()
      }
    },
    watch: {
      showHeight: function (val) {
        if (this.docmHeight > this.showHeight) {
          this.hidshow = false
        } else {
          this.hidshow = true
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";

  .nav {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

</style>
