<template>
  <div>
    <CommonDataTable :options="options" :columns="columns" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const cloudinary = config.public.cloudinary;

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");

const { handleImage, sort, handleLink, handleStatus } = useTableCell();
const options = {
  title: "Projects",
  singleName: "project",
  routeName: "/projects",
  fetchUrl: "/projects",
  deleteUrl: "/projects",
  editUrl: "/projects",
  transform: (doc) => {
    return {
      ...doc,
      data:
        doc?.data?.map((testimonial) => ({
          ...testimonial,
          image: `${cloudinary.cloudinaryUrl}${testimonial.image}`,
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
    accessorKey: "isActive",
    header: "Show Project",
    cell: ({ row, column }) => handleStatus({ row, column, UBadge }),
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