import request from '@/utils/request'

export function getUsers(params) {
  return request({
    url: '/users' + params,
    method: 'get'
  })
}

export function countAll(dates, dateType) {
  return request({
    url: '/jrhajj/users/count',
    method: 'get',
    params: {
      startDate: dates,
      dateType: dateType
    }
  })
}

export function downloadUser(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/users/download',
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

export function getSiriusUsers(size, page) {
  return request({
    url: '/sirius/users',
    method: 'get',
    params: {
      size: size,
      page: page
    }
  })
}

export function getPersonalSiriusUsers(size, page) {
  return request({
    url: '/sirius/users/personal',
    method: 'get',
    params: {
      size: size,
      page: page
    }
  })
}

export function createSiriusUsers(data) {
  return request({
    url: '/sirius/users/create',
    method: 'post',
    data
  })
}

export function updateSiriusUsers(id, data) {
  return request({
    url: '/sirius/users/id/' + id,
    method: 'put',
    data
  })
}

export function removeSiriusUsers(id) {
  return request({
    url: '/sirius/users/id/' + id,
    method: 'delete'
  })
}

export function countSiriusUsers() {
  return request({
    url: '/sirius/users/count',
    method: 'get'
  })
}

export function countPersonalSiriusUsers() {
  return request({
    url: '/sirius/users/count/personal',
    method: 'get'
  })
}

export function updateUser(id, data) {
  return request({
    url: '/users/' + id,
    method: 'put',
    data
  })
}

export function registerUser(data) {
  return request({
    url: '/auth/local/register',
    method: 'post',
    data
  })
}

export function getService() {
  return request({
    url: '/services/all',
    method: 'get'
  })
}

export function getServiceByPackage(pkg) {
  return request({
    url: '/services/all/package/' + pkg,
    method: 'get'
  })
}

export function listServiceByPackage(pkg) {
  return request({
    url: '/services/list/sirius/' + pkg,
    method: 'get'
  })
}

export function forceJoinService(userId, role, userData) {
  return request({
    url: '/services/forcejoin/' + process.env.SERVICE_NAME,
    method: 'post',
    data: {
      userId: userId,
      role: role,
      userData: userData
    }
  })
}

export function updateProfile(id, userData) {
  return request({
    url: '/services/all/' + process.env.SERVICE_NAME + '/' + id,
    method: 'put',
    data: {
      userData: userData
    }
  })
}

export function removeServiceUser(id) {
  return request({
    url: '/services/all/' + process.env.SERVICE_NAME + '/' + id,
    method: 'delete'
  })
}
