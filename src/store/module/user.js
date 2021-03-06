import { login, authorization } from '@/api/user'
import { setToken } from '@/lib/util'

const state = {
  userName: 'Lison',
  rules: {}
}
const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  SET_USER_NAME (state, params) {
    state.userName = params
  },
  SET_RULES (state, rules) {
    state.rules = rules
  }
}
const actions = {
  updateUserName ({ commit, state, rootState, dispatch }) {
    // rootState.appName
  },
  handleLogin ({ commit }, { userName, password }) {
    userName = userName.trim()
    return new Promise((resolve, reject) => {
      login({
        userName,
        password
      }).then(res => {
        setToken(res.data.token)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  authorization ({ commit }, token) {
    return new Promise((resolve, reject) => {
      authorization().then(res => {
        if (parseInt(res.code) === 401) {
          reject(new Error('token error'))
        } else {
          setToken(res.data.token)
          resolve(res.data.rules.page)
          commit('SET_RULES', res.data.rules.component)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout () {
    setToken('')
  }
}

export default {
  getters,
  state,
  mutations,
  actions,
  modules: {
    //
  }
}
