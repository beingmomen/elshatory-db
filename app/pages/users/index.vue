<template>
  <div>
    <CommonDataTable
      :options="options"
      :columns="columns"
      :is-create-button="false"
    />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const images = config.public.images;
const UButton = resolveComponent("UButton");

const { handleImage, sort } = useTableCell();
const options = {
  title: "Users",
  singleName: "user",
  routeName: "/users",
  fetchUrl: "/users",
  deleteUrl: "/users",
  editUrl: "/users",
  transform: (doc) => {
    return {
      ...doc,
      data:
        doc?.data?.map((user) => ({
          ...user,
          photo: `${images.imageLocalPath}${user.photo}`,
        })) || [],
    };
  },
};

const columns = ref([
  {
    accessorKey: "documentNumber",
    header: ({ column }) => sort({ column, UButton, label: "#" }),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: handleImage,
  },
]);
</script>

<style lang="scss" scoped>
</style>