import Vue from 'vue'

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import App from './views/App';
import Hello from './components/user/index';
import Home from './components/user/create';
// define routes for users
const routes = [
	{
		path: '/',
		name: 'userIndex',
		component: Hello
	},
	{
		path: '/create',
		name: 'userCreate',
		component: Home
	}
]

const router = new VueRouter({ routes });

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});