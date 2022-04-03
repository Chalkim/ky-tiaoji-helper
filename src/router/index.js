import { createRouter, createWebHashHistory } from 'vue-router';
import DataView from '@/views/DataView.vue';

const routes = [
  {
    path: '/',
    name: 'Data',
    component: DataView,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/FavoritesView.vue'),
  },
  {
    path: '/ignoreList',
    name: 'IgnoreList',
    component: () => import('@/views/IgnoreListView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
