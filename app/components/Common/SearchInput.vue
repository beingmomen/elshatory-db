<script setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
});

const input = useTemplateRef("input");

defineShortcuts({
  "/": () => {
    input.value?.inputRef?.focus();
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

<template>
  <UFormField :name="name">
    <UInput
      ref="input"
      v-model="value"
      icon="i-lucide-search"
      placeholder="Search..."
    >
      <template #trailing>
        <UKbd value="/" />
      </template>
    </UInput>
  </UFormField>
</template>

