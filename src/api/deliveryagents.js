import request from '@/utils/request'

export function getDeliveryAgents(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/deliveryagents',
    method: 'get',
    params: {
      size: size,
      page: page,
      find: find,
      startDate: dates,
      dateType: dateType
    }
  })
}

export function countDeliveryAgents() {
  return request({
    url: '/jrhajj/deliveryagents/count',
    method: 'get'
  })
}

export function createDeliveryAgent(data) {
  return request({
    url: '/jrhajj/deliveryagents/create',
    method: 'post',
    data
  })
}

export function addDeliveryAgent(id, data) {
  return request({
    url: '/jrhajj/deliveryagents/add/' + id,
    method: 'post',
    data
  })
}

export function updateDeliveryAgent(id, data) {
  return request({
    url: '/jrhajj/deliveryagents/id/' + id,
    method: 'put',
    data
  })
}

export function deleteDeliveryAgent(id) {
  return request({
    url: '/jrhajj/deliveryagents/id/' + id,
    method: 'delete'
  })
}
