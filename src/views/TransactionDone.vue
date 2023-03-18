<template>
  <MainNavbar class="bg-gray-100" />
  <div class="w-full bg-gray-100 h-screen">
    <div class="shadow-md rounded-md bg-white max-w-3xl mx-auto p-4 px-7 flex flex-col gap-3">
      <h1 class="text-lg font-bold text-center mb-7">Detail Transaksi</h1>
      <div class="flex w-full">
        <h5 class="w-[200px] font-light">ID transaksi</h5>
        <h5 class="text-semibold">: {{ product.id }}</h5>
      </div>
      <div class="flex w-full">
        <h5 class="w-[200px] font-light">Tanggal Transaksi</h5>
        <h5 class="text-semibold">: {{ product.transactionDate }}</h5>
      </div>
      <div class="flex w-full">
        <h5 class="w-[200px] font-light">Nama konsumen</h5>
        <h5 class="text-semibold">: {{ product.customerName }}</h5>
      </div>
      <h5 class="w-[200px] font-light">Pesanan:</h5>
      <div class="table w-full px-20">
        <div class="table-header-group">
          <div class="table-row">
            <div class="table-cell text-left font-bold">Nama Produk</div>
            <div class="table-cell text-left font-bold">QTY</div>
            <div class="table-cell text-left font-bold">Note</div>
            <div class="table-cell font-bold text-right">Harga</div>
          </div>
        </div>
        <div class="table-row-group">
          <div class="table-row" v-for="product in product.products" :key="product.id">
            <div class="table-cell py-2">{{ product.product.name }}</div>
            <div class="table-cell py-2">{{ product.qty }}</div>
            <div class="table-cell py-2">{{ product.note !== "" && product.note ? product.note : "-" }}</div>
            <div class="table-cell py-2 text-right">{{ currencyFormat(product.total_price) }}</div>
          </div>
          <div class="table-row">
            <div class="table-cell py-2 font-bold">SubTotal</div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2 font-bold text-right">{{ currencyFormat(product.subTotal) }}</div>
          </div>
          <div class="table-row">
            <div class="table-cell py-2 font-bold">PPN (11%)</div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2 font-bold text-right">{{ currencyFormat(product.tax) }}</div>
          </div>
          <div class="table-row">
            <div class="table-cell py-2 font-bold">Total</div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2 font-bold text-right">{{ currencyFormat(product.total) }}</div>
          </div>
          <div class="table-row">
            <div class="table-cell py-2 font-bold">Jumlah Bayar</div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2 font-bold text-right">{{ currencyFormat(product.payment) }}</div>
          </div>
          <div class="table-row">
            <div class="table-cell py-2 font-bold">Jumlah Kembalian</div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2"></div>
            <div class="table-cell py-2 font-bold text-right">{{ currencyFormat(product.paymentChange) }}</div>
          </div>
        </div>
      </div>
      <button type="button" class="w-full bg-blue-500 text-white rounded-md p-3 mt-10" @click="redirectHome">Selesai</button>
    </div>
  </div>
</template>

<script>
import { getTransaction } from "@/api/transactionApi";
import MainNavbar from "@/components/organism/Navbar/MainNavbar.vue";
import currency from "@/helpers/currency";
export default {
  name: "TransactionDone",
  components: {
    MainNavbar,
  },
  props: ["id"],
  data() {
    return {
      product: {
        id: "",
        transactionDate: "",
        customerName: "",
        products: [],
        subTotal: 0,
        tax: 0,
        total: 0,
        payment: 0,
        paymentChange: 0,
      },
    };
  },
  mounted() {
    this.fetchProduct();
  },
  computed: {},
  methods: {
    async fetchProduct() {
      const { result } = await getTransaction(this.$props.id);
      console.log(result);
      if (result) {
        this.product = {
          id: result.id,
          transactionDate: new Date(result.created_at).toLocaleString(),
          customerName: result.customer_name,
          products: result.detail,
          subTotal: parseInt(result.total),
          tax: parseInt(result.tax),
          total: parseInt(result.total),
          payment: parseInt(result.payment_total),
          paymentChange: parseInt(result.payment_change),
        };
      }
    },
    currencyFormat(value) {
      return currency(value);
    },
    redirectHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
