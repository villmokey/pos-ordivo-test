import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoCart, BiSearch, CoHamburgerMenu, HiMinusCircle, HiPlusCircle, HiChevronLeft, RiLoader4Fill, PxLoader, IoCloseCircleOutline } from "oh-vue-icons/icons";

import Toast from "vue-toastification";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import "./global.css";

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

addIcons(CoCart, BiSearch, CoHamburgerMenu, HiMinusCircle, HiPlusCircle, HiChevronLeft, RiLoader4Fill, PxLoader, IoCloseCircleOutline);

createApp(App).use(store).use(router).use(Toast, options).component("v-icon", OhVueIcon).component("EasyDataTable", Vue3EasyDataTable).mount("#app");
