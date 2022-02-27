import React from "react";

const Modal = ({ isOpen, toggleModal, instructionResponse }) => {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      modalRef.current.classList.add("is-active");
    } else {
      modalRef.current.classList.remove("is-active");
    }
  }, [isOpen]);
  return (
    <div id="instruction-results" className="modal" ref={modalRef}>
      <div className="modal-background"></div>
      <div className="modal-card  ">
        <header className="modal-card-head is-primary">
          <p className="modal-card-title">Instruction Results</p>
        </header>
        <section className="modal-card-body">
          <div>
            <label className="label">{`Drones Used: ${instructionResponse.drones}`}</label>
          </div>
          <label className="label">{`Total photographs: ${instructionResponse.photos}`}</label>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={() => toggleModal(false)}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
