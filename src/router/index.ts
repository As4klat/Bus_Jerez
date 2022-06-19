import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/mapa'
  },
  {
    path: '/mapa',
    component: () => import ('../views/Mapa.vue')
  },
  {
    path: '/paradas',
    component: () => import ('../views/Paradas.vue')
  },
  {
    path: '/lineas',
    component: () => import ('../views/Lineas.vue')
  },
  {
    path: '/horarios',
    component: () => import ('../views/Horarios.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
