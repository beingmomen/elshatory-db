export const useTableModule = async (options) => {
  const {
    fetchUrl,
    deleteUrl,
    editUrl,
    transform = (doc) => doc,
    customOptions = { copyId: true, edit: true, delete: true },
  } = options;
  const { del } = useApiRequest();
  const toast = useToast();

  const page = ref(1);
  const globalFilter = ref(undefined);

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
    // Define base items without separators
    let items = [
      {
        visible: customOptions.copyId,
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
        visible: customOptions.edit,
        label: "Edit row",
        icon: "i-lucide-edit",
        onSelect() {
          navigateTo(`${editUrl}/${row.original.id}`);
        },
      },
      {
        visible: customOptions.delete,
        label: "Delete row",
        icon: "i-lucide-trash-2",
        async onSelect() {
          deleteToast(row);
        },
      },
    ];

    // Filter out invisible items first
    items = items.filter((item) => item.visible !== false);

    // Insert custom items from the list at their specified positions
    if (customOptions.list?.length > 0) {
      customOptions.list.forEach((customItem) => {
        const [action, config] =
          Object.entries(customItem).find(([key]) => key !== "index") || [];
        if (action && config) {
          const newItem = {
            label: config.label,
            icon: config.icon,
            onSelect: () => config.onSelect({ row, refresh }),
          };
          items.splice(customItem.index, 0, newItem);
        }
      });
    }

    // Add separators between items
    const itemsWithSeparators = [];
    items.forEach((item, index) => {
      itemsWithSeparators.push(item);
      // Add separator after each item except the last one
      if (index < items.length - 1) {
        itemsWithSeparators.push({ type: "separator" });
      }
    });

    return itemsWithSeparators;
  }

  return {
    data,
    status,
    globalFilter,
    page,
    getRowItems,
  };
};
