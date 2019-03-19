<template>
  <div class="nav" v-show="hidshow">
    <mu-bottom-nav :value.sync="bottomNav">
      <mu-bottom-nav-item value="/orders" title="看单" icon=":iconfont icon-dingdan"
                          to="/orders"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="/sales" v-if="name=='门店管理员'" title="销售顾问" icon=":iconfont icon-xiaoshouguanli"
                          to="/sales"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="/client" v-if="name=='门店管理员'" title="客户" icon=":iconfont icon-kehu"
                          to="/client"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'name',
    ]),

    data() {
      return {
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hidshow: true,  //显示或者隐藏footer
        bottomNav: 'index',
      };
    },
    methods: {
      handleChange(value) {
        this.bottomNav = value
        console.log(value);
      }
    },
    created() {
      this.bottomNav = this.$route.path;
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
      },
      $route(to, from) {
        this.bottomNav = to.path
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
