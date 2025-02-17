import Joi from "joi";
export const useBlogForm = async () => {
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
      label: "Blog",
      icon: "i-lucide-rss",
      to: "/blog",
    },
    {
      label: isEditing.value ? "Edit Blog" : "New Blog",
      icon: isEditing.value ? "i-lucide-edit" : "i-lucide-plus",
      to: `/blog/${id}`,
    },
  ]);

  const loading = ref(false);

  const state = reactive({
    title: "",
    description: "",
    image: "",
    altText: "",
    tag: "",
    content: "",
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
    image: Joi.string().required().messages({
      "string.empty": "Image is required",
      "any.required": "Image is required",
    }),
    altText: Joi.string().required().messages({
      "string.empty": "Alt text is required",
      "any.required": "Alt text is required",
    }),
    tag: Joi.string().required().messages({
      "string.empty": "Tag is required",
      "any.required": "Tag is required",
    }),
    content: Joi.string().required().messages({
      "string.empty": "Content is required",
      "any.required": "Content is required",
    }),
  });

  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await patch(`/blogs/${id}`, state, {
          redirectTo: "/blog",
        });
      } else {
        await post("/blogs", state, {
          redirectTo: "/blog",
        });
      }
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  if (isEditing.value) {
    const { data } = await get(`/blogs/${id}`);

    state.title = data.data.title;
    state.description = data.data.description;
    state.image = data.data.image;
    state.altText = data.data.altText;
    state.tag = data.data.tag;
    state.content = data.data.content;
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
