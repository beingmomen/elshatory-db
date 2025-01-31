<template>
  <UFormField :label="disabledLabel ? '' : label" :name="name" size="lg">
    <UInput
      v-model="fileValue"
      class="w-full"
      type="file"
      :loading="isLoading"
      accept="image/*"
      trailing
      :avatar="{
        src: displayImage,
        alt: label,
        size: 'md',
      }"
      :ui="{
        leading: 'ps-1',
      }"
      @input="handleFileInput"
      @blur="handleFileInput"
      @change="handleFileInput"
    />
  </UFormField>
</template>
  
  <script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: "",
  },
  ring: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  disabledLabel: {
    type: Boolean,
    default: false,
  },
  isCloudinary: {
    type: Boolean,
    default: true,
  },
});

const config = useRuntimeConfig();
const { cloudinary } = config.public;

const isLoading = ref(false);
const fileUrl = ref("");

const displayImage = computed(() => {
  return fileUrl.value || props.modelValue || "";
});

const fileValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinary.uploadPreset);
  formData.append("api_key", cloudinary.apiKey);

  const url = `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/upload`;

  try {
    const response = await $fetch(url, {
      method: "POST",
      body: formData,
    });
    return response.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
}

async function handleFileInput(event) {
  const file = event.target.files?.[0];

  if (!file) {
    fileUrl.value = "";
    emit("update:modelValue", "");
    return;
  }

  if (props.isCloudinary) {
    isLoading.value = true;
    const cloudinaryUrl = await uploadToCloudinary(file);
    fileUrl.value = cloudinaryUrl;
    emit("update:modelValue", cloudinaryUrl);
    isLoading.value = false;
  } else {
    fileUrl.value = URL.createObjectURL(file);
    emit("update:modelValue", file);
  }
}
</script>
  
  <style lang="scss" scoped>
</style>