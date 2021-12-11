import request from '@/utils/request'

export function getTables(slug) {
  return request({
    url: '/tables',
    method: 'get',
    params: {
      slug
    }
  })
}

export function createDatatable(data) {
  return request({
    url: '/datatables',
    method: 'post',
    data
  })
}

export function updateDatatable(id, data) {
  return request({
    url: '/datatables/' + id,
    method: 'put',
    data
  })
}

export function deleteDatatable(id) {
  return request({
    url: '/datatables/' + id,
    method: 'delete'
  })
}
