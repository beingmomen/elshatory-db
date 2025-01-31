import Joi from "joi";

export const useProfileForm = () => {
  const { loading, saveProfileChanges, data } = useProfile();

  const state = reactive({
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
    photo: undefined,
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
        "string.email": "Invalid email format",
      }),
    phone: Joi.string().required().min(10).messages({
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),
    photo: Joi.object().allow(null, ""),
  });

  const handleSubmit = async () => {
    await saveProfileChanges(state);
  };

  return {
    state,
    schema,
    handleSubmit,
    loading,
  };
};
