import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  projectReadonly:true,//项目详情是否只读。
  projectStatus:0,
  regionItem:true
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
  PROJECT_READONLY:state=>{
    state.projectReadonly=false;
  }
}
const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeReadonly({commit}){
    commit("PROJECT_READONLY");
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
