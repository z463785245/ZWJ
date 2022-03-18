// 引入 vue.js 的默认值
import Vue from 'vue'
// 引入 App.vue 的默认值
import App from './App'
//引入 router
import router from './router'
//引入validator
import './directives'
//引入components
import './components'
//引入store/index.js的默认值
import store from './store'
//引入VueSweetalert2插件
import VueSweetalert2 from './plugins/vue-sweetalert2'
//引入消息框
import Message from './plugins/message'
//引入moment
import './filters'
import { mockArticles } from './mock/data'
import ls from './utils/localStorage'
import './mock'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// 将 axios 添加到 Vue.prototype 上，使其在实例内部的所有组件中可用
Vue.prototype.$axios = axios


// 使用插件
Vue.use(VueSweetalert2)
Vue.use(Message)
Vue.use(ElementUI)

// 设置 false 以阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

const AddMockData = (() => {
  // 是否加入测试数据
  const isAddMockData = true
  // 用户数据
  let userArticles = ls.getItem('articles')

  if (Array.isArray(userArticles)) {
    userArticles = userArticles.filter(article => parseInt(article.uid) === 1)
  } else {
    userArticles = []
  }

  if (isAddMockData) {
    // 合并用户数据和测试数据，使用合并值作为所有文章
    store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(60)])
  } else {
    // 使用用户数据作为所有文章
    store.commit('UPDATE_ARTICLES', userArticles)
  }
})()

// 创建一个新的 Vue 实例
new Vue({
  router,
  // 注入 store
  store,
  render: h => h(App),
}).$mount('#app')