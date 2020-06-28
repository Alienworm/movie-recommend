import Vue from 'vue';
import './plugins/axios';
import './plugins/fontawesome';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();

let oMeta = document.createElement('meta');
oMeta.content = 'no-referrer';
oMeta.name = 'referrer';
document.getElementsByTagName('head')[0].appendChild(oMeta);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
