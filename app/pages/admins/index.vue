<template>
  <div>
    <CommonDataTable :options="options" :columns="columns" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const images = config.public.images;
const UButton = resolveComponent("UButton");

const { handleImage, sort } = useTableCell();
const options = {
  title: "Admins",
  singleName: "admin",
  routeName: "/admins",
  fetchUrl: "/users/admins",
  deleteUrl: "/users",
  editUrl: "/admins",
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
  {
    accessorKey: "name",
    header: ({ column }) => sort({ column, UButton, label: "Name" }),
  },
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