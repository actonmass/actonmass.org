export default {
  name: "news",
  label: "News & Media",
  sort: "date:desc",
  folder: "content/news/",
  create: true,
  slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
  editor: {
    preview: false,
  },
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
    },
    {
      label: "Author",
      name: "author",
      widget: "string",
    },
    {
      label: "Link",
      name: "href",
      widget: "string",
    },
    {
      label: "Category",
      name: "category",
      widget: "select",
      options: [
        {
          label: "News",
          value: "news",
        },
        {
          label: "Press release",
          value: "press_release",
        },
      ],
    },
    {
      label: "Publish Date",
      name: "date",
      widget: "datetime",
    },
    {
      label: "Extract",
      name: "extract",
      widget: "markdown",
      required: false,
    },
  ],
};
