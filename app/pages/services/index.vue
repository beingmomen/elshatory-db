<template>
  <div>
    <CommonDataTable :options="options" :columns="columns" />
  </div>
</template>

<script setup>
const UButton = resolveComponent("UButton");

const { handleImage, sort } = useTableCell();
const options = {
  title: "Services",
  singleName: "service",
  routeName: "/services",
  fetchUrl: "/services",
  deleteUrl: "/services",
  editUrl: "/services",
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
    accessorKey: "description",
    header: "Description",
    meta: {
      class: {
        td: "whitespace-normal max-w-[200px] ",
      },
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: handleImage,
  },
]);
</script>

<style lang="scss" scoped>
</style>