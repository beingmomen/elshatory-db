<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="tiptap-editor-ui w-fit mx-auto max-w-[950px]">
    <div
      v-if="editor"
      class="button-group-container bg-slate-800 rounded-xl flex gap-2 overflow-hidden"
    >
      <UPopover
        :ui="{
          content: 'w-[300px]',
        }"
      >
        <UButton
          size="xl"
          icon="i-material-symbols-link"
          color="primary"
          :variant="editor.isActive?.('link') ? 'link' : 'ghost'"
          @click="setLink"
        />

        <template #content>
          <div class="p-2">
            <UInput
              v-model="linkUrl"
              class="w-full"
              variant="soft"
              placeholder="www.example.com"
              :ui="{
                base: 'pl-[57px] ',
                leading: 'pointer-events-none',
              }"
            >
              <template #leading>
                <p class="text-sm text-(--ui-text-muted)">https://</p>
              </template>

              <template v-if="linkUrl?.length" #trailing>
                <UTooltip text="Add new link" :content="{ side: 'right' }">
                  <UButton
                    variant="link"
                    color="primary"
                    size="sm"
                    icon="i-lucide-plus"
                    aria-label="Confirm link"
                    @click="confirmLink"
                  />
                </UTooltip>
              </template>
            </UInput>
          </div>
        </template>
      </UPopover>

      <UPopover
        :ui="{
          content: 'w-[300px]',
        }"
      >
        <UButton
          size="xl"
          icon="i-lucide-image-plus"
          color="primary"
          :variant="editor.isActive?.('link') ? 'link' : 'ghost'"
          @click="setLink"
        />

        <template #content>
          <div class="p-2">
            <UInput
              v-model="linkUrl"
              class="w-full"
              variant="soft"
              placeholder="www.example.com"
              :ui="{
                base: 'pl-[57px] ',
                leading: 'pointer-events-none',
              }"
            >
              <template #leading>
                <p class="text-sm text-(--ui-text-muted)">https://</p>
              </template>

              <template v-if="linkUrl?.length" #trailing>
                <UTooltip text="Add new link" :content="{ side: 'right' }">
                  <UButton
                    variant="link"
                    color="primary"
                    size="sm"
                    icon="i-lucide-plus"
                    aria-label="Confirm link"
                    @click="confirmLink"
                  />
                </UTooltip>
              </template>
            </UInput>
          </div>
        </template>
      </UPopover>

      <UButtonGroup
        v-for="(group, groupIndex) in toolbarGroups"
        :key="groupIndex"
      >
        <template v-for="button in group" :key="button.action">
          <UTooltip :text="button.tooltip">
            <UButton
              :variant="getButtonVariant(button)"
              color="primary"
              size="xl"
              :disabled="getButtonDisabled(button)"
              :icon="button.icon"
              @click="executeAction(button)"
            />
          </UTooltip>
        </template>
      </UButtonGroup>
    </div>

    <TiptapEditorContent
      :dir="dir"
      class="min-w-full tiptap-editor-ui-content mt-10"
      :editor="editor"
    />

    <!-- <article v-html="props.modelValue"></article> -->
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  dir: {
    type: String,
    default: "ltr",
  },
});

const emit = defineEmits(["update:modelValue"]);

// console.log("decodeHTMLContent() :>> ", decodeHTMLContent());

const editor = useEditor({
  content: "",
  extensions: [
    TiptapStarterKit,
    TiptapUnderline,
    TiptapLink.configure({
      openOnClick: true, // Allow clicking links to open them
      defaultProtocol: "https",
      HTMLAttributes: {
        rel: "noopener noreferrer nofollow", // Security best practice for external links
        target: "_blank", // Open links in new tab
      },
      validate: (href) => /^https?:\/\//.test(href), // Validate URLs
      autolink: true, // Automatically convert URLs to links
      linkOnPaste: true, // Convert pasted URLs to links
      protocols: ["http", "https", "mailto", "tel"], // Allowed protocols
    }),
  ],
  onCreate: ({ editor }) => {
    if (props.modelValue) {
      const decodedHTML = decodeHTMLEntities(props.modelValue); // Decode HTML
      editor.commands.setContent(decodedHTML);
    }
  },
  onUpdate: ({ editor }) => {
    const contentWithClasses = editor.getHTML(); // Get HTML content
    emit("update:modelValue", contentWithClasses);
  },
});

function decodeHTMLEntities(html) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
}

// console.log("editor.value :>> ", editor.value);
// console.log("editor.commands :>> ", editor.commands);

const linkUrl = ref("");

const setLink = () => {
  const previousUrl = editor.value.getAttributes("link").href || "";
  linkUrl.value = previousUrl;
};

const confirmLink = () => {
  // empty
  if (!linkUrl.value) {
    editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: linkUrl.value })
    .run();
};

