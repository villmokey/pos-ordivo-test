<template>
  <div class="grid grid-cols-12 gap-4 max-h-[85vh] overflow-y-auto">
    <ProductCardLoading v-if="loading" />
    <div v-else class="col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3 2xl:col-span-2" v-for="product in products" :key="product.id">
      <ProductCard @addToCart="addToCart" :imageUrl="product.images[0].image_path" :title="product.name" :price="product.price" :id="product.id" :stock="product.stock" />
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
  data() {
    return {};
  },
  methods: {
    addToCart(id) {
      const filter = this.$props.products.filter((item) => item.id === id);
      this.$store.commit("addCarts", { carts: { ...filter[0], qty: 1, note: "" } });
    },
  },
};
</script>

<style></style>
