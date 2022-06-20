/*
 * @Author: yf.guo07 yf.guo07@zuche.com
 * @Date: 2022-06-07 19:25:46
 * @LastEditors: yf.guo07 yf.guo07@zuche.com
 * @LastEditTime: 2022-06-10 17:35:34
 * @FilePath: /zucheCloudStack-vue/src/api/podsList.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 服务详情页数据获取
export function podsList(env, app_name = null) {
  var label_selector = ''
  if (app_name) {
    label_selector = 'app_name=' + app_name
  }
  return request({
    url: '/k8s/pod/getpods',
    method: 'GET',
    // method: 'post',
    // data: {
    params: {
      env: env,
      label_selector: label_selector,
    },
  })
}

// 服务详情页数据删除
export function del_pods(env, pod_name) {
  return request({
    url: '/k8s/pod/delpods',
    method: 'DELETE',
    params: {
      env: env,
      pod_name: pod_name,
    },
  })
}

//创建元数据
export function appSetinfo(form) {
  return request({
    url: '/app/set_info',
    method: 'POST',
    data: form,
  })
}

//获取项目名
export function appname() {
  return request({
    url: '/app/get_name',
    method: 'GET',
    // params: {},
  })
}

//返回待审批列表
export function appFlow() {
  return request({
    url: '/app/get_unchecked',
    method: 'GET',
    // params: {},
  })
}

//获取详情页面日志信息

export function logOperate(env, app_name) {
  return request({
    url: '/log/operate/get',
    method: 'POST',
    // params: {},
    data: {
      env: env,
      target: app_name,
    },
  })
}

// 获取详情页的接口  最上面那一栏信息  服务名  运行状况  副本等
export function get_replicas(env, app_name = null) {
  var label_selector = ''
  if (app_name) {
    label_selector = 'app_name=' + app_name
  }
  return request({
    url: '/deployment/get_replicas',
    method: 'GET',
    params: {
      env: env,
      app_name: app_name,
    },
  })
}

// 获取详情页当前服务的环境信息
export function get_env(env, app_name = null) {
  return request({
    url: '/app/get_env',
    method: 'GET',
    params: {
      env: env,
      app_name: app_name,
    },
  })
}
