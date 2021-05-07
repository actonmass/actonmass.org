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
      file: "content/other/general_settings.yml",
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
      ...script,
      label: "Pledge scripts",
      name: "pledge_scripts",
      file: "content/other/pledge_scripts.yml",
    },
    {
      ...script,
      label: "The campaign script",
      name: "campaign_scripts",
      file: "content/other/campaign_scripts.yml",
    },
    {
      ...script,
      label: "Default bill scripts - Request co-sponsorship",
      name: "default_bill_scripts",
      file: "content/other/default_bill_scripts.yml",
    },
    {
      ...script_req_only,
      label: "Default bill scripts - Request vote from committee",
      name: "default_bill_scripts_com_vote",
      file: "content/other/default_bill_scripts_com_vote.yml",
    },
  ],
};
