<template>
  <div class="shadow-md bg-white rounded-md max-w-[230px] h-[270px] p-4 cursor-pointer">
    <router-link :to="{ name: 'productDetail', params: { id: id } }">
      <img :src="renderImage" alt="Product Image" class="w-full h-[120px] p-1 rounded-md object-contain" />
      <h4 class="text-sm font-semibold mt-3">{{ title }}</h4>
      <h4 class="text-blue-500 font-light text-sm">{{ renderPrice }}</h4>
      <h4 class="font-light text-xs">Stok: {{ stock }}</h4>
    </router-link>
    <button type="button" class="text-white w-full bg-blue-500 py-1 mt-4 rounded-md" @click="addToCart">Tambah</button>
  </div>
</template>

<script>
import currency from "@/helpers/currency";

export default {
  name: "ProductCard",
  props: ["imageUrl", "title", "price", "id", "stock"],
  emits: ["addToCart"],
  data() {
    return {};
  },
  computed: {
    renderImage() {
      return process.env.VUE_APP_API_URL + "/storage/" + this.imageUrl;
    },
    renderPrice() {
      return currency(this.price);
    },
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.$props.id);
    },
  },
};
</script>

<style></style>
