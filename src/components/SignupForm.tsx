import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import NGPVanForm from "./NGPVanForm";

Modal.setAppElement("body");

export default function SignupForm() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openAndLoad = () => {
    setIsOpen(true);
  };

  const renderModalContent = () => {
    return (
      <div style={{ width: "min(1400px, 80vw)", maxHeight: "80vh" }}>
        <NGPVanForm formId="https://secure.everyaction.com/v1/Forms/89W8SSTEgESvjQcBrZD_3Q2" />
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
        className="modal white"
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
