import React from "react";
import { render } from "react-dom";
import Modal from "react-modal";

function SignupForm() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openAndLoad = () => {
    setIsOpen(true);
    hbspt.forms.create({
      portalId: "6201350",
      formId: "5e3ba463-3695-4d38-ba4a-bdf48a87dee0",
      target: "#hubpsot-target",
    });
  };

  const renderModalContent = () => {
    return (
      <div style={{ width: "min(1400px, 80vw)", maxHeight: "80vh" }}>
        <h2 style={{ marginBottom: "2rem" }}>Sign up</h2>
        <div id="hubpsot-target"></div>
      </div>
    );
  };

  return (
    <>
      <a className="btn" onClick={() => openAndLoad()}>
        SIGN UP
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

function renderSignupForm(targetID, data) {
  const targetEl = document.getElementById(targetID);
  render(<SignupForm />, targetEl);
}

export default { renderSignupForm };
