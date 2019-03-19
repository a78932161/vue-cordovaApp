<template>
  <div class="list">
    <mu-list class="lists">
      <mu-list-item avatar="" button :ripple="false" v-for="(item,index) in  list" :key="index"
                    class="forList">
        <mu-list-item-sub-title style="color:black;">
          手机号:{{item.phone}}<br>
          积分:{{item.integral}}<br>
          <div v-if="item['salesConsultantAdmin']">
            销售顾问:{{item['salesConsultantAdmin']['name']}}
          </div>
          <div v-if="!item['salesConsultantAdmin']">
            销售顾问:暂无
          </div>
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
      'searchValue'
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
          variables: {storeId: this.storeId, namelike: '%%'},
        }).then((res) => {
          this.list = JSON.parse(JSON.stringify(res.data.CustomerList.content));
        }).catch((err) => {

        })
      }
    },
    watch: {
      searchValue(value1, old) {
        console.log(value1);
        if (value1 !== '') {
          this.$apollo.query({
            query: api.getCustomerList,
            fetchPolicy: 'network-only',
            variables: {storeId: this.storeId, namelike: `%${value1}%`},
          }).then((res) => {
            this.list = JSON.parse(JSON.stringify(res.data.CustomerList.content));
          }).catch((err) => {

          })
        } else {
          this.getList();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";

  .forList {

    padding-bottom: px2rem(10);
    border-bottom: 1px solid #2196f3;
    margin: px2rem(10);
  }
</style>
