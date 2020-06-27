import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { LegBase, Leg, Bill, Scripts, enrichLeg } from "../types";

import getScript, { getEmailScript } from "./getScript";

type MaybeBill = Bill | undefined;

type Props = {
  txt: string;
  leg: LegBase;
  bill?: Bill;
  scripts: Scripts;
};

export function ContactLegModal({ txt, leg: legBase, bill, scripts }: Props) {
  const leg = enrichLeg(legBase);
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
          <div>{getCallDetails(leg, bill, scripts)}</div>
          <div className="hbox" style={{ justifyContent: "space-between" }}>
            <a className="btn btn-sec" onClick={() => setModalContent("")}>
              Back
            </a>
            <a className="btn" onClick={() => setModalContent("call-thanks")}>
              I called my {title}
            </a>
          </div>
        </>
      );
    }
    if (modalContent === "email") {
      const { subject, body } = getEmailsDetails(leg, bill, scripts);
      return (
        <>
          <h3 className="fUppercase">
            Email {title} {leg.first_name} {leg.last_name}
          </h3>
          <h4>To: {leg.email}</h4>
          <h4>CC: info@actonmass.org</h4>
          <h4>Subject: {subject}</h4>
          <br />
          <h4>Email Body:</h4>
          <div>{body}</div>
          <div className="hbox" style={{ justifyContent: "space-between" }}>
            <a className="btn btn-sec" onClick={() => setModalContent("")}>
              Back
            </a>
            <a className="btn" onClick={() => setModalContent("email-thanks")}>
              I emailed my {title}
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
            <a className="btn" target="_blank" href={getThankYouTweetIntent(leg, bill, actionType, scripts)}>
              <i className="fab fa-twitter fa-lg"></i>
              Tweet to @Act_On_Mass
            </a>
          </div>
        </>
      );
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
            <a className="btn" target="_blank" href={getTweeterIntentUrl(leg, bill, scripts)}>
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

function getCallDetails(leg: Leg, bill: MaybeBill, scripts: Scripts) {
  const isThanks = bill == null ? leg.pledge : leg.sponsored;
  if (!isThanks) {
    return getScript(scripts.call_request, leg, bill, true);
  }
  return getScript(scripts.call_thanks, leg, bill, true);
}

function getEmailsDetails(leg: Leg, bill: MaybeBill, scripts: Scripts) {
  const isThanks = bill == null ? leg.pledge : leg.sponsored;
  if (!isThanks) {
    return getEmailScript(scripts.email_request, leg, bill);
  }
  return getEmailScript(scripts.email_thanks, leg, bill);
}

function getTweeterIntentUrl(leg: Leg, bill: MaybeBill, scripts: Scripts) {
  const isThanks = bill == null ? leg.pledge : leg.sponsored;
  const script = isThanks ? scripts.tweet_thanks : scripts.tweet_request;
  const text = getScript(script, leg, bill);

  return encodeUrl("https://twitter.com/intent/tweet", {
    text,
    via: "act_on_mass",
    hashtags: "mapoli",
  });
}

function getThankYouTweetIntent(leg: Leg, bill: MaybeBill, actionType: "email" | "call", scripts: Scripts) {
  const isThanks = bill == null ? leg.pledge : leg.sponsored;
  const isAfterEmail = actionType === "email";
  const script = isThanks
    ? isAfterEmail
      ? scripts.tweet_after_thanks_email
      : scripts.tweet_after_thanks_call
    : isAfterEmail
    ? scripts.tweet_after_request_email
    : scripts.tweet_after_request_call;
  const text = getScript(script, leg, bill);

  return encodeUrl("https://twitter.com/intent/tweet", {
    text,
  });
}

function renderModal(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<ContactLegModal {...data} />, targetEl);
}

function encodeUrl(url: string, data: { [key: string]: string }) {
  const params = Object.keys(data)
    .map((key) => key + "=" + encodeURI(data[key]))
    .join("&");
  return `${url}?${params}`;
}

export default { renderModal };
