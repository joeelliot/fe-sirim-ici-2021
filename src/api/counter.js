import request from '@/utils/request'

export function getUserCounters() {
  return request({
    url: '/counters/user',
    method: 'get'
  })
}

export function postCounter() {
  return request({
    url: '/counters',
    method: 'post'
  })
}
