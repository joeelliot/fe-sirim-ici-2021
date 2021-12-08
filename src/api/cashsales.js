import request from '@/utils/request'

export function getCashSales(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/cashsales',
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

export function downloadCashSale(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/cashsales/download',
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

export function countCashSales(dates, dateType) {
  return request({
    url: '/jrhajj/cashsales/count',
    method: 'get',
    params: {
      startDate: dates,
      dateType: dateType
    }
  })
}

export function countYearsCashSales(year) {
  return request({
    url: '/jrhajj/cashsales/count/' + year,
    method: 'get'
  })
}

export function createCashSale(data) {
  return request({
    url: '/jrhajj/cashsales/create',
    method: 'post',
    data
  })
}

export function updateCashSale(id, data) {
  return request({
    url: '/jrhajj/cashsales/id/' + id,
    method: 'put',
    data
  })
}

export function deleteCashSale(id) {
  return request({
    url: '/jrhajj/cashsales/id/' + id,
    method: 'delete'
  })
}

// export function duplicateCashSale(id) {
//   return request({
//     url: '/jrhajj/cashsales/duplicate/' + id,
//     method: 'post'
//   })
// }

export function pdfCashSale(id) {
  return request({
    url: '/jrhajj/cashsales/pdf/' + id,
    method: 'get',
    responseType: 'blob'
  })
}

export function receiptCashSale(id) {
  return request({
    url: '/jrhajj/cashsales/receipt/' + id,
    method: 'get',
    responseType: 'blob'
  })
}
