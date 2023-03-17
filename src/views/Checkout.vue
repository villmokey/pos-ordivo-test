<template>
  <div class="w-full max-w-5xl mx-auto">
    <router-link to="/" class="text-lg shadow-sm bg-white rounded-md p-2">
      <v-icon name="hi-chevron-left" class="w-5 h-5"></v-icon>
      Kembali
    </router-link>
    <div class="shadow-md rounded-md bg-white p-4 mt-3">
      <div class="flex flex-col gap-5">
        <div class="flex gap-7 border-[#d9d9d9]" v-for="product in getCarts" :key="product.id">
          <img :src="imageSrc(product.images[0].image_path)" alt="Image" class="h-[120px] w-[120px] object-center my-auto rounded-md" />
          <div class="block w-full">
            <div class="flex justify-between">
              <h4 class="text-md font-semibold">
                {{ product.name }} <span class="text-blue-500">{{ product.qty }}x</span>
              </h4>
              <h4 class="font-bold text-lg text-blue-500">{{ currencyFormat(product.total_price) }}</h4>
            </div>

            <div class="flex mt-2 justify-between"></div>
            <div class="block">
              <p>Catatan:</p>
              <p class="text-sm font-light mt-1">{{ product.note !== "" ? product.note : "-" }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import currency from "@/helpers/currency";
import image from "@/helpers/image";

export default {
  name: "Checkout",
  components: {},
  data() {
    return {};
  },
  computed: {
    getCarts() {
      return this.$store.getters.getCarts;
    },
  },
  methods: {
    imageSrc(src) {
      return image(src);
    },
    currencyFormat(value) {
      return currency(value);
    },
  },
};
</script>

<style></style>
