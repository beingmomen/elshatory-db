import Joi from "joi";
export const useServiceForm = async () => {
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
      label: "Services",
      icon: "i-lucide-user-cog",
      to: "/services",
    },
    {
      label: isEditing.value ? "Edit Service" : "New Service",
      icon: isEditing.value ? "i-lucide-edit" : "i-lucide-plus",
      to: `/services/${id}`,
    },
  ]);

  const loading = ref(false);

  const state = reactive({
    title: "",
    description: "",
    image: "",
  });

  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),
    image: Joi.string().required().min(10).messages({
      "string.empty": "Image is required",
      "any.required": "Image is required",
    }),
  });

  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await patch(`/services/${id}`, state, {
          redirectTo: "/services",
        });
      } else {
        await post("/services", state, {
          redirectTo: "/services",
        });
      }
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  if (isEditing.value) {
    const { data } = await get(`/services/${id}`);

    state.title = data.data.title;
    state.description = data.data.description;
    state.image = data.data.image;
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
