import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
	Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
	adminInfo: {
		avatar: 'default.jpg'
	},
}

const mutations = {
	changeLogin (state, user) {
      state.Authorization = user.Authorization;
      state.username = user.username;
      localStorage.setItem('Authorization', user.Authorization);
      localStorage.setItem('username', user.username);
    },
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
    getusername(){
	    return state.username;
    }
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res.type)
			}
		}catch(err){
			// console.log(err.message)
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
