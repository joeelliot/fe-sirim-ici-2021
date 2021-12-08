import request from '@/utils/request'

export function getJobs() {
  return request({
    url: '/sirius/jobs',
    method: 'get'
  })
}

export function countJobs() {
  return request({
    url: '/sirius/jobs/count',
    method: 'get'
  })
}

export function createJob(data) {
  return request({
    url: '/sirius/jobs/create',
    method: 'post',
    data
  })
}

export function updateJob(id, data) {
  return request({
    url: '/sirius/jobs/id/' + id,
    method: 'put',
    data
  })
}

export function deleteJob(id, data) {
  return request({
    url: '/sirius/jobs/id/' + id,
    method: 'delete',
    data
  })
}
