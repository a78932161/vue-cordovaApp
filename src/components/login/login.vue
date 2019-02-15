<template>
  <div class="login">
    <mu-form ref="form" :model="validateForm" class="mu-demo-form">
      <mu-form-item label="用户名" prop="username" :rules="usernameRules">
        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="密码" prop="password" :rules="passwordRules">
        <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item class="button">
        <mu-button round class="dl" color="primary" @click="submit">登录</mu-button>
      </mu-form-item>
    </mu-form>
  </div>
</template>

<script>
  import {login} from "@/api/login";

  export default {
    data() {
      return {
        usernameRules: [
          {validate: (val) => !!val, message: '必须填写用户名'},
          // {validate: (val) => val.length >= 3, message: '用户名长度大于3'}
        ],
        passwordRules: [
          {validate: (val) => !!val, message: '必须填写密码'},
          // {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
        ],
        validateForm: {
          username: 'zhangsan',
          password: '1',
        }
      }
    },
    methods: {
      submit() {
        this.$refs.form.validate().then((result) => {
          if (result) {
            this.$wu.showLoading('登录中...');
            this.$store.dispatch('Login', this.validateForm).then((res) => {
              console.log(res);
              this.$wu.hideToast();
              this.$router.push('/home');
            }).catch((err) => {
              this.$wu.hideToast();
              this.$wu.showToast({
                title: err,
                mask: false,
                duration: 2000
              });
            })
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
          width: px2rem(250);
        }
      }
    }
  }
</style>
