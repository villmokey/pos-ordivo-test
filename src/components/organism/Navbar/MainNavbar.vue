<template>
  <div class="w-full gap-10">
    <div class="flex mx-auto py-3 gap-3 px-5">
      <div class="bg-white shadow-sm rounded-md">
        <v-icon name="co-hamburger-menu" class="w-10 h-10"></v-icon>
      </div>
      <InputSearch :parentClass="'my-auto max-w-lg'" placeholder="Cari produk" v-model="search" @onSearch="onSearch" v-if="currentRoute !== 'checkout'" />
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/atoms/Input/InputSearch.vue";
export default {
  name: "MainNavbar",
  components: {
    InputSearch,
  },
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
  },
  watch: {},
};
</script>

<style></style>
