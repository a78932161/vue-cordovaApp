<template>
  <div class="info" v-cloak>
    <mu-form :model="form" class="mu-demo-form" label-width="100">
      <mu-form-item prop="input" label="客户名">
        <mu-text-field v-model="form.name" placeholder="请输入客户名"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="手机号">
        <mu-text-field v-model="form.phone" placeholder="请输入手机号"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="textarea" label="备注">
        <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.remark" placeholder="请输入备注"></mu-text-field>
      </mu-form-item>
      <mu-form-item class="push">
        <mu-button color="primary" @click="submit()">提交</mu-button>
        <mu-button @click="back()">返回</mu-button>
      </mu-form-item>
    </mu-form>
  </div>
</template>

<script>
  import api from 'graph/ordersInfo.graphql';

  export default {
    name: "info",
    data() {
      return {
        form: {
          name: '',
          phone: '',
          remark: '',
        }
      }
    },
    mounted() {
      this.getInfo();
    },
    methods: {
      getInfo() {
        this.$wu.showLoading('loading...');
        this.$apollo.query({
          query: api.getConsult,
          variables: {id: this.$route.query.id},
          fetchPolicy: 'network-only',
        }).then(res => {
          console.log(res.data.Consult);
          this.form = JSON.parse(JSON.stringify(res.data.Consult));
          this.$wu.hideToast();
        })
      },
      back() {
        this.$router.push('/orders');
      },
      submit() {
        this.$apollo.mutate({
          mutation: api.consult_modify,
          variables: {consult: this.form}
        }).then(res => {
          if (res.dataPresent) {
            this.$wu.showToast({
              title: '保存成功 !',
              mask: false,
              duration: 2000
            });
          }
        })

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
