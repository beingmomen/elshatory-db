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
            Name
          </p>
          <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Will appear on receipts, invoices, and other communication.
          </span>
        </div>

        <FormInput v-model="state.name" name="name" icon="i-lucide-user" />
      </div>
      <div class="grid grid-cols-2 gap-4 items-end">
        <div>
          <p
            class="text-gray-900 dark:text-white font-semibold after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400"
          >
            Email
          </p>
          <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Used to sign in, for email receipts and product updates.
          </span>
        </div>

        <FormInput v-model="state.email" name="email" icon="i-lucide-mail" />
      </div>
      <div class="grid grid-cols-2 gap-4 items-end">
        <div>
          <p
            class="text-gray-900 dark:text-white font-semibold after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400"
          >
            Phone
          </p>
          <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Used for contact purposes and important notifications.
          </span>
        </div>

        <FormInput v-model="state.phone" name="phone" icon="i-lucide-phone" />
      </div>
      <div class="grid grid-cols-2 gap-4 items-end">
        <div>
          <p class="text-gray-900 dark:text-white font-semibold">Avatar</p>
          <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Used on invoices and receipts.
          </span>
        </div>
        <FormFileInput
          v-model="state.photo"
          name="photo"
          :is-cloudinary="false"
        />
      </div>
      <div class="flex justify-end">
        <UButton
          type="submit"
          color="neutral"
          class="dark:text-black font-bold cursor-pointer"
          :loading="loading"
        >
          Save changes
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup>
const { state, schema, handleSubmit, loading } = useProfileForm();
</script>

<style lang="scss" scoped>
</style>