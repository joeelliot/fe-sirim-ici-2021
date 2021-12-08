import request from '@/utils/request'

export function getCustomercodes(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/customercodes',
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

export function downloadCustomercode(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/customercodes/download',
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

export function findCustomercodes(find) {
  return request({
    url: '/jrhajj/customercodes',
    method: 'get',
    params: {
      find: find
    }
  })
}

export function countCustomercodes() {
  return request({
    url: '/jrhajj/customercodes/count',
    method: 'get'
  })
}

export function createCustomercode(data) {
  return request({
    url: '/jrhajj/customercodes/create',
    method: 'post',
    data
  })
}

export function duplicateCustomercode(id, data) {
  return request({
    url: '/jrhajj/customercodes/duplicate/' + id,
    method: 'post',
    data
  })
}

export function updateCustomercode(id, data) {
  return request({
    url: '/jrhajj/customercodes/id/' + id,
    method: 'put',
    data
  })
}

export function deleteCustomercode(id, data) {
  return request({
    url: '/jrhajj/customercodes/id/' + id,
    method: 'delete',
    data
  })
}
