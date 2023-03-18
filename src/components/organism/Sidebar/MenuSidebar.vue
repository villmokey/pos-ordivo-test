<template>
  <TransitionRoot
    class="shadow-md bg-white w-[300px] absolute z-40 min-h-screen p-5"
    :show="isShowing"
    enter="transform transition ease-in-out duration-300"
    enter-from="-translate-x-full"
    enter-to="translate-x-0"
    leave="transform transition ease-in-out duration-300"
    leave-from="translate-x-0"
    leave-to="-translate-x-full"
  >
    <button type="button" class="absolute right-2 top-2 p-1 z-40" @click="onCloseMenu">
      <v-icon name="io-close-circle-outline" class="w-8 h-8"></v-icon>
    </button>
    <div class="flex flex-col gap-5 relative">
      <h1 class="text-3xl text-center font-bold mt-5">MePOS</h1>
      <router-link to="/" class="text-md font-semibold bg-blue-500 text-white rounded-md p-2 hover:bg-blue-300"> POS </router-link>
      <router-link to="/list/transactions" class="text-md font-semibold bg-blue-500 text-white rounded-md p-2 hover:bg-blue-300">Transactions</router-link>
      <router-link to="/list/products" class="text-md font-semibold bg-blue-500 text-white rounded-md p-2 hover:bg-blue-300">Products</router-link>
    </div>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot } from "@headlessui/vue";
export default {
  name: "MenuSidebar",
  components: {
    TransitionRoot,
  },
  props: ["isShowing"],
  methods: {
    onCloseMenu() {
      console.log("test");
      this.$emit("onCloseMenu");
    },
  },
};
</script>

<style></style>
