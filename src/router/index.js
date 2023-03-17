import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/components/templates/Layouts/MainLayout.vue";
import Home from "@/views/Home.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Checkout from "@/views/Checkout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "products/:id",
        name: "productDetail",
        component: ProductDetail,
        props: true,
      },
      {
        path: "/checkout",
        name: "checkout",
        component: Checkout,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
