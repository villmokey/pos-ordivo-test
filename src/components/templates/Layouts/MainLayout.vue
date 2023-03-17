<template>
  <div class="flex mx-auto bg-gray-100 shadow-md">
    <div class="w-full mt-3">
      <Navbar />
      <div class="px-5 mt-3">
        <router-view></router-view>
      </div>
    </div>
    <CartSidebar class="max-w-[350px]" />
  </div>
</template>

<script>
import MainNavbar from "@/components/organism/Navbar/MainNavbar.vue";
import CartSidebar from "@/components/organism/Sidebar/CartSidebar.vue";

export default {
  name: "MainLayout",
  components: {
    Navbar: MainNavbar,
    CartSidebar: CartSidebar,
  },
};
</script>

<style></style>
