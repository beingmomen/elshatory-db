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
    <UInputMenu
      v-model="value"
      class="w-full"
      :items="items"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="inputSize"
      :variant="variant"
      :value-key="valueKey"
      :icon="icon"
      :trailing-icon="trailingIcon"
    />
  </UFormField>
</template>

<script setup>
const emit = defineEmits(["update:modelValue", "input"]);
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
    required: false,
  },
  valueKey: {
    type: String,
    default: "id",
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
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "lg",
  },
  variant: {
    type: String,
    default: "outline",
  },
  inputSize: {
    type: String,
    default: "md",
  },
  icon: {
    type: String,
    default: "",
  },
  trailingIcon: {
    type: String,
    default: "",
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("input", value);
  },
});
</script>

<style lang="scss" scoped>
</style>