import { createRouter, createWebHashHistory } from "vue-router";

import CreateAccountPage from "./views/CreateAccountPage.vue";
import HomePage from "./views/HomePage.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/create",
      component: CreateAccountPage,
    },
  ],
});

export default router;
