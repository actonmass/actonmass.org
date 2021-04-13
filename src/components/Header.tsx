import React from "react";

import { generalSettings } from "../content";
import "../styles/header.scss";

export default function Header() {
  return (
    <header className="cbox">
      <div className="main_header w1400">
        <a href="/">
          <img
            className="head_logo"
            src="/img/logo.png"
            alt="Act On Mass logo"
          />
        </a>
        <ul className="hbox">
          {generalSettings.menu.map((item) => (
            <li key={item.href}>
              <a
                className="nav_text fRoboto fLight fDark fUppercase"
                href={item.href}
              >
                {item.title}
              </a>
            </li>
          ))}
          <li>
            <div className="dropdown">
              <a className="dropbtn fRoboto fLight fDark fUppercase">
                Learn More
              </a>
              <i className="fas fa-angle-down dropbtn"></i>
              <div className="dropdown-content">
                {generalSettings.learn_more_menu.map((item) => (
                  <a
                    key={item.href}
                    className="fRoboto fLight fDark fUppercase"
                    href={item.href}
                  >
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
            <a href="https://www.facebook.com/act.on.massachusetts/">
              <i className="fab fa-facebook-f fa-lg fDark"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/act_on_mass?lang=en">
              <i className="fab fa-twitter fa-lg fDark"></i>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
