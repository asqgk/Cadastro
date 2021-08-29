import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',      
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },    
    {
      path: "/produtos",  
      name: 'produto-list',
      // lazy-loaded
      component: () => import('./views/ProdutosList.vue')      
    },    
    {
      path: "/produtos/:id",
      name: "produto-details",
      component: () => import("./views/Produto")
    },
    {
      path: "/add",
      name: "produto-add",
      component: () => import("./views/AddProduto")      
    },
    {
      path: "/pessoas",  
      name: 'pessoa-list',
      component: () => import('./views/PessoasList.vue')      
    },
    {
      path: "/add_pessoa",
      name: "pessoa-add",
      component: () => import("./views/AddPessoa")      
    },
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('usuario');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});