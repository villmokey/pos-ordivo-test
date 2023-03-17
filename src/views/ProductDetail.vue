<template>
  <router-link to="/" class="text-lg shadow-sm bg-white rounded-md p-2">
    <v-icon name="hi-chevron-left" class="w-5 h-5"></v-icon>
    Kembali
  </router-link>
  <div class="block shadow-sm bg-white rounded-md p-5 mt-3">
    <div class="block md:flex lg:flex xl:flex gap-5">
      <div class="w-full">
        <img :src="renderImage" alt="image" class="object-contain" />
      </div>
      <div class="w-full flex flex-col">
        <h1 class="text-xl">{{ product.name }}</h1>
        <Divider class="my-2" />
        <h1 class="text-xl text-blue-500 font-semibold">{{ renderPrice }}</h1>
        <Divider class="my-2" />
        <h1 class="text-md font-light">
          Tersisa <span class="text-blue-500 text-lg">{{ product.stock }}</span> pcs
        </h1>
        <Divider class="my-2" />
        <div class="flex justify-between gap-10">
          <button type="button" :disabled="renderDecreaseButton ? true : false" :class="`rounded-md text-white p-3 ${renderDecreaseButton ? 'bg-gray-300' : 'bg-blue-500'}`" @click="decreaseQty">
            <v-icon name="hi-minus-circle" class="w-10 h-10"></v-icon>
          </button>
          <span class="text-4xl my-auto">{{ qty }}</span>
          <button type="button" class="bg-blue-500 rounded-md text-white p-3" @click="increaseQty">
            <v-icon name="hi-plus-circle" class="w-10 h-10"></v-icon>
          </button>
        </div>
        <InputTextArea parentClass="mt-3" placeholder="Masukan catatan" v-model="note" />
        <button type="button" class="bg-blue-500 text-white w-full rounded-md p-3 mt-auto" @click="addToCart">Tambah</button>
      </div>
    </div>
    <Divider class="my-5" />
    <h1 class="font-semibold">Deskripsi Produk</h1>
    <p class="mt-3 font-light">{{ product.description }}</p>
  </div>
</template>

<script>
import { getProduct } from "@/api/productApi";
import Divider from "@/components/atoms/Divider/Divider.vue";
import currency from "@/helpers/currency";
import InputTextArea from "@/components/atoms/Input/InputTextArea.vue";
import image from "@/helpers/image";

export default {
  name: "ProductDetail",
  components: {
    Divider,
    InputTextArea,
  },
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
      note: "",
    };
  },
  mounted() {
    this.fetchProduct();
  },
  computed: {
    renderPrice() {
      return currency(this.product.price);
    },
    renderImage() {
      return image(this.product.imageUrl);
    },
    renderDecreaseButton() {
      return this.qty <= 0 ? true : false;
    },
  },
  methods: {
    async fetchProduct() {
      const { loading, result } = await getProduct(this.id);
      this.loading = loading;
      this.product = {
        name: result.name,
        price: result.price,
        description: result.description,
        imageUrl: result.images[0].image_path,
        stock: result.stock,
        ...result,
      };
    },
    addToCart() {
      this.$store.commit("addCarts", { carts: { ...this.product, qty: this.qty, note: this.note } });
      this.qty = 0;
      this.note = "";
    },
    increaseQty() {
      this.qty++;
    },
    decreaseQty() {
      if (this.qty > 0) {
        this.qty--;
      }
    },
  },
};
</script>

<style></style>
