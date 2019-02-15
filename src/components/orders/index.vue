<template>
  <div class="list">
    <mu-list class="lists">
      <mu-list-item avatar="" button :ripple="false" v-for="(item,index) in  list" :key="index">
        <mu-list-item-title @click="details(item)">手机号:{{item.phone}}</mu-list-item-title>
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
  import api from 'graph/order.graphql';
  import {mapGetters} from 'vuex'
  import {uploadDome} from "@/common/js/upload";

  export default {
    computed: mapGetters([
      'storeId',
      'name',
      'id',
      'searchValue'
    ]),

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
        if (this.name === '门店管理员') {
          this.$apollo.query({
            query: api.getConsultList,
            fetchPolicy: 'network-only',
            variables: {storeId: this.storeId},
          }).then((res) => {
            this.list = JSON.parse(JSON.stringify(res.data.ConsultList.content));
          });
        } else {
          this.$apollo.query({
            query: api.getConsultList1,
            fetchPolicy: 'network-only',
            variables: {salesConsultantId: this.id},
          }).then((res) => {
            this.list = JSON.parse(JSON.stringify(res.data.ConsultList.content));
          });
        }
      },
      details(data) {
        this.$router.push({path: 'orders/info', query: {id: data.id}});
      }
    },
    watch: {
      searchValue(value1, old) {
        console.log(value1);
        if (value1 !== '') {
          let newDate = [];
          this.list.forEach((value, index) => {
            if (value1 == value['phone']) {
              newDate.push(value);
            }
          });
          console.log(newDate);
          this.list = newDate;
        } else {
          this.getList();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";

  .list {

  }

  .iconfont {
    font-size: px2rem(20);
  }
</style>
