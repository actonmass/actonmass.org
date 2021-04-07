import { legislator_picker, script, script_req_only } from "../common";

export default {
  name: "site_data",
  label: "Other data",
  editor: {
    preview: false,
  },
  files: [
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
