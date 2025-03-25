import { createRouter, createWebHistory } from "vue-router";

// Pages
import Dashboard from "../views/admin/Dashboard.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Landing from "../views/Landing.vue";
import Profile from "../views/Profile.vue";

// Clean route setup
const routes = [
  { path: "/", component: Landing },
  { path: "/landing", redirect: "/" },
  {
    path: "/admin",
    children: [
      { path: "dashboard", component: Dashboard },
      {
        path: "settings",
        component: () => import("../components/Cards/CardSettings.vue"),
      },
      {
        path: "tables",
        component: () => import("../components/Cards/CardTable.vue"),
      },
      {
        path: "maps",
        component: () => import("../components/Cards/CardProfile.vue"),
      },
      {
        path: "orders",
        component: () => import("../components/Cards/CardOrders.vue"),
      },
      {
        path: "stats",
        component: () => import("../components/Cards/CardStats.vue"),
      },
    ],
  },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
