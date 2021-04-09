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
    },
    {
      label: "Layout",
      name: "layout",
      widget: "hidden",
      default: "default",
    },
  ],
};
