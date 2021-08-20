import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/superuser/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/superuser/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/superuser/logout',
    method: 'post'
  })
}
