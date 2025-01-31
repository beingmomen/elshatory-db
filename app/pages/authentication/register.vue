<template>
  <div>
    <NuxtLayout name="auth">
      <template #header>
        <div class="mb-6">
          <h4 class="text-4xl font-bold mb-2">Adventure starts here 🚀</h4>
          <p class="text-gray-500 dark:text-gray-400">
            Make your app management easy and fun!
          </p>
        </div>
      </template>
      <UForm
        class="space-y-6"
        :validate-on="['input', 'blur', 'change']"
        :state="state"
        :schema="schema"
        @submit="handleSubmit"
      >
        <FormInput
          v-model="state.name"
          label="Name"
          name="name"
          size="xl"
          input-size="lg"
          placeholder="John Doe"
        />

        <FormInput
          v-model="state.email"
          label="Email"
          name="email"
          size="xl"
          input-size="lg"
          placeholder="johndoe@example.com"
        />

        <FormInput
          v-model="state.phone"
          label="Phone"
          name="phone"
          size="xl"
          input-size="lg"
          placeholder="+1 (555) 555-5555"
        />

        <FormPasswordInput
          v-model="state.password"
          label="Password"
          name="password"
          size="xl"
          input-size="lg"
          placeholder="••••••••"
        />

        <FormPasswordInput
          v-model="state.passwordConfirm"
          label="Password confirmation"
          name="passwordConfirm"
          size="xl"
          input-size="lg"
          placeholder="••••••••"
        />

        <UButton
          type="submit"
          color="primary"
          class="dark:text-black font-bold cursor-pointer"
          block
          :loading="loading"
        >
          Register
        </UButton>

        <div class="flex justify-center">
          <UButton
            color="primary"
            variant="link"
            class="font-bold"
            size="xl"
            to="/authentication/login"
          >
            Login instead
          </UButton>
        </div>
      </UForm>
    </NuxtLayout>
  </div>
</template>
  
  <script setup>
const { state, schema, handleSubmit, loading } = useRegisterForm();

definePageMeta({
  layout: false,
  auth: false,
});
</script>
  
  <style lang="scss" scoped>
</style>