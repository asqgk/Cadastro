import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import VueMask from 'v-mask';


Vue.use(VueMask);

Vue.config.productionTip = false;

Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

