
const state = {
  client:{},
  basicData:[],
  client_id:''
}

const getters = {
  showStateClient(state) {
    return state.client
}
}

const mutations = {
  saveClientObj(state,client){
    state.client=client
    console.log('state',state.client);
  }
}

const actions = {
  saveClient({commit}, msg) {
    commit('saveClientObj', msg)    // 提交到mutations中处理    
}
}

export default {
  state,
  getters,
  mutations,
  actions
}