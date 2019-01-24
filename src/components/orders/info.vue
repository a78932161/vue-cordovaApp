<template>
  <div class="info" v-cloak>
    <mu-form :model="form" class="mu-demo-form" label-width="200">
      <mu-form-item prop="input" label="客户名">
        <mu-text-field v-model="form.name" placeholder="请输入客户名"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="手机号">
        <mu-text-field v-model="form.phone" placeholder="请输入手机号"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="意向">
        <mu-text-field v-model="form.intention" placeholder="请输入意向"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="车型">
        <mu-text-field v-model="form.carModel" placeholder="请输入车型"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="工作">
        <mu-text-field v-model="form.job" placeholder="请输入工作"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="收入">
        <mu-text-field v-model="form.income" placeholder="请输入收入"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="input" label="婚姻">
        <mu-text-field v-model="form.maritalStatus" placeholder="请输入婚姻"></mu-text-field>
      </mu-form-item>

      <mu-form-item label="上传图片">
        <!--<mu-button @click="openBotttomSheet">图片</mu-button>-->
        <div class="img" @click="openBotttomSheet">
          <span class="iconfont icon-camera_icon"></span>
        </div>
      </mu-form-item>

      <mu-form-item label="所属销售">
        <mu-select filterable v-model="form.value1" full-width>
          <mu-option v-for="(city,index) in citys" :key="index" :label="city" :value="city"></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-form-item class="push">
        <mu-button color="primary" @click="submit()">提交</mu-button>
        <mu-button @click="back()">返回</mu-button>
      </mu-form-item>
    </mu-form>

    <mu-bottom-sheet :open.sync="open">
      <mu-list class="list_btn" @click="closeBottomSheet">
        <mu-list-item button class="btn_list" @click="takePhoto()">
          <mu-list-item-title class="btn_text">拍照</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button class="btn_list" @click="album">
          <mu-list-item-title class="btn_text">从手机相册选择</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button class="btn_list" @click="closeBottomSheet">
          <mu-list-item-title class="btn_text">取消</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>

  </div>
</template>

<script>
  import api from 'graph/ordersInfo.graphql';
  import {Photograph} from "@/common/js/cordovaPlugin";
  import {cameraTakePicture} from "@/common/js/cordovaList";

  export default {
    name: "info",
    data() {
      return {
        form: {
          name: '',
          phone: '',
          intention:'',
          carModel:'',
          job:'',
          income:'',
          maritalStatus:'',
          value1: '',
        },
        citys: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        ],
        open: false,
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
      closeBottomSheet() {
        this.open = false;
      },
      openBotttomSheet() {
        this.open = true;
      },
      takePhoto() {
        console.log('开始拍照');
        cameraTakePicture();
      },
      album() {
        console.log('开始相册');
        let me = this;
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: 0
        });
        function onSuccess(imageURI) {
          me.imgsrc = imageURI;
        }
        function onFail(message) {
          alert('Failed because: ' + message);
        }
      },
      convertBase64UrlToBlob(base64){
        var urlData =  base64.dataURL;
        var type = base64.type;
        var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob( [ab] , {type : type});
      },
      getStatus(data){
        if(data == 'photo'){
          document.getElementById([this.index]).click()
        }if(data == 'camera'){
          Photograph().then((data)=>{
            let file = this.convertBase64UrlToBlob(data);
            this.Ajax(file);
          }).catch((err)=>{
            if(err===20){  //无相机权限
              alert('需要开启相机权限')
            }
          });
        }
        this.Flag=false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";

  .info {

    .mu-demo-form {
      padding: px2rem(10);
      margin-bottom: px2rem(36);
      .img {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        font-size: 28px;
        color: #8c939d;
        width: px2rem(150);
        height: px2rem(150);
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

      }
      .push {
        @include center;
      }
    }

  }
</style>
