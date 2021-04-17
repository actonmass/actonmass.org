import { id_field } from "../common";

export default {
  name: "districts",
  label: "Districts",
  folder: "content/districts/",
  create: true,
  slug: "{{chamber}}-{{name}}",
  identifier_field: "name",
  editor: {
    preview: false,
  },
  fields: [
    {
      ...id_field,
      hint: "Exemple: house-27th-middlesex",
    },
    {
      label: "Name",
      name: "name",
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
      ],
    },
    {
      label: "Van ID",
      name: "van_id",
      widget: "string",
      required: false,
    },
    {
      label: "Latitude",
      name: "lat",
      widget: "number",
      value_type: "float",
      required: false,
    },
    {
      label: "Longitude",
      name: "lng",
      widget: "number",
      value_type: "float",
      required: false,
    },
  ],
};
