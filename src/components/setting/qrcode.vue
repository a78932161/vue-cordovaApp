<template>
  <div class="qr">
    <div class="sp-1">
      <mu-select label="选择车型" filterable v-model="model" full-width @change="start">
        <mu-option v-for="(city,index) in citys" :key="index" :label="city.model" :value="city.model"></mu-option>
      </mu-select>
    </div>
    <div class="qr-center" style="">
      <img v-if="imgUrl" :src="imgUrl" class="code">
      <span>扫一扫上面的二维码,打开贝壳麦卡小程序</span>
    </div>

    <mu-button round color="primary" @click="$router.push('/home')">返回</mu-button>
  </div>

</template>

<script>
  import QRCode from 'qrcode'
  import {mapGetters} from 'vuex'
  import {getCode} from "@/api/qrcode";
  import api from 'graph/setting.graphql';

  export default {
    data() {
      return {
        imgUrl: '',
        model: '',
        citys: [],
      }
    },
    apollo: {
      citys: {
        query: api.getCarInfoList,
        update: data => data.CarInfoList.content
      }
    },
    computed: mapGetters([
      'id',
    ]),

    methods: {

      start() {
        let promise = new Promise((resolve, reject) => {
            getCode(this.model).then(res => {
              resolve(res);
            }).catch(err => {
              reject(err);
            })
          }
        );
        promise.then((res) => {
          // this.imgUrl = `data:image/png;base64,${res}base64Code`;
          this.imgUrl = res;
        }).catch((err) => {
          this.$wu.showToast({
            title: err,
            mask: false,
            duration: 2000
          });
        });

        // QRCode.toCanvas(
        //   document.getElementById("canvas"),
        //   `pages/index/index?fromShare=true&from=home&id=${this.id}`,
        //   {toSJISFunc: QRCode.toSJIS},
        //   (error) => {
        //     if (error) console.error(error);
        //     console.log("success!");
        //   }
        // );
      },

    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";

  .qr {
    @include center();
    flex-direction: column;
    .qr-center {
      box-shadow: 0 0 10px #e9ddff;
      margin-bottom: px2rem(30);
      @include center();
      width: px2rem(330);
      height: px2rem(420);
      color: white;
      flex-direction: column;
      background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551691755294&di=319e3a825c0650af621d7d434712b843&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fqc%2Fphoto_auto%2Fchezhan%2F2012%2F50%2F20%2F34%2F83472.jpg");
      background-size: 100%;
      .sp-1 {
        font-size: px2rem(20);
      }
      .code {
        margin: px2rem(50) 0;

        width: px2rem(200) !important;
        height: px2rem(200) !important;
      }
    }
  }
</style>
