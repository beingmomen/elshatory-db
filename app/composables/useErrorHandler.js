export const useErrorHandler = () => {
  const toast = useToast();

  const handleError = async (error) => {
    // console.log("error :>> ", error);
    // console.error("Request error:", error?.response?._data);

    if (error?.response?._data) {
      const { _data: errorData } = error.response;

      if (errorData.errors) {
        // Handle structured errors
        Object.values(errorData.errors)
          .flat()
          .forEach((err) => {
            toast.add({
              title: err,
              timeout: 4000,
              color: "error",
              icon: "i-lucide-alert-triangle",
            });
          });
      } else if (errorData.message) {
        // Handle simple message errors
        toast.add({
          title: errorData.message,
          timeout: 4000,
          color: "error",
        });
      } else {
        // Fallback error message
        toast.add({
          title: "An unexpected error occurred",
          timeout: 4000,
          color: "error",
        });
      }

      // Handle unauthorized access
      if (errorData.statusCode === 401) {
        // await signOut({ callbackUrl: "/login", redirect: true });
      }
    }
  };

  return { handleError };
};
