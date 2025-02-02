<template>
  <div>
    <CommonDataTable :options="options" :columns="columns" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const cloudinary = config.public.cloudinary;
const UButton = resolveComponent("UButton");

const { handleImage, sort, handleLink } = useTableCell();
const options = {
  title: "Clients",
  singleName: "client",
  routeName: "/clients",
  fetchUrl: "/clients",
  deleteUrl: "/clients",
  editUrl: "/clients",
  transform: (doc) => {
    return {
      ...doc,
      data:
        doc?.data?.map((client) => ({
          ...client,
          image: `${cloudinary.cloudinaryUrl}${client.image}`,
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
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: handleImage,
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row, column }) => handleLink({ row, column, UButton }),
  },
]);
</script>

<style lang="scss" scoped>
</style>