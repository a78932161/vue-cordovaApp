<template>
  <div class="info" v-cloak>
    <mu-form :model="form" class="mu-demo-form" label-width="200">
      <mu-form-item prop="input" label="客户名">
        <mu-text-field :disabled="end" v-model="form.name" placeholder="请输入客户名"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="手机号">
        <mu-text-field :disabled="end" v-model="form.name" placeholder="请输入手机号"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="邀请人">
        <mu-text-field :disabled="end" v-model="form.name" placeholder="请输入邀请人"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="销售顾问">
        <mu-text-field :disabled="end" v-model="form.name" placeholder="请输入销售顾问"></mu-text-field>
      </mu-form-item>

    </mu-form>
  </div>
</template>

<script>
  export default {
    name: "info",
    end: true,
  }
</script>

<style scoped>

</style>
