import React from "react";
import ReactDOM from "react-dom";

type Props = {
  txt: string;
};

function ContactLegModal({ txt }: Props) {
  return <a class="btn">{txt}</a>;
}

function renderModal(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<ContactLegModal {...data} />, targetEl);
}

export default { renderModal };
