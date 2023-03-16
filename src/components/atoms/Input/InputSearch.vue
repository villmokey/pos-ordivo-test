<template>
  <div :class="'w-full relative ' + parentClass">
    <input type="text" :placeholder="placeholder" :class="'rounded-md shadow-sm w-full px-4 pr-10 placeholder:px-2 outline-none py-2 ' + inputClass" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <button type="button" @click="onSearch" class="absolute right-2 top-1 bg-blue-500 rounded-md px-3 py-1">
      <v-icon name="bi-search" class="h-5 w-5 text-white"></v-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: "InputSearch",
  props: ["modelValue", "inputClass", "parentClass", "placeholder"],
  emits: ["update:modelValue", "onSearch"],
  data() {
    return {
      search: "",
    };
  },
  methods: {
    onSearch() {
      this.$emit("onSearch", this.search);
    },
  },
};
</script>

<style></style>
