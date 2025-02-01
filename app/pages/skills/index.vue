<template>
  <div>
    <CommonDataTable :options="options" :columns="columns" />
  </div>
</template>

<script setup>
const UButton = resolveComponent("UButton");
const UAvatar = resolveComponent("UAvatar");

const { handleIcon, sort } = useTableCell();
const options = {
  title: "Skills",
  singleName: "skill",
  routeName: "/skills",
  fetchUrl: "/skills",
  deleteUrl: "/skills",
  editUrl: "/skills",
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
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row, column }) => handleIcon({ row, column, UAvatar }),
  },
]);
</script>

<style lang="scss" scoped>
</style>