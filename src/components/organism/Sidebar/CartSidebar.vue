<template>
  <div :class="'bg-white w-full min-h-screen shadow-md px-5 ' + parentClass">
    <h1 class="text-lg font-semibold mt-5">Order Details</h1>
    <Divider />
  </div>
</template>

<script>
import Divider from "@/components/atoms/Divider/Divider.vue";
export default {
  name: "CartSidebar",
  props: ["parentClass"],
  components: {
    Divider,
  },
};
</script>

<style></style>
