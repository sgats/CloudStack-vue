import request from '@/utils/request'

export function test1() {
  return request({
    url: '/cas/userInfo',
    method: 'GET',
    params: {
      id: 5,
    },
  })
}
