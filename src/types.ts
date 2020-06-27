export type LegBase = {
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
  // Injected attributes
  sponsored?: boolean;
  districtName?: string;
};

export type Leg = LegBase & {
  chamber: Chamber;
  title: string;
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

const chambers = ["house", "senate"] as const;

type Chamber = typeof chambers[number];

export function enrichLeg(leg: LegBase): Leg {
  const chamber = leg.district.split("-")[0];
  if (!isChamber(chamber)) {
    throw new Error(`Invalid district: ${leg.district}`);
  }
  const title = chamber == "house" ? "rep" : "sen";
  return {
    ...leg,
    chamber,
    title,
  };
}

function isChamber(chamber: string): chamber is Chamber {
  return chambers.includes(chamber as Chamber);
}
