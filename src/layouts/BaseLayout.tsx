import React from "react";
import { Helmet } from "react-helmet";
import Modal from "react-modal";
import "semantic-ui-css/semantic.min.css";

import { Header, Footer } from "../components";
import { generalSettings } from "../content";
import MDX from "../components/MDXComponents";

import "./misc.scss";
import "./common.scss";
import "./leg-circle.scss";

Modal.setAppElement("body");

type Props = {
  children: any;
  title?: string;
  image?: string;
};

export default function BaseLayout({ children, title, image }: Props) {
  const pageTitle = title ? `${title} | Act On Mass` : "Act On Mass";
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:site_name" content="ActOnMass" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={generalSettings.description} />
        <meta
          property="og:image"
          content={`${generalSettings.url}${image ?? "/img/fb-thumbnail.png"}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/img/favicon.png" type="image/png" />
        <script
          defer
          charSet="utf-8"
          type="text/javascript"
          src="//js.hsforms.net/forms/shell.js"
        ></script>
        <link
          rel="preload"
          href="https://d3rse9xjbp8270.cloudfront.net/at.js"
          as="script"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="https://d3rse9xjbp8270.cloudfront.net/at.min.css" as="style" />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:500,700,800%7CRoboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <MDX>{children}</MDX>
      <Footer />
    </>
  );
}
