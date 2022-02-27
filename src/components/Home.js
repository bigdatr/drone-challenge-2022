import React from "react";
import Navbar from "./Navbar";
import Modal from "./Modal";

function Home() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [instructionResponse, setInstructionResponse] = React.useState({});
  const [instruction, setInstruction] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const submitButtonRef = React.useRef(null);
  const droneSelectRef = React.useRef(null);

  React.useEffect(() => {
    if (isLoading) {
      submitButtonRef.current.classList.add("is-loading");
      submitButtonRef.current.setAttribute("disabled", "disabled");
    } else {
      submitButtonRef.current.classList.remove("is-loading");
      submitButtonRef.current.removeAttribute("disabled");
    }
  }, [isLoading]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setInstructionResponse({});
    setIsLoading(true);

    const payload = {
      instructions: instruction,
      drones: parseInt(droneSelectRef.current.value),
    };

    fetch("http://localhost:4001/instructions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setInstructionResponse(data.data);
        setIsLoading(false);
        setIsOpenModal(true);
      });
  };
  return (
    <>
      <Navbar />
      <div className="section">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="box">
            <div className="field">
              <label className="label">Instructions:</label>
              <div className="control">
                <textarea
                  className="textarea"
                  rows="10"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Drones:</label>
              <div className="control">
                <div className="select">
                  <select ref={droneSelectRef}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <button ref={submitButtonRef} className="button is-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        instructionResponse={instructionResponse}
        isOpen={isOpenModal}
        toggleModal={setIsOpenModal}
      />
    </>
  );
}

export default Home;
