import request from '@/utils/request'

export function getFulfillments(typeCode, size, page) {
  return request({
    url: '/sirius/fulfillments?typeCode=' + typeCode,
    method: 'get',
    params: {
      size: size,
      page: page
    }
  })
}

export function countFulfillments(typeCode) {
  return request({
    url: '/sirius/fulfillments/count?typeCode=' + typeCode,
    method: 'get'
  })
}

export function createFulfillment(data) {
  return request({
    url: '/sirius/fulfillments/create',
    method: 'post',
    data
  })
}

export function appendFulfillment(id, data) {
  return request({
    url: '/sirius/fulfillments/append/' + id,
    method: 'post',
    data
  })
}

export function uploadFulfillmentSTB(data) {
  return request({
    url: '/sirius/fulfillments/upload/stb',
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data
  })
}

export function uploadFulfillmentODU(data) {
  return request({
    url: '/sirius/fulfillments/upload/odu',
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data
  })
}

export function assignFulfillmentSTB(data) {
  return request({
    url: '/sirius/fulfillments/assign/stb',
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data
  })
}

export function assignFulfillmentODU(data) {
  return request({
    url: '/sirius/fulfillments/assign/odu',
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data
  })
}

export function updateFulfillment(id, data) {
  return request({
    url: '/sirius/fulfillments/id/' + id,
    method: 'put',
    data
  })
}

export function addFulfillment(id, data) {
  return request({
    url: '/sirius/fulfillments/add/' + id,
    method: 'put',
    data
  })
}

export function deleteFulfillment(id, data) {
  return request({
    url: '/sirius/fulfillments/id/' + id,
    method: 'delete',
    data
  })
}
