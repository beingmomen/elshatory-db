import Joi from "joi";
export const useBlogForm = async (formRef) => {
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

  const statuses = ref([
    {
      label: "مسودة",
      id: "draft",
    },
    {
      label: "تم النشر",
      id: "published",
    },
    {
      label: "محذوف",
      id: "archived",
    },
  ]);

  const loading = ref(false);

  const state = reactive({
    title: "",
    description: "",
    image: "",
    altText: "",
    tag: "",
    keywords: "",
    content: "",
    status: "draft",
    links: [], // This will now store an array of resource IDs
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
    keywords: Joi.string().required().messages({
      "string.empty": "Keywords is required",
      "any.required": "Keywords is required",
    }),
    content: Joi.string().required().messages({
      "string.empty": "Content is required",
      "any.required": "Content is required",
    }),
    status: Joi.string().valid("draft", "published", "archived").messages({
      "string.empty": "Status is required",
      "any.required": "Status is required",
    }),
    links: Joi.array().items(Joi.object()).default([]),
  });

  const handleSubmit = async () => {
    console.warn("formRef", formRef);
    try {
      // Map state.links to only include title and url
      const mappedState = {
        ...state,
        links: state.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
      };

      if (isEditing.value) {
        await patch(`/blogs/${id}`, mappedState, {
          redirectTo: "/blog",
        });
      } else {
        await post("/blogs", mappedState, {
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
    state.keywords = data.data.keywords;
    state.content = data.data.content;
    state.status = data.data.status;
    // Keep the full objects instead of extracting IDs
    state.links = data.data.links || [];
  }

  return {
    breadcrumbsItems,
    loading,
    state,
    schema,
    handleSubmit,
    isEditing,
    statuses,
  };
};
