import React from "react";
import { range } from "lodash";

import "./hero-image.scss";

type Props = {
  img: string;
  alt: string;
};

export default function HeroImage({ img, alt }: Props) {
  return (
    <div className="cbox">
      <div className="dotted-image">
        <div className="background">
          <div className="bottom-left-dots">
            {range(25).map((i) => (
              <span className="dot" />
            ))}
          </div>
          <div className="top-right-dots">
            {range(25).map((i) => (
              <span className="dot" />
            ))}
          </div>
        </div>
        <div className="image-container">
          <img src={img} alt={alt} />
        </div>
      </div>
    </div>
  );
}
