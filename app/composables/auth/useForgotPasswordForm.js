import Joi from "joi";

export const useForgotPasswordForm = () => {
  const state = reactive({
    email: "",
  });

  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: false,
      })
      .required()
      .messages({
        "string.empty": "Email is required",
        "any.required": "Email is required",
      }),
  });

  const { forgotPassword, loading } = useLocalAuth();

  const handleSubmit = async () => {
    await forgotPassword(state);
  };

  return {
    state,
    schema,
    handleSubmit,
    loading,
  };
};
