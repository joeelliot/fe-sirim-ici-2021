import request from '@/utils/request'

export function verify(data) {
  return request({
    url: '/payment/verify',
    method: 'post',
    data
  })
}
