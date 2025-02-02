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
const cloudinary = config.public.cloudinary;
const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");

const { handleImage, sort, handleStatus } = useTableCell();
const options = {
  title: "Testimonials",
  singleName: "testimonial",
  routeName: "/testimonials",
  fetchUrl: "/testimonials",
  deleteUrl: "/testimonials",
  editUrl: "/testimonials",
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isConfirmed",
    header: "Confirmed",
    cell: ({ row, column }) =>
      handleStatus({
        row,
        column,
        UBadge,
        messages: { active: "Confirmed", inactive: "Not Confirmed" },
      }),
  },

  {
    accessorKey: "description",
    header: "Description",
    meta: {
      class: {
        td: "whitespace-normal max-w-[400px] ",
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