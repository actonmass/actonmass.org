export default {
  name: "pages",
  label: "Pages",
  folder: "_pages/",
  create: true,
  identifier_field: "permalink",
  editor: {
    preview: false,
  },
  fields: [
    {
      label: "URL",
      name: "permalink",
      widget: "string",
    },
    {
      label: "Title",
      name: "title",
      widget: "string",
      required: false,
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown",
      required: false,
      hint:
        "An empty body means that the page is either empty or rendered by a custom layout (and can't be edited here).",
    },
    {
      label: "Layout",
      name: "layout",
      widget: "hidden",
      default: "default",
    },
  ],
};
