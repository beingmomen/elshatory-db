<!-- eslint-disable vue/no-v-html -->
<!-- في قسم template، أضف checkbox للتحكم في التحرير قبل div الرئيسي -->
<template>
  <!-- {{ max-w-[950px] }} -->
  <div class="tiptap-editor-ui w-fit mx-auto">
    <!-- BubbleMenu -->
    <TiptapBubbleMenu
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
    >
      <div
        class="bubble-menu bg-white border border-gray-200 rounded-lg shadow-lg flex p-1"
      >
        <UButton
          size="sm"
          variant="ghost"
          icon="i-material-symbols-format-bold"
          :class="{ 'bg-blue-500 text-white': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        />
        <UButton
          size="sm"
          variant="ghost"
          icon="i-material-symbols-format-italic"
          :class="{ 'bg-blue-500 text-white': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        />
        <UButton
          size="sm"
          variant="ghost"
          icon="i-material-symbols-format-strikethrough"
          :class="{ 'bg-blue-500 text-white': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        />
        <UButton
          size="sm"
          variant="ghost"
          icon="i-material-symbols-format-underlined"
          :class="{ 'bg-blue-500 text-white': editor.isActive('underline') }"
          @click="editor.chain().focus().toggleUnderline().run()"
        />
        <UButton
          size="sm"
          variant="ghost"
          icon="i-material-symbols-code"
          :class="{ 'bg-blue-500 text-white': editor.isActive('code') }"
          @click="editor.chain().focus().toggleCode().run()"
        />
      </div>
    </TiptapBubbleMenu>

    <div
      v-if="editor"
      class="button-group-container bg-slate-800 rounded-xl flex gap-2 overflow-hidden sticky top-0 z-10"
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
        />

        <template #content>
          <div class="flex gap-4 items-center p-2">
            <FormFileInput
              v-model="image"
              name="test"
              size="xl"
              input-size="lg"
              folder="blog"
              :full-path="true"
            />
            <UTooltip
              v-if="image"
              text="Add new link"
              :content="{ side: 'right' }"
            >
              <UButton
                variant="outline"
                color="primary"
                size="sm"
                icon="i-lucide-plus"
                aria-label="Confirm link"
                @click="setImage"
              />
            </UTooltip>
          </div>
        </template>
      </UPopover>

      <UPopover
        :ui="{
          content: 'w-[350px]',
        }"
      >
        <UButton
          size="xl"
          icon="i-mdi-youtube"
          color="primary"
          variant="ghost"
        />

        <template #content>
          <div class="p-4 space-y-3">
            <UInput
              v-model="youtubeUrl"
              class="w-full"
              variant="soft"
              placeholder="YouTube URL"
            />
            <div class="flex gap-2">
              <UInput
                v-model="youtubeWidth"
                type="number"
                placeholder="Width"
                min="320"
                max="1024"
                class="flex-1"
              />
              <UInput
                v-model="youtubeHeight"
                type="number"
                placeholder="Height"
                min="180"
                max="720"
                class="flex-1"
              />
            </div>
            <UTooltip
              v-if="youtubeUrl"
              text="Add YouTube video"
              :content="{ side: 'right' }"
            >
              <UButton
                variant="outline"
                color="primary"
                size="sm"
                icon="i-lucide-plus"
                aria-label="Add YouTube video"
                class="w-full"
                @click="setYouTubeVideo"
              >
                Add YouTube Video
              </UButton>
            </UTooltip>
          </div>
        </template>
      </UPopover>

      <!-- في قسم template، أضف هذا UPopover بعد YouTube popover -->
      <UPopover
        :ui="{
          content: 'w-[300px]',
        }"
      >
        <UButton
          size="xl"
          icon="i-material-symbols-highlight"
          color="primary"
          :variant="editor.isActive?.('highlight') ? 'solid' : 'ghost'"
        />

        <template #content>
          <div class="p-4 space-y-3">
            <div class="flex items-center gap-2">
              <UPopover>
                <UButton label="اختر اللون" color="neutral" variant="outline">
                  <template #leading>
                    <span :style="chip" class="size-3 rounded-full" />
                  </template>
                </UButton>

                <template #content>
                  <UColorPicker v-model="highlightColor" class="p-2" />
                </template>
              </UPopover>
            </div>
            <div class="flex gap-2">
              <UButton
                variant="outline"
                color="primary"
                size="sm"
                class="flex-1"
                @click="setHighlight"
              >
                تطبيق التمييز
              </UButton>
              <UButton
                variant="outline"
                color="red"
                size="sm"
                class="flex-1"
                :disabled="!editor.isActive?.('highlight')"
                @click="unsetHighlight"
              >
                إزالة التمييز
              </UButton>
            </div>
          </div>
        </template>
      </UPopover>
      <UButton
        size="xl"
        icon="i-ic-sharp-subdirectory-arrow-left"
        color="primary"
        variant="ghost"
        @click="setHardBreak"
      />
      <UButton
        size="xl"
        icon="i-material-symbols-horizontal-rule-rounded"
        color="primary"
        variant="ghost"
        @click="setHorizontalRule"
      />

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

    <!-- <article v-html="decodeHTMLEntities(props.modelValue)"></article> -->
  </div>
