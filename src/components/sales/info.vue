<template>
  <div class="info">
    <mu-form ref="form" :model="form" class="mu-demo-form" label-width="200">
      <mu-form-item prop="username" label="账号名" :rules="usernameRules">
        <mu-text-field :disabled="end" v-model="form.username" prop="username" placeholder="请输入账号名"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="password" label="密码" :rules="passwordRules">
        <mu-text-field v-model="form.password" prop="password" placeholder="请输入密码"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="name" label="姓名" :rules="nameRules">
        <mu-text-field :disabled="end" v-model="form.name" prop="name" placeholder="请输入姓名"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="phone" label="手机号" :rules="phoneRules">
        <mu-text-field :disabled="end" v-model="form.phone" prop="phone" placeholder="请输入手机号"></mu-text-field>
      </mu-form-item>

      <mu-form-item class="push">
        <mu-button color="primary" @click="submit()" v-if="!end">提交</mu-button>
        <mu-button color="primary" @click="submit()" v-if="!title">修改</mu-button>

        <mu-button @click="back()">返回</mu-button>
      </mu-form-item>
    </mu-form>
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
    ]),
    data() {
      return {
        usernameRules: [
          {validate: (val) => !!val, message: '必须填写用户名'},
        ],
        passwordRules: [
          {validate: (val) => !!val, message: '必须填写密码'},
        ],
        nameRules: [
          {validate: (val) => !!val, message: '必须填写姓名'},
        ],
        phoneRules: [
          {validate: (val) => !!val, message: '必须填写手机号'},
          {validate: (val) => /^[1][3578]\d{9}$/.test(val), message: '手机号不正确'}
        ],
        form: {
          username: '',
          password: '',
          name: '',
          phone: '',
          store: {
            id: ''
          }
        },
        end: false,
        title: true,
      }
    },
    created() {
      if (this.$route.query.type === 'edit') {
        this.title = false
      } else {
        this.title = true
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        if (this.title === false) {
          this.$wu.showLoading('loading...');
          this.$apollo.query({
            query: api.getAdmin,
            variables: {id: this.$route.query.id},
            fetchPolicy: 'network-only',
          }).then(res => {
            this.$wu.hideToast();
            this.form = JSON.parse(JSON.stringify(res.data.Admin));
            this.end = true;
          }).catch((err) => {
            this.$wu.hideToast();
            this.$wu.showToast({
              title: err,
              duration: 1500
            })
          })
        } else {

        }
      },

      submit() {
        this.form['store']['id'] = this.storeId;
        this.$refs.form.validate().then((res) => {
          console.log('form valid: ', res);
          if (res) {
            if (this.title) {
              this.$apollo.mutate({
                mutation: api.admin_salesConsultant,
                variables: {admin: this.form}
              }).then((res1) => {
                if (res1.dataPresent) {
                  this.end = true;
                  this.$wu.showToast({
                    title: '添加成功!',
                    mask: false,
                    duration: 2000
                  });
                }
              }).catch((err) => {
                console.log(err)
              })
            } else {
              this.$apollo.mutate({
                mutation: api.admin_changeOtherPassword,
                variables: {password: this.form.password, username: this.form.username}
              }).then((res1) => {
                if (res1.dataPresent) {
                  this.title = true;
                  this.$wu.showToast({
                    title: '修改成功!',
                    mask: false,
                    duration: 2000
                  });
                }
              })
            }
          } else {
            this.$wu.showToast({
              title: '请填写完整',
              mask: false,
              duration: 2000
            });
          }
        });
      },
      back() {
        this.$router.push({path: '/sales'});
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";

  .info {
    .mu-demo-form {
      padding: px2rem(10);
      .push {
        @include center;
      }
    }
  }
</style>
