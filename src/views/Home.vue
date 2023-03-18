<template>
  <div class="w-full">
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
  watch: {
    $route() {
      let searchParams = this.$route.query.search;
      this.fetchProduct(`search=${searchParams}`);
    },
  },
  methods: {
    async fetchProduct(params = "") {
      const { loading, result } = await getAllProducts(params);

      this.products = result.data;
      this.loading = loading;
    },
  },
};
</script>
