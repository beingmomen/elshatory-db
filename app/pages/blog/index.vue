<template>
  <div>
    <CommonDataTable :options="options" :columns="columns" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const cloudinary = config.public.cloudinary;
const UButton = resolveComponent("UButton");

const { handleImage, sort } = useTableCell();
const options = {
  title: "Blog",
  singleName: "blog",
  routeName: "/blog",
  fetchUrl: "/blogs",
  deleteUrl: "/blogs",
  editUrl: "/blogs",
  transform: (doc) => {
    return {
      ...doc,
      data:
        doc?.data?.map((blog) => ({
          ...blog,
          image: `${cloudinary.cloudinaryUrl}${blog.image}`,
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: handleImage,
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]);
</script>

<style lang="scss" scoped>
</style>