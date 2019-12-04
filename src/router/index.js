import Vue from 'vue'
import Router from 'vue-router'
import CommerViews from '@/views/commerViews'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'

// 不是必须加载的组件使用懒加载
const NotFound = () => import('@/page404')
const organManagement = () => import('@/views/setting/organmanagement')
const userManagement = () => import('@/views/setting/usermanagement')
const department = () => import('@/views/setting/department')
const roleManagement = () => import('@/views/setting/rolemanagement')
const oneMenu = () => import('@/views/manymenu/onemenu')
const twoMenu = () => import('@/views/manymenu/twomenu')
const threeMenu = () => import('@/views/manymenu/threemenu')

Vue.use(Router)
let defaultRouter = [
    {
        path: '/',
        redirect: '/index',
        hidden: true,
        children: []
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true,
        children: []
    },
    {
        path: '/404',
        component: NotFound,
        name: '404',
        hidden: true,
        children: []
    }
]

let addRouter = [
    {
        path: '/index',
        iconCls: 'fa fa-home',
        name: '个人中心',
        component: Layout,
        alone: true,
        alias: 'main',
        children: [
            {
                path: '/index',
                iconCls: 'fa fa-home',
                name: '个人中心',
                component: HomeMain,
                alias: 'mainindex',
                children: []
            }
        ]
    },
    {
        path: '/',
        iconCls: 'el-icon-setting',
        name: '基础信息配置',
        component: Layout,
        alias: 'basicset',
        children: [
            {
                path: '/organmanagement',
                name: '组织机构',
                component: organManagement,
                alias: 'organ',
                children: []
            },
            {
                path: '/department',
                name: '部门管理',
                component: department,
                alias: 'departmentmanagement',
                children: []
            },
            {
                path: '/usermanagement',
                name: '用户管理',
                component: userManagement,
                alias: 'user',
                children: []
            },
            {
                path: '/rolemanagement',
                name: '权限管理',
                component: roleManagement,
                alias: 'role',
                children: []
            }
        ]
    },
    {
        path: '/',
        iconCls: 'fa fa-crosshairs',
        name: '多级菜单',
        component: Layout,
        alias: 'manymenu',
        hidden: false,
        children: [
            {
                path: '/',
                name: '一级菜单',
                component: CommerViews, // 无限极菜单的容器
                alias: 'ponelevel',
                children: [
                    {
                        path: '/onemenu',
                        name: '二级菜单1',
                        component: oneMenu,
                        alias: 'ponemenu',
                        children: []
                    },
                    {
                        path: '/twomenu',
                        name: '二级菜单2',
                        component: twoMenu,
                        alias: 'ptwomenu',
                        children: []
                    },
                    {
                        path: '/threemenu',
                        name: '二级菜单3',
                        component: threeMenu,
                        alias: 'pthreemenu',
                        children: []
                    }
                ]
            }
        ]
    }
]

let allAddRouter = [
    {
        path: '/index',
        iconCls: 'fa fa-home',
        name: '个人中心',
        component: Layout,
        alone: true,
        alias: 'main',
        children: [
            {
                path: '/index',
                iconCls: 'fa fa-home',
                name: '个人中心',
                component: HomeMain,
                alias: 'mainindex',
                children: []
            }
        ]
    },
    {
        path: '/',
        iconCls: 'el-icon-setting',
        name: '基础信息配置',
        component: Layout,
        alias: 'basicset',
        children: [
            {
                path: '/organmanagement',
                name: '组织机构',
                component: organManagement,
                alias: 'organ',
                children: []
            },
            {
                path: '/department',
                name: '部门管理',
                component: department,
                alias: 'departmentmanagement',
                children: []
            },
            {
                path: '/usermanagement',
                name: '用户管理',
                component: userManagement,
                alias: 'user',
                children: []
            },
            {
                path: '/rolemanagement',
                name: '权限管理',
                component: roleManagement,
                alias: 'role',
                children: []
            }
        ]
    },
    {
        path: '/',
        iconCls: 'fa fa-crosshairs',
        name: '多级菜单',
        component: Layout,
        alias: 'manymenu',
        hidden: true,
        children: [
            {
                path: '/onelevel',
                name: '一级菜单',
                component: CommerViews, // 无限极菜单的容器
                alias: 'ponelevel',
                children: [
                    {
                        path: '/onemenu',
                        name: '二级菜单1',
                        component: oneMenu,
                        alias: 'ponemenu',
                        children: []
                    },
                    {
                        path: '/twomenu',
                        name: '二级菜单2',
                        component: twoMenu,
                        alias: 'ptwomenu',
                        children: []
                    },
                    {
                        path: '/threemenu',
                        name: '二级菜单3',
                        component: threeMenu,
                        alias: 'pthreemenu',
                        children: []
                    }
                ]
            }
        ]
    }
]

export default new Router({ routes: defaultRouter })
export { defaultRouter, addRouter, allAddRouter }
