import request from '@/utils/request'

export function checkout(data) {
  return request({
    url: '/sirius/orders/checkout',
    method: 'post',
    data
  })
}

export function payProfile() {
  return request({
    url: '/sirius/orders/profile',
    method: 'post'
  })
}

export function getOrder(id) {
  return request({
    url: `/sirius/orders/${id}`,
    method: 'get'
  })
}

export function getOrders() {
  return request({
    url: `/sirius/orders`,
    method: 'get'
  })
}

export function countOrders() {
  return request({
    url: `/sirius/orders/count/all`,
    method: 'get'
  })
}
