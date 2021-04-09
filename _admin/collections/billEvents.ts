import { id_field, date_picker, legislator_picker } from "../common";

export default {
  name: "bill_events",
  path: "{{bill}}/{{description}}",
  label: "Detailed bill events",
  folder: "_bill_events/",
  create: true,
  slug: "{{description}}",
  identifier_field: "description",
  editor: {
    preview: false,
  },
  fields: [
    {
      ...id_field,
      hint: "Exemple: safe-communities-act-2016-budget-drama",
    },
    {
      ...date_picker,
      label: "Date",
      name: "date",
    },
    {
      label: "Description",
      name: "description",
      widget: "text",
    },
    {
      label: "Bill",
      name: "bill",
      widget: "relation",
      collection: "bills",
      search_fields: ["title"],
      display_fields: ["title"],
      value_field: "aom_id",
    },
    {
      label: "Progressive vote",
      name: "progressive_vote",
      widget: "select",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
    {
      label: "Type of event",
      hint: "Different types of events render event in history",
      required: false,
      name: "type",
      widget: "select",
      options: [
        {
          label: "Normal",
          value: "",
        },
        {
          label: "Death",
          value: "death",
        },
      ],
    },
    {
      label: "Vote descriptions",
      name: "vote_descriptions",
      widget: "object",
      fields: [
        {
          label: "Yes vote description",
          name: "yes",
          widget: "string",
          hint: "Example: Voted to send the [Safe Communities Act](/bills/safe-communities-act/) to study",
        },
        {
          label: "No vote description",
          name: "no",
          widget: "string",
          hint: "Example: Voted against sending the [Safe Communities Act](/bills/safe-communities-act/) to study",
        },
        {
          label: "Unknown vote description",
          name: "unk",
          widget: "string",
          hint:
            "Example: Won't tell us how they voted on the [Safe Communities Act](/bills/safe-communities-act/) in committee",
        },
      ],
    },
    {
      label: "Votes",
      name: "votes",
      widget: "list",
      collapsed: false,
      fields: [
        {
          ...legislator_picker,
          label: "Legislator",
          name: "legislator",
        },
        {
          label: "Vote",
          name: "vote",
          widget: "select",
          options: [
            {
              label: "Yes",
              value: "yes",
            },
            {
              label: "No",
              value: "no",
            },
            {
              label: "Unknown",
              value: "unk",
            },
          ],
        },
      ],
    },
  ],
};
