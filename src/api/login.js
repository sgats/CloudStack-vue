import request from '@/utils/request'

export function validateTicket(ticket) {
  const service =
    window.location.protocol +
    '//' +
    window.location.hostname +
    ':' +
    window.location.port +
    '/login'
  return request({
    url: '/cas/validateTicket',
    method: 'post',
    data: { ticket: ticket, service: service },
  })
}

export function logout(accessToken) {
  return request({
    url: '/cas/logout',
    method: 'post',
    data: { accessToken: accessToken },
  })
}
