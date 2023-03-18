<template>
  <div class="bg-gray-100 h-screen w-full">
    <div class="shadow-md rounded-md bg-white max-w-6xl mx-auto p-4">
      <h1 class="font-bold text-lg mb-5">Daftar Produk</h1>
      <div class="flex justify-between my-2">
        <input type="text" class="border py-2 px-2 border-[#d9d9d9] rounded-md text-sm max-w-[250px] w-full my-auto" v-model="searchData" placeholder="Cari Nama Produk" />
        <router-link to="/list/products/create"><button class="bg-blue-500 text-white rounded-md p-2">Tambah Produk</button></router-link>
      </div>

      <Table :columns="tableColumns" :dataSource="items" :borderCell="false" :alternating="true" :searchValue="searchData" :bodyClass="'text-md py-3 font-light'" :headerClass="'text-left'" />
    </div>
  </div>
</template>

<script>
import Table from "@/components/molecules/Table/Table.vue";
import { getAllProducts } from "@/api/productApi";
import currency from "@/helpers/currency";
import image from "@/helpers/image";
export default {
  name: "Products",
  components: {
    Table,
  },
  mounted() {
    this.getProductsData();
  },
  data() {
    return {
      searchData: "",
      tableColumns: [
        { text: "ID", value: "id" },
        { text: "Nama Produk", value: "name" },
        { text: "Gambar", value: "image" },
        { text: "Harga", value: "price" },
        { text: "Stok", value: "stock" },
        { text: "Dibuat pada", value: "created_at" },
      ],
      items: [],
    };
  },
  methods: {
    async getProductsData() {
      const { result } = await getAllProducts();
      if (result) {
        const fetch = result.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            image: image(item.images[0].image_path),
            price: currency(item.price),
            stock: item.stock,
            created_at: new Date(item.created_at).toLocaleString(),
          };
        });

        this.items = fetch;
      }
    },
  },
};
</script>

<style></style>
