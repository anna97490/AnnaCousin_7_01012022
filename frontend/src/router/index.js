import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Posts from '../views/Posts.vue';
import Profile from '../views/Profile.vue';
import Admin from '../views/Admin.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/:id',
    name: 'Admin',
    component: Admin,
    
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some( record => record.meta.requiresAuth )
  let currentUser = JSON.parse(localStorage.getItem('user')) 
  if(requiresAuth && !currentUser){
    next('/');
  } else if (to.path == '/' && currentUser){
    next('/posts')
  } else {
    next()
  }
})

export default router;

