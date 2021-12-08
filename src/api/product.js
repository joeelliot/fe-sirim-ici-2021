import request from '@/utils/request'

export function getProducts(sortProperty, size, page, find, dates, dateType, category) {
  return request({
    url: '/jrhajj/products',
    method: 'get',
    params: {
      sortProperty: sortProperty,
      size: size,
      page: page,
      find: find,
      startDate: dates,
      dateType: dateType,
      category: category
    }
  })
}

export function downloadProduct(size, page, dates, dateType, category) {
  return request({
    url: '/jrhajj/products/download',
    method: 'get',
    params: {
      size: size,
      page: page,
      startDate: dates,
      dateType: dateType,
      category: category
    },
    responseType: 'blob'
  })
}

export function pdfProducts(sortProperty, size, page, find, dates, dateType, category) {
  return request({
    url: '/jrhajj/products/pdf',
    method: 'get',
    params: {
      sortProperty: sortProperty,
      size: size,
      page: page,
      find: find,
      startDate: dates,
      dateType: dateType,
      category: category
    },
    responseType: 'blob'
  })
}

export function populateProducts(id, size, page) {
  return request({
    url: '/jrhajj/products/populate/' + id,
    method: 'get',
    params: {
      size: size,
      page: page
    }
  })
}

export function getTaxes() {
  return request({
    url: '/products/tax',
    method: 'get',
    params: {
      appCode: process.env.SERVICE_NAME
    }
  })
}

export function showProducts(id) {
  return request({
    url: '/jrhajj/products/id/' + id,
    method: 'get'
  })
}

export function createProducts(data) {
  return request({
    url: '/jrhajj/products/create',
    method: 'post',
    data
  })
}


export function uploadProducts(data) {
  return request({
    url: '/jrhajj/products/upload',
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data
  })
}

export function duplicateProduct(id, data) {
  return request({
    url: '/jrhajj/products/duplicate/' + id,
    method: 'post',
    data
  })
}

export function addProducts(id, data) {
  return request({
    url: '/jrhajj/products/add/' + id,
    method: 'post',
    data
  })
}

export function subtractProducts(id, data) {
  return request({
    url: '/jrhajj/products/subtract/' + id,
    method: 'post',
    data
  })
}

export function updateProducts(id, data) {
  return request({
    url: '/jrhajj/products/id/' + id,
    method: 'put',
    data
  })
}

export function removeProducts(id) {
  return request({
    url: '/jrhajj/products/id/' + id,
    method: 'delete'
  })
}

export function countProducts() {
  return request({
    url: '/jrhajj/products/count',
    method: 'get'
  })
}

export function countCurrentProducts() {
  return request({
    url: '/jrhajj/products/count/current',
    method: 'get'
  })
}

export function countTakenProducts(dates, dateType, category) {
  return request({
    url: '/jrhajj/products/count/taken',
    method: 'get',
    params: {
      startDate: dates,
      dateType: dateType,
      category: category
    }
  })
}

export function findProducts(find) {
  return request({
    url: '/jrhajj/products/list',
    method: 'get',
    params: {
      find: find
    }
  })
}
