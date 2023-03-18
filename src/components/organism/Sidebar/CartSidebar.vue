<template>
  <div :class="'bg-white w-full h-screen shadow-md px-5 ' + parentClass">
    <div v-if="currentRoute == 'checkout'">
      <h1 class="text-lg font-semibold mt-5">Order Details</h1>
      <Divider />
      <div class="flex flex-col w-full gap-3 mt-auto">
        <div class="flex justify-between w-full">
          <h4 class="text-md">Subtotal</h4>
          <h4 class="font-bold text-blue-500">{{ getSubTotal }}</h4>
        </div>
        <div class="flex justify-between w-full">
          <h4 class="text-md">PPN (11%)</h4>
          <h4 class="font-bold text-blue-500">{{ getPPN }}</h4>
        </div>
      </div>
      <Divider class="my-3" />
      <div class="flex justify-between w-full">
        <h4 class="text-md font-bold">Total</h4>
        <h4 class="font-bold text-md text-blue-500">{{ getTotal }}</h4>
      </div>
      <div class="flex w-full mt-3">
        <h4 class="text-md font-bold w-[40%]">Jumlah Bayar</h4>
        <Input v-model="totalPay" type="number" parentClass="flex justify-end" inputClass="text-end w-full text-blue-500 font-bold" placeholder="Masukan jumlah bayar" />
      </div>
      <Divider class="my-3" />
      <div class="flex justify-between w-full">
        <h4 class="text-md font-bold">Kembalian</h4>
        <h4 class="font-bold text-md text-blue-500">{{ getChange }}</h4>
      </div>
      <button type="button" :disabled="totalPay === 0 ? true : false" :class="`${totalPay === 0 ? 'bg-gray-200' : 'bg-blue-500'} text-white p-2 w-full rounded-md mt-4`" @click="onPay">
        <v-icon name="px-loader" class="animate-spin w-7 h-7" v-if="loading"></v-icon>
        <span v-else>Bayar</span>
      </button>
    </div>
    <div v-else>
      <h1 class="text-lg font-semibold mt-5">Carts</h1>
      <Divider />
      <div class="mt-5 flex flex-col gap-5 h-[60vh] overflow-y-auto">
        <div class="flex gap-7" v-for="product in renderProduct" :key="product.id">
          <img :src="imageSrc(product.images[0].image_path)" alt="Image" class="h-[120px] w-[120px] object-center my-auto rounded-md" />
          <div class="flex flex-col w-full">
            <h4 class="text-md font-semibold">{{ product.name }}</h4>
            <div class="flex justify-between mt-2">
              <h4>{{ product.qty }}x</h4>
              <h4 class="font-bold text-blue-500">{{ currencyFormat(product.total_price) }}</h4>
            </div>
            <p class="text-xs font-light mt-1">{{ renderNote(product.note) }}</p>
            <button type="button" class="p-1 text-white bg-red-500 rounded-md mt-auto" @click="deleteProduct(product.id)">Hapus</button>
          </div>
        </div>
      </div>
      <Divider class="my-3" />
      <div class="flex flex-col w-full gap-3 mt-auto">
        <div class="flex justify-between w-full">
          <h4>Subtotal</h4>
          <h4 class="font-bold text-blue-500">{{ getSubTotal }}</h4>
        </div>
        <div class="flex justify-between w-full">
          <h4>PPN (11%)</h4>
          <h4 class="font-bold text-blue-500">{{ getPPN }}</h4>
        </div>
      </div>
      <Divider class="my-3" />
      <div class="flex justify-between w-full">
        <h4 class="text-lg font-bold">Total</h4>
        <h4 class="font-bold text-lg text-blue-500">{{ getTotal }}</h4>
      </div>
      <button type="button" :disabled="renderProduct.length ? false : true" :class="`${renderProduct.length ? 'bg-blue-500' : 'bg-gray-200'} text-white p-2 w-full rounded-md mt-4`" @click="onSubmit">Pembayaran</button>
    </div>
  </div>
</template>

<script>
import Divider from "@/components/atoms/Divider/Divider.vue";
import currency from "@/helpers/currency";
import image from "@/helpers/image";
import Input from "@/components/atoms/Input/Input.vue";
import { createTransaction } from "@/api/transactionApi";
import { useToast } from "vue-toastification";

export default {
  name: "CartSidebar",
  props: ["parentClass"],
  components: {
    Divider,
    Input,
  },
  data() {
    return {
      totalPay: 0,
      loading: false,
    };
  },
  computed: {
    renderProduct() {
      return this.$store.getters.getCarts;
    },
    getSubTotal() {
      return currency(this.$store.getters.getTotal);
    },
    getPPN() {
      return currency((this.$store.getters.getTotal * 11) / 100);
    },
    getTotal() {
      return currency(this.$store.getters.getTotal + (this.$store.getters.getTotal * 11) / 100);
    },
    currentRoute() {
      return this.$route.name;
    },
    getChange() {
      return this.totalPay === 0 ? 0 : currency(parseInt(this.totalPay) - parseInt(this.$store.getters.getTotal + (this.$store.getters.getTotal * 11) / 100));
    },
  },
  methods: {
    imageSrc(src) {
      return image(src);
    },
    currencyFormat(value) {
      return currency(value);
    },
    deleteProduct(id) {
      this.$store.commit("deleteCarts", { id });
    },
    renderNote(note) {
      return note ? note.substring(0, 20) + "..." : "";
    },
    onSubmit() {
      this.$router.push({ name: "checkout" });
    },
    async onPay() {
      const toast = useToast();

      let customerData = this.$store.getters.getCustomerData;

      if (customerData.customer_name === "") {
        toast.error("Nama konsumen tidak boleh kosong!", {
          position: "top-center",
        });

        return;
      }

      const fetchCart = this.renderProduct.map((item) => {
        return {
          product_id: item.id,
          qty: item.qty,
          total_price: item.total_price,
          note: item.note,
        };
      });

      let payload = {
        ...customerData,
        total: this.$store.getters.getTotal,
        tax: (this.$store.getters.getTotal * 11) / 100,
        payment_total: parseInt(this.totalPay),
        payment_change: this.totalPay - parseInt(this.$store.getters.getTotal + (this.$store.getters.getTotal * 11) / 100),
        products: fetchCart,
      };

      this.loading = true;
      const { result, error } = await createTransaction(payload);
      this.loading = false;

      if (error) {
        toast.error(error, {
          position: "top-center",
        });

        return;
      }

      if (result) {
        this.$store.commit("cleanData");
        this.$router.push({ name: "transactionDone", params: { id: result.id } });
      }
    },
  },
  watch: {},
};
</script>

<style></style>
