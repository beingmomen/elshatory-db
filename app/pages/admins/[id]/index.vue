<template>
  <div>
    <div class="ring-1 ring-gray-200 dark:ring-gray-600 rounded-md p-3 mb-4">
      <div class="flex items-center gap-3">
        <UBreadcrumb :items="breadcrumbsItems" />
      </div>
    </div>
    <div class="ring-1 ring-gray-200 dark:ring-gray-600 rounded-md p-4">
      <UForm
        class="space-y-6"
        :validate-on="['input', 'blur', 'change']"
        :state="state"
        :schema="schema"
        @submit="handleSubmit"
      >
        <FormInput
          v-model="state.name"
          label="Name"
          name="name"
          size="xl"
          input-size="lg"
        />

        <FormInput
          v-model="state.email"
          label="Email"
          name="email"
          size="xl"
          input-size="lg"
        />

        <FormInput
          v-model="state.phone"
          label="Phone"
          name="phone"
          size="xl"
          input-size="lg"
        />

        <FormPasswordInput
          v-if="!isEditing"
          v-model="state.password"
          label="Password"
          name="password"
          size="xl"
          input-size="lg"
        />

        <FormPasswordInput
          v-if="!isEditing"
          v-model="state.passwordConfirm"
          label="Password confirmation"
          name="passwordConfirm"
          size="xl"
          input-size="lg"
        />

        <div class="flex justify-end">
          <UButton
            type="submit"
            color="primary"
            class="dark:text-black text-md font-bold cursor-pointer"
            :loading="loading"
            icon="i-lucide-save"
          >
            Save
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup>
const { breadcrumbsItems, loading, state, schema, handleSubmit, isEditing } =
  await useAdminForm();
</script>

<style lang="scss" scoped>
</style>