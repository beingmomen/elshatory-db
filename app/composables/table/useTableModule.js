export const useTableModule = async (options) => {
  const { fetchUrl, deleteUrl, editUrl, transform = (doc) => doc } = options;
  const { del } = useApiRequest();
  const toast = useToast();

  const page = ref(1);
  const globalFilter = ref("");

  const { data, status, refresh } = await useAPI(fetchUrl, {
    query: {
      search: globalFilter,
      page,
    },
    transform: transform,
    watch: [globalFilter, page],
    lazy: true,
  });

  function deleteToast(row) {
    toast.add({
      icon: "i-lucide-alert-triangle",
      duration: 5000,
      color: "error",
      title: "Delete Confirmation ...",
      description: "Are you sure you want to delete this record?",
      position: "top-center",
      ui: {
        actions: "justify-end",
      },
      actions: [
        {
          icon: "i-lucide-x",
          label: "Cancel",
          color: "error",
          variant: "outline",
          size: "md",
          onClick: (e) => {
            e?.stopPropagation();
          },
        },
        {
          icon: "i-lucide-check",
          label: "Confirm",
          color: "success",
          variant: "solid",
          size: "md",
          onClick: async () => {
            console.log("row :>> ", row);
            await del(`${deleteUrl}/${row.original.id}`);
            refresh();
          },
        },
      ],
    });
  }

  function getRowItems(row) {
    return [
      {
        label: "Copy ID",
        icon: "i-lucide-copy",
        onSelect() {
          navigator.clipboard.writeText(row.original.id);
          toast.add({
            title: "ID copied to clipboard!",
            color: "success",
            icon: "i-lucide-circle-check",
          });
        },
      },
      {
        type: "separator",
      },
      {
        label: "Edit row",
        icon: "i-lucide-edit",
        onSelect() {
          navigateTo(`${editUrl}/${row.original.id}`);
        },
      },
      {
        type: "separator",
      },
      {
        label: "Delete row",
        icon: "i-lucide-trash-2",
        async onSelect() {
          deleteToast(row);
        },
      },
    ];
  }

  return {
    data,
    status,
    globalFilter,
    page,
    getRowItems,
  };
};
