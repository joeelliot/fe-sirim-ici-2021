import request from '@/utils/request'

export function getAgents(category, size, page, find, dates, dateType) {
  return request({
    url: '/jrhajj/agents',
    method: 'get',
    params: {
      category: category,
      size: size,
      page: page,
      find: find,
      startDate: dates,
      dateType: dateType
    }
  })
}

export function downloadAgent(size, page, dates, dateType) {
  return request({
    url: '/jrhajj/agents/download',
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

export function findAgents(find) {
  return request({
    url: '/jrhajj/agents/find',
    method: 'get',
    params: {
      find: find
    }
  })
}

export function countAgents() {
  return request({
    url: '/jrhajj/agents/count',
    method: 'get'
  })
}

export function createAgent(data) {
  return request({
    url: '/jrhajj/agents/create',
    method: 'post',
    data
  })
}

export function duplicateAgent(id, data) {
  return request({
    url: '/jrhajj/agents/duplicate/' + id,
    method: 'post',
    data
  })
}

export function updateAgent(id, data) {
  return request({
    url: '/jrhajj/agents/id/' + id,
    method: 'put',
    data
  })
}

export function deleteAgent(id, data) {
  return request({
    url: '/jrhajj/agents/id/' + id,
    method: 'delete',
    data
  })
}
