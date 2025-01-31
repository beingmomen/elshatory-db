<template>
  <div>
    <NuxtLayout name="auth">
      <template #header>
        <div class="mb-6">
          <h4 class="text-4xl font-bold mb-2">Reset Password 🔒</h4>
          <p class="text-gray-500 dark:text-gray-400">
            Your new password must be different from previously used passwords
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
          Set new password
        </UButton>

        <div class="flex justify-center">
          <UButton
            color="primary"
            variant="link"
            lass="font-bold"
            size="xl"
            to="/authentication/login"
          >
            Back to login
          </UButton>
        </div>
      </UForm>
    </NuxtLayout>
  </div>
</template>
    
    <script setup>
const { state, schema, handleSubmit, loading } = useResetPasswordForm();

definePageMeta({
  layout: false,
  auth: false,
});
</script>
    
    <style lang="scss" scoped>
</style>