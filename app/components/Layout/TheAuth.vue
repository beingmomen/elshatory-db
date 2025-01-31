<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="relative w-[460px] rounded-md p-10 ring-1 ring-gray-200 dark:ring-gray-800 shadow-2xl bg-white dark:bg-gray-800"
    >
      <div class="flex justify-center mb-6">
        <UButton
          :avatar="{
            src: 'https://github.com/nuxt.png',
            alt: 'Benjamin Canac',
          }"
          size="xl"
          color="neutral"
          variant="link"
        >
          Dashboard
        </UButton>
      </div>
      <slot name="header"> Default header content </slot>
      <div class="mb-6">
        <h4 class="text-4xl font-bold mb-2">Welcome 👋</h4>
        <p class="text-gray-500 dark:text-gray-400">{{ message }}</p>
        <slot name="titles" />
      </div>
      <slot />
      <CommonBoxedPattern class="bottom-[-60px] right-[-60px]" />

      <CommonRectPattern class="top-[-80px] left-[-45px]" />
    </div>
  </div>
</template>
  
  <script setup>
const message = ref("");
provide("pageMessage", message);
</script>
  
  <style lang="scss" scoped>
</style>