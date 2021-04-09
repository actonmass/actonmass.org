import React from "react";
import { Dropdown } from "semantic-ui-react";
import sortBy from "lodash/fp/sortBy";

type Props = {
  legislators: {
    href: string;
    first_name: string;
    last_name: string;
    chamber: "house" | "senate";
  }[];
};

export default function LegDropdown({ legislators }: Props) {
  const sortedLegs = sortBy("last_name", legislators);
  const options = sortedLegs.map(({ href, first_name, last_name, chamber }) => {
    return {
      text: `${chamber === "house" ? "Rep." : "Sen."} ${first_name} ${last_name}`,
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
