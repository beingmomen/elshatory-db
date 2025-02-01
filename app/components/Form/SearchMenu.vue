<template>
  <UFormField
    :label="label"
    :name="name"
    :size="size"
    :required="required"
    :description="description"
    :hint="hint"
    :help="help"
  >
    <USelectMenu
      v-model="value"
      :items="data || []"
      :loading="status === 'pending'"
      :multiple="multiple"
      :icon="icon"
      :placeholder="placeholder"
      :label-key="labelKey"
      :value-key="valueKey"
      class="w-full"
    >
      <template #leading="{ modelValue: selectedItem, ui }">
        <UAvatar
          v-if="selectedItem?.avatar"
          v-bind="selectedItem.avatar"
          :size="ui.leadingAvatarSize()"
          :class="ui.leadingAvatar()"
        />
      </template>
    </USelectMenu>
  </UFormField>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Object, Array],
    default: null,
  },
  labelKey: {
    type: String,
    default: "name",
  },
  valueKey: {
    type: String,
    default: "id",
  },
  url: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  help: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "lg",
  },
  icon: {
    type: String,
    default: "i-lucide-search",
  },
});

const { data, status } = await useAPI(props.url, {
  lazy: true,
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>