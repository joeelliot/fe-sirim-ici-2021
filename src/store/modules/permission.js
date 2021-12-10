import Layout from '../../views/admin/layout/Layout'
import { getClients } from '@/api/clients.js'
import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * meta role
 * @param roles
 * @param route
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.indexOf(role) >= 0
  } else {
    return true
  }
}
function hasCompany(company, route) {
  if (route.meta && route.meta.company) {
    if (company) {
      return true
    }
    return false
  } else {
    return true
  }
}

/**
 * filter
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, role, company) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(role, route) && hasCompany(company, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  getters: {
    permission_routers: state => state.routers,
    addRouters: state => state.addRouters
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    RESET_ROUTERS: (state) => {
      state.addRouters = []
      state.routers = constantRouterMap
    }
  },
  actions: {
    GenerateRoutes({ commit }, { role, client }) {
      return new Promise(async resolve => {
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, role)
        const accessedRouters = [
          {
            path: `/${client}/dashboard`,
            component: Layout,
            redirect: 'dashboard',
            name: 'Dashboard',
            meta: { title: 'Dashboard' },
            children: [{
              path: '',
              component: () => import('@/views/admin/dashboard/index'),
              meta: { title: 'Dashboard', icon: 'el-icon-monitor' }
            },
            {
              path: 'instance',
              component: () => import('@/views/admin/dashboard/index'),
              name: 'New Instance',
              meta: { title: 'New Instance' },
              hidden: true
            }]
          }
        ]

        const resp = await getClients(client)
        if (resp.length > 0) {
          for (var i in resp[0].menus) {
            const menu = resp[0].menus[i]
            const table = resp[0].tables.find((v) => v._id === menu.table) ? resp[0].tables.find((v) => v._id === menu.table) : {}
            // console.log(menu.name)
            // console.log({
            //   path: `/${client}/${table.slug}`,
            //   component: Layout,
            //   redirect: `${table.slug}`,
            //   name: `${table.slug}`,
            //   meta: { title: `${menu.name}` },
            //   children: [{
            //     path: '',
            //     component: () => import('@/views/admin/pages/index'),
            //     meta: { title: `${menu.name}`, icon: 'el-icon-takeaway-box' }
            //   }]
            // })
            accessedRouters.push({
              path: `/${client}/${table.slug}`,
              component: Layout,
              redirect: `${table.slug}`,
              name: `${table.slug}`,
              meta: { title: `${menu.name}` },
              children: [{
                path: '',
                component: () => import('@/views/admin/pages/index'),
                meta: { title: `${menu.name}`, icon: 'el-icon-takeaway-box' }
              }]
            })
          }
        }

        console.log(accessedRouters)

        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    ResetRoutes({ commit }) {
      return new Promise(resolve => {
        commit('RESET_ROUTERS')
        resolve()
      })
    }
  }
}

export default permission
