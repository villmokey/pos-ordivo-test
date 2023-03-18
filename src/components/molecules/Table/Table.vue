<template>
  <EasyDataTable
    :headers="columns"
    :items="dataSource"
    :alternating="alternating"
    :border-cell="borderCell"
    :search-field="searchField"
    :search-value="searchValue"
    :header-item-class-name="headerClass"
    :body-item-class-name="bodyClass"
    :body-row-class-name="bodyRowClass"
    :body-expand-row-class-name="bodyExpandClass"
  >
    <slot></slot>
  </EasyDataTable>
</template>

<script>
export default {
  name: "Table",
  props: ["columns", "dataSource", "alternating", "borderCell", "searchField", "searchValue", "headerClass", "bodyClass", "bodyRowClass", "bodyExpandClass"],
};
</script>

<style></style>
