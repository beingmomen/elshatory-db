<template>
  <div>
    <CommonDataTable :options="options" :columns="columns" />
  </div>
</template>

<script setup>
const UButton = resolveComponent("UButton");

const { handleLink, sort } = useTableCell();
const options = {
  title: "Resources",
  singleName: "resource",
  routeName: "/resources",
  fetchUrl: "/resources",
  deleteUrl: "/resources",
  editUrl: "/resources",
};

const columns = ref([
  {
    accessorKey: "documentNumber",
    header: ({ column }) => sort({ column, UButton, label: "#" }),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row, column }) => handleLink({ row, column, UButton }),
  },
]);
</script>

<style lang="scss" scoped></style>
