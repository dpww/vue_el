import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
    width: Number(Cookies.get('sidebarWidth'))||(Cookies.get('sidebarStatus')==1?200:(Cookies.get('sidebarStatus')?56:200)),
    dragging:false
  },
  device: 'desktop',
  loading:false,
  trackPageView:[],
  loadings:0//正在发送请求的个数
}

const mutations = {
  /* 修改菜单宽度*/
  CHANGRWIDTH:(state,width)=>{
    state.sidebar.width=width;
    Cookies.set('sidebarWidth', width);
  },
  /* 是否在拖动中*/
  DRAGGING:state=>{
    state.sidebar.dragging=!state.sidebar.dragging
  },
  /* 添加正在发送请求的次数*/
  ADDLOADING:state=>{
    state.loadings++;
    state.loading=true;
  },
  /* 减少正在发送请求的次数*/
  REDUCELOADING:state=>{
    state.loadings--;
    if(state.loadings<=0){
      state.loading=false;
    }
  },
  /* 清空请求*/
  CLOSELOADING:state=>{
    state.Loadings=0;
    state.loading=false;
  },
  TOGGLE_SIDEBAR: (state,value)=> {
    state.sidebar.opened =value!=undefined?value:!state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
      Cookies.set('sidebarWidth', 200);
    } else {
      Cookies.set('sidebarStatus', 0)
       Cookies.set('sidebarWidth', 56);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_LOADING:state=>{
    state.loading=!state.loading;
  },
  TRACK_RAGE_VIEW:(state,into)=>{
    if(state.trackPageView.indexOf(into)===-1){
      state.trackPageView.push(into);
      _paq.push(['trackPageView',into]);
    }
  }
}

const actions = {
  toggleSideBar({ commit },value) {
    commit('TOGGLE_SIDEBAR',value);
    if(value){
      commit("CHANGRWIDTH",200);
    }else{
      commit("CHANGRWIDTH",56);
    }
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleLoading({commit}){
    commit('TOGGLE_LOADING');
  },
  addLoadings({commit}){
    commit("ADDLOADING");
  },
  reduceLoadings({commit}){
    commit("REDUCELOADING");
  },
  closeLoadings({commit}){
    commit("CLOSELOADING");
  },
  trackPageView({commit},into){
    commit("TRACK_RAGE_VIEW",into);
  },
  changeWidth({commit},width){
    if(width>56){
       commit('TOGGLE_SIDEBAR',true);
    }else{
       commit('TOGGLE_SIDEBAR',false);
    }
    commit("CHANGRWIDTH",width);
  },
  drag({commit}){
    commit('DRAGGING');
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
