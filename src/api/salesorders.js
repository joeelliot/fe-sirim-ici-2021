import request from '@/utils/request'

export function getSalesOrders(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/salesorders',
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

export function downloadSalesOrder(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/salesorders/download',
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

export function countPendingSalesOrders(dates, dateType) {
  return request({
    url: '/jrhajj/salesorders/count/pending',
    method: 'get',
    params: {
      startDate: dates,
      dateType: dateType
    }
  })
}

export function countSalesOrders(dates, dateType) {
  return request({
    url: '/jrhajj/salesorders/count',
    method: 'get',
    params: {
      startDate: dates,
      dateType: dateType
    }
  })
}

export function countYearsSalesOrders(year) {
  return request({
    url: '/jrhajj/salesorders/count/' + year,
    method: 'get'
  })
}

export function createSalesOrder(data) {
  return request({
    url: '/jrhajj/salesorders/create',
    method: 'post',
    data
  })
}

export function updateSalesOrder(id, data) {
  return request({
    url: '/jrhajj/salesorders/id/' + id,
    method: 'put',
    data
  })
}

export function deleteSalesOrder(id) {
  return request({
    url: '/jrhajj/salesorders/id/' + id,
    method: 'delete'
  })
}

// export function duplicateSalesOrder(id) {
//   return request({
//     url: '/jrhajj/salesorders/duplicate/' + id,
//     method: 'post'
//   })
// }

export function pdfSalesOrder(id) {
  return request({
    url: '/jrhajj/salesorders/pdf/' + id,
    method: 'get',
    responseType: 'blob'
  })
}
