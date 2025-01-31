import Joi from "joi";

export const useRegisterForm = () => {
  const state = reactive({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
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
    phone: Joi.string().required().min(10).messages({
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
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
  const { register, loading } = useLocalAuth();

  const handleSubmit = async () => {
    await register(state);
  };

  return {
    state,
    schema,
    handleSubmit,
    loading,
  };
};
