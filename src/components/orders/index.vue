<template>
  <div class="list">
    <mu-tabs :value.sync="active1" indicator-color="rgba(255, 255, 255, .5)" full-width v-if="name==='门店管理员'">
      <mu-tab @click="changActive(0)">派 单</mu-tab>
      <mu-tab @click="changActive(1)">转 单</mu-tab>
      <mu-tab @click="changActive(2)">完 结</mu-tab>
    </mu-tabs>

    <mu-tabs :value.sync="active1" indicator-color="rgba(255, 255, 255, .5)" full-width v-if="name!=='门店管理员'">
      <mu-tab @click="changActive(0)">进行中</mu-tab>
      <mu-tab @click="changActive(1)">已完结</mu-tab>
    </mu-tabs>

    <mu-list class="lists">
      <mu-list-item avatar="" button :ripple="false" v-for="(item,index) in  list" :key="index">
        <mu-list-item-title @click="details(item)">
          {{item.name?item.name:'暂无'}} {{item.phone}}
        </mu-list-item-title>
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
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    computed: mapGetters([
      'storeId',
      'name',
      'id',
      'searchValue',
    ]),

    data() {
      return {
        list: [],
        active1: this.$store.state.user.active,
      }
    },
    apollo: {},
    mounted() {
      this.getList();
      document.addEventListener("jpush.openNotification", (event) => {
        var alertContent;
        if (device.platform == "Android") {
          alertContent = event.alert;
        } else {
          alertContent = event.aps.alert;
        }
        console.log(alertContent);
        this.getList();
        // window.alert(alertContent);
      }, false);

    },

    methods: {
      ...mapMutations([
        'SET_active',
      ]),
      getList() {
        if (this.name === '门店管理员') {
          this.$apollo.query({
            query: api.getConsultList,
            fetchPolicy: 'network-only',
            variables: {storeId: this.storeId, namelike: '%%', status: this.active1},
          }).then((res) => {
            this.list = JSON.parse(JSON.stringify(res.data.ConsultList.content));
          }).catch((err) => {
          })
        } else {
          this.$apollo.query({
            query: api.getConsultList1,
            fetchPolicy: 'network-only',
            variables: {salesConsultantId: this.id, namelike: '%%', status: this.active1 + 1},
          }).then((res) => {
            this.list = JSON.parse(JSON.stringify(res.data.ConsultList.content));
          }).catch((err) => {
          })
        }
      },
      details(data) {
        this.$router.push({path: 'orders/info', query: {id: data.id}});
      },
      changActive(data) {
        this.SET_active(data);
        this.getList();
      },
      statusZh(data) {
        let a;
        if (data === 0) {
          a = '新咨询'
        } else if (data === 1) {
          a = '进行中'
        } else if (data === 2) {
          a = '已完结'
        }
        return a;
      },
    },
    watch: {
      searchValue(value1, old) {
        if (value1 !== '') {
          if (this.name === '门店管理员') {
            this.$apollo.query({
              query: api.getConsultList,
              fetchPolicy: 'network-only',
              variables: {storeId: this.storeId, namelike: `%${value1}%`, status: this.active1},
            }).then((res) => {
              this.list = JSON.parse(JSON.stringify(res.data.ConsultList.content));
            }).catch((err) => {
            })
          } else {
            this.$apollo.query({
              query: api.getConsultList1,
              fetchPolicy: 'network-only',
              variables: {salesConsultantId: this.id, namelike: `%${value1}%`, status: this.active1 + 1},
            }).then((res) => {
              this.list = JSON.parse(JSON.stringify(res.data.ConsultList.content));
            }).catch((err) => {
            })
          }

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
    margin-bottom: px2rem(0);
  }

  .iconfont {
    font-size: px2rem(20);
  }
</style>
