export const id_field = {
  label: "ID",
  name: "aom_id",
  widget: "string",
};

export const date_picker = {
  widget: "datetime",
  format: "YYYY-MM-DD",
  time_format: false,
  default: null,
};
export const legislator_picker = {
  widget: "relation",
  collection: "legislators",
  search_fields: ["last_name"],
  value_field: "aom_id",
  display_fields: ["last_name"],
};
export const email = {
  widget: "object",
  fields: [
    {
      label: "Subject",
      name: "subject",
      widget: "string",
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown",
    },
  ],
};
export const script = {
  fields: [
    {
      label: "Tweet - Request",
      name: "tweet_request",
      widget: "text",
    },
    {
      label: "Tweet - Thank you",
      name: "tweet_thanks",
      widget: "text",
    },
    {
      label: "Call script - Request",
      name: "call_request",
      widget: "markdown",
    },
    {
      label: "Call script - Thank you",
      name: "call_thanks",
      widget: "markdown",
    },
    {
      label: "Tweet - After request call",
      name: "tweet_after_request_call",
      widget: "text",
    },
    {
      label: "Tweet - After thank you call",
      name: "tweet_after_thanks_call",
      widget: "text",
    },
    {
      widget: "object",
      fields: [
        {
          label: "Subject",
          name: "subject",
          widget: "string",
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown",
        },
      ],
      label: "Email script - Request",
      name: "email_request",
    },
    {
      widget: "object",
      fields: [
        {
          label: "Subject",
          name: "subject",
          widget: "string",
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown",
        },
      ],
      label: "Email script - Thank you",
      name: "email_thanks",
    },
    {
      label: "Tweet - After request email",
      name: "tweet_after_request_email",
      widget: "text",
    },
    {
      label: "Tweet - After thank you email",
      name: "tweet_after_thanks_email",
      widget: "text",
    },
  ],
};
export const script_req_only = {
  fields: [
    {
      label: "Tweet - Request",
      name: "tweet_request",
      widget: "text",
    },
    {
      label: "Call script - Request",
      name: "call_request",
      widget: "markdown",
    },
    {
      label: "Tweet - After request call",
      name: "tweet_after_request_call",
      widget: "text",
    },
    {
      widget: "object",
      fields: [
        {
          label: "Subject",
          name: "subject",
          widget: "string",
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown",
        },
      ],
      label: "Email script - Request",
      name: "email_request",
    },
    {
      label: "Tweet - After request email",
      name: "tweet_after_request_email",
      widget: "text",
    },
  ],
};
export const email_opt = {
  widget: "object",
  fields: [
    {
      label: "Subject",
      name: "subject",
      widget: "string",
      required: false,
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown",
      required: false,
    },
  ],
};
export const script_opt = {
  fields: [
    {
      label: "Tweet - Request",
      name: "tweet_request",
      widget: "text",
      required: false,
    },
    {
      label: "Tweet - Thank you",
      name: "tweet_thanks",
      widget: "text",
      required: false,
    },
    {
      label: "Call script - Request",
      name: "call_request",
      widget: "markdown",
      required: false,
    },
    {
      label: "Call script - Thank you",
      name: "call_thanks",
      widget: "markdown",
      required: false,
    },
    {
      label: "Tweet - After request call",
      name: "tweet_after_request_call",
      widget: "text",
      required: false,
    },
    {
      label: "Tweet - After thank you call",
      name: "tweet_after_thanks_call",
      widget: "text",
      required: false,
    },
    {
      widget: "object",
      fields: [
        {
          label: "Subject",
          name: "subject",
          widget: "string",
          required: false,
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown",
          required: false,
        },
      ],
      label: "Email script - Request",
      name: "email_request",
      required: false,
    },
    {
      widget: "object",
      fields: [
        {
          label: "Subject",
          name: "subject",
          widget: "string",
          required: false,
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown",
          required: false,
        },
      ],
      label: "Email script - Thank you",
      name: "email_thanks",
      required: false,
    },
    {
      label: "Tweet - After request email",
      name: "tweet_after_request_email",
      widget: "text",
      required: false,
    },
    {
      label: "Tweet - After thank you email",
      name: "tweet_after_thanks_email",
      widget: "text",
      required: false,
    },
  ],
};
export const script_req_only_opt = {
  fields: [
    {
      label: "Tweet - Request",
      name: "tweet_request",
      widget: "text",
      required: false,
    },
    {
      label: "Call script - Request",
      name: "call_request",
      widget: "markdown",
      required: false,
    },
    {
      label: "Tweet - After request call",
      name: "tweet_after_request_call",
      widget: "text",
      required: false,
    },
    {
      widget: "object",
      fields: [
        {
          label: "Subject",
          name: "subject",
          widget: "string",
          required: false,
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown",
          required: false,
        },
      ],
      label: "Email script - Request",
      name: "email_request",
      required: false,
    },
    {
      label: "Tweet - After request email",
      name: "tweet_after_request_email",
      widget: "text",
      required: false,
    },
  ],
};

export const menu = {
  collapsed: false,
  fields: [
    {
      label: "URL",
      name: "href",
      widget: "string",
    },
    {
      label: "Title",
      name: "title",
      widget: "string",
    },
  ],
};
