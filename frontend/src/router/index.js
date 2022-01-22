import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Posts from '../views/Posts.vue';
import Profile from '../views/Profile.vue';


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
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some( record => record.meta.requiresAuth );
  let currentUser = JSON.parse(localStorage.getItem('user')) 
  // when route requires auth and there's no current user, reidrect to '/login'
  if(requiresAuth && !currentUser){
    next('/');
  // when we go to login route and are already logged in, we can skip this page
  // so we redirect to the homepage
  } else if (to.path == '/' && currentUser){
    next('/posts');
  // if none of the above matches, we have a normal navigation that should just go through
  // so we call `next()`
  } else {
    next(); // you called `next('/')` which redirected to the homepage over and over again.
  }
})


export default router;

