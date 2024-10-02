import { createRouter, createWebHashHistory } from "vue-router";

import CreateAccountPage from "./views/CreateAccountPage.vue";
import HomePage from "./views/HomePage.vue";
import CreateProduct from "./views/CreateProduct.vue";
import Shop from "./views/Shop.vue";
import AboutUs from "./views/AboutUs.vue";
import ContactUs from "./views/ContactUs.vue";
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
    {
      path: "/shop",
      component: Shop,
    },
    {
      path: "/about",
      component: AboutUs,
    },
    {
      path: "/contact",
      component: ContactUs,
    },
  ],
});

export default router;
