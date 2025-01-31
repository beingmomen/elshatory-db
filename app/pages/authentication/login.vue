<template>
  <div>
    <NuxtLayout name="auth">
      <template #header>
        <div class="mb-6">
          <h4 class="text-4xl font-bold mb-2">Welcome 👋</h4>
          <p class="text-gray-500 dark:text-gray-400">
            Please sign-in to your account and start the adventure
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
          v-model="state.email"
          label="Email"
          name="email"
          size="xl"
          input-size="lg"
          placeholder="johndoe@example.com"
        />

        <FormPasswordInput
          v-model="state.password"
          label="Password"
          name="password"
          size="xl"
          input-size="lg"
          placeholder="••••••••"
        />

        <div class="flex justify-between items-center">
          <UCheckbox label="Remember me" size="xl" />

          <UButton
            color="primary"
            variant="link"
            class="font-bold"
            size="xl"
            to="/authentication/forgot-password"
          >
            Forgot password?
          </UButton>
        </div>

        <UButton
          type="submit"
          color="primary"
          class="dark:text-black font-bold cursor-pointer"
          block
          :loading="loading"
        >
          Login
        </UButton>

        <div class="flex justify-center">
          <UButton
            color="primary"
            variant="link"
            class="font-bold"
            size="xl"
            to="/authentication/register"
          >
            Create an account
          </UButton>
        </div>
      </UForm>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  auth: false,
});

const { state, schema, handleSubmit, loading } = useLoginForm();
</script>

<style lang="scss" scoped>
</style>