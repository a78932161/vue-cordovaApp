<template>
  <div class="qr">
    <!--<div class="sp-1">-->
    <!--<mu-select label="选择车型" filterable v-model="model" full-width @change="start">-->
    <!--<mu-option v-for="(city,index) in citys" :key="index" :label="city.model" :value="city.model"></mu-option>-->
    <!--</mu-select>-->
    <!--</div>-->
    <div class="qr-center" style="">
      <!--<img v-if="imgUrl" :src="imgUrl" class="code">-->
      <canvas width="300" height="300" class="code" id="myCanvas"></canvas>
      <!--<span>扫一扫上面的二维码,打开贝壳麦卡小程序</span>-->
    </div>

    <div class="buttons">
      <mu-button round color="primary" @click="saveImg">
        保存
        <!--<a :href="imgUrl" download="logo.jpg">保存</a>-->
      </mu-button>
      <mu-button round color="primary" @click="$router.push('/home')">返回</mu-button>
    </div>

  </div>

</template>

<script>

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
        let a = JSON.parse(localStorage.getItem('user')).imgUrl;
        if (a) {
          this.imgUrl = a;

          var canvas = document.getElementById("myCanvas");
          var ctx = canvas.getContext("2d");
          //创建新的图片对象
          var img = new Image();
          //指定图片的URL
          img.src = this.imgUrl;
          //浏览器加载图片完毕后再绘制图片
          img.onload = function () {
            ctx.drawImage(img, 0, 0, 300, 300);
          }

        } else {
          let promise = new Promise((resolve, reject) => {
              getCode().then(res => {
                resolve(res);
              }).catch(err => {
                reject(err);
              })
            }
          );
          promise.then((res) => {
            this.imgUrl = res;
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            //创建新的图片对象
            var img = new Image();
            //指定图片的URL
            img.src = this.imgUrl;
            //浏览器加载图片完毕后再绘制图片
            img.onload = function () {
              ctx.drawImage(img, 0, 0, 300, 300);
            }
          }).catch((err) => {
            this.$wu.showToast({
              title: err,
              mask: false,
              duration: 2000
            });
          });
        }
      },
      saveImg() {
        new Promise((resolve, reject) => {
          var permissions = cordova.plugins.permissions;
          var list = [
            permissions.WRITE_EXTERNAL_STORAGE,
            //可以写多个权限
          ];
          permissions.requestPermissions(list, (status) => {
            resolve(status)
          }, () => {
            reject()
          })
        }).then((status) => {
          window.canvas2ImagePlugin.saveImageDataToLibrary((msg) => {
              console.log(msg);
              this.$wu.showToast({
                title: `保存成功!`,
                mask: false,
                duration: 2000
              });
            },
            (err) => {
              console.log(err);
              this.$wu.showToast({
                title: '保存失败无权限!',
                mask: false,
                duration: 2000
              });
            },
            document.getElementById('myCanvas')
          )

        }).catch(() => {
          //获取权限失败！！！
          this.$wu.showToast({
            title: `获取权限失败`,
            mask: false,
            duration: 2000
          });
        })
      }
    },
    mounted() {
      this.start();
    },
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
      .sp-1 {
        font-size: px2rem(20);
      }
      .code {
        margin: px2rem(50) 0;
        width: px2rem(300) !important;
        height: px2rem(300) !important;
      }
    }
    .buttons {
      @include center();
      button:first-child {
        margin-right: px2rem(30);
      }
    }
  }
</style>
