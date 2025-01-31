import Joi from "joi";

export const usePasswordForm = () => {
  const { loading, savePasswordChanges } = useProfile();
  const state = reactive({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const schema = Joi.object({
    passwordCurrent: Joi.string().min(8).required().messages({
      "string.empty": "Current password is required",
      "any.required": "Current password is required",
    }),
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

  const handleSubmit = async () => {
    await savePasswordChanges(state);
  };

  return {
    state,
    schema,
    handleSubmit,
    loading,
  };
};
