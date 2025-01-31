<template>
  <USelect
    v-model="selectedMode"
    :icon="currentIcon"
    :items="items"
    class="w-40"
    @update:model-value="updateColorMode"
  />
</template>
  
  <script setup>
const colorMode = useColorMode();

const items = ref([
  {
    label: "Light",
    value: "light",
    icon: "i-lucide-sun",
  },
  {
    label: "Dark",
    value: "dark",
    icon: "i-lucide-moon",
  },
]);

// Initialize selected mode based on current color mode
// const selectedMode = ref("");

const selectedMode = ref(colorMode.value);

// Compute current icon based on selected mode
const currentIcon = computed(
  () => items.value.find((item) => item.value === selectedMode.value)?.icon
);

// Update color mode when selection changes
const updateColorMode = (newMode) => {
  colorMode.preference = newMode;
};

// Watch for external color mode changes
watch(
  () => colorMode.value,
  (newValue) => {
    selectedMode.value = newValue;
  }
);
</script>
  