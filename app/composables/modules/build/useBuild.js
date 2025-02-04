export const useBuild = () => {
  const { post, loading } = useApiRequest();

  const handleSubmit = async () => {
    try {
      await post("/build-project");
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  return {
    handleSubmit,
    loading,
  };
};
