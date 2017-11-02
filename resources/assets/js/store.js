import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('token'),
		user: JSON.parse(localStorage.getItem('user'))
	},
	getters: {
		getToken: state => state.token,
		getUser: state => state.user
	},
	mutations: {
		setToken: (state, payload) => {
			state.token = payload
		},
		setUser: (state, payload) => {
			state.user = payload
		}
	}
});