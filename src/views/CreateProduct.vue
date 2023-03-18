<template>
  <div class="bg-gray-100 h-screen w-full">
    <div class="shadow-md rounded-md bg-white max-w-3xl mx-auto p-4 px-7">
      <h1 class="font-bold text-lg mb-5">Tambah Produk baru</h1>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="flex gap-7">
          <div class="w-full">
            <div class="my-2 flex flex-col">
              <Field name="name" v-slot="{ field, errorMessage, meta }">
                <label class="text-sm">Nama Produk</label>
                <input v-bind="field" type="text" class="border border-[#d9d9d9] rounded-md py-1 px-2" />
                <span class="text-red-500 text-xs" v-if="errorMessage && meta.touched">{{ errorMessage }}</span>
              </Field>
            </div>
            <div class="my-2 flex flex-col">
              <Field name="price" v-slot="{ field, errorMessage, meta }">
                <label class="text-sm">Harga Satuan</label>
                <input v-bind="field" type="text" class="border border-[#d9d9d9] rounded-md py-1 px-2" />
                <span class="text-red-500 text-xs" v-if="errorMessage && meta.touched">{{ errorMessage }}</span>
              </Field>
            </div>
          </div>
          <div class="w-full">
            <div class="my-2 flex flex-col">
              <Field name="stock" v-slot="{ field, errorMessage, meta }">
                <label class="text-sm">Stok</label>
                <input v-bind="field" type="number" class="border border-[#d9d9d9] rounded-md py-1 px-2" />
                <span class="text-red-500 text-xs" v-if="errorMessage && meta.touched">{{ errorMessage }}</span>
              </Field>
            </div>
          </div>
        </div>
        <div class="my-2 flex flex-col">
          <Field name="description" v-slot="{ field, errorMessage, meta }">
            <label class="text-sm">Deskripsi</label>
            <textarea v-bind="field" class="border border-[#d9d9d9] rounded-md py-1 px-2 resize-none" cols="5" rows="3"></textarea>
            <span class="text-red-500 text-xs" v-if="errorMessage && meta.touched">{{ errorMessage }}</span>
          </Field>
        </div>
        <div class="flex flex-col my-5">
          <Field name="image" v-slot="{ handleChange, errorMessage, meta, handleBlur }">
            <label class="text-sm">Upload Gambar </label>
            <div class="w-full h-[200px] outline-[#d9d9d9] outline-dashed rounded-lg outline-ifven-gray mt-1 relative text-ifven-gray">
              <div class="w-full h-full flex flex-col justify-center absolute">
                <span class="mx-auto">Upload</span>
              </div>
              <input type="file" class="w-full h-full opacity-0" @change="handleChange" @blur="handleBlur" />
            </div>
            <span class="text-red-500 text-xs" v-if="errorMessage && meta.touched">{{ errorMessage }}</span>
          </Field>
          <!-- <img :src="imageSrc" alt="" /> -->
        </div>
        <button class="bg-blue-500 text-white rounded-md w-full p-2">
          <v-icon name="px-loader" class="animate-spin" v-if="loading"></v-icon>
          <span v-else>Tambah</span>
        </button>
      </Form>
    </div>
  </div>
</template>

<script>
import { Field, Form } from "vee-validate";
import * as Yup from "yup";
import { uploadImage } from "@/api/uploadApi";
import { createProduct } from "@/api/productApi";

export default {
  name: "CreateProduct",
  components: {
    Form,
    Field,
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Nama produk tidak boleh kosong"),
      price: Yup.string().required("Harga satuan tidak boleh kosong"),
      stock: Yup.string().required("Stok tidak boleh kosong"),
      description: Yup.string().required("Deskripsi tidak boleh kosong"),
      image: Yup.mixed().required("Gambar tidak boleh kosong"),
    });

    return {
      schema,
      loading: false,
    };
  },
  methods: {
    async onSubmit(values) {
      this.loading = true;
      const formData = new FormData();
      formData.append("image", values.image);

      const { result } = await uploadImage(formData);

      if (result) {
        let payload = {
          name: values.name,
          description: values.description,
          price: parseInt(values.price),
          stock: parseInt(values.stock),
          images: [result.id],
        };

        const { result: res } = await createProduct(payload);

        if (res) {
          this.$router.push("/list/products");
        }
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
