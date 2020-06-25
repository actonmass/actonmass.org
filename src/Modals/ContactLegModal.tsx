import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { Leg } from "../types";

type Props = {
  txt: string;
  leg: Leg;
};

export function ContactLegModal({ txt, leg }: Props) {
  const fullName = leg.chamber === "house" ? "your rep" : "your senator";
  const title = leg.chamber === "house" ? "rep." : "sen.";
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

  function closeModal() {
    setModalContent("");
    setIsOpen(false);
  }

  function renderModalContent() {
    if (modalContent === "call") {
      return (
        <>
          <h3 className="fUppercase">
            Call {title} {leg.first_name} {leg.last_name}
          </h3>
          <h3>{leg.phone}</h3>
          <h4>Script</h4>
          <p>Please sign the pledge!</p>
          <div className="hbox" style={{ justifyContent: "space-between" }}>
            <a className="btn btn-sec" onClick={() => setModalContent("")}>
              Back
            </a>
            <a className="btn" onClick={() => setModalContent("call-thanks")}>
              I called my rep
            </a>
          </div>
        </>
      );
    }
    if (modalContent === "email") {
      return (
        <>
          <h3 className="fUppercase">
            Email {title} {leg.first_name} {leg.last_name}
          </h3>
          <h4>To: {leg.email}</h4>
          <h4>CC: info@actonmass.org</h4>
          <h4>Subject: Please sign the Voter deserve to know pledge!</h4>
          <br />
          <h4>Email Body:</h4>
          <p>Please sign the pledge!</p>
          <div className="hbox" style={{ justifyContent: "space-between" }}>
            <a className="btn btn-sec" onClick={() => setModalContent("")}>
              Back
            </a>
            <a className="btn" onClick={() => setModalContent("email-thanks")}>
              I emailed my rep
            </a>
          </div>
        </>
      );
    }

    if (modalContent === "email-thanks" || modalContent === "call-thanks") {
      const actionType = modalContent === "email-thanks" ? "email" : "call";
      return (
        <>
          <p>
            Thanks for {`${actionType === "email" ? "emailing" : "calling"}`} your rep!
            <br />
            Please send us a tweet and let us know how it went.
          </p>
          <div className="cbox">
            <a className="btn" target="_blank" href={getThankYouTweetIntent(leg, actionType)}>
              <i className="fab fa-twitter fa-lg"></i>
              Tweet to @Act_On_Mass
            </a>
          </div>
        </>
      );
    }

    if (modalContent === "call-thanks") {
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
            <a className="btn" onClick={() => setModalContent("email")}>
              <i className="far fa-envelope fa-lg"></i>
              Email {fullName} now
            </a>
          )}
          {leg.twitter && (
            <a className="btn" target="_blank" href={getTweeterIntentUrl(leg)}>
              <i className="fab fa-twitter fa-lg"></i>
              Send {fullName} a tweet
            </a>
          )}

          {
            // Not supported for now
            /* {leg.facebook && (
            <a className="btn" onClick={() => setModalContent("")}>
              <i className="fab fa-facebook-f fa-lg"></i>
              Contact {fullName} on Facebook
            </a>
          )} */
          }
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
        onRequestClose={closeModal}
        className={`modal contact-leg-modal`}
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <i className="fas fa-times fa-2x" onClick={closeModal}></i>
        </div>

        {renderModalContent()}
      </Modal>
    </>
  );
}

function getTweeterIntentUrl(leg: Leg) {
  const tweeterHandle = leg.twitter.replace("https://twitter.com/", "");
  return encodeUrl("https://twitter.com/intent/tweet", {
    text: `@${tweeterHandle}, please sign the pledge!`,
    via: "act_on_mass",
    hashtags: "mapoli",
  });
}

function getThankYouTweetIntent(leg: Leg, actionType: "email" | "call") {
  const actionVerb = actionType === "email" ? "emailed" : "called";
  const legTitle = leg.chamber === "house" ? "Rep" : "Sen";
  return encodeUrl("https://twitter.com/intent/tweet", {
    text: `@Act_On_Mass Hi! I just ${actionVerb} ${legTitle} ${leg.first_name} ${leg.last_name} to request they sign the pledge and...`,
  });
}

function renderModal(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<ContactLegModal {...data} />, targetEl);
}

function encodeUrl(url: string, data: { [key: string]: string }) {
  const params = Object.keys(data)
    .map((key) => key + "=" + data[key])
    .join("&");
  return `${url}?${params}`;
}

export default { renderModal };
