import { useErrorHandler } from "./useErrorHandler";

export const useApiRequest = () => {
  const { $api } = useNuxtApp();
  const toast = useToast();

  const { handleError } = useErrorHandler();

  const loading = ref(false);

  /**
   * Default request options
   */
  const defaultOptions = {
    method: "POST",
    body: null,
    showSuccessToast: true,
    refresh: null,
    toastTimeout: 3000,
    redirectTo: null,
  };

  /**
   * Handle success response
   */
  const handleSuccess = (response, options) => {
    const { method, showSuccessToast, refresh, redirectTo } = options;

    if (method !== "GET" && showSuccessToast && response?.message) {
      toast.add({
        icon: "i-lucide-circle-check",
        title: response.message,
        color: "success",
        duration: options.toastTimeout,
      });
    }

    if (typeof refresh === "function") {
      refresh();
    }

    if (redirectTo) {
      navigateTo(redirectTo);
    }

    return response;
  };

  /**
   * Make API request with error handling
   */
  const request = async (endpoint, customOptions = {}) => {
    if (!endpoint) {
      throw new Error("Endpoint is required");
    }

    const options = { ...defaultOptions, ...customOptions };

    loading.value = true;

    try {
      const response = await $api(endpoint, {
        method: options.method,
        body: options.body,
      });

      return handleSuccess(response, options);
    } catch (error) {
      await handleError(error);
      throw error; // Re-throw to allow caller to handle if needed
    } finally {
      loading.value = false;
    }
  };

  /**
   * Helper methods for common HTTP methods
   */
  const get = (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "GET" });

  const post = (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "POST", body });

  const patch = (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "PATCH", body });

  const put = (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "PUT", body });

  const del = (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "DELETE" });

  return {
    loading,
    request,
    get,
    post,
    put,
    patch,
    del,
    $api,
  };
};
