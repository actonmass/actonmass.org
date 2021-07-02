import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "gatsby";

import { generalSettings } from "../../content";

import "./header.scss";

export default function Header() {
  return (
    <>
      <header className="cbox">
        <div className="main_header w1400">
          <Link to="/">
            <img src="/img/logo.png" alt="Act On Mass logo" />
          </Link>
          <ul className="hbox">
            {generalSettings.menu.map((item) => (
              <li key={item.href}>
                <Link className="nav_text fRoboto fLight fDark fUppercase" to={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <div className="dropdown">
                <a className="dropbtn fRoboto fLight fDark fUppercase">Learn More</a>
                <FontAwesomeIcon icon={faAngleDown} size="lg" className="fDark" />
                <div className="dropdown-content">
                  {generalSettings.learn_more_menu.map((item) => (
                    <Link
                      key={item.href}
                      className="fRoboto fLight fDark fUppercase"
                      to={item.href}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <a
                className="btn btn_header fDark fRoboto fBold fUppercase"
                href={generalSettings.donate_button_url}
              >
                donate
              </a>
              <a
                className="nav_text fRoboto fLight fDark fUppercase mobile-only"
                href={generalSettings.donate_button_url}
              >
                donate
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/act.on.massachusetts/" target="_blank">
                <FontAwesomeIcon icon={faFacebookF} size="lg" className="fDark social_media_link" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/act_on_mass?lang=en" target="_blank">
                <FontAwesomeIcon icon={faTwitter} size="lg" className="fDark social_media_link" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/act_on_mass/" target="_blank">
                <FontAwesomeIcon icon={faInstagram} size="lg" className="fDark social_media_link" />
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div
        className="cbox"
        style={{
          padding: "1rem",
          background: "var(--medium-blue)",
          fontSize: "2rem",
          fontWeight: 600,
          textDecoration: "underline",
        }}
      >
        <a
          href="https://secure.everyaction.com/p/O114QFmSd0qUkDCj0odNSA2?results=True&date_start=04-27-2021"
          style={{
            width: "100%",
            textAlign: "center",
            height: "100%",
          }}
        >
          Sign Up for our Week of Action Events
        </a>
      </div>
    </>
  );
}
