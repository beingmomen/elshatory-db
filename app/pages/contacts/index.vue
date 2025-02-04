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
const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const { patch } = useApiRequest();

const { sort, handleStatus } = useTableCell();
const options = {
  title: "Contacts",
  singleName: "contact",
  routeName: "/contacts",
  fetchUrl: "/contacts",
  deleteUrl: "/contacts",
  editUrl: "/contacts",
  customOptions: {
    copyId: true,
    edit: false,
    delete: true,
    list: [
      {
        index: 1,
        markAsView: {
          label: "Mark as Viewed",
          icon: "i-lucide-eye",
          onSelect({ row }) {
            patch(`/contacts/${row.original.id}`, {
              isViewed: true,
            });
          },
        },
      },
    ],
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
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "isViewed",
    header: "Viewed",
    cell: ({ row, column }) =>
      handleStatus({
        row,
        column,
        UBadge,
        messages: { active: "Viewed", inactive: "Not Viewed" },
      }),
  },

  {
    accessorKey: "description",
    header: "Description",
    meta: {
      class: {
        td: "whitespace-normal max-w-[500px] ",
      },
    },
  },
]);
</script>

<style lang="scss" scoped>
</style>