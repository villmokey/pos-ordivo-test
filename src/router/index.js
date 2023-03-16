import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/components/templates/Layouts/MainLayout.vue";
import Home from "@/views/Home.vue";
import ProductDetail from "@/views/ProductDetail.vue";

const routes = [
  {
    path: "/",
    name: "",
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
