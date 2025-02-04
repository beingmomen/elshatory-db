<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-900 dark:text-white font-semibold">Theme</p>
        <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize the look and feel of your dashboard.
        </span>
      </div>
      <CommonColorModeSelect />
    </div>
    <USeparator type="dashed" />
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-900 dark:text-white font-semibold">
          Build The Website
        </p>
        <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure the website structure and content.
        </span>
      </div>
      <UButton
        :loading="loading"
        icon="i-lucide-refresh-cw"
        @click="handleSubmit"
      >
        Build Website
      </UButton>
    </div>
    <USeparator type="dashed" />
    <div class="grid grid-cols-3 gap-4">
      <div>
        <p class="text-gray-900 dark:text-white font-semibold">Profile</p>
        <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          This information will be displayed publicly so be careful what you
          share.
        </span>
      </div>
      <SettingsProfileInputs />
    </div>
    <USeparator type="dashed" />
    <div class="grid grid-cols-3 gap-4">
      <div>
        <p class="text-gray-900 dark:text-white font-semibold">Password</p>
        <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Confirm your current password before setting a new one.
        </span>
      </div>
      <SettingsPasswordInputs />
    </div>
  </div>
</template>

<script setup>
const { handleSubmit, loading } = useBuild();
const pageTitle = inject("pageTitle");

onMounted(() => {
  pageTitle.value = "Settings";
});
</script>

<style lang="scss" scoped>
</style>