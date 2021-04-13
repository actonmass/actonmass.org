import React from "react";
import { Helmet } from "react-helmet";

import { Header, Footer } from "../components";
import "../styles/misc.scss";
import "../styles/common.scss";

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
      {children}
      <Footer />
    </>
  );
}
