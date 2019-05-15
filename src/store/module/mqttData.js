
const state = {
  client:{},
  basicData:'',
  client_id:''
}

const getters = {
  showStateClient(state) {
    return state.client
  },
  showBasicData(state) {
    return state.basicData
  }
}

const mutations = {
  saveClientObj(state,client){
    state.client=client
    console.log('state',state.client);
  },
  saveBasicDataArr(state,basicData){
    state.basicData=basicData
  }
}

const actions = {
  saveClient({commit}, client) {
    commit('saveClientObj', client)    // 提交到mutations中处理    
  },
  saveBasicData({commit}, basicData) {
    commit('saveBasicDataArr', basicData)    // 提交到mutations中处理    
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}