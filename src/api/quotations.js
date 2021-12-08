import request from '@/utils/request'

export function getQuotations(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/quotations',
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

export function downloadQuotation(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/quotations/download',
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

export function countQuotations() {
  return request({
    url: '/jrhajj/quotations/count',
    method: 'get'
  })
}

export function createQuotation(data) {
  return request({
    url: '/jrhajj/quotations/create',
    method: 'post',
    data
  })
}

export function updateQuotation(id, data) {
  return request({
    url: '/jrhajj/quotations/id/' + id,
    method: 'put',
    data
  })
}

export function deleteQuotation(id) {
  return request({
    url: '/jrhajj/quotations/id/' + id,
    method: 'delete'
  })
}

export function duplicateQuotation(id) {
  return request({
    url: '/jrhajj/quotations/duplicate/' + id,
    method: 'post'
  })
}

export function pdfQuotation(id) {
  return request({
    url: '/jrhajj/quotations/pdf/' + id,
    method: 'get',
    responseType: 'blob'
  })
}
