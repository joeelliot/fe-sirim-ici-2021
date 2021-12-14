import request from '@/utils/request'

export function getGraphs(app) {
  return request({
    url: '/graphs',
    method: 'get',
    params: {
      app
    }
  })
}

export function getCards(app) {
  return request({
    url: '/cards',
    method: 'get',
    params: {
      app
    }
  })
}
