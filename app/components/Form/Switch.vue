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
    <USwitch v-model="value" :size="inputSize" />
  </UFormField>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
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
  },
});
</script>

<style lang="scss" scoped>
</style>