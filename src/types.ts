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
