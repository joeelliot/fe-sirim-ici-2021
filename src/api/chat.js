import request from '@/utils/request'

export function getPublicGroups() {
  return request({
    url: '/chats/groups/public',
    method: 'get'
  })
}

export function getPrivateGroups() {
  return request({
    url: '/chats/groups/private',
    method: 'get'
  })
}

export function getGroupById(id) {
  return request({
    url: '/chats/groups/id/' + id,
    method: 'get'
  })
}

export function createNewGroup(data) {
  return request({
    url: '/chats/groups',
    method: 'post',
    data
  })
}

export function joinGroup(id) {
  return request({
    url: '/chats/groups/join/' + id,
    method: 'post'
  })
}

export function createMessage(id, data) {
  return request({
    url: '/chats/messages/' + id,
    method: 'post',
    data
  })
}
