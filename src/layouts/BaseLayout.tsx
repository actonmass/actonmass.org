import React from "react";
import { Helmet } from "react-helmet";
import Modal from "react-modal";
import "semantic-ui-css/semantic.min.css";
import HubspotForm from "react-hubspot-form";
import { MDXProvider } from "@mdx-js/react";

import { Header, Footer } from "../components";
import "../styles/misc.scss";
import "../styles/common.scss";
import "../styles/components/leg-circle.scss";

Modal.setAppElement("body");

const CenteredBlock = ({ children }) => <div className="centered">{children}</div>;
const CenteredImage = ({ img, alt }) => (
  <p className="centered">
    <img src={img} alt={alt ?? ""} />
  </p>
);

const components = { CenteredBlock, HubspotForm, CenteredImage };

export default function BaseLayout({ children }) {
  // TODO: missing <head> stuff
  return (
    <>
      <Helmet
        script={[
          {
            type: "text/javascript",
            src: "//js.hsforms.net/forms/shell.js",
            charset: "utf-8",
          },
        ]}
      />
      ;
      <Header />
      <MDXProvider components={components}>{children}</MDXProvider>
      <Footer />
    </>
  );
}
