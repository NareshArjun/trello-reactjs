import "./CardEdit.css";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function CardEdit(props) {
  const [closeClicked, setCloseClicked] = useState(false);

  const closeModal = () => {
    setCloseClicked(true);
  };

  return (
    <div role="button" className="modal-wrapper" onClick={closeModal}>
      <div
        role="button"
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button onClick={closeModal}>Close</button>
        <h2>Inside Card</h2>
      </div>
      {closeClicked && <Redirect to={props.details.pathname} />}
    </div>
  );
}

export default CardEdit;
