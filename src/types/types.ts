export type Scripts = {
  tweet_request: string;
  tweet_thanks: string;
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

export function enrichLeg(leg: Queries.Legislator) {
  const title = leg.chamber == "house" ? "rep" : "sen";
  return {
    ...leg,
    title,
  };
}
