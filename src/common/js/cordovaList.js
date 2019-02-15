function cameraAlbum() {
  const options = {
    quality: 100,
    sourceType: 0,
    destinationType: 0,
    encodingType:0,
  };
  let promise = new Promise((resolve, reject) => {
    navigator.camera.getPicture(
      (data) => {
        resolve({
          dataURL: "data:image/jpeg;base64," + data,
          type: "image/jpeg"
        });
      },
      (err) => {    //err===20时为无相机权限
        reject(err);
      },
      options
    )
  });
  return promise;
}

function Photograph() {
  const options = {
    quality: 100,
    correctOrientation:true,
    sourceType:1,
    // encodingType:0,
    // cameraDirection:0,
    // mediaType:0,
    // targetWidth: 400,
    // targetHeight: 400,
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


export {
  Photograph,
  cameraAlbum
}
