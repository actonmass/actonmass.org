import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Modal from "react-modal";

import NGPVanForm from "./NGPVanForm";

Modal.setAppElement("body");

type Props = {
  formId: string;
  title: string;
  btnClass?: string;
};

export default function ModalForm({ formId, title, btnClass }: Props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openAndLoad = () => {
    setIsOpen(true);
  };

  const renderModalContent = () => {
    return (
      <div style={{ width: "min(1000px, 80vw)", maxHeight: "80vh" }}>
        <NGPVanForm formId={formId} />
      </div>
    );
  };

  return (
    <div className="btn-container">
      <a className={btnClass ?? "btn"} onClick={() => openAndLoad()}>
        {title}
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
