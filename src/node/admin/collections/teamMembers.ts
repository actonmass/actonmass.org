import { id_field } from "../common";

export default {
  name: "team",
  label: "Team Members",
  folder: "content/team/",
  create: true,
  slug: "{{aom_id}}",
  identifier_field: "name",
  sortableFields: ["name"],
  editor: {
    preview: false,
  },
  media_folder: "{{media_folder}}/team",
  public_folder: "{{public_folder}}/team",
  fields: [
    {
      ...id_field,
      hint: "Example: matt-miller",
    },
    {
      label: "Name",
      name: "name",
      widget: "string",
    },
    {
      label: "Square picture",
      name: "photo",
      widget: "image",
    },
    {
      label: "Link",
      name: "link",
      widget: "string",
      required: false,
    },
    {
      label: "Bio",
      name: "body",
      widget: "markdown",
    },
    {
      label: "Hidden",
      name: "hidden",
      widget: "boolean",
      default: false,
      hint: "Hide from the About Us page",
    },
    {
      label: "Order",
      name: "order",
      widget: "number",
      default: false,
      hint: "Lower number appear first in the list",
    },
  ],
};
