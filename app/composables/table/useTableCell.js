export const useTableCell = () => {
  const handleIcon = ({ row, column, UAvatar }) => {
    return h("div", { class: "flex items-center gap-3" }, [
      h(UAvatar, {
        class: "w-12 h-12 rounded-full",
        icon: row.original[column.id],
        alt: row.original.name,
        size: "lg",
      }),
    ]);
  };

  const handleImage = ({ row, column }) => {
    return h("div", { class: "flex items-center gap-3" }, [
      h("img", {
        class: "w-12 h-12 rounded-full",
        src: row.original[column.id],
        alt: row.original.name,
        size: "lg",
      }),
    ]);
  };

  const handleStatus = ({ row, column, UBadge }) => {
    return h("div", { class: "flex items-center gap-3" }, [
      h(UBadge, {
        color: row.original[column.id] ? "success" : "error",
        label: row.original[column.id] ? "Active" : "Inactive",
        size: "lg",
        class: "font-bold ",
      }),
    ]);
  };

  const handleLink = ({ row, column, UButton }) => {
    return h("div", { class: "flex items-center gap-3" }, [
      h(UButton, {
        to: row.original[column.id],
        label: "View",
        icon: "i-lucide-external-link",
        target: "_blank",
      }),
    ]);
  };

  const sort = ({ column, UButton, label }) => {
    const isSorted = column.getIsSorted();
    return h(UButton, {
      color: "neutral",
      variant: "ghost",
      label,
      icon: isSorted
        ? isSorted === "asc"
          ? "i-lucide-arrow-up-narrow-wide"
          : "i-lucide-arrow-down-narrow-wide"
        : "i-lucide-arrow-up-down",
      class: "-mx-2.5",

      onClick: () => {
        const nextSortingState = {
          asc: "desc",
          desc: false,
          false: "asc",
        }[isSorted];

        if (nextSortingState === false) {
          column.clearSorting();
        } else {
          column.toggleSorting(nextSortingState === "desc");
        }
      },
    });
  };

  const actionCell = ({ row, components, getRowItems }) => {
    return h(
      "div",
      { class: "text-right" },
      h(
        components.UDropdownMenu,
        {
          content: {
            align: "end",
          },
          items: getRowItems(row),
        },
        () =>
          h(components.UButton, {
            icon: "i-lucide-ellipsis-vertical",
            color: "neutral",
            variant: "ghost",
            class: "ml-auto",
          })
      )
    );
  };

  return {
    handleImage,
    handleIcon,
    handleLink,
    handleStatus,
    sort,
    actionCell,
  };
};
