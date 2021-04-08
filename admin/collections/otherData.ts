import { legislator_picker, script, script_req_only, menu } from "../common";

export default {
  name: "site_data",
  label: "Other data",
  editor: {
    preview: false,
  },
  files: [
    {
      label: "Menu and general settings",
      name: "general_settings",
      file: "_data/general_settings.yml",
      fields: [
        {
          label: "Donate button URL",
          name: "donate_button_url",
          widget: "string",
        },
        {
          label: "Site description",
          name: "description",
          widget: "text",
          hint: "This field is used when sharing a link towards the website on Facebook",
        },
        {
          label: "Main Menu",
          name: "menu",
          widget: "list",
          ...menu,
        },
        {
          label: "Learn More Menu",
          name: "learn_more_menu",
          widget: "list",
          ...menu,
        },
        {
          label: "Footer",
          name: "footer",
          widget: "list",
          ...menu,
        },
      ],
    },
    {
      label: "Pledge signatories",
      name: "pledge_signatories",
      file: "_data/pledge_signatories.yml",
      fields: [
        {
          label: "House signatories",
          name: "house",
          widget: "list",
          collapsed: false,
          field: {
            ...legislator_picker,
            label: "Rep",
            name: "rep",
          },
        },
        {
          label: "Senate signatories",
          name: "senate",
          widget: "list",
          collapsed: false,
          field: {
            ...legislator_picker,
            label: "Senator",
            name: "senator",
          },
        },
      ],
    },
    {
      ...script,
      label: "Pledge scripts",
      name: "pledge_scripts",
      file: "_data/pledge_scripts.yml",
    },
    {
      ...script,
      label: "The campaign script",
      name: "campaign_scripts",
      file: "_data/campaign_scripts.yml",
    },
    {
      ...script,
      label: "Default bill scripts - Request co-sponsorship",
      name: "default_bill_scripts",
      file: "_data/default_bill_scripts.yml",
    },
    {
      ...script_req_only,
      label: "Default bill scripts - Request vote from committee",
      name: "default_bill_scripts_com_vote",
      file: "_data/default_bill_scripts_com_vote.yml",
    },
  ],
};
