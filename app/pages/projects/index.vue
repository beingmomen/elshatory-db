<template>
  <div>
    <CommonDataTable :options="options" :columns="columns" />
  </div>
</template>

<script setup>
const UButton = resolveComponent("UButton");

const { handleImage, sort, handleLink } = useTableCell();
const options = {
  title: "Projects",
  singleName: "project",
  routeName: "/projects",
  fetchUrl: "/projects",
  deleteUrl: "/projects",
  editUrl: "/projects",
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
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "url",
    header: "Project URL",
    cell: ({ row, column }) => handleLink({ row, column, UButton }),
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