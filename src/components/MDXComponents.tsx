import React from "react";
import _ from "lodash";
import HubspotForm from "react-hubspot-form";
import ReactMarkdown from "react-markdown";
import { MDXProvider } from "@mdx-js/react";
import { faCpanel } from "@fortawesome/free-brands-svg-icons";

const CenteredBlock = ({ children }) => (
  <div className="centered">
    <MD>{children}</MD>
  </div>
);

const CenteredImage = ({ img, alt, txt, size }) => (
  <p className={`centered ${size === "S" ? "small-image" : ""}`}>
    <img src={img} alt={alt ?? ""} />
    {txt && <span>{txt}</span>}
  </p>
);

const MD = ({ children }) => {
  if (_.isString(children)) {
    return <ReactMarkdown source={children} />;
  }
  return <MDX>{children}</MDX>;
};

const components = { CenteredBlock, HubspotForm, CenteredImage, MD };

export default function MDX({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
