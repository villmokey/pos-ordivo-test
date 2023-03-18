import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/components/templates/Layouts/MainLayout.vue";
import Home from "@/views/Home.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Checkout from "@/views/Checkout.vue";
import TransactionDone from "@/views/TransactionDone.vue";
import TableViewLayout from "@/components/templates/Layouts/TableViewLayout.vue";
import Transactions from "@/views/Transactions.vue";
import Products from "@/views/Products.vue";
import CreateProduct from "@/views/CreateProduct.vue";

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
  {
    path: "/transaction-done/:id",
    name: "transactionDone",
    component: TransactionDone,
    props: true,
  },
  {
    path: "/list",
    component: TableViewLayout,
    children: [
      {
        path: "transactions",
        name: "transactionList",
        component: Transactions,
      },
      {
        path: "products",
        name: "productList",
        component: Products,
      },
      {
        path: "products/create",
        name: "createProduct",
        component: CreateProduct,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
