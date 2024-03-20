import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/Home/HomeView.vue'
import Ubication from '@/components/Ubication/Ubication.vue'
import SuperAdmin from '@/components/SuperAdmin/SuperAdmin.vue'
import Products from '@/components/Products/Products.vue'
import Services from '@/components/Services/Services.vue'
import Profecionals from '@/components/Profecionals/Profecionals.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ubicacion',
      name: 'ubicacion',
      component: Ubication
    },
    {
      path: '/superAdmin',
      name: 'superAdmin',
      component: SuperAdmin
    },
    {
      path: '/productos',
      name: 'productos',
      component: Products
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: Services
    },
    {
      path: '/profecionales',
      name: 'profecionales',
      component: Profecionals
    },
  ]
})

export default router
