import Joi from "joi";
export const useSkillForm = async () => {
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
      label: "Skills",
      icon: "i-lucide-tags",
      to: "/skills",
    },
    {
      label: isEditing.value ? "Edit Skill" : "New Skill",
      icon: isEditing.value ? "i-lucide-edit" : "i-lucide-plus",
      to: `/skills/${id}`,
    },
  ]);

  const loading = ref(false);

  const state = reactive({
    title: "",
    icon: "",
  });

  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    icon: Joi.string().required().messages({
      "string.empty": "Icon is required",
      "any.required": "Icon is required",
    }),
  });

  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await patch(`/skills/${id}`, state, {
          redirectTo: "/skills",
        });
      } else {
        await post("/skills", state, {
          redirectTo: "/skills",
        });
      }
    } catch (error) {
      // Error will be handled by useApiRequest
      console.error(error);
    }
  };

  if (isEditing.value) {
    const { data } = await get(`/skills/${id}`);

    state.title = data.data.title;
    state.icon = data.data.icon;
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
