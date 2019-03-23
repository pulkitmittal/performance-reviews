import 'buefy/dist/buefy.css';

import Buefy from 'buefy';
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
