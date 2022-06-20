import request from '@/utils/request'

export function servicelist(app, page, pageSize) {
  return request({
    // url: '/k8s/svc/getsvc',
    url: '/app/search',
    method: 'GET',
    params: {
      app_name: app,
      page: page,
      page_size: pageSize,
    },
  })
}
