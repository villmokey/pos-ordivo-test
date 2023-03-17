<template>
  <div :class="'w-full ' + parentClass">
    <textarea
      :name="name"
      :placeholder="placeholder"
      cols="30"
      rows="3"
      :value="modelValue"
      class="resize-none rounded-md border border-[#d9d9d9] w-full p-3 outline-none placeholder:px-1"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "InputTextArea",
  props: ["parentClass", "name", "modelValue", "placeholder"],
  emits: ["update:modelValue"],
};
</script>

<style></style>
