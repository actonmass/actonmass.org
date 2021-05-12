import React from "react";
import { range } from "lodash";

import "./hero-image.scss";

type Props = {
  children: any;
};

export default function HeroImage({ children }: Props) {
  return (
    <div className="cbox">
      <div className="dotted-image">
        <div className="background">
          <div className="bottom-left-dots">
            {range(25).map((i) => (
              <span key={i} className="dot" />
            ))}
          </div>
          <div className="top-right-dots">
            {range(25).map((i) => (
              <span key={i} className="dot" />
            ))}
          </div>
        </div>
        <div className="image-container">{children}</div>
      </div>
    </div>
  );
}
