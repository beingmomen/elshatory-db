import Joi from "joi";
export const useTestimonialForm = async () => {
  const { post, patch, get } = useApiRequest();

  const route = useRoute();

  const id = route.params.id;

  const isEditing = computed(() => id !== "new");

  if (!isEditing.value) {
    navigateTo("/testimonials");
  }

  const breadcrumbsItems = ref([
    {
      label: "Home",
      icon: "i-lucide-house",
    },
    {
      label: "Testimonials",
      icon: "i-lucide-quote",
      to: "/testimonials",
    },
    {
      label: isEditing.value ? "Edit Testimonial" : "New Testimonial",
      icon: isEditing.value ? "i-lucide-edit" : "i-lucide-plus",
      to: `/testimonials/${id}`,
    },
  ]);

  const loading = ref(false);

  const state = reactive({
    name: "",
    email: "",
    description: "",
    image: "",
    isConfirmed: false,
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
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),
    image: Joi.string().required().messages({
      "string.empty": "Image is required",
      "any.required": "Image is required",
    }),
    isConfirmed: Joi.boolean().required(),
  });

  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await patch(`/testimonials/${id}`, state, {
          redirectTo: "/testimonials",
        });
      } else {
        await post("/testimonials", state, {
          redirectTo: "/testimonials",
        });
      }
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  if (isEditing.value) {
    const { data } = await get(`/testimonials/${id}`);

    state.name = data.data.name;
    state.email = data.data.email;
    state.description = data.data.description;
    state.image = data.data.image;
    state.isConfirmed = data.data.isConfirmed;
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
