<template>
  <div class="tab">
    <router-link class="tab-item" to="/home" replace>
      <span class="text">首页</span>
    </router-link>
    <div class="tab-item">
      <span class="text">3</span>
    </div>
    <div class="tab-item">
      <span class="text">4</span>
    </div>
  </div>
</template>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/global";
  .router-link-active{
    i,span{
      color: $color-theme!important;
    }
  }
  .tab{
    position: fixed;
    bottom: 0;
    width: 10rem;
    @include px2rem(height,$tab-height);
    background:$color-background-d;
    border-top:1px solid #c0c0c0;
    display: flex;
    .tab-item{
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      width: 2.5rem;
      .icon{
        color: #ABADBA;
        @include font(11);
        @include px2rem(margin-bottom,11);
      }
      .text{
        color: $color-text-d;
        @include font(-3);
      }
    }
  }
</style>
