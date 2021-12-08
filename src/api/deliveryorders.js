import request from '@/utils/request'

export function getDeliveryOrders(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/deliveryorders',
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

export function downloadDeliveryOrder(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/deliveryorders/download',
    method: 'get',
    params: {
      size: size,
      page: page,
      startDate: dates,
      dateType: dateType
    },
    responseType: 'blob'
  })
}

export function countDeliveryOrders() {
  return request({
    url: '/jrhajj/deliveryorders/count',
    method: 'get'
  })
}

export function createDeliveryOrder(data) {
  return request({
    url: '/jrhajj/deliveryorders/create',
    method: 'post',
    data
  })
}

export function updateDeliveryOrder(id, data) {
  return request({
    url: '/jrhajj/deliveryorders/id/' + id,
    method: 'put',
    data
  })
}

export function deleteDeliveryOrder(id) {
  return request({
    url: '/jrhajj/deliveryorders/id/' + id,
    method: 'delete'
  })
}

// export function duplicateDeliveryOrder(id) {
//   return request({
//     url: '/jrhajj/deliveryorders/duplicate/' + id,
//     method: 'post'
//   })
// }

export function pdfDeliveryOrder(id) {
  return request({
    url: '/jrhajj/deliveryorders/pdf/' + id,
    method: 'get',
    responseType: 'blob'
  })
}
