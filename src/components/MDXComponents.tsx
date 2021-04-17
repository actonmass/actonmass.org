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
const CenteredTitle = ({ txt, level }: { txt: string; level: string }) => {
  switch (level ?? "2") {
    case "1":
      return (
        <CenteredBlock>
          <h1>{txt}</h1>
        </CenteredBlock>
      );
    case "2":
      return (
        <CenteredBlock>
          <h2>{txt}</h2>
        </CenteredBlock>
      );
    case "3":
      return (
        <CenteredBlock>
          <h3>{txt}</h3>
        </CenteredBlock>
      );
    case "4":
      return (
        <CenteredBlock>
          <h4>{txt}</h4>
        </CenteredBlock>
      );
    case "5":
      return (
        <CenteredBlock>
          <h5>{txt}</h5>
        </CenteredBlock>
      );
    case "6":
    default:
      return (
        <CenteredBlock>
          <h6>{txt}</h6>
        </CenteredBlock>
      );
  }
};

const MD = ({ children }) => <ReactMarkdown source={children} />;

export default { CenteredBlock, HubspotForm, CenteredImage, CenteredTitle, MD };
