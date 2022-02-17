import React from "react";
import _ from "lodash";

type Props = {
  img?: string;
  title: string;
  link?: string;
  imgClassName?: string;
};

export function ImageLink({ img, title, link, imgClassName }: Props) {
  const inside = _.isEmpty(img) ? (
    <p>{title}</p>
  ) : (
    <img className={imgClassName} src={img} alt={title} />
  );
  if (_.isEmpty(img)) {
    return inside;
  }
  return (
    <a href={link} target="_blank">
      {inside}
    </a>
  );
}
