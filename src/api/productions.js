import request from '@/utils/request'

export function getProductions(size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/productions',
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

export function countProductions() {
  return request({
    url: '/jrhajj/productions/count',
    method: 'get'
  })
}

export function addProduction(id, data) {
  return request({
    url: '/jrhajj/productions/add/' + id,
    method: 'post',
    data
  })
}

export function updateProduction(id, data) {
  return request({
    url: '/jrhajj/productions/id/' + id,
    method: 'put',
    data
  })
}

export function deleteProduction(id) {
  return request({
    url: '/jrhajj/productions/id/' + id,
    method: 'delete'
  })
}