// Button configurations
const toolbarGroups = [
  // Text style group
  [
    {
      icon: "i-material-symbols-format-bold",
      action: "toggleBold",
      isActive: () => editor.value?.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: "i-material-symbols-format-italic",
      action: "toggleItalic",
      isActive: () => editor.value?.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: "i-material-symbols-format-underlined",
      action: "toggleUnderline",
      isActive: () => editor.value?.isActive("underline"),
      tooltip: "Underline",
    },
    {
      icon: "i-material-symbols-format-strikethrough",
      action: "toggleStrike",
      isActive: () => editor.value?.isActive("strike"),
      tooltip: "Strikethrough",
    },
    // {
    //   icon: "i-material-symbols-link",
    //   action: "toggleLink",
    //   isActive: () => editor.value?.isActive("link"),
    //   tooltip: "Link",
    // },
    // {
    //   icon: "i-material-symbols-code",
    //   action: "toggleCode",
    //   isActive: () => editor.value?.isActive("code"),
    // },
  ],
  // Clear formatting group
  [
    {
      icon: "i-heroicons-backspace",
      action: "unsetAllMarks",
      variant: "ghost",
      tooltip: "Clear formatting",
    },
    {
      icon: "i-heroicons-trash",
      action: "clearNodes",
      variant: "ghost",
      tooltip: "Clear nodes",
    },
  ],
  // Heading group
  [
    {
      icon: "i-material-symbols-h-mobiledata-rounded",
      action: "setParagraph",
      isActive: () => editor.value?.isActive("paragraph"),
      tooltip: "Paragraph",
    },
    ...Array.from({ length: 6 }, (_, i) => ({
      icon: `i-material-symbols-format-h${i + 1}`,
      action: "toggleHeading",
      level: i + 1,
      isActive: () => editor.value?.isActive("heading", { level: i + 1 }),
      tooltip: `Heading ${i + 1}`,
    })),
  ],
  // List group
  [
    {
      icon: "i-material-symbols-format-list-bulleted",
      action: "toggleBulletList",
      isActive: () => editor.value?.isActive("bulletList"),
      tooltip: "Bullet list",
    },
    {
      icon: "i-material-symbols-format-list-numbered",
      action: "toggleOrderedList",
      isActive: () => editor.value?.isActive("orderedList"),
      tooltip: "Numbered list",
    },
  ],
  // Block group
  [
    {
      icon: "i-material-symbols-code",
      action: "toggleCodeBlock",
      isActive: () => editor.value?.isActive("codeBlock"),
      tooltip: "Code block",
    },
    {
      icon: "i-material-symbols-format-quote",
      action: "toggleBlockquote",
      isActive: () => editor.value?.isActive("blockquote"),
      tooltip: "Blockquote",
    },
    {
      icon: "i-heroicons-minus",
      action: "setHorizontalRule",
      variant: "ghost",
      tooltip: "Horizontal rule",
    },
    // {
    //   icon: "i-heroicons-arrow-down-on-square",
    //   action: "setHardBreak",
    //   variant: "ghost",
    //   tooltip: "Hard break",
    // },
  ],
  // History group
  [
    {
      icon: "i-material-symbols-undo",
      action: "undo",
      isActive: () => editor.value?.can().chain().focus().undo().run(),
      getDisabled: () => !editor.value?.can().chain().focus().undo().run(),
      tooltip: "Undo",
    },
    {
      icon: "i-material-symbols-redo",
      action: "redo",
      isActive: () => editor.value?.can().chain().focus().redo().run(),
      getDisabled: () => !editor.value?.can().chain().focus().redo().run(),
      tooltip: "Redo",
    },
  ],
];

// Helper functions
const getButtonVariant = (button) => {
  if (button.variant) return button.variant;
  return button.isActive?.() ? "solid" : "ghost";
};

const getButtonDisabled = (button) => {
  if (button.getDisabled) return button.getDisabled();
  if (button.action === "toggleHeading") {
    return !editor.value
      ?.can()
      .chain()
      .focus()
      .toggleHeading({ level: button.level })
      .run();
  }
  return !editor.value?.can().chain().focus()[button.action]().run();
};

const executeAction = (button) => {
  const chain = editor.value?.chain().focus();
  if (!chain) return;

  if (button.action === "toggleHeading") {
    chain.toggleHeading({ level: button.level }).run();
  } else {
    chain[button.action]().run();
  }
};

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style lang="scss">
.tiptap-editor-ui {
  .button-group-container > *:not(:last-child) {
    border-inline-end: 1px solid #a1a1aa;
  }
  .button-group-container > * {
    border-radius: 0 !important;
  }
  .tiptap-editor-ui-content {
    .tiptap {
      outline: 2px solid #a1a1aa;
      border-radius: 0.2rem;
      padding: 1rem;
    }
  }
}
</style>
