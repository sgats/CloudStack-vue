import request from 'axios'

export function getRepos(params) {
  return request({
    method: 'get',
    params,
    timeout: 10000,
  })
}

export function getStargazers(params) {
  return request({
    method: 'get',
    params,
    timeout: 10000,
  })
}
