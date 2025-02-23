import { createRouter, createWebHistory } from 'vue-router';
import UserProfile from '@/components/UserProfile.vue';
import UserNameInput from '@/components/UserNameInput.vue';


const routes = [
  {
    path: '/',
    name: 'UserNameInput',
    component: UserNameInput
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
