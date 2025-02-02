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
          disabled
        />

        <FormInput
          v-model="state.email"
          label="Email"
          name="email"
          size="xl"
          input-size="lg"
          disabled
        />

        <FormInput
          v-model="state.description"
          label="Description"
          name="description"
          size="xl"
          input-size="lg"
          disabled
        />

        <FormFileInput
          v-model="state.image"
          label="Image"
          name="image"
          size="xl"
          input-size="lg"
          folder="testimonials"
          disabled
        />

        <FormSwitch
          v-model="state.isConfirmed"
          label="Show Testimonial"
          name="isConfirmed"
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
const { breadcrumbsItems, loading, state, schema, handleSubmit } =
  await useTestimonialForm();
</script>

<style lang="scss" scoped>
</style>