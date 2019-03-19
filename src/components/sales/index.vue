<template>
  <div class="salesList">
    <mu-list class="lists">
      <mu-list-item avatar="" button :ripple="false" v-for="(item,index) in  list" :key="index">
        <mu-list-item-title @click="details(item)">账:{{item.username}} 名:{{item.name}}</mu-list-item-title>
        <mu-list-item-action>
          <!--<mu-button icon class="iconfont icon-shanchu" @click="delData()">-->
          <!--</mu-button>-->
          <div @click="delData(item)">
            <mu-button icon class="iconfont icon-shanchu">
            </mu-button>
          </div>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
  import api from 'graph/sell.graphql';
  import {mapGetters} from 'vuex'

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
    methods: {
      getList() {
        this.$apollo.query({
          query: api.getAdminList,
          fetchPolicy: 'network-only',
          variables: {storeId: this.storeId,namelike:'%%'},
        }).then((res) => {
          this.list = JSON.parse(JSON.stringify(res.data.AdminList.content));
        }).catch((err) => {
          this.$wu.showToast({
            title: err,
            duration: 1500
          })
        })
      },
      details(data) {
        this.$router.push({path: 'sales/info', query: {id: data.id, type: 'edit'}});
      },
      delData(row) {
        this.$wu.showDialog({
          title: '删除',
          content: '当前会删除用户',
          showCancel: true,        //是否显示取消按钮
          showInput: false,        //是否显示输入框，如果为true则content会隐藏
          success: (res) => {
            if (res.value == "confirm") {
              this.$apollo.mutate({
                mutation: api.admin_delete,
                variables: {id: row.id}
              }).then((res1) => {
                if(res1.dataPresent) {
                  this.title = true;
                  this.$wu.showToast({
                    title: '删除成功!',
                    mask: false,
                    duration: 2000
                  });
                  this.getList();
                }
              })
            }
            if (res.value == "cancel") {
              this.$wu.showToast({
                title: '你取消了',
                duration: 1500
              })
            }
          }
        })
      },
    },
    mounted() {
      this.getList();
    },
    watch: {
      searchValue(value1, old) {
        console.log(value1);
        if (value1 !== '') {
          this.$apollo.query({
            query: api.getAdminList,
            fetchPolicy: 'network-only',
            variables: {storeId: this.storeId, namelike: `%${value1}%`},
          }).then((res) => {
            this.list = JSON.parse(JSON.stringify(res.data.AdminList.content));
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
  .salesList {
    .lists {
    }
  }
</style>
