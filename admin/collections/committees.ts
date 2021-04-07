import { id_field, legislator_picker } from "../common";

export default {
  name: "committees",
  label: "Committees",
  folder: "_committees/",
  create: true,
  slug: "{{chamber}}-{{name}}",
  identifier_field: "title",
  editor: {
    preview: false,
  },
  fields: [
    {
      ...id_field,
      hint: "Exemple: joint-rules",
    },
    {
      label: "Title",
      name: "title",
      widget: "string",
    },
    {
      label: "Chamber",
      name: "chamber",
      widget: "select",
      options: [
        {
          label: "House",
          value: "house",
        },
        {
          label: "Senate",
          value: "senate",
        },
        {
          label: "Joint",
          value: "joint",
        },
      ],
    },
    {
      ...legislator_picker,
      label: "House Chair",
      name: "house_chair",
      required: false,
    },
    {
      ...legislator_picker,
      label: "House Vice-chair",
      name: "house_vice_chair",
      required: false,
    },
    {
      ...legislator_picker,
      label: "Senate Chair",
      name: "senate_chair",
      required: false,
    },
    {
      ...legislator_picker,
      label: "Senate Vice-chair",
      name: "senate_vice_chair",
      required: false,
    },
    {
      ...legislator_picker,
      label: "House Members",
      name: "house_members",
      required: false,
      multiple: true,
    },
    {
      ...legislator_picker,
      label: "Senate Members",
      name: "senate_members",
      multiple: true,
      required: false,
    },
    {
      label: "malegislature.gov URL",
      name: "malegislature_url",
      widget: "string",
      required: false,
    },
  ],
};
