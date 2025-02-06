import Joi from "joi";
export const useProjectForm = async () => {
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
      label: "Projects",
      icon: "i-lucide-folder",
      to: "/projects",
    },
    {
      label: isEditing.value ? "Edit Project" : "New Project",
      icon: isEditing.value ? "i-lucide-edit" : "i-lucide-plus",
      to: `/projects/${id}`,
    },
  ]);

  const loading = ref(false);

  const state = reactive({
    title: "",
    tag: "",
    url: "",
    isActive: true,
    tagIds: [],
    image: "",
    altText: "",
  });

  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    tag: Joi.string().required().messages({
      "string.empty": "Tag is required",
      "any.required": "Tag is required",
    }),
    url: Joi.string().required().uri().messages({
      "string.empty": "URL is required",
      "any.required": "URL is required",
      "string.uri": "Please enter a valid URL",
    }),
    isActive: Joi.boolean().required(),
    tagIds: Joi.array().items(Joi.string()).min(3).required().messages({
      "array.min": "Please select at least 3 tags",
      "array.base": "Tags must be an array",
      "any.required": "Tags are required",
    }),
    image: Joi.string().required().min(10).messages({
      "string.empty": "Image is required",
      "any.required": "Image is required",
    }),
    altText: Joi.string().required().messages({
      "string.empty": "Alt text is required",
      "any.required": "Alt text is required",
    }),
  });

  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await patch(`/projects/${id}`, state, {
          redirectTo: "/projects",
        });
      } else {
        await post("/projects", state, {
          redirectTo: "/projects",
        });
      }
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  if (isEditing.value) {
    const { data } = await get(`/projects/${id}`);

    state.title = data.data.title;
    state.tag = data.data.tag;
    state.url = data.data.url;
    state.isActive = data.data.isActive;
    state.tagIds = data.data.tagIds;
    state.image = data.data.image;
    state.altText = data.data.altText;
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
