import Joi from "joi";
export const useAdminForm = async () => {
  const { post, patch, get } = useApiRequest();

  const route = useRoute();

  const id = route.params.id;

  const isEditing = computed(() => id !== "new");

  const breadcrumbsItems = ref([
    {
      label: "Home",
      icon: "i-lucide-house",
    },
    {
      label: "Admins",
      icon: "i-lucide-user-cog",
      to: "/admins",
    },
    {
      label: isEditing.value ? "Edit Admin" : "New Admin",
      icon: isEditing.value ? "i-lucide-edit" : "i-lucide-plus",
      to: `/admins/${id}`,
    },
  ]);

  const loading = ref(false);

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
    password: Joi.when("isEditing", {
      is: false,
      then: Joi.string().min(8).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least {#limit} characters long",
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        "any.required": "Password is required",
      }),
      otherwise: Joi.string().optional().allow(""),
    }),
    passwordConfirm: Joi.when("isEditing", {
      is: false,
      then: Joi.string().valid(Joi.ref("password")).required().messages({
        "string.empty": "Password confirmation is required",
        "any.only": "Password and password confirmation must match",
        "any.required": "Password confirmation is required",
      }),
      otherwise: Joi.string().optional().allow(""),
    }),
  });

  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await patch(`/users/${id}`, state, {
          redirectTo: "/admins",
        });
      } else {
        await post("/users/admin", state, {
          redirectTo: "/admins",
        });
      }
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  if (isEditing.value) {
    const { data } = await get(`/users/${id}`);

    state.name = data.data.name;
    state.email = data.data.email;
    state.phone = data.data.phone;
    state.password = undefined;
    state.passwordConfirm = undefined;
  }

  return {
    breadcrumbsItems,
    loading,
    state,
    schema,
    handleSubmit,
    isEditing,
  };
};
