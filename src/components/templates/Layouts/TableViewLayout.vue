<template>
  <MenuSidebar :isShowing="isShow" @onCloseMenu="isShow = false" />
  <div class="w-full bg-gray-100">
    <Navbar @onChangeMenu="isShow = !isShow" />
    <div class="px-5 mt-3 bg-gray-100 h-screen">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuSidebar from "@/components/organism/Sidebar/MenuSidebar.vue";
import TableViewNavbar from "@/components/organism/Navbar/TableViewNavbar.vue";

export default {
  name: "TableViewLayout",
  components: {
    Navbar: TableViewNavbar,
    MenuSidebar,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {},
};
</script>

<style></style>
