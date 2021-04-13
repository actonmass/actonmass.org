import React from "react";

import { Header, Footer } from "../components";
import "../styles/misc.scss";
import "../styles/common.scss";

export default function BaseLayout({ children }) {
  // TODO: missing <head> stuff
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
