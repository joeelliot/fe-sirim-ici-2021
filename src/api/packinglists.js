import request from '@/utils/request'

export function getPackingLists(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/packinglists',
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

export function downloadPackingList(id) {
  return request({
    url: '/jrhajj/packinglists/download/' + id,
    method: 'get',
    responseType: 'blob'
  })
}

export function boxPackingList(id) {
  return request({
    url: '/jrhajj/packinglists/box/' + id,
    method: 'get'
  })
}

export function populatePackingLists(id) {
  return request({
    url: '/jrhajj/packinglists/populate/' + id,
    method: 'get'
  })
}

export function countPackingLists() {
  return request({
    url: '/jrhajj/packinglists/count',
    method: 'get'
  })
}

export function addPackingList(id, data) {
  return request({
    url: '/jrhajj/packinglists/add/' + id,
    method: 'post',
    data
  })
}

export function pdfPackingList(id) {
  return request({
    url: '/jrhajj/packinglists/pdf/' + id,
    method: 'get',
    responseType: 'blob'
  })
}

export function qrcodePackingList(id) {
  return request({
    url: '/jrhajj/packinglists/qrcode/' + id,
    method: 'get',
    responseType: 'blob'
  })
}

export function updatePackingList(id, data) {
  return request({
    url: '/jrhajj/packinglists/id/' + id,
    method: 'put',
    data
  })
}

export function deletePackingList(id) {
  return request({
    url: '/jrhajj/packinglists/id/' + id,
    method: 'delete'
  })
}

export function deletePackingListBox(id) {
  return request({
    url: '/jrhajj/packinglists/box/' + id,
    method: 'delete'
  })
}
