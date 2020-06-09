import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { Leg } from "./types";

type Props = {
  txt: string;
  leg: Leg;
};

function ContactLegModal({ txt, leg }: Props) {
  const fullName = leg.chamber === "house" ? "your rep" : "your senator";
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

  function renderModalContent() {
    if (modalContent === "call") {
      return <h1>Kikoo</h1>;
    }
    return (
      <div>
        <div className="vbox">
          {leg.phone && (
            <a className="btn" onClick={() => setModalContent("call")}>
              <i className="fas fa-phone fa-lg"></i>
              Call {fullName} now
            </a>
          )}
          {leg.email && (
            <a className="btn" onClick={() => setModalContent("")}>
              <i className="far fa-envelope fa-lg"></i>
              Email {fullName} now
            </a>
          )}
          {leg.twitter && (
            <a className="btn" onClick={() => setModalContent("")}>
              <i className="fab fa-twitter fa-lg"></i>
              Send {fullName} a tweet
            </a>
          )}
          {leg.facebook && (
            <a className="btn" onClick={() => setModalContent("")}>
              <i className="fab fa-facebook-f fa-lg"></i>
              Contact {fullName} on Facebook
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <a className="btn" onClick={() => setIsOpen(true)}>
        {txt}
      </a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className={`modal contact-leg-modal`}
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <i className="fas fa-times fa-2x" onClick={() => setIsOpen(false)}></i>
        </div>

        {renderModalContent()}
      </Modal>
    </>
  );
}

function renderModal(targetID: string, data: Props) {
  console.log(data);
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<ContactLegModal {...data} />, targetEl);
}

export default { renderModal };
