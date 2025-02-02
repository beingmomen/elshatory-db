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
          v-model="state.title"
          label="Title"
          name="title"
          size="xl"
          input-size="lg"
        />

        <FormInput
          v-model="state.tag"
          label="Tag"
          name="tag"
          size="xl"
          input-size="lg"
        />

        <FormInput
          v-model="state.url"
          label="Project URL"
          name="url"
          size="xl"
          input-size="lg"
        />

        <FormSearchMenu
          v-model="state.tagIds"
          name="tagIds"
          label="Tags"
          size="xl"
          input-size="lg"
          url="/skills/all"
          label-key="title"
          multiple
          icon="i-lucide-tags"
          placeholder="Select tags"
        />

        <FormFileInput
          v-model="state.image"
          label="Image"
          name="image"
          size="xl"
          input-size="lg"
          folder="projects"
        />

        <FormSwitch
          v-model="state.isActive"
          label="Show Project"
          name="isActive"
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
  await useProjectForm();
</script>

<style lang="scss" scoped>
</style>