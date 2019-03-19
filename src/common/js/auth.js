/**
 * Created by Administrator on 2017/12/11.
 */




let TokenKey = 'x-auth-token';

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  sessionStorage.removeItem(TokenKey);
  // window.JPush.cleanTags({sequence: 1},
  //   (result) => {
  //   }, (error) => {
  //   })
}

let limited = 'x-auth-limited';

export function getLimited() {
  return sessionStorage.getItem(limited);
}

export function setLimited(data) {
  sessionStorage.setItem(limited, data);
}


let limitedUrl = 'x-auth-limitedUrl';

export function getLimitedUrl() {
  return sessionStorage.getItem(limitedUrl);
}

export function setLimitedUrl(data) {
  sessionStorage.setItem(limitedUrl, data);
}






