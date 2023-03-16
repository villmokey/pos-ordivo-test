<template>
  <div class="w-full px-7">
    <ProductList :loading="loading" :products="products" />
  </div>
</template>

<script>
// @ is an alias to /src
import { getAllProducts } from "@/api/productApi";
import ProductList from "@/components/organism/List/ProductList.vue";

export default {
  name: "Home",
  components: {
    ProductList,
  },
  data() {
    return {
      products: null,
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      const { loading, result } = await getAllProducts();
      console.log(result);
      this.products = result.data;
      this.loading = loading;
    },
  },
};
</script>
