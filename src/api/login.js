import request from '@/common/js/fetch';

export function login(username, password) {
  return request({
    url: '/login/app',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
