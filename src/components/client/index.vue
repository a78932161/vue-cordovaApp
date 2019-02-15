<template>
  <div class="list">
    <mu-list class="lists">
      <mu-list-item avatar="" button :ripple="false" v-for="(item,index) in  list" :key="index">
        <mu-list-item-sub-title style="color:black;">
          手机号:{{item.phone}}<br>
          积分:{{item.integral}}<br>
          销售顾问:{{item.salesConsultantAdmin.name}}
        </mu-list-item-sub-title>
        <mu-list-item-action>
          <a :href="'tel:'+item.phone" style="color:#2196f3;">
            <mu-button icon class="iconfont icon-weibiaoti-">
            </mu-button>
          </a>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
  import api from 'graph/client.graphql';
  import {mapGetters} from 'vuex'

  export default {
    name: "index",
    computed: mapGetters([
      'storeId',
    ]),

    data() {
      return {
        list: [],
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        this.$apollo.query({
          query: api.getCustomerList,
          fetchPolicy: 'network-only',
          variables: {storeId: this.storeId},
        }).then((res) => {
          this.list = JSON.parse(JSON.stringify(res.data.CustomerList.content));
        });
      }
    },
  }
</script>

<style scoped>

</style>
