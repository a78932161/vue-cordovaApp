import request from '@/common/js/fetch';

export function getCode(data) {
  return request({
    url: 'getWxAuthentication',
    method: 'get',
    headers: {"Content-Type": "application/json"},
    params: {
      carModel: data
    }
  })
}
