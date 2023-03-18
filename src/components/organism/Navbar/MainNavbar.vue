<template>
  <div class="w-full gap-10" v-if="currentRoute !== 'checkout'">
    <div class="flex mx-auto py-3 gap-3 px-5">
      <button class="bg-white shadow-sm rounded-md" @click="onOpenMenu">
        <v-icon name="co-hamburger-menu" class="w-10 h-10"></v-icon>
      </button>
      <InputSearch v-if="currentRoute !== 'transactionDone' || currentRoute !== 'transactionList' || currentRoute !== 'products'" :parentClass="'my-auto max-w-lg'" placeholder="Cari produk" v-model="search" @onSearch="onSearch" />
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
    onSearch() {
      this.$router.push({ path: "/", query: { search: this.search } });
    },
    onOpenMenu() {
      this.$emit("onChangeMenu");
    },
  },
  watch: {},
};
</script>

<style></style>
