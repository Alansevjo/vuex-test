import Vue from 'vue'
import App from './App.vue'

// 1.导入ant-design-vue组件库
import Antd from 'ant-design-vue'
// 2.导入组件库样式表
import 'ant-design-vue/dist/antd.css'
import store from './store'
Vue.config.productionTip = false
// 3.安装组件库
Vue.use(Antd)
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
