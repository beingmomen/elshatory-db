<template>
  <UApp
    :locale="en"
    :toaster="{
      position: 'top-center',
    }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
import { en } from "@nuxt/ui/locale";

const lang = computed(() => en.code);
const dir = computed(() => en.dir);

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
});
</script>