<template>
  <div>
    <div class="ring-1 ring-gray-200 dark:ring-gray-600 rounded-md p-3 mb-4">
      <div class="flex items-center gap-3">
        <UBreadcrumb :items="breadcrumbsItems" />
      </div>
    </div>
    <div class="ring-1 ring-gray-200 dark:ring-gray-600 rounded-md p-4">
      <UForm
        ref="form"
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
          v-model="state.description"
          label="Description"
          name="description"
          size="xl"
          input-size="lg"
        />

        <FormFileInput
          v-model="state.image"
          label="Image"
          name="image"
          size="xl"
          input-size="lg"
          folder="blog"
          hint="(640 × 360 px) or (16:9)"
        />

        <FormInput
          v-model="state.altText"
          label="Alt Text"
          name="altText"
          size="xl"
          input-size="lg"
        />

        <FormInput
          v-model="state.tags"
          label="Tags"
          name="tags"
          size="xl"
          input-size="lg"
        />

        <FormInput
          v-model="state.keywords"
          label="Keywords"
          name="keywords"
          size="xl"
          input-size="lg"
        />

        <FormSearchMenu
          v-model="state.links"
          name="links"
          label="Resources"
          size="xl"
          input-size="lg"
          url="/resources/all"
          label-key="title"
          value-key=""
          multiple
          icon="i-lucide-link"
          placeholder="Select resources"
        />

        <FormInputMenu
          v-if="isEditing"
          v-model="state.status"
          name="status"
          label="Status"
          size="xl"
          input-size="lg"
          :items="statuses"
        />

        <FormTiptapEditor v-model="state.content" />

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
const form = useTemplateRef();
const {
  breadcrumbsItems,
  loading,
  state,
  schema,
  handleSubmit,
  statuses,
  isEditing,
} = await useBlogForm(form);
</script>

<style lang="scss" scoped></style>
