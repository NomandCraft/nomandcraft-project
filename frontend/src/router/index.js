import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CampersView from '@/views/CampersView.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import UsersView from '@/views/UsersView.vue'
import CamperDetails from '@/views/CamperDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/campers', name: 'campers', component: CampersView },
    { path: '/campers/:id', name: 'camper-details', component: CamperDetails },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/users', name: 'users', component: UsersView }, // Only for admins
  ],
})

export default router
