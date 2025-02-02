import Joi from "joi";
export const useClientForm = async () => {
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
      label: "Clients",
      icon: "i-lucide-users",
      to: "/clients",
    },
    {
      label: isEditing.value ? "Edit Client" : "New Client",
      icon: isEditing.value ? "i-lucide-edit" : "i-lucide-plus",
      to: `/clients/${id}`,
    },
  ]);

  const loading = ref(false);

  const state = reactive({
    name: "",
    image: "",
    website: "",
  });

  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    image: Joi.string().required().messages({
      "string.empty": "Image is required",
      "any.required": "Image is required",
    }),
    website: Joi.string().allow("").optional(),
  });

  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await patch(`/clients/${id}`, state, {
          redirectTo: "/clients",
        });
      } else {
        await post("/clients", state, {
          redirectTo: "/clients",
        });
      }
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  if (isEditing.value) {
    const { data } = await get(`/clients/${id}`);

    state.name = data.data.name;
    state.image = data.data.image;
    state.website = data.data.website;
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
