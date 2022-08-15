import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';

import  bus from  '@/utils/eventbus'
import axios from "axios";


Vue.use(ElementUI, )

// 导入最基本的css文件
import './assets/css/base.css'


Vue.config.productionTip = false
Vue.prototype.$bus = bus;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
