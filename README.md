# 如何利用vue+cordova开发app


1.安装全局 cordova cordova.apache.org
http://cordova.apache.org/
npm install -g cordova
cordova create myApp org.apache.cordova.myApp myApp

2.创建vue-cli https://www.npmjs.com/package/vue-cli

npm install -g vue-cli
创建vue-wepack模板，记住不用选test,eslint等选项
vue init webpack my-project

3.把my-project所有文件和文件夹copy到cordova项目中

4.修改配置文件
config/index.js中的dev以下几句：
host: '0.0.0.0', // can be overwritten by process.env.HOST
port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
autoOpenBrowser: true,

config/index.js中的build以下几句:
所有的dist都改为www:
build: {
    // Template for index.html
    index: path.resolve(__dirname, '../www/index.html'),
    assetsRoot: path.resolve(__dirname, '../www'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './', //多加一个点

5.添加vconsole插件
npm install vconsole --save-dev
然后在src/main.js中
import VConsole from 'vconsole'
let vConsole=new VConsole({maxLogNumber:50000});

6.运行命令
开发时npm run dev
构建时npm run build
打包到手机时:cordova platform add android && cordova run android
或者将package.json中的build改为 node build/build.js && cordova run android   然后运行npm run build
