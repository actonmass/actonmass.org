import React from "react";

import HeroContainer from "./HeroContainer";

type Props = {
  img: string;
  alt: string;
};

export default function HeroImage({ img, alt }: Props) {
  return (
    <HeroContainer>
      <img src={img} alt={alt} />
    </HeroContainer>
  );
}
