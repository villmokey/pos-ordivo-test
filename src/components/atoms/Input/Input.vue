<template>
  <div :class="'w-full ' + parentClass">
    <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :name="name" min="0" :class="'rounded-md border border-[#d9d9d9] w-full px-4 placeholder:px-2 ' + inputClass" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["parentClass", "name", "placeholder", "inputClass", "type", "modelValue"],
  emits: ["update:modelValue"],
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
