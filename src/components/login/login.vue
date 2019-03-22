<template>
  <div class="login">
    <div class="logo">
      <img src="../../common/img/logo.png"/>
    </div>
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
    <div class="footer">贝壳麦卡所有权</div>
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
              // window.JPush.setTags({sequence: 1, tags: [res.id]},
              //   (result) => {
              //     console.log(result);
              //   }, (error) => {
              //     console.log(error);
              //   });
              this.$wu.hideToast();
              this.$router.push('/home');
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo {
      img {
        width: px2rem(310);
        height: px2rem(180);
        background-size: 100%;
      }
    }
    .footer {
      margin-top: px2rem(50);
      font-size: px2rem(14);
      color: #6e6e6e;

    }
    .mu-demo-form {
      padding: px2rem(10);
      .button {
        @include center;
        .dl {
          width: px2rem(250);
        }
      }
    }
  }
</style>
