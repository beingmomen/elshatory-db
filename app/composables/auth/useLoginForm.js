import Joi from "joi";

export const useLoginForm = () => {
  const state = reactive({
    email: "",
    password: "",
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
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  });

  const { login, loading } = useLocalAuth();

  const handleSubmit = async () => {
    await login(state);
  };

  return {
    state,
    schema,
    handleSubmit,
    loading,
  };
};
