import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("body");

export default function SignupForm() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openAndLoad = () => {
    setIsOpen(true);

    // @ts-expect-error
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
    <div className="btn-container">
      <a className="btn" onClick={() => openAndLoad()}>
        SIGN UP
      </a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <FontAwesomeIcon icon={faTimes} size="2x" onClick={closeModal} />
        </div>
        {renderModalContent()}
      </Modal>
    </div>
  );
}
