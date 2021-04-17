import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

import { generalSettings } from "../../content";

import "./header.scss";

export default function Header() {
  return (
    <header className="cbox">
      <div className="main_header w1400">
        <a href="/">
          <img src="/img/logo.png" alt="Act On Mass logo" />
        </a>
        <ul className="hbox">
          {generalSettings.menu.map((item) => (
            <li key={item.href}>
              <a className="nav_text fRoboto fLight fDark fUppercase" href={item.href}>
                {item.title}
              </a>
            </li>
          ))}
          <li>
            <div className="dropdown">
              <a className="dropbtn fRoboto fLight fDark fUppercase">Learn More</a>
              <FontAwesomeIcon icon={faAngleDown} size="lg" className="fDark" />
              <div className="dropdown-content">
                {generalSettings.learn_more_menu.map((item) => (
                  <a key={item.href} className="fRoboto fLight fDark fUppercase" href={item.href}>
                    {item.title}
                  </a>
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
              <FontAwesomeIcon icon={faFacebookF} size="lg" className="fDark" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/act_on_mass?lang=en" target="_blank">
              <FontAwesomeIcon icon={faTwitter} size="lg" className="fDark" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/act_on_mass/" target="_blank">
              <FontAwesomeIcon icon={faInstagram} size="lg" className="fDark" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
