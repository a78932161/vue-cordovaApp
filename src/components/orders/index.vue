<template>
  <div class="list">
    <mu-list class="lists">
      <mu-list-item avatar="" button :ripple="false" v-for="(item,index) in  list" :key="index" @click="details(item)">
        <mu-list-item-title>手机号:{{item.phone}}</mu-list-item-title>
        <mu-list-item-action>
          <span class="iconfont icon-weibiaoti-"></span>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
  import api from 'graph/order.graphql';

  export default {
    data() {
      return {
        list: [],
      }
    },
    apollo: {},
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        this.$wu.showLoading('loading...');
        this.$apollo.query({
          query: api.getConsultList,
          fetchPolicy: 'network-only',
        }).then((res) => {
          this.list = JSON.parse(JSON.stringify(res.data.ConsultList.content));
          this.$wu.hideToast();
        })
      },
      details(data) {
        this.$router.push({path: 'orders/info', query: {id: data.id}});
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";
  .list {
    margin-bottom: px2rem(36);
  }

  .iconfont {
    font-size: px2rem(20);
  }
</style>
