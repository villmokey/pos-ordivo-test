<template>
  <div class="grid grid-cols-12 gap-4">
    <ProductCardLoading v-if="loading" />
    <div v-else class="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3" v-for="product in products" :key="product.id">
      <!-- <h1 class="text-lg text-center mt-10" v-if="!products.length">Data kosong</h1> -->
      <ProductCard :imageUrl="product.images[0].image_path" :title="product.name" :price="product.price" :id="product.id" :stock="product.stock" />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/molecules/Card/ProductCard.vue";
import ProductCardLoading from "@/components/molecules/Loading/ProductCardLoading.vue";

export default {
  name: "ProductList",
  props: ["products", "loading"],
  components: {
    ProductCard,
    ProductCardLoading,
  },
};
</script>

<style></style>
