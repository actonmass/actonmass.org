const chambers = ["house", "senate"] as const;

type Chamber = typeof chambers[number];

type LegId = string;

export type LegBase = {
  aom_id: LegId;
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
  supports_the_campaign: boolean;
  // Injected only for FindMyReps
  districtName?: string;
};

export type Leg = LegBase & {
  chamber: Chamber;
  title: string;
};

export type Bill = {
  article?: string;
  title: string;
  co_sponsors?: string[];
  scripts: Partial<Scripts> | null;
  scripts_com_vote: Partial<Scripts> | null;
};

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

export type Committee = {
  aom_id: LegId;
  title: string;
  chamber: Chamber | "joint";
  house_chair?: LegId;
  house_members?: LegId[];
  house_vice_chair?: LegId;
  malegislature_url?: string;
  senate_chair?: LegId;
  senate_members?: LegId[];
  senate_vice_chair?: LegId;
};

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
