import Vue from 'vue';
import './plugins/axios';
import './plugins/fontawesome';
import App from './App.vue';
import router from './router';
import axios from './api';
import './mock/index.js';

Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
