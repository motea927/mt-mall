import request from '@/utils/request'

export function getOrderApi(params) {
  return request({
    url: '/order',
    method: 'get',
    params
  })
}
