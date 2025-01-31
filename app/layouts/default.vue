<template>
  <div
    class="flex gap-4 dark:bg-slate-800 bg-slate-200 min-h-screen overflow-hidden"
  >
    <LayoutTheSidebar />
    <div class="flex-1 flex flex-col gap-4 min-h-0">
      <LayoutTheNavbar :title="title" />
      <div
        class="dark:bg-gray-900 bg-slate-50 flex-1 rounded-ss-md p-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-5rem)] no-scrollbar"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const title = ref("");
provide("pageTitle", title);
</script>

<style lang="scss" scoped></style>