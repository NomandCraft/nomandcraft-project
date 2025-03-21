import { createRouter, createWebHistory } from "vue-router";

// Импортируем страницы
import Dashboard from "../views/admin/Dashboard.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Landing from "../views/Landing.vue";
import Profile from "../views/Profile.vue";

const routes = [
  { path: "/", component: Landing },
  { path: "/dashboard", component: Dashboard },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
