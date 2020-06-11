import {login,logout,getInfo,loginOut} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'
let powerMenus=null;
try{
  powerMenus=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).menus.pageFunctions.content[0].childMap:[];
}catch(e){
	powerMenus=[];
}

let formatRoutes = (aMenu) => {
  const aRouter = []
  aMenu.forEach(oMenu => {
    const {
      path,
      component,
      name,
      icon,
      title,
      redirect,
      isshow,
      children
    } = oMenu
    if (component) {
      const oRouter = {
        path: path,
        component(resolve) {
          let componentPath = ''
          if (component === 'Layout') {
            require(['@/layout'], resolve)
            return
          } else {
            componentPath = component
          }
          require([`@/views/${componentPath}.vue`], resolve)
        },
        name: name,
        redirect: redirect || '',
        isshow: isshow,
        meta: {
          icon: icon,
          title: title
        },
        icon: icon,
        children: children && children.length ? formatRoutes(children) : []
      }
      aRouter.push(oRouter)
    }
  })
  return aRouter
}
const searchId=(menus,name)=>{
  let len = menus.length;
  for (let i =0;i<len;i++){
    /* 如果找到返回*/
    if(menus[i].name===name){
      return {power:menus[i].childMap,eureka:true};
    }else if(menus[i].children&&menus[i].children.length>0){
      /* 未找到开始查找子级*/
      let res=searchId(menus[i].children,name);
      if(res&&res.eureka){
        return res;
      }
    }
  }
}
const getJobType=(id)=>{
  let userJobType='';
  switch (id){
    case 'a84fd6a0-3554-11e7-a3f8-5254007b6f02':
      userJobType="admin";
      break;
    case "0743ae7d-e380-11e9-8c08-00163e05721e":
      userJobType="group";
      break;
    case "f344fe8d-e379-11e9-8c08-00163e05721e":
      userJobType="region";
      break
    case "1c1d3cf6-e37a-11e9-8c08-00163e05721e":
      userJobType="project";
      break;
    default:
      userJobType="unexpected"
  }
  return userJobType;
}
const state = {
  token: getToken(),
  name: '',
  userInfo: '',
  menu: null,
  userJobType:getJobType(localStorage.getItem('CommonJobID')),
  userPower:[]
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  JOBTYPE:(state,id)=>{
    state.userJobType=getJobType(id);
  },
  CHANGE_POWER:(state,power)=>{
    state.userPower=power;
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username,password} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const { data} = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setJobType({commit},id){
    commit('JOBTYPE',id);
  },
  // set user info
  setInfo({commit}, user) {
    return new Promise((resolve) => {
      let menus =[{
          path: '/',
          component: 'Layout',
          redirect: 'dashboard',
          name: 'home',
          title: '首页',
          isshow: 1,
          icon: 'home',
          children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: 'dashboard/index',
            isshow: 0
          }]
        },
        { path: '*', redirect: '/404', isshow: true }
      ].concat(user.menus.content[0].children);

      let _meuns = formatRoutes(menus)
      commit('SET_MENU', _meuns);
      commit('SET_USERINFO', user)

      if(user.menus.pageFunctions);
      powerMenus=JSON.parse(JSON.stringify(user.menus.pageFunctions.content[0].childMap));
      resolve(_meuns)
    })
  },
  // get user info
  getInfo({commit,state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const {name,userInfo} = data
        commit('SET_NAME', name)
        commit('SET_USERINFO', userInfo)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit,state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      window.localStorage.clear()
      resolve();
    })
  },
  setPower({commit},name){
    if(powerMenus.length){
      let {power} = searchId(powerMenus,name)||{power:[]};
      commit("CHANGE_POWER",(power||[]).map(item=>item.title));
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
