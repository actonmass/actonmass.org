import React from "react";

import { generalSettings } from "../../content";

import "./footer.scss";

export default function Footer() {
  return (
    <footer className="main_footer">
      <div className="footer_top">
        <h3 className="footer_txt fBold">
          Act on Mass is a non-profit organization that doesn't take money from
          corporations. Please support our mission.
        </h3>
        <a
          className="btn btn_footer fLight fRoboto fBold fUppercase"
          href={generalSettings.donate_button_url}
        >
          donate
        </a>
      </div>
      <div className="footer_bottom">
        {generalSettings.footer.map((item) => (
          <h4 key={item.href} className="fRoboto fUppercase fRegular">
            <a href={item.href}>{item.title}</a>
          </h4>
        ))}
      </div>
    </footer>
  );
}
