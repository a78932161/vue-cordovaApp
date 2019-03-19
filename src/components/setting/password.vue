<template>
  <div class="login">
    <mu-form ref="form" :model="validateForm" class="mu-demo-form">
      <mu-form-item label="旧密码" prop="oldPassword" :rules="usernameRules">
        <mu-text-field type="password" v-model="validateForm.oldPassword" prop="oldPassword"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="新密码" prop="newPassword" :rules="passwordRules">
        <mu-text-field type="password" v-model="validateForm.newPassword" prop="newPassword"></mu-text-field>
      </mu-form-item>
      <mu-form-item class="button">
        <mu-button round color="primary" @click="submit">修改</mu-button>
        <mu-button round color="primary" @click="$router.push('/home')">返回</mu-button>
      </mu-form-item>
    </mu-form>
  </div>
</template>

<script>
  import api from 'graph/order.graphql';
  import {removeToken} from '@/common/js/auth'

  export default {
    data() {
      return {
        usernameRules: [
          {validate: (val) => !!val, message: '必须填写旧密码'},
          // {validate: (val) => val.length >= 3, message: '用户名长度大于3'}
        ],
        passwordRules: [
          {validate: (val) => !!val, message: '必须填写新密码'},
          // {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
        ],
        validateForm: {
          oldPassword: '',
          newPassword: '',
        }
      }
    },
    methods: {
      submit() {
        this.$refs.form.validate().then((result) => {
          if (result) {
            this.$apollo.mutate({
              mutation: api.admin_changePassword,
              variables: {oldPassword: this.validateForm.oldPassword, newPassword: this.validateForm.newPassword}
            }).then((res1) => {
              // console.log(res1);
              if (res1.dataPresent) {
                removeToken();
                this.$router.push('/login');
                this.$wu.showToast({
                  title: '修改成功,请重新登陆!',
                  mask: false,
                  duration: 2000
                });
              }
            })
            // this.$wu.showLoading('登录中...');
            // this.$store.dispatch('Login', this.validateForm).then((res) => {
            //   console.log(res);
            //   this.$wu.hideToast();
            //   this.$router.push('/home');
            // })
          }
        });
      },
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/global";

  .login {
    font-size: px2rem(20);
    width: 100%;
    @include center;
    .mu-demo-form {
      margin: px2rem(10);
      .button {
        @include center;
        .dl {
          width: px2rem(200);
        }
      }
    }
  }
</style>
