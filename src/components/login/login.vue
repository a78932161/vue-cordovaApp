<template>
  <div class="login">
    这是登陆
    <mu-button @click="go()">去首页</mu-button>

  </div>

</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      go() {
        this.$router.push('/home');
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/global";

  .login {
    font-size: px2rem(20);
  }
</style>
