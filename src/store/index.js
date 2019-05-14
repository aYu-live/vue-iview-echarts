import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './module/user'
import router from './module/router'
import tabNav from './module/tabNav'
import mqttData from './module/mqttData'
// import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    router,
    tabNav,
    mqttData
  }
  // plugins: [ saveInLocal ]
})
