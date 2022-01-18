import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Posts from '../views/Posts.vue';
import Profile from '../views/Profile.vue';
//import user from '../user'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    //meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    //meta: { requiresAuth: true }
  },
];

const router = new VueRouter({
  routes,
});

/*router.beforeEach((to, from, next) => {
  const isAuthenticated = user.token !== ""
  if(to.matched.some(route => route.meta.requiresAuth)) {
      if(!isAuthenticated) {
          next({
              name: 'login'
          })
      } else {
          next()
      }
  } else {
      next()
  }
})*/

export default router;
