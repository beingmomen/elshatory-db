<template>
  <nav
    class="dark:bg-gray-900 bg-slate-50 h-16 rounded-bl-md py-2 px-4 flex items-center"
  >
    <h1 class="font-bold text-2xl text-(--ui-primary)">{{ title }}</h1>
  </nav>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
</style>