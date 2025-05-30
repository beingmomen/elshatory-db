<template>
  <aside
    class="flex-col items-stretch relative w-full lg:w-[250px] flex-shrink-0 hidden lg:flex h-screen dark:bg-gray-900 bg-slate-50"
  >
    <div
      class="h-16 flex-shrink-0 flex items-center border-gray-200 dark:border-gray-800 px-4 gap-x-4 min-w-0 !border-b-0"
    >
      <UButton
        :avatar="{
          src: 'https://github.com/nuxt.png',
          alt: 'Benjamin Canac',
        }"
        class="w-full flex items-center gap-x-2"
        size="md"
        color="neutral"
        variant="ghost"
      >
        Dashboard
      </UButton>
    </div>
    <div
      class="flex-1 py-4 max-h-[calc(100vh-9rem)] overflow-y-scroll no-scrollbar"
    >
      <UNavigationMenu
        as="div"
        orientation="vertical"
        highlight-color="primary"
        :items="items"
        class="px-4"
      />
    </div>

    <div class="px-4 mt-auto mb-4">
      <UDropdownMenu
        class="w-full"
        :items="itemsFooter"
        :ui="{
          content: 'w-56',
        }"
      >
        <UButton
          :avatar="{
            src: data.photo,
            alt: data.name,
          }"
          trailing-icon="i-lucide-ellipsis-vertical"
          color="neutral"
          variant="outline"
          :ui="{
            trailingIcon: 'ms-auto',
          }"
        >
          {{ data.name }}
        </UButton>
      </UDropdownMenu>
    </div>
  </aside>
</template>

<script setup>
const { logout } = useLocalAuth();
const { data } = useGetUserData();
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const items = ref([
  [
    {
      label: "Home",
      icon: "i-lucide-house",
      to: "/",
    },
    {
      label: "Admins",
      icon: "i-lucide-user-cog",
      to: "/admins",
    },
    {
      label: "Users",
      icon: "i-lucide-user",
      to: "/users",
    },
    {
      label: "Skills",
      icon: "i-lucide-tags",
      to: "/skills",
    },
    {
      label: "Resources",
      icon: "i-lucide-link",
      to: "/resources",
    },
    {
      label: "Services",
      icon: "i-carbon-settings-services",
      to: "/services",
    },
    {
      label: "Projects",
      icon: "i-lucide-folder",
      to: "/projects",
    },
    {
      label: "Clients",
      icon: "i-lucide-users",
      to: "/clients",
    },
    {
      label: "Testimonials",
      icon: "i-lucide-quote",
      to: "/testimonials",
    },
    {
      label: "Blog",
      icon: "i-lucide-rss",
      to: "/blog",
    },
    {
      label: "Contacts",
      icon: "i-lucide-phone",
      to: "/contacts",
    },
    {
      label: "Infos",
      icon: "i-lucide-info",
      to: "/infos",
    },
    // {
    //   label: "Settings",
    //   icon: "i-lucide-settings",
    //   to: "/settings",
    //   children: [
    //     // {
    //     //   label: "General",
    //     //   to: "/settings/general",
    //     // },
    //     // {
    //     //   label: "Profile",
    //     //   to: "/settings/profile",
    //     // },
    //   ],
    // },
  ],
]);

const itemsFooter = ref([
  [
    {
      label: data.name,
      avatar: {
        src: data.photo,
        alt: data.name,
      },
      type: "label",
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-lucide-cog",
      kbds: ["shift", "s"],
      to: "/settings",
      // children: [
      //   {
      //     label: "General",
      //     to: "/settings",
      //     icon: "i-lucide-settings",
      //   },
      // ],
    },
  ],
  [
    {
      label: "Theme",
      icon: "i-mdi-theme-light-dark",
      kbds: ["shift", "m"],
      children: [
        {
          label: "Light",
          icon: "i-lucide-sun",
          onSelect: () => (isDark.value = !isDark.value),
        },
        {
          label: "Dark",
          icon: "i-lucide-moon",
          onSelect: () => (isDark.value = !isDark.value),
        },
      ],
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      kbds: ["shift", "q"],
      onSelect: logout,
    },
  ],
]);
</script>

<style lang="scss" scoped></style>
