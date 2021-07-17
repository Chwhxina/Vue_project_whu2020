import Vue from 'vue'
import Router from 'vue-router'
import {getStore,setStore} from '@/config/mUtils'


Vue.use(Router)

/* 登录 & 注册 */
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const login_factory = r => require.ensure([], () => r(require('@/page/login_factory')), 'factory');
const login_gov = r => require.ensure([], () => r(require('@/page/login_gov')), 'login_gov');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');

/* 主页 */
const dashboard = r => require.ensure([], () => r(require('@/page/dashboard')), 'dashboard');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const attributeList = r => require.ensure([], () => r(require('@/page/attributeList')), 'attributeList');
const addAttribute = r => require.ensure([], () => r(require('@/page/addAttribute')), 'addAttribute');
const logisticList = r => require.ensure([], () => r(require('@/page/logisticList')), 'logisticList');
const addLogistic = r => require.ensure([], () => r(require('@/page/addLogistic')), 'addLogistic');
const messageList = r => require.ensure([], () => r(require('@/page/messageList')), 'messageList');
const addMessage = r => require.ensure([], () => r(require('@/page/addMessage')), 'addMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const creditQuery = r => require.ensure([], () => r(require('@/page/creditQuery')), 'creditQuery');
const transferCredit = r => require.ensure([], () => r(require('@/page/transferCredit')), 'transferCredit');
const issueCredit = r => require.ensure([], () => r(require('@/page/issueCredit')), 'issueCredit');

const queryModel = r => require.ensure([], () => r(require('@/page/queryModel')), 'queryModel');
const createModel = r => require.ensure([], () => r(require('@/page/createModel')), 'createModel');

const routes = [
	{
		path: '/',
		component: login
	},
    {
		path: '/login',
		component: login
	},
    {
        path: '/login_factory',
        component: login_factory
    },
    {
        path: '/login_gov',
        component: login_gov
    },
    {
        path: '/register',
		component: register
    },
	{
		path: '/home',
		component: home,
		name: '',
		children: [{
			path: '',
			component: dashboard,
			meta: [],
		},
        {
			path: '/addAttribute',
			component: addAttribute,
			meta: ['属性管理', '添加属性'],
		},
        {
			path: '/attributeList',
			component: attributeList,
			meta: ['属性管理', '属性列表'],
		},
        {
			path: '/logisticList',
			component: logisticList,
			meta: ['交易环节管理', '交易环节列表'],
		},
        {
			path: '/addLogistic',
			component: addLogistic,
			meta: ['交易环节管理', '添加交易环节'],
		},
        {
			path: '/messageList',
			component: messageList,
			meta: ['消息管理', '消息列表'],
		},
        {
			path: '/addMessage',
			component: addMessage,
			meta: ['消息管理', '添加新消息'],
		},
        {
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		},
        {
			path: '/issueCredit',
			component: issueCredit,
			meta: ['积分管理', '积分发放'],
		},
		{
			path: '/transferCredit',
			component: transferCredit,
			meta: ['积分管理', '积分转账'],
		},
		{
			path: '/creditQuery',
			component: creditQuery,
			meta: ['积分管理', '积分查询'],
		},
        {
			path: '/queryModel',
			component: queryModel,
			meta: ['查询模板', '查询模板'],
		},
        {
			path: '/createModel',
			component: createModel,
			meta: ['创建模板', '创建模板'],
		}]
	}
]


const router = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
});

/*
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/login' || to.path === '/login_factory' || to.path === '/login_gov' || to.path === '/register') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});*/

export default router;
