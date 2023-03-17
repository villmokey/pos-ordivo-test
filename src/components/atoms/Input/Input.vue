<template>
  <div :class="'w-full ' + parentClass">
    <input type="text" :name="name" :class="'rounded-md border border-[#d9d9d9] w-full px-4 placeholder:px-2 ' + inputClass" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["parentClass", "name", "placeholder", "inputClass"],
};
</script>

<style></style>
