import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./global.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoCart, BiSearch, CoHamburgerMenu, HiMinusCircle, HiPlusCircle, HiChevronLeft } from "oh-vue-icons/icons";

addIcons(CoCart, BiSearch, CoHamburgerMenu, HiMinusCircle, HiPlusCircle, HiChevronLeft);

createApp(App).use(store).use(router).component("v-icon", OhVueIcon).mount("#app");
