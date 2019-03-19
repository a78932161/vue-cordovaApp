import {login, logout, getInfo} from 'api/login'
import {getToken, setToken, removeToken} from 'common/js/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    storeId: '',
    roles: [],
    id: '',
    searchValue: '',
    active: 0,
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
    SET_STOREID: (state, storeId) => {
      state.storeId = storeId
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_searchValue: (state, searchValue) => {
      state.searchValue = searchValue
    },
    SET_active: (state, active) => {
      state.active = active
    },
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          localStorage.setItem('user', JSON.stringify(response));
          commit('SET_ID', response.id);
          commit('SET_STOREID', response.store.id);
          commit('SET_NAME', response.roleItems[0].role.name);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetInfo({commit, state}) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('user')) {
          let data = JSON.parse(localStorage.getItem('user'));
          let roleData = [];
          data.authorities.forEach((value) => {
            roleData.push(value['authority']);
          });
          commit('SET_ROLES', roleData);
          resolve(roleData)
        } else {
          reject(error)
        }
      })
    },


    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          localStorage.clear();
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
