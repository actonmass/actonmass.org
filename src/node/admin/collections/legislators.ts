import { id_field, date_picker } from "../common";

export const partySelector = {
  label: "Party",
  name: "party",
  widget: "select",
  required: false,
  options: [
    {
      label: "Democrat",
      value: "D",
    },
    {
      label: "Republican",
      value: "R",
    },
    {
      label: "Green-Rainbow Party",
      value: "GRP",
    },
  ],
};

export const districtSelector = {
  label: "District",
  name: "district",
  widget: "relation",
  collection: "districts",
  search_fields: ["chamber", "name"],
  display_fields: ["chamber", "name"],
  value_field: "aom_id",
};

export default {
  name: "legislators",
  label: "Legislators",
  folder: "content/legislators/",
  create: true,
  slug: "{{first_name}}-{{last_name}}",
  identifier_field: "last_name",
  sortableFields: ["last_name", "id"],
  editor: {
    preview: false,
  },
  fields: [
    {
      ...id_field,
      hint: "Exemple: nika-elugardo",
    },
    {
      label: "First name",
      name: "first_name",
      widget: "string",
    },
    {
      label: "Last name",
      name: "last_name",
      widget: "string",
    },
    districtSelector,
    {
      label: "Supports the campaign",
      name: "supports_the_campaign",
      widget: "boolean",
      default: false,
    },
    {
      label: "Supports the campaign - Public Bills",
      name: "supports_the_campaign_public_bills",
      widget: "boolean",
      default: false,
    },
    {
      label: "Supports the campaign - Committee Votes",
      name: "supports_the_campaign_committee_votes",
      widget: "boolean",
      default: false,
    },
    {
      label: "Supports the campaign - Term limits",
      name: "supports_the_campaign_term_limits",
      widget: "boolean",
      default: false,
    },
    {
      label: "Signed the pledge",
      name: "pledge",
      widget: "boolean",
      default: false,
    },
    partySelector,
    {
      label: "Phone number",
      name: "phone",
      widget: "string",
      required: false,
    },
    {
      label: "Email",
      name: "email",
      widget: "string",
      required: false,
    },
    {
      label: "Hometown",
      name: "hometown",
      widget: "string",
      required: false,
    },
    {
      label: "Square Picture",
      name: "square_picture",
      widget: "string",
      required: false,
    },
    {
      ...date_picker,
      label: "End date",
      name: "end_date",
      required: false,
    },
    {
      ...date_picker,
      label: "Start date",
      name: "start_date",
      required: false,
    },
    {
      label: "malegislature.gov URL",
      name: "malegislature_url",
      widget: "string",
      required: false,
    },
    {
      label: "Website",
      name: "website",
      widget: "string",
      required: false,
    },
    {
      label: "Facebook page",
      name: "facebook",
      widget: "string",
      required: false,
    },
    {
      label: "Twitter account",
      name: "twitter",
      widget: "string",
      pattern: ["^([\\w]+)$", 'Username only: don\'t include the "http" prefix or the "@"'],
      required: false,
      hint: 'Username only: don\'t include the "http" prefix or the "@"',
    },
  ],
};
