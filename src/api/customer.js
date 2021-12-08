import request from '@/utils/request'

export function getCustomers(category, size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/customers',
    method: 'get',
    params: {
      category: category,
      size: size,
      page: page,
      find: find,
      startDate: dates,
      dateType: dateType
    }
  })
}

export function downloadCustomer(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/customers/download',
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

export function findCustomers(find) {
  return request({
    url: '/jrhajj/customers',
    method: 'get',
    params: {
      find: find
    }
  })
}

export function countCustomers() {
  return request({
    url: '/jrhajj/customers/count',
    method: 'get'
  })
}

export function createCustomer(data) {
  return request({
    url: '/jrhajj/customers/create',
    method: 'post',
    data
  })
}

export function duplicateCustomer(id, data) {
  return request({
    url: '/jrhajj/customers/duplicate/' + id,
    method: 'post',
    data
  })
}

export function updateCustomer(id, data) {
  return request({
    url: '/jrhajj/customers/id/' + id,
    method: 'put',
    data
  })
}

export function deleteCustomer(id, data) {
  return request({
    url: '/jrhajj/customers/id/' + id,
    method: 'delete',
    data
  })
}
