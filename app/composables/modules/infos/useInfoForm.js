import Joi from "joi";
export const useInfoForm = async () => {
  const { post, get } = useApiRequest();

  const loading = ref(false);

  const state = reactive({
    resumeUrl: "",
  });

  const schema = Joi.object({
    resumeUrl: Joi.string().required().uri().messages({
      "string.empty": "Resume URL is required",
      "any.required": "Resume URL is required",
      "string.uri": "Please enter a valid URL",
    }),
  });

  const handleSubmit = async () => {
    try {
      await post("/infos", state);
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  const { data } = await get("/infos");

  state.resumeUrl = data?.resumeUrl;

  return {
    loading,
    state,
    schema,
    handleSubmit,
  };
};
