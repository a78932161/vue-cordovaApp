//cordova plugin add
//cordova-plugin-barcodescanner   cordova-plugin-camera

export function Photograph() {
  const options = {
    quality: 100,
    // encodingType:0,
    // cameraDirection:0,
    // mediaType:0,
    targetWidth: 400,
    targetHeight: 400,
  };
  let promise = new Promise((resolve, reject) => {
    navigator.camera.getPicture(
      (data) => {
        console.log('js');
        let canvas = document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
          let dataURL = canvas.toDataURL("image/" + ext);
          resolve({
            dataURL: dataURL,
            type: "image/" + ext
          });
          canvas = null;
        };
        img.src = data;
      },
      (err) => {    //err===20时为无相机权限
        reject(err);
      },
      options
    )
  });
  return promise;
}


export function Scanner() {
  let promise = new Promise((resolve, reject) => {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        resolve(result);
      },
      function (error) {
        reject(error);
      }
    );
  });
  return promise;

}


/*
Photograph().then((data)=>{
  this.imgUrls=data;
}).catch((err)=>{
  if(err===20){  //无相机权限
    alert('需要开启相机权限')
  }
});*/


/*
Scanner().then((result)=>{
  let code=result.text;
  code?alert(`code:${result.text}`):'';
}).catch((error)=>{
  alert("此操作需要手机权限");
});*/
