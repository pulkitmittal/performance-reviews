import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('./views/Employees.vue'),
    },
  ],
});