import request from '@/utils/request'

export function getPartnerships(size, page) {
  return request({
    url: '/sirius/partnerships',
    method: 'get',
    params: {
      size: size,
      page: page
    }
  })
}

export function getPartnershipsInstaller(bools, size, page) {
  return request({
    url: '/sirius/partnerships?company=' + bools,
    method: 'get',
    params: {
      size: size,
      page: page
    }
  })
}

export function countPartnerships() {
  return request({
    url: '/sirius/partnerships/count',
    method: 'get'
  })
}

export function countPartnershipsInstaller(bools) {
  return request({
    url: '/sirius/partnerships/count?company=' + bools,
    method: 'get'
  })
}

export function createPartnership(data) {
  return request({
    url: '/sirius/partnerships/create',
    method: 'post',
    data
  })
}

export function updatePartnership(id, data) {
  return request({
    url: '/sirius/partnerships/id/' + id,
    method: 'put',
    data
  })
}

export function deletePartnership(id, data) {
  return request({
    url: '/sirius/partnerships/id/' + id,
    method: 'delete',
    data
  })
}
