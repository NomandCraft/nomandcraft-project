import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("@/views/HomeView.vue");
const CampersView = () => import("@/views/CampersView.vue");
const CamperDetails = () => import("@/views/CamperDetails.vue");
const CategoriesView = () => import("@/views/CategoriesView.vue");
const UsersView = () => import("@/views/UsersView.vue");

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/campers", name: "campers", component: CampersView },
    {
      path: "/campers/:id",
      name: "camper-details",
      component: CamperDetails,
      props: true,
    },
    { path: "/categories", name: "categories", component: CategoriesView },
    { path: "/users", name: "users", component: UsersView },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