</template>

<script setup>
import { all, createLowlight } from "lowlight";
const lowlight = createLowlight(all);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "Abdelmomen Elshatory",
  },
  dir: {
    type: String,
    default: "rtl",
  },
});

const emit = defineEmits(["update:modelValue"]);

const image = ref("");
const youtubeUrl = ref("");
const youtubeWidth = ref(640);
const youtubeHeight = ref(480);

const setImage = () => {
  if (image.value) {
    editor.value
      .chain()
      .focus()
      .setImage({
        src: image.value,
        alt: props.title,
        title: props.title,
      })
      .run();
  }
};

const setHardBreak = () => {
  editor.value.chain().focus().setHardBreak().run();
};

const setHorizontalRule = () => {
  editor.value.chain().focus().setHorizontalRule().run();
};

const setYouTubeVideo = () => {
  if (youtubeUrl.value) {
    editor.value
      .chain()
      .focus()
      .setYoutubeVideo({
        src: youtubeUrl.value,
        width: Math.max(320, parseInt(youtubeWidth.value, 10)) || 640,
        height: Math.max(180, parseInt(youtubeHeight.value, 10)) || 480,
      })
      .run();

    // Clear the form after adding
    youtubeUrl.value = "";
    youtubeWidth.value = 640;
    youtubeHeight.value = 480;
  }
};

// تأكد من إضافة TiptapBubbleMenu في imports إذا لم يكن موجوداً
// import { TiptapBubbleMenu } from '@tiptap/vue-3'

// في قسم script setup، أضف هذه المتغيرات والدوال
const highlightColor = ref("#FAF594"); // اللون الافتراضي للتمييز
const chip = computed(() => ({ backgroundColor: highlightColor.value }));

// أضف هذه الدوال بعد setYouTubeVideo
const setHighlight = () => {
  if (highlightColor.value) {
    editor.value
      .chain()
      .focus()
      .toggleHighlight({ color: highlightColor.value })
      .run();
  }
};

const unsetHighlight = () => {
  editor.value.chain().focus().unsetHighlight().run();
};

// في تكوين editor، أضف TiptapHighlight extension
const editor = useEditor({
  content: "",
  extensions: [
    TiptapStarterKit,
    TiptapUnderline,
    TiptapCodeBlockLowlight.configure({
      lowlight,
    }),
    TiptapLink.configure({
      openOnClick: true,
      defaultProtocol: "https",
      HTMLAttributes: {
        rel: "noopener noreferrer nofollow",
        target: "_blank",
      },
      validate: (href) => /^https?:\/\//.test(href),
      autolink: true,
      linkOnPaste: true,
      protocols: ["http", "https", "mailto", "tel"],
    }),
    TiptapImage,
    TiptapYoutube.configure({
      controls: false,
      nocookie: true,
    }),
    TiptapHighlight.configure({
      multicolor: true,
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
    {
      icon: "i-material-symbols-code",
      action: "toggleCode",
      isActive: () => editor.value?.isActive("code"),
    },
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

// أضف هذه الأنماط في قسم style
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

      /* YouTube embed styles */
      div[data-youtube-video] {
        cursor: move;
        padding-right: 1.5rem;
        margin: 1rem 0;

        iframe {
          border: 0.2rem solid #a1a1aa;
          border-radius: 0.5rem;
          display: block;
          min-height: 200px;
          min-width: 200px;
          outline: 0px solid transparent;
        }

        &.ProseMirror-selectednode iframe {
          outline: 3px solid #3b82f6;
          transition: outline 0.15s;
        }
      }
    }
  }
}
</style>
