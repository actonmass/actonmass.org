import React from "react";
import _ from "lodash";
import HubspotForm from "react-hubspot-form";
import ReactMarkdown from "react-markdown";
import { MDXProvider } from "@mdx-js/react";

import NGPVanForm from "../components/NGPVanForm";
import YoutubeVideo from "../components/YoutubeVideo";

const CenteredBlock = ({ children }) => (
  <div className="centered">
    <MD>{children}</MD>
  </div>
);

const Block = ({ children }) => (
  <div>
    <MD>{children}</MD>
  </div>
);

const TwoSidedBlock = ({ children }) => (
  <div className="two-sided-block">
    <MD>{children}</MD>
  </div>
);

const LeftBlock = ({ children }) => (
  <div className="left-block">
    <MD>{children}</MD>
  </div>
);

const RightBlock = ({ children }) => (
  <div className="right-block">
    <MD>{children}</MD>
  </div>
);

const CenteredImage = ({ img, alt, txt, size, width }) => {
  const imgWidth = width ? `${width}px` : undefined;
  return (
    <p className={`centered ${size === "S" ? "small-image" : ""}`}>
      <img src={img} alt={alt ?? ""} width={imgWidth} />
      {txt && <span>{txt}</span>}
    </p>
  );
};

const MD = ({ children }) => {
  if (_.isString(children)) {
    return <ReactMarkdown source={children} />;
  }
  return <MDX>{children}</MDX>;
};

const Section = ({ color, width, children }: { color: string; width: string; children: any }) => {
  const w = width === "1200" ? "w1200" : width === "1000" ? "w1000" : "w1400";
  return (
    <section className={`${color} cbox`}>
      <div className={w}>
        <MD>{children}</MD>
      </div>
    </section>
  );
};

const Button = ({ children, href }) => (
  <a href={href} className="btn">
    {children}
  </a>
);

const components = {
  Block,
  Button,
  CenteredBlock,
  CenteredImage,
  HubspotForm,
  LeftBlock,
  NGPVanForm,
  RightBlock,
  Section,
  TwoSidedBlock,
  YoutubeVideo,
};

export default function MDX({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
