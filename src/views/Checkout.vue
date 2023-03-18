<template>
  <div class="w-full max-w-5xl mx-auto">
    <router-link to="/" class="text-lg shadow-sm bg-white rounded-md p-2">
      <v-icon name="hi-chevron-left" class="w-5 h-5"></v-icon>
      Kembali
    </router-link>
    <div class="shadow-md rounded-md h-full bg-white p-4 mt-3">
      <div class="flex flex-col gap-5 h-[350px] overflow-y-auto">
        <div class="flex gap-7 border-[#d9d9d9]" v-for="product in getCarts" :key="product.id">
          <img :src="imageSrc(product.images[0].image_path)" alt="Image" class="h-[70px] w-[70px] object-center my-auto rounded-md" />
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
      <Divider />
      <div class="flex justify-between mt-2">
        <h4 class="text-md font-bold">Total Pesanan</h4>
        <h4 class="text-lg font-bold text-blue-500">{{ getTotal }}</h4>
      </div>
    </div>
    <div class="shadow-md rounded-md bg-white p-4 mt-2">
      <div class="flex gap-4">
        <div class="w-full">
          <div class="my-2">
            <label for="">Nama Konsumen <span class="text-red-500">*</span></label>
            <Input name="customerName" v-model="customer_name" inputClass="py-1" />
          </div>
          <div class="my-2">
            <label for="">No. Hp Konsumen</label>
            <Input type="number" inputClass="py-1" v-model="customer_phone" />
          </div>
        </div>
        <div class="w-full">
          <div class="my-2">
            <label for="">Email Konsumen</label>
            <Input inputClass="py-1" v-model="customer_email" />
          </div>
          <div class="my-2">
            <label for="">Alamat Konsumen</label>
            <InputTextArea v-model="customer_address" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import currency from "@/helpers/currency";
import image from "@/helpers/image";
import Divider from "@/components/atoms/Divider/Divider.vue";
import Input from "@/components/atoms/Input/Input.vue";
import InputTextArea from "@/components/atoms/Input/InputTextArea.vue";

export default {
  name: "Checkout",
  components: {
    Divider,
    Input,
    InputTextArea,
  },
  setup() {},
  data() {
    return {
      totalBayar: 0,
      customer_name: "",
      customer_phone: "",
      customer_address: "",
      customer_email: "",
    };
  },
  computed: {
    getCarts() {
      return this.$store.getters.getCarts;
    },
    getTotal() {
      return currency(this.$store.getters.getTotal);
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
  watch: {
    customer_name() {
      this.$store.commit("saveCustomerName", this.customer_name);
    },
    customer_phone() {
      this.$store.commit("saveCustomerPhone", this.customer_phone);
    },
    customer_address() {
      this.$store.commit("saveCustomerAddress", this.customer_address);
    },
    customer_email() {
      this.$store.commit("saveCustomerEmail", this.customer_email);
    },
  },
};
</script>

<style></style>
