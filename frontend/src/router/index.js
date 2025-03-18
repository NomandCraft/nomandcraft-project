import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home | Nomand Craft' },
  },
  {
    path: '/campers',
    component: () => import('@/views/CampersView.vue'),
    meta: { title: 'Campers | Nomand Craft' },
  },
  {
    path: '/categories',
    component: () => import('@/views/CategoriesView.vue'),
    meta: { title: 'Categories | Nomand Craft' },
  },
  {
    path: '/users',
    component: () => import('@/views/UsersView.vue'),
    meta: { title: 'Users | Nomand Craft' },
  },
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About| Nomand Craft' },
  },
  {
    path: '/gallery',
    component: () => import('@/views/GalleryView.vue'),
    meta: { title: 'Gallery | Nomand Craft' },
  },
  {
    path: '/blogs',
    component: () => import('@/views/BlogsView.vue'),
    meta: { title: 'Blogs| Nomand Craft' },
  },
  {
    path: '/contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: '/Contact | Nomand Craft' },
  },
  {
    path: '/campers/:id',
    component: () => import('@/views/CamperDetails.vue'),
    meta: { title: 'Camper Details | Nomand Craft' },
  },
]

const router = createRouter({ history: createWebHistory(), routes })

router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
