import request from '@/utils/request'

export function getLocations() {
  return request({
    url: '/sirius/locations',
    method: 'get'
  })
}

export function createLocation(data) {
  return request({
    url: '/sirius/locations/create',
    method: 'post',
    data
  })
}

export function updateLocation(id, data) {
  return request({
    url: '/sirius/locations/id/' + id,
    method: 'put',
    data
  })
}

export function addLocation(id, data) {
  return request({
    url: '/sirius/locations/add/' + id,
    method: 'put',
    data
  })
}

export function deleteLocation(id, data) {
  return request({
    url: '/sirius/locations/id/' + id,
    method: 'delete',
    data
  })
}
