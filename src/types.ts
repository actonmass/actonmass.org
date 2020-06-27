export type Leg = {
  chamber: "house" | "senate";
  facebook?: string;
  first_name: string;
  last_name: string;
  twitter?: string;
  phone?: string;
  email?: string;
  party: string;
  href: string;
  district: string;
  img: string;
  pledge: boolean;
  sponsored?: boolean;
};

export type Bill = {
  article?: string;
  title: string;
};

export type Scripts = {
  call_request: string;
  call_thanks: string;
  tweet_after_request_call: string;
  tweet_after_thanks_call: string;
  email_request: EmailScript;
  email_thanks: EmailScript;
  tweet_after_request_email: string;
  tweet_after_thanks_email: string;
};

export type EmailScript = {
  subject: string;
  body: string;
};
