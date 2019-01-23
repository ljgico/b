import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueScroller from 'vue-scroller'
import App from './App'
import Axios from './utils/diyaxios'
import router from './router/router'
import store from './store'
import MuseUI from 'muse-ui'
import Toast from 'vue-easy-toast'
import 'muse-ui/dist/muse-ui.css'
import 'assets/theme.less'
import FastClick from 'fastclick' // 解决移动端300毫秒延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.use(ElementUI)
Vue.use(VueScroller)
Vue.use(MuseUI)
Vue.use(Toast)
Vue.prototype.$http = Axios // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
/* eslint-disable no-new */
Vue.config.productionTip = false // 控制台去掉You are running Vue in development mode
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
