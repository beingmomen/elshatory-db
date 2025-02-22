<template>
  <UFormField :label="label" :name="name" size="lg" :hint="hint">
    <!-- trailing -->
    <UInput
      class="w-full"
      type="file"
      :loading="loading"
      :disabled="disabled"
      accept="image/*"
      :avatar="{
        src: image,
        alt: label || 'Avatar',
        size: 'md',
      }"
      :ui="{
        leading: 'ps-1',
      }"
      @input="handleFileInput"
    />
    <!-- @change="handleFileInput" -->
  </UFormField>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  folder: {
    type: String,
    default: "",
  },
  isCloudinary: {
    type: Boolean,
    default: true,
  },
  fullPath: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: "",
  },
});

const config = useRuntimeConfig();
const { cloudinary } = config.public;
const image = ref("");
const loading = ref(false);

if (props.isCloudinary) {
  image.value = `${cloudinary.cloudinaryUrl}${props.modelValue}`;
  // console.log("image.value :>> ", image.value);
} else {
  image.value = props.modelValue;
}

const handleFileInput = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (props.isCloudinary) {
    await uploadToCloudinary(file);
  } else {
    handleLocalFile(file);
  }
};

const uploadToCloudinary = async (file) => {
  loading.value = true;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinary.uploadPreset);
  formData.append("folder", `${cloudinary.uploadPreset}/${props.folder}`);
  formData.append("api_key", cloudinary.apiKey);

  const url = `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/upload`;

  try {
    const response = await $fetch(url, {
      method: "POST",
      body: formData,
    });

    image.value = response.secure_url;
    console.log("response :>> ", response);
    if (props.fullPath) {
      emit("update:modelValue", response.secure_url);
    } else {
      emit("update:modelValue", `${response.public_id}.${response.format}`);
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
  } finally {
    loading.value = false;
  }
};

const handleLocalFile = (file) => {
  image.value = file ? URL.createObjectURL(file) : "";
  emit("update:modelValue", file);
};
</script>

<style lang="scss" scoped>
</style>