import request from '@/utils/request'

export function getInvoices(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/invoices',
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

export function downloadInvoice(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/invoices/download',
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

export function countInvoices(dates, dateType) {
  return request({
    url: '/jrhajj/invoices/count',
    method: 'get',
    params: {
      startDate: dates,
      dateType: dateType
    }
  })
}

export function createInvoice(data) {
  return request({
    url: '/jrhajj/invoices/create',
    method: 'post',
    data
  })
}

export function updateInvoice(id, data) {
  return request({
    url: '/jrhajj/invoices/id/' + id,
    method: 'put',
    data
  })
}

export function deleteInvoice(id) {
  return request({
    url: '/jrhajj/invoices/id/' + id,
    method: 'delete'
  })
}

// export function duplicateInvoice(id) {
//   return request({
//     url: '/jrhajj/invoices/duplicate/' + id,
//     method: 'post'
//   })
// }

export function pdfInvoice(id) {
  return request({
    url: '/jrhajj/invoices/pdf/' + id,
    method: 'get',
    responseType: 'blob'
  })
}
