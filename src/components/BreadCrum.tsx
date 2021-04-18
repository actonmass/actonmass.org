import React from "react";
import { Link } from "gatsby";

type Props = {
  title: string;
  links?: {
    text: string;
    href: string;
  }[];
};

export default function BreadCrum({ title, links }: Props) {
  return (
    <ul className="main_breadcrumb">
      <li>
        <Link to="/">HOME</Link>
      </li>

      {links &&
        links.map((link) => (
          <li key={link.href}>
            <Link to={link.href}>{link.text.toUpperCase()}</Link>
          </li>
        ))}

      <li>{title.toUpperCase()}</li>
    </ul>
  );
}
