<template>
  <div class="col-span-2">
    <UForm
      :validate-on="['input', 'blur', 'change']"
      :state="state"
      :schema="schema"
      class="rounded-md px-5 *:py-4 divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900"
      @submit="handleSubmit"
    >
      <div class="grid grid-cols-2 gap-4 items-end">
        <div>
          <p
            class="text-gray-900 dark:text-white font-semibold after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400"
          >
            Current password
          </p>
          <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Required to confirm your identity.
          </span>
        </div>

        <FormPasswordInput
          v-model="state.passwordCurrent"
          name="passwordCurrent"
        />
      </div>
      <div class="grid grid-cols-2 gap-4 items-end">
        <div>
          <p
            class="text-gray-900 dark:text-white font-semibold after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400"
          >
            New password
          </p>
          <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Must be at least 8 characters long.
          </span>
        </div>

        <FormPasswordInput v-model="state.password" name="password" />
      </div>
      <div class="grid grid-cols-2 gap-4 items-end">
        <div>
          <p
            class="text-gray-900 dark:text-white font-semibold after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400"
          >
            Confirm new password
          </p>
          <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Must match the new password.
          </span>
        </div>

        <FormPasswordInput
          v-model="state.passwordConfirm"
          name="passwordConfirm"
        />
      </div>
      <div class="flex justify-end">
        <UButton
          type="submit"
          color="neutral"
          class="dark:text-black font-bold"
          :loading="loading"
        >
          Save changes
        </UButton>
      </div>
    </UForm>
  </div>
</template>
  
  <script setup>
const { state, schema, handleSubmit, loading } = usePasswordForm();
</script>
  
  <style lang="scss" scoped>
</style>