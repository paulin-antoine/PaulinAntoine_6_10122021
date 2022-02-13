import { createRouter, createWebHashHistory } from 'vue-router'
import signup from '@/views/signup.vue';
import login from '@/views/login.vue';
import wall from '@/views/wall.vue';
import home from '@/views/home.vue';
import profile from '@/views/profile.vue';
import panelAdmin from '@/views/panelAdmin.vue';

const routes = [
    {
        name: 'home',
        path: '/',
        component: home
    },
    {
        name: 'login',
        path: '/login',
        component: login
    },
    {
        name: 'signup',
        path: '/signup',
        component: signup
    },
    {
        name: 'wall',
        path: '/wall',
        component: wall
    },
    {
        name: 'profile',
        path: '/profile',
        component: profile
    },
    {
        name: 'panelAdmin',
        path: '/panelAdmin',
        component: panelAdmin
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router;

