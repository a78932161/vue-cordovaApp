<template>
  <div id="app">
    <router-view class="router-view" v-transition></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    mounted() {
      document.addEventListener("deviceready", function () {
        //手机物理控件监听
        let exitAppTicker = 0;
        document.addEventListener("backbutton", function () {
          if (exitAppTicker == 0) {
            exitAppTicker++;
            setTimeout(function () {
              exitAppTicker = 0;
              history.go(-1);
            }, 200);
          } else if (exitAppTicker == 1) {
            navigator.app.exitApp();
          }
        }, false);

        document.addEventListener('jpush.receiveRegistrationId', function (event) {
          console.log(JSON.stringify(event));
          // alert("receiveRegistrationId" + JSON.stringify(event));
        }, false);


        initiateUI()
      }, false)

      function initiateUI() {
        try {
          window.JPush.setDebugMode(true);
          window.JPush.init();
          window.setTimeout(getRegistrationID, 10000);

          if (device.platform != "Android") {
            window.JPush.setApplicationIconBadgeNumber(0);
          }
        } catch (exception) {
          // alert('An exception has been occured when init JPush plugin.' + exception);
        }
      }

      function getRegistrationID() {
        window.JPush.getRegistrationID(onGetRegistrationID)
      }

      function onGetRegistrationID(data) {
        try {
          if (data.length === 0) {
            // alert('id is null')
            var t1 = window.setTimeout(getRegistrationID, 5000);
          } else {
            // alert('key',data)
          }
        } catch (exception) {
          console.log(exception);
        }
      }

      document.addEventListener("jpush.receiveNotification", function (event) {
        var alertContent
        if (device.platform == "Android") {
          alertContent = event.alert
        } else {
          alertContent = event.aps.alert
        }
        var media = new Media("http://fanyi.baidu.com/gettts?lan=zh&text=%E4%BD%A0%E6%9C%89%E6%96%B0%E6%B6%88%E6%81%AF%E8%AF%B7%E6%B3%A8%E6%84%8F%E6%9F%A5%E6%94%B6");
        media.play();

        alert("open Notification:" + alertContent)

      }, false)


    },

    // watch: {
    //   $route() {
    //     setTimeout(
    //       () => {
    //         this.$wu.hideToast();
    //       }, 10000)
    //   }
    // },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  @import "~common/wu-ui/wu-ui";

  .router-view {
    height: 100vh;
  }
</style>
