<template>
  <div class="block md:flex lg:flex xl:flex">
    <div class="w-full">
      <img :src="product.imageUrl" alt="image" />
    </div>
    <div class="w-full">
      <h1 class="text-xl">{{ product.name }}</h1>
    </div>
  </div>
</template>

<script>
import { getProduct } from "@/api/productApi";
export default {
  name: "ProductDetail",
  props: ["id"],
  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        stock: 0,
      },
      qty: 0,
      loading: false,
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      const { loading, result } = await getProduct(this.id);
      this.loading = loading;
      this.product = {
        name: result.name,
        price: result.price,
        description: result.description,
        imageUrl: `${process.env.VUE_APP_API_URL}/storage/${result.images[0].image_path}`,
        stock: result.stock,
      };
    },
  },
};
</script>

<style></style>
