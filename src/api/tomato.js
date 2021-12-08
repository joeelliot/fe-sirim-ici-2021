import request from '@/utils/request'

export function getTomatoBytes(id) {
  return request({
    url: `/tomato/bytes/${id}`,
    method: 'get'
  })
}

export function getTomatoes(size, page, find, dates, dateType) {
  return request({
    url: `/tomato`,
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

export function countTomatoes() {
  return request({
    url: `/tomato/count`,
    method: 'get'
  })
}
