import { createRouter, createWebHashHistory } from "vue-router";

import CreateAccountPage from "./views/CreateAccountPage.vue";
import HomePage from "./views/HomePage.vue";
import CreateProduct from "./views/CreateProduct.vue";
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
    {
      path: "/create-product",
      component: CreateProduct,
    },
  ],
});

export default router;
