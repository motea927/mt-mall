import request from '@/utils/request'

export function getWebUserApi(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export function createWebUserApi(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateWebUserApi(data, id) {
  return request({
    url: `/user/${id}`,
    method: 'patch',
    data
  })
}

export function deleteWebUserApi(id) {
  return request({
    url: `/user/${id}`,
    method: 'delete'
  })
}
