<template>
  <div class="w-full gap-10">
    <div class="flex mx-auto py-3 gap-3 px-5">
      <button class="bg-white shadow-sm rounded-md" @click="onOpenMenu">
        <v-icon name="co-hamburger-menu" class="w-10 h-10"></v-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainNavbar",
  components: {},
  data() {
    return {
      search: "",
    };
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
  methods: {
    onSearch() {},
    onOpenMenu() {
      this.$emit("onChangeMenu");
    },
  },
  watch: {},
};
</script>

<style></style>
