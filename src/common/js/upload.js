import axios from '@/common/js/fetch';

import {baseURL} from '@/api/config';

export function uploadImg(img) {
  let promise = new Promise((resolve, reject) => {
    axios(`${baseURL}/sts`).then((result) => {
      let data = result,
        credentials = data.assumeRoleResponse.credentials;
      const client = new OSS({
        // endpoint: result.data.endpoint,
        endpoint: 'https://oss-cn-hangzhou.aliyuncs.com/',
        bucket: data.bucketName,
        accessKeyId: credentials.accessKeyId,
        accessKeySecret: credentials.accessKeySecret,
        stsToken: credentials.securityToken,
      });
      const storeAs = data.resourceId;
      client.put(storeAs, img).then((results) => {
        resolve(results);
      }).catch((err) => {
        reject(err);
      })
    });
  });
  return promise;
}


export function uploadDome(img) {
  let promise = new Promise((resolve, reject) => {
    axios(`${baseURL}/sts`).then((result) => {
      let data = result,
        credentials = data.assumeRoleResponse.credentials;
      const client = new OSS({
        // endpoint: result.data.endpoint,
        endpoint: 'https://oss-cn-hangzhou.aliyuncs.com/',
        bucket: data.bucketName,
        accessKeyId: credentials.accessKeyId,
        accessKeySecret: credentials.accessKeySecret,
        stsToken: credentials.securityToken,
      });
      const storeAs = data.resourceId;
      client.put(storeAs, new Buffer('hello world')).then((results) => {
        resolve(results);
      }).catch((err) => {
        reject(err);
      })
    });
  });
  return promise;
}
