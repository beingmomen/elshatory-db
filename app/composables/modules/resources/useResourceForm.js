import Joi from "joi";
export const useResourceForm = async () => {
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
      label: "Resources",
      icon: "i-lucide-link",
      to: "/resources",
    },
    {
      label: isEditing.value ? "Edit Resource" : "New Resource",
      icon: isEditing.value ? "i-lucide-edit" : "i-lucide-plus",
      to: `/resources/${id}`,
    },
  ]);

  const loading = ref(false);

  const state = reactive({
    title: "",
    url: "",
  });

  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    url: Joi.string().required().uri().messages({
      "string.empty": "URL is required",
      "any.required": "URL is required",
      "string.uri": "Please enter a valid URL",
    }),
  });

  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await patch(`/resources/${id}`, state, {
          redirectTo: "/resources",
        });
      } else {
        await post("/resources", state, {
          redirectTo: "/resources",
        });
      }
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  if (isEditing.value) {
    const { data } = await get(`/resources/${id}`);

    state.title = data.data.title;
    state.url = data.data.url;
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
