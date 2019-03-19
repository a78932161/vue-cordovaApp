<template>
  <div class="info" v-cloak>
    <mu-form :model="form" class="mu-demo-form" label-width="200">
      <div>
        <mu-form-item label="咨询时间">
          <mu-date-input disabled v-model="form.createtime" type="dateTime" full-width landscape></mu-date-input>
        </mu-form-item>
        <mu-form-item label="所属销售" v-if="name==='门店管理员'">
          <mu-select v-if="form.status!== 2" :disabled="!name==='门店管理员'" v-model="form.salesConsultantId" full-width>
            <mu-option v-for="(city,index) in citys" :key="index" :label="city.name" :value="city.id"></mu-option>
          </mu-select>
          <mu-select v-if="form.status=== 2" :disabled="true" v-model="form.salesConsultantId" full-width>
            <mu-option v-for="(city,index) in citys" :key="index" :label="city.name" :value="city.id"></mu-option>
          </mu-select>
        </mu-form-item>

        <mu-form-item prop="input" label="客户名">
          <mu-text-field :disabled="end" v-model="form.name" placeholder="请输入客户名"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="手机号">
          <mu-text-field :disabled="end" v-model="form.phone" placeholder="请输入手机号"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="意向">
          <mu-text-field :disabled="end" v-model="form.intention" placeholder="请输入意向"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="车型">
          <mu-text-field :disabled="end" v-model="form.carModel" placeholder="请输入车型"></mu-text-field>
        </mu-form-item>

        <mu-form-item prop="input" label="首付比例">
          <mu-text-field :disabled="end" v-model="form.paymentRatio" placeholder="请输入车型"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="购车时间">
          <mu-text-field :disabled="end" v-model="form.buyTime" placeholder="请输入车型"></mu-text-field>
        </mu-form-item>

        <mu-form-item prop="input" label="工作">
          <mu-text-field :disabled="end" v-model="form.job" placeholder="请输入工作"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="收入">
          <mu-text-field :disabled="end" v-model="form.income" placeholder="请输入收入"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="婚姻">
          <mu-text-field :disabled="end" v-model="form.maritalStatus" placeholder="请输入婚姻"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="上传图片">
          <!--<mu-button @click="openBotttomSheet">图片</mu-button>-->
          <div class="img" @click="openBotttomSheet" v-if="!end">
            <span v-if="!imges" class="iconfont icon-camera_icon"></span>
            <img v-if="imges" :src="imges">
          </div>
          <div class="img" v-if="end">
            <img :src="imges">
          </div>
        </mu-form-item>
      </div>

      <mu-form-item class="push">
        <mu-button color="primary" @click="submit()" v-if="!end">提交</mu-button>
        <mu-button color="primary" @click="submit()" v-if="name==='门店管理员'&&form.status!== 2">提交</mu-button>
        <mu-button @click="back()">返回</mu-button>
      </mu-form-item>
    </mu-form>
    <mu-bottom-sheet :open.sync="open" v-if="name==='销售顾问'">
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
  import {Photograph, cameraAlbum} from "@/common/js/cordovaList";
  import {uploadImg} from "@/common/js/upload";
  import {mapGetters} from 'vuex'

  export default {
    name: "info",
    computed: mapGetters([
      'name',
      'storeId'
    ]),
    data() {
      return {
        form: {
          name: '',
          phone: '',
          intention: '',
          carModel: '',
          job: '',
          income: '',
          maritalStatus: '',
          salesConsultantId: '',
        },
        citys: [],
        open: false,
        imges: '',
        imgUrl: 'https://image.buymycar.cn/',
        end: false,
      }
    },
    mounted() {
      this.getInfo();
    },
    methods: {
      getInfo() {
        if (this.name === '门店管理员') {
          this.end = true;
          this.$wu.showLoading('loading...');
          this.$apollo.query({
            query: api.getConsult,
            variables: {id: this.$route.query.id},
            fetchPolicy: 'network-only',
          }).then(res => {
            this.form = JSON.parse(JSON.stringify(res.data.Consult));
            if (res.data.Consult.status === 2) {
              this.imges = this.form.img;
              this.end = true;
              if (this.form.salesConsultantAdmin['id']) {
                this.form.salesConsultantId = this.form.salesConsultantAdmin['id'];
              }
            }
            this.$wu.hideToast();
            this.$apollo.query({
              query: api.getSalesperson,
              variables: {storeId: this.storeId, salesperson: '销售顾问'},
              fetchPolicy: 'network-only',
            }).then((res1) => {
              this.citys = JSON.parse(JSON.stringify(res1.data.AdminList.content));
              this.end = true;
            });
          }).catch(err => {
            this.$wu.hideToast();
          })
        } else {
          this.$wu.showLoading('loading...');
          this.$apollo.query({
            query: api.getConsult,
            variables: {id: this.$route.query.id},
            fetchPolicy: 'network-only',
          }).then(res => {
            this.form = JSON.parse(JSON.stringify(res.data.Consult));
            if (res.data.Consult.status === 2) {
              this.imges = this.form.img;
              this.end = true;
            }
            this.$wu.hideToast();
          }).catch(err => {
            this.$wu.hideToast();
          })
        }
      },
      back() {
        this.$router.push('/orders');
      },
      submit() {
        if (this.name === '门店管理员') {
          let apiQl = '';
          let apiId = '';
          switch (this.form.status) {
            case 0:
              apiQl = api.consult_allocate;
              apiId = {salesId: this.form.salesConsultantId, id: this.$route.query.id};
              break;
            case 1:
              apiQl = api.consult_changeToSalesConsultant;
              apiId = {salesId: this.form.salesConsultantId, id: this.$route.query.id};
              break;
          }
          this.$apollo.mutate({
            mutation: apiQl,
            variables: apiId,
          }).then(res => {
            if (res.dataPresent) {
              this.$wu.showToast({
                title: '操作成功 !',
                mask: false,
                duration: 2000
              });
            }
          }).catch(err => {

          })

        } else {

          delete this.form['createtime'];
          this.$apollo.mutate({
            mutation: api.consult_modify,
            variables: {consult: this.form}
          }).then(res => {
            if (res.dataPresent) {
              this.end = true;
              this.$wu.showToast({
                title: '保存成功 !',
                mask: false,
                duration: 2000
              });
              if (this.imges) {
                this.$apollo.mutate({
                  mutation: api.consult_finish,
                  variables: {id: this.$route.query.id}
                }).then((res1) => {
                  if (res1.dataPresent) {
                    this.end = true;
                    this.$wu.showToast({
                      title: '保存成功 !',
                      mask: false,
                      duration: 2000
                    });
                  }
                })
              }
            }
          })
        }
      },
      closeBottomSheet() {
        this.open = false;
      },
      openBotttomSheet() {
        this.open = true;
      },
      takePhoto() {
        console.log('开始拍照');
        Photograph().then((res) => {
          this.$wu.showLoading('上传中...');
          let file = this.convertBase64UrlToBlob(res);
          uploadImg(file).then(res => {
            console.log(res);
            if (res.name) {
              this.imges = `${this.imgUrl}${res.name}`;
              this.form['img'] = this.imges;
              this.$wu.hideToast();
              this.$wu.showToast({
                title: '上传完成后,保存信息将会完结,如果不完结请点击返回!',
                mask: false,
                duration: 5000
              });
            }
          }).catch(err => {
            this.$wu.showToast({
              title: err,
              mask: false,
              duration: 2000
            });
          })
        }).catch((err) => {
          if (err === 20) {  //无相机权限
            this.$wu.showToast({
              title: '需要开启相机权限',
              mask: false,
              duration: 2000
            });
            console.log(err);
          } else {
            this.$wu.showToast({
              title: err,
              mask: false,
              duration: 2000
            });
          }
        });
      },
      album() {
        console.log('开始相册');
        cameraAlbum().then((res) => {
          this.$wu.showLoading('上传中...');
          let file = this.convertBase64UrlToBlob(res);
          uploadImg(file).then(res => {
            console.log(res);
            if (res.name) {
              this.imges = `${this.imgUrl}${res.name}`;
              this.form['img'] = this.imges;
              this.$wu.hideToast();
              this.$wu.showToast({
                title: '上传完成后,保存信息将会完结,如果不完结请点击返回!',
                mask: false,
                duration: 5000
              });
            }
          }).catch(err => {
            console.log(err);
            this.$wu.showToast({
              title: err,
              mask: false,
              duration: 2000
            });
          })
        }).catch((err) => {
          if (err === 20) {  //无相机权限
            this.$wu.showToast({
              title: '需要开启相机权限',
              mask: false,
              duration: 2000
            });
          } else {
            this.$wu.showToast({
              title: '请选择jpg格式的图片',
              mask: false,
              duration: 2000
            });
          }
        });
      },
      convertBase64UrlToBlob(base64) {
        var urlData = base64.dataURL;
        var type = base64.type;
        var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type: type});
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/css/global";

  .info {

    .mu-demo-form {
      padding: px2rem(10);
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
        img {
          width: px2rem(150);
          height: px2rem(150);
        }

      }
      .push {
        @include center;
      }
    }

  }
</style>
