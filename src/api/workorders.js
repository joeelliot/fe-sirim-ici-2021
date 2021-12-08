import request from '@/utils/request'

export function getWorkOrders(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/workorders',
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

export function downloadWorkOrder(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/workorders/download',
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

export function countWorkOrders(dates, dateType) {
  return request({
    url: '/jrhajj/workorders/count',
    method: 'get',
    params: {
      startDate: dates,
      dateType: dateType
    }
  })
}

export function createWorkOrder(data) {
  return request({
    url: '/jrhajj/workorders/create',
    method: 'post',
    data
  })
}

export function updateWorkOrder(id, data) {
  return request({
    url: '/jrhajj/workorders/id/' + id,
    method: 'put',
    data
  })
}

export function deleteWorkOrder(id) {
  return request({
    url: '/jrhajj/workorders/id/' + id,
    method: 'delete'
  })
}

export function pdfWorkOrder(id) {
  return request({
    url: '/jrhajj/workorders/pdf/' + id,
    method: 'get',
    responseType: 'blob'
  })
}
