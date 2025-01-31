<template>
  <div>
    <div class="ring-1 ring-gray-200 dark:ring-gray-600 rounded-md">
      <div class="flex items-center justify-between p-3">
        <div class="flex items-center gap-3">
          <h1 class="font-bold text-2xl text-light capitalize">
            {{ options.title }}
          </h1>
          <UBadge
            class="font-bold"
            color="primary"
            variant="subtle"
            :label="data?.total"
          />
        </div>
        <div class="flex items-center gap-2">
          <CommonSearchInput v-model="globalFilter" name="search" />
          <UButton
            v-if="isCreateButton"
            variant="subtle"
            trailing-icon="i-lucide-plus"
            size="md"
            :to="`${options.routeName}/new`"
          >
            Add {{ options.singleName }}
          </UButton>
        </div>
      </div>
      <USeparator />

      <div
        class="flex justify-between px-4 py-3.5 border-b border-[var(--ui-border-accented)]"
      >
        <div>
          <UInput
            v-model="localFilter"
            class="max-w-sm"
            placeholder="Local Filter..."
          />
        </div>
        <UDropdownMenu
          :items="
            table?.tableApi
              ?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => ({
                label: upperFirst(column.id),
                type: 'checkbox',
                checked: column.getIsVisible(),
                onUpdateChecked(checked) {
                  table?.tableApi
                    ?.getColumn(column.id)
                    ?.toggleVisibility(!!checked);
                },
                onSelect(e) {
                  e?.preventDefault();
                },
              }))
          "
          :content="{ align: 'end' }"
        >
          <UButton
            label="Columns"
            color="neutral"
            variant="outline"
            leading-icon="i-lucide-columns"
            trailing-icon="i-lucide-chevron-down"
          />
        </UDropdownMenu>
      </div>

      <div>
        <UTable
          ref="table"
          v-model:column-visibility="columnVisibility"
          v-model:global-filter="localFilter"
          :data="data?.data"
          :columns="columns"
          :loading="status === 'pending'"
        />
        <USeparator />
        <div class="p-4 flex justify-center">
          <UPagination
            v-model:page="page"
            show-edges
            :sibling-count="1"
            :total="data?.total"
          />
        </div>
      </div>

      <!-- <pre>{{ data }}</pre> -->
    </div>
  </div>
</template>

<script setup>
import { upperFirst } from "scule";
const table = useTemplateRef("table");

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const components = {
  UButton,
  UDropdownMenu,
};

const { actionCell } = useTableCell();

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  isCreateButton: {
    type: Boolean,
    default: true,
  },
});

const localFilter = ref("");
const columnVisibility = ref({
  documentNumber: true,
});

const columns = [
  ...props.columns,
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => actionCell({ row, components, getRowItems }),
    meta: {
      class: {
        th: "text-end",
      },
    },
  },
];

const { data, status, globalFilter, page, getRowItems } = await useTableModule({
  ...props.options,
});
</script>

<style lang="scss" scoped>
</style>