import React from "react";
import { Helmet } from "react-helmet";
import Modal from "react-modal";
import "semantic-ui-css/semantic.min.css";
import HubspotForm from "react-hubspot-form";
import { MDXProvider } from "@mdx-js/react";

import { Header, Footer } from "../components";

import "./misc.scss";
import "./common.scss";
import "./leg-circle.scss";

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
      <Helmet>
        <script
          defer
          charSet="utf-8"
          type="text/javascript"
          src="//js.hsforms.net/forms/shell.js"
        ></script>

        <link
          href="https://fonts.googleapis.com/css?family=Raleway:500,700,800%7CRoboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <MDXProvider components={components}>{children}</MDXProvider>
      <Footer />
    </>
  );
}
