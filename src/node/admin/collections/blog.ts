export default {
  name: "blog",
  label: "Blog post",
  sort: "date:desc",
  folder: "content/posts/",
  create: true,
  slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
  editor: {
    preview: false,
  },
  fields: [
    {
      label: "Layout",
      name: "layout",
      widget: "hidden",
      default: "post",
    },
    {
      label: "Title",
      name: "title",
      widget: "string",
    },
    {
      label: "Publish Date",
      name: "date",
      widget: "datetime",
    },
    {
      label: "Redirect from",
      name: "redirect_from",
      required: false,
      widget: "list",
      collapsed: false,
      field: {
        label: "Redirection",
        name: "redirection",
        widget: "string",
        hint: "Example: /covid",
      },
    },
    {
      label: "Image",
      name: "image",
      widget: "image",
      required: false,
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown",
    },
  ],
};
