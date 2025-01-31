export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: "sky",
      neutral: "gray",
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      },
    },
    table: {
      slots: {
        td: "text-lg",
      },
    },
    dropdownMenu: {
      slots: {
        item: "cursor-pointer",
      },
    },
  },
});
