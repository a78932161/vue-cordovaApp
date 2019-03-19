<template>
  <div>
    <mu-appbar class="top" color="primary">
      <mu-button icon slot="left" @click="open = !open">
        <span class="iconfont icon-caidan"></span>
      </mu-button>
      <mu-button flat slot="right" v-if="plus" @click="addUser">
        <span class="iconfont icon-jiahao"></span>
      </mu-button>
      <mu-button flat slot="right" @click="search">
        <span class="iconfont icon-sousuo"></span>
      </mu-button>
    </mu-appbar>
    <mu-fade-transition>
      <div class="mu-transition-box" v-show="show1">
        <div class="search">
          <input v-model="searchValue" @blur="changeValue(searchValue)" placeholder="请输入搜索的内容"/>
        </div>
      </div>
    </mu-fade-transition>

    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'" width="200">
      <mu-list>
        <mu-list-item button @click="$router.push('/qrcode')" v-if="this.name==='销售顾问'">
          <mu-list-item-title>分享二维码</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="$router.push('/password')">
          <mu-list-item-title>修改密码</mu-list-item-title>
        </mu-list-item>
        <mu-list-item @click="openLeft" button>
          <mu-list-item-title>退出</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>

</template>

<script>
  import {removeToken} from '@/common/js/auth'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        docked: false,
        open: false,
        position: 'left',
        show1: false,
        searchValue: '',
        plus: false,
      }
    },
    computed: mapGetters([
      'name',
    ]),
    methods: {
      ...mapMutations([
        'SET_searchValue',
      ]),
      openLeft() {
        this.open = false;
        removeToken();

        this.$router.push('/login');
        this.$wu.showToast({
          title: '退出成功!',
          mask: false,
          duration: 2000
        });
      },
      search() {
        this.show1 = !this.show1;
      },
      changeValue(data) {
        this.SET_searchValue(data);
      },
      addUser() {
        this.$router.push({path: 'sales/info', query: {type: 'add'}});
      }
    },
    watch: {
      $route(to, from) {
        if (to.path === '/sales') {
          this.plus = true;
        } else {
          this.plus = false;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";

  .iconfont {
    font-size: px2rem(25);
  }

  .top {
    width: 100%;
    height: px2rem(50)
  }

  .mu-transition-box {
    display: flex;
    justify-content: center;
    width: 100%;
    height: px2rem(30);
    position: relative;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    .search {
      input {
        outline: none;
        border: none;
        background: none;
        border-radius: 0 0 0 0;
        box-shadow: none;
        height: px2rem(32);
        font-size: px2rem(18);
      }

    }
  }
</style>
