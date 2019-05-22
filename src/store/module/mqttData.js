
const state = {
  client:{},
  basicData:'',
  allData:[],
  client_id:'',
  airMax:[],
  airMin:[],
  airReal:[],
  airOpen:[],
  tempReal:[]
}

const getters = {
  showStateClient(state) {
    return state.client
  },
  showBasicData(state) {
    return state.basicData
  },
  showAllData(state) {
    return state.allData
  },
  showAirMax(state){
    console.log('showAirMax',state.airMax);
    return state.airMax
  },
  showAirMin(state){
    return state.airMin
  },
  showAirReal(state){
    return state.airReal
  },
  showAirOpen(state){
    return state.airOpen
  },
  showTempReal(state){
    return state.tempReal
  }
}

const mutations = {
  saveClientObj(state,client){
    state.client=client
  },
  saveBasicDataArr(state,basicData){
    state.basicData=basicData
  },
  saveAllDataArr(state,allData){
    state.allData=allData
  },
  saveAirMax(state,airMax){
    state.airMax=airMax
  },
  saveAirMin(state,airMin){
    state.airMin=airMin
  },
  saveAirReal(state,airReal){
    state.airReal=airReal
  },
  saveAirOpen(state,airOpen){
    state.airOpen=airOpen
  },
  saveTempReal(state,tempReal){
    state.tempReal=tempReal
  }
}

const actions = {
  saveClient({commit}, client) {
    commit('saveClientObj', client)    // 提交到mutations中处理    
  },
  saveBasicData({commit}, basicData) {
    commit('saveBasicDataArr', basicData)    // 提交到mutations中处理    
  },
  saveAllData({commit}, allData) {
    commit('saveAllDataArr', allData)    // 提交到mutations中处理    
  },
  saveAirMaxData({commit}, airMax) {
    commit('saveAirMax', airMax)    // 提交到mutations中处理    
  },
  saveAirMinData({commit}, airMin) {
    commit('saveAirMin', airMin)    // 提交到mutations中处理    
  },
  saveAirRealData({commit}, airReal) {
    commit('saveAirReal', airReal)    // 提交到mutations中处理    
  },
  saveAirOpenData({commit}, airOpen) {
    commit('saveAirOpen', airOpen)    // 提交到mutations中处理    
  },
  saveTempRealData({commit}, tempReal) {
    commit('saveTempReal', tempReal)    // 提交到mutations中处理    
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}