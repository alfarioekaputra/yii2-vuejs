import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';
import ModuleLibrary from '@coreui/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import BootstrapVue from 'bootstrap-vue';

library.add(faUser, faLock)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter);
Vue.use(ModuleLibrary);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios)

import App from './views/App';
import Hello from './components/user/index';
import Home from './components/user/create';
import Login from './views/auth/login';
import Dashboard from './views/dashboard';
// define routes for users
const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: { 
			guest: true
		}
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard,
		meta: { 
			requiresAuth: true
		}
	},
	{
		path: '/',
		name: 'userIndex',
		component: Hello,
		meta: { 
			requiresAuth: true
		}
	},
	{
		path: '/create',
		name: 'userCreate',
		component: Home,
		meta: { 
			requiresAuth: true
		}
	}
]

const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.is_admin == 1){
                    next()
                }
                else{
                    next({ name: 'userboard'})
                }
            }else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'userboard'})
        }
    }else {
        next() 
    }
})


const app = new Vue({
	el: '#app',
	components: { App },
    router,
});