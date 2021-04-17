import React from "react";

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
        <a href="/">HOME</a>
      </li>

      {links &&
        links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.text}</a>
          </li>
        ))}

      <li>{title.toUpperCase()}</li>
    </ul>
  );
}
