import { getClients } from '@/api/clients'
import { login, getInfo, getService, joinFilesService } from '@/api/login'
import { signup } from '@/api/signup'

// import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    id: '',
    token: '',
    username: '',
    name: '',
    email: '',
    description: {},
    avatar: '',
    confirmed: false,
    role: '',
    logoUrl: '',
    client: '',

    userData: {}
  },
  getters: {
    id: state => state.id,
    token: state => state.token,
    avatar: state => state.avatar,
    username: state => state.username,
    name: state => state.name,
    email: state => state.email,
    description: state => state.description,
    confirmed: state => state.confirmed,
    role: state => state.role,
    logoUrl: state => state.logoUrl,
    client: state => state.client,
    userData: state => state.userData
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_DESCRIPTION: (state, description) => {
      state.description = description
    },
    SET_CONFIRMED: (state, confirmed) => {
      state.confirmed = confirmed
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_LOGO_URL: (state, logoUrl) => {
      state.logoUrl = logoUrl
    },
    SET_CLIENT: (state, client) => {
      state.client = client
    },
    SET_USER_DATA: (state, userData) => {
      state.userData = userData
    }
  },

  actions: {
    Login({ dispatch, commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          // console.log('data: ' + JSON.stringify(data))
          // setToken(data.jwt)
          commit('SET_TOKEN', data.jwt)
          // commit('SET_NAME', data.user.name)
          commit('SET_USERNAME', data.user.username)
          commit('SET_EMAIL', data.user.email)
          commit('SET_CONFIRMED', data.user.confirmed)
          getClients(userInfo.client).then(response2 => {
            const data2 = response2.length > 0 ? response2[0] : {}
            commit('SET_CLIENT', userInfo.client)
            commit('SET_LOGO_URL', data2.cover_img ? process.env.BASE_API + data2.cover_img.url : '')
            // commit('SET_USER_DATA', data2.userData)
            resolve({ client: userInfo.client, userData: data2.userData, ...data })
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    SignInPlatform({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        // console.log('data: ' + JSON.stringify(data))
        // setToken(data.jwt)
        commit('SET_TOKEN', data.jwt)
        // commit('SET_NAME', data.user.name)
        commit('SET_USERNAME', data.user.username)
        commit('SET_EMAIL', data.user.email)
        commit('SET_CONFIRMED', data.user.confirmed)
        getClients(userInfo.client).then(response2 => {
          const data2 = response2.length > 0 ? response2[0] : {}
          commit('SET_CLIENT', userInfo.client)
          commit('SET_LOGO_URL', data2.cover_img ? process.env.BASE_API + data2.cover_img.url : '')
          // commit('SET_USER_DATA', data2.userData)
          resolve({ client: userInfo.client, userData: data2.userData, ...data })
        })
      })
    },
    Signup({ dispatch, commit }, userInfo) {
      const username = userInfo.get('username').trim()
      return new Promise((resolve, reject) => {
        signup(username, userInfo.get('email'), userInfo.get('password')).then(response => {
          const data = response
          // console.log('data: ' + JSON.stringify(data))
          // setToken(data.jwt)
          commit('SET_TOKEN', data.jwt)
          // commit('SET_NAME', data.user.name)
          commit('SET_USERNAME', data.user.username)
          commit('SET_EMAIL', data.user.email)
          commit('SET_CONFIRMED', data.user.confirmed)
          getClients(userInfo.client).then(response2 => {
            const data2 = response2.length > 0 ? response2[0] : {}
            commit('SET_CLIENT', userInfo.client)
            commit('SET_LOGO_URL', data2.cover_img ? process.env.BASE_API + data2.cover_img.url : '')
            // commit('SET_USER_DATA', data2.userData)
            resolve({ client: userInfo.client, userData: data2.userData, ...data })
          })
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response
          if (data.role && data.role.type) {
            commit('SET_ROLE', data.role.type)
          } else {
            reject('getInfo: role not found !')
          }
          // commit('SET_NAME', data.user.name)
          commit('SET_ID', data._id)
          commit('SET_USERNAME', data.username)
          commit('SET_EMAIL', data.email)
          commit('SET_DESCRIPTION', data.description)
          commit('SET_CONFIRMED', data.confirmed)
          commit('SET_AVATAR', `https://ui-avatars.com/api/?name=${data.username}`)
          getService().then(response2 => {
            const data2 = response2
            commit('SET_USER_DATA', data2.userData)
            resolve({ client: state.client, userData: data2.userData, ...data })
          })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        commit('SET_NAME', '')
        commit('SET_USERNAME', '')
        commit('SET_CLIENT', '')
        commit('SET_LOGO_URL', '')
        commit('SET_EMAIL', '')
        commit('SET_AVATAR', '')
        commit('SET_DESCRIPTION', '')
        commit('SET_CONFIRMED', '')
        commit('SET_USER_DATA', {})
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        // removeToken()
        resolve()
      })
    }
  }
}

export default user
