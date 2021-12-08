import request from '@/utils/request'

export function getStaffs(size, page) {
  return request({
    url: '/sirius/staffs',
    method: 'get',
    params: {
      size: size,
      page: page
    }
  })
}

export function countStaffs() {
  return request({
    url: '/sirius/staffs/count',
    method: 'get'
  })
}

export function createStaff(data) {
  return request({
    url: '/sirius/staffs/create',
    method: 'post',
    data
  })
}

export function updateStaff(id, data) {
  return request({
    url: '/sirius/staffs/id/' + id,
    method: 'put',
    data
  })
}

export function deleteStaff(id, data) {
  return request({
    url: '/sirius/staffs/id/' + id,
    method: 'delete',
    data
  })
}
