import React from "react";
import HubspotForm from "react-hubspot-form";
import ReactMarkdown from "react-markdown";

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

const MD = ({ children }) => <ReactMarkdown source={children} />;

export default { CenteredBlock, HubspotForm, CenteredImage, MD };
