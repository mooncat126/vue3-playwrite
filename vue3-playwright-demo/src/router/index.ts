import { createRouter, createWebHistory } from 'vue-router';
import UserProfile from '@/components/UserProfile.vue';
import HelloWorld from '@/components/HelloWorld.vue';


const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
