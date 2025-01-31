<template>
  <div>
    <NuxtLayout name="auth">
      <template #header>
        <div class="mb-6">
          <h4 class="text-4xl font-bold mb-2">Forgot Password? 🔒</h4>
          <p class="text-gray-500 dark:text-gray-400">
            Enter your email and we'll send you instructions to reset your
            password
          </p>
        </div>
        <UForm
          class="space-y-4"
          :validate-on="['input', 'blur', 'change']"
          :state="state"
          :schema="schema"
          @submit="handleSubmit"
        >
          <FormInput
            v-model="state.email"
            label="Email"
            name="email"
            size="xl"
            input-size="lg"
            placeholder="johndoe@example.com"
          />

          <UButton
            type="submit"
            color="primary"
            class="dark:text-black font-bold cursor-pointer"
            block
            :loading="loading"
          >
            Send reset link
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
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const { state, schema, handleSubmit, loading } = useForgotPasswordForm();

definePageMeta({
  layout: false,
  auth: false,
});
</script>

<style lang="scss" scoped>
</style>