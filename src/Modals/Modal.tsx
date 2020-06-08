import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

type Props = {
  txt: string;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ContactLegModal({ txt }: Props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <a className="btn" onClick={() => setIsOpen(true)}>
        {txt}
      </a>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpen(false)}
        // style={customStyles}
        // contentLabel="Example Modal"
        className="contact-leg-modal modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <i class="fas fa-times fa-2x" onClick={() => setIsOpen(false)}></i>
        </div>

        <div class="vbox">
          <a className="btn" onClick={() => setIsOpen(true)}>
            Call your rep now
          </a>
          <a className="btn" onClick={() => setIsOpen(true)}>
            Email your rep now
          </a>
          <a className="btn" onClick={() => setIsOpen(true)}>
            Send your rep a tweet
          </a>
        </div>
      </Modal>
    </>
  );
}

function renderModal(targetID: string, data: Props) {
  const targetEl = document.getElementById(targetID);
  ReactDOM.render(<ContactLegModal {...data} />, targetEl);
}

export default { renderModal };
