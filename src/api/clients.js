import request from '@/utils/request'

export function getClients(slug) {
  return request({
    url: '/clients',
    method: 'get',
    params: {
      slug
    }
  })
}
