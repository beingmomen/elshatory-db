export const useLocalAuth = () => {
  const config = useRuntimeConfig();
  const { handleError } = useErrorHandler();
  const { post, patch } = useApiRequest();

  const loading = ref(false);

  const { signUp, signIn, signOut } = useAuth();

  const login = async (credentials) => {
    try {
      loading.value = true;
      await signIn(credentials, { callbackUrl: "/" });
    } catch (error) {
      await handleError(error);
    } finally {
      loading.value = false;
    }
  };

  const register = async (credentials) => {
    try {
      loading.value = true;
      await signUp(credentials, { callbackUrl: "/authentication/login" });
    } catch (error) {
      await handleError(error);
    } finally {
      loading.value = false;
    }
  };

  const forgotPassword = async (credentials) => {
    const redirectUrl = config.public.appPublicUrl;
    loading.value = true;
    await post("/users/forgotPassword", { ...credentials, redirectUrl });
    loading.value = false;
  };

  const resetPassword = async (credentials) => {
    loading.value = true;
    const { token } = useRoute().params;
    await patch(`/users/resetPassword/${token}`, credentials);
    loading.value = false;
  };

  const logout = async () => {
    try {
      loading.value = true;
      await signOut({ callbackUrl: "/authentication/login" });
    } catch (error) {
      await handleError(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    loading,
  };
};
