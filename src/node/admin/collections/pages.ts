export default {
  name: "pages",
  label: "Pages",
  folder: "content/pages/",
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
      label: "Layout",
      name: "layout",
      widget: "select",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Minimal",
          value: "base",
        },
      ],
      default: "default",
      hint:
        "Default is similar to a blog post. Minimal is more bare-bone and usually requires you to add Section blocks.",
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown",
      required: false,
      hint:
        "An empty body means that the page is either empty or rendered by a custom layout (and can't be edited here).",
    },
  ],
};
