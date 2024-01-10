import React from "react";
import "./modal.css";

type ModalT = {
  children: React.ReactElement;
  modalScreen: React.ReactElement;
};

export default function Modal({ children, modalScreen }: ModalT) {
  const [modalState, setModalState] = React.useState("modal-close");

  return (
    <div>
      <div onClick={() => setModalState("modal-open")}>{children}</div>
      <div className={modalState}>
        <div className={"modal"} onClick={() => setModalState("modal-close")}>
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setModalState("modal-close")}
            >
              &times;
            </span>
            <div>{modalScreen}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
