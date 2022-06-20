/**
 * @author scm
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
]

export const asyncRoutes = [
  // 首页  开始
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index', //定义首行显示的信息
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  // 首页  结束
  // 详情页组件  开始
  {
    path: '/detailPage',
    component: Layout,
    redirect: 'noRedirect',
    name: 'detail',
    meta: { title: '应用详情', permissions: ['admin'] },
    hidden: true, //该行是说明本组件路由不会显示在页面中左边的菜单栏里
    children: [
      {
        path: ':env/:app_name',
        name: 'AppDetail',
        // name: 'AppDetail',
        component: () => import('@/views/ContainerManagerPage'),
        meta: {
          title: '应用详情',
        },
        hidden: true,
      },
    ],
  },
  // 详情页组件  结束

  // 菜单管理  开始
  {
    path: '/personnelManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '配置', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () =>
          import('@/views/personnelManagement/menuManagement/index'),
        meta: {
          title: '菜单管理',
          icon: 'grip-horizontal',
        },
      },
    ],
  },
  // 菜单管理  结束
  // 工单管理  开始
  {
    path: '/WorkOrderManagement',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '工单管理', icon: 'bars', permissions: ['admin'] },
    children: [
      {
        path: 'serviceapply',
        name: 'Serviceapply',
        component: () => import('@/views/ServiceApplyManager/programadd'),
        meta: { title: '服务申请' },
      },
      {
        path: 'WorkOrderManagement',
        name: 'WorkOrderManagement',
        component: () =>
          import('@/views/ServiceApplyManager/workordershow'),
        meta: {
          title: '工单列表',
        },
      },
      {
        path: 'WorkOrderExamine',
        name: 'WorkOrderExamine',
        component: () =>
          import('@/views/ServiceApplyManager/auditprogram'),
        meta: {
          title: '审查程序',
        },
        hidden: true,
      },
    ],
  },
  // 工单管理  结束
  // 错误页   开始
  // 错误页   结束
  // 测试页  开始
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: { title: '测试页', permissions: ['admin'] },
  //   children: [
  //     {
  //       path: 'test',
  //       name: 'test',
  //       component: () => import('@/views/test/index'),
  //       meta: { title: 'test' },
  //     },
  //   ],
  // },
  {
    path: '/test',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '服务申请页', permissions: ['admin'] },
    children: [
      {
        path: 'test',
        name: 'test',
        component: () =>
          import('@/views/ContainerManagerPage/PackagePush/BuildPackageDialog'),
        meta: { title: 'test' },
      },
    ],
  },
  // {
  //   path: '/pushpackage',
  //   component: Layout,
  //   redirect: 'Redirect',
  //   name: 'pushpackage',
  //   meta: { title: '发布系统', permissions: ['admin'] },
  //   hidden: true, //该行是说明本组件路由不会显示在页面中左边的菜单栏里
  //   children: [
  //     {
  //       name: 'PushPackageDialog',
  //       // name: 'AppDetail',
  //       component: () =>
  //         import('@/views/ContainerManagerPage/PackagePush/PushPackageDialog'),
  //       meta: {
  //         title: '发布系统',
  //       },
  //       // hidden: true,
  //     },
  //   ],
  // },
  // 测试页  结束
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,

  scrollBehavior: () => ({
    x: 0,
    y: 0,
  }),
  routes: constantRoutes,
})

export function resetRouter() {
  location.reload()
}

export default router
