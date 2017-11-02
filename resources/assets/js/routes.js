import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Form from './components/Form.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import store from './store.js'

Vue.use(Router);

let router = new Router({
	routes: [
		{
			path: '/',
			component: Home,
			meta: { requiresAuth: true }
		},
		{
			path: '/about',
			component: About,
			meta: { requiresAuth: true }
		},
		{
			path: '/create',
			component: Form,
			meta: { requiresAuth: true }
		}
		,
		{
			path: '/login',
			component: Login
		}
		,
		{
			path: '/register',
			component: Register
		}
	]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!store.getters.getToken) {
    	
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
  	if(store.getters.getToken){
  		next({
  			path: '/'
  		})
  	}else{
    	next() // make sure to always call next()!
  	}
  }
})

export default router