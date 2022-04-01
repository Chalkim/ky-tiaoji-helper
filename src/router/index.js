import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Data',
    component: () => import('@/views/DataView.vue'),
  },
  {
    path: '/favorities',
    name: 'Favorities',
    component: () => import('@/views/FavoritiesView.vue'),
  },
  {
    path: '/blacklist',
    name: 'Blacklist',
    component: () => import('@/views/BlacklistView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
