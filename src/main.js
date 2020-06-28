import Vue from 'vue'
import './plugins/axios'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import base from './plugins/public';

Vue.use(base);

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
