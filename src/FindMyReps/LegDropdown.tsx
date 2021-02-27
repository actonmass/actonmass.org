import React from "react";
import { Dropdown } from "semantic-ui-react";

type Props = {
  legislators: {
    href: string;
    name: string;
    chamber: "house" | "senate";
  }[];
};

export default function LegDropdown({ legislators }: Props) {
  const options = legislators.map(({ href, name, chamber }) => {
    return {
      text: `${chamber === "house" ? "Rep." : "Sen."} ${name}`,
      value: href,
      key: href,
    };
  });

  return (
    <Dropdown
      placeholder="Select a legislator"
      search
      selection
      upward={false}
      options={options}
      onChange={(event, { value }) => {
        window.location.href = value as string;
      }}
      selectOnBlur={false}
      selectOnNavigation={false}
    />
  );
}
