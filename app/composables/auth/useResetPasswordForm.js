import Joi from "joi";

export const useResetPasswordForm = () => {
  const state = reactive({
    password: "",
    passwordConfirm: "",
  });

  const schema = Joi.object({
    password: Joi.string().min(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least {#limit} characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "any.required": "Password is required",
    }),
    passwordConfirm: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "string.empty": "Password confirmation is required",
        "any.only": "Password and password confirmation must match",
        "any.required": "Password confirmation is required",
      }),
  });

  const { resetPassword, loading } = useLocalAuth();

  const handleSubmit = async () => {
    await resetPassword(state);
  };

  return {
    state,
    schema,
    handleSubmit,
    loading,
  };
};
