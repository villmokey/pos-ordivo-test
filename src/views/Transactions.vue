<template>
  <div class="bg-gray-100 h-screen w-full">
    <div class="shadow-md rounded-md bg-white max-w-6xl mx-auto p-4">
      <h1 class="font-bold text-lg mb-5">Daftar Transaksi</h1>
      <input type="text" class="border py-2 px-2 border-[#d9d9d9] rounded-md my-3 text-sm max-w-[250px] w-full" v-model="searchData" placeholder="Cari Nama konsumen" />
      <Table :columns="tableColumns" :dataSource="items" :borderCell="false" :alternating="true" :searchValue="searchData" :bodyClass="'text-md py-3 font-light'" :headerClass="'text-left'" />
    </div>
  </div>
</template>

<script>
import Table from "@/components/molecules/Table/Table.vue";
import { getAllTransactions } from "@/api/transactionApi";
import currency from "@/helpers/currency";
export default {
  name: "Transactions",
  components: {
    Table,
  },
  mounted() {
    this.getTransactionsData();
  },
  data() {
    return {
      searchData: "",
      tableColumns: [
        { text: "ID", value: "id" },
        { text: "Nama Konsumen", value: "customerName" },
        { text: "Total Jumlah Pesanan", value: "productOrderedTotal" },
        { text: "Pajak", value: "tax" },
        { text: "Jumlah Bayar", value: "paymentTotal" },
        { text: "Jumlah Kembalian", value: "paymentChange" },
        { text: "Tanggal Pesan", value: "orderedDate" },
      ],
      items: [],
    };
  },
  methods: {
    async getTransactionsData() {
      const { result } = await getAllTransactions();
      if (result) {
        const fetch = result.data.map((item) => {
          return {
            id: item.id,
            customerName: item.customer_name,
            productOrderedTotal: currency(item.total),
            tax: currency(item.tax),
            paymentTotal: currency(item.payment_total),
            paymentChange: currency(item.payment_change),
            orderedDate: new Date(item.created_at).toLocaleString(),
          };
        });

        this.items = fetch;
      }
    },
  },
};
</script>

<style></style>
