import { useState } from "react";
import "./CreateBoard.css";

function CreateBoard(props) {
  const [enteredInput, setEnteredInput] = useState("");
  const enterInput = (event) => {
    setEnteredInput(event.target.value);
  };
  const formSubmit = (event) => {
    event.preventDefault();
    const boardData = {
      name: enteredInput,
    };
    props.onSubmitBoardName(boardData);
    setEnteredInput("");
    //props.onTotalClose();
    closeWindow();
  };
  const backWindow = () => {
    props.onBackToCreate();
  };
  const closeWindow = () => {
    props.onTotalClose();
  };
  return (
    <div className="createboard">
      <form onSubmit={formSubmit}>
        <label>BoardName</label>
        <input type="text" value={enteredInput} onChange={enterInput} />
        <button type="submit" className="btn_create_window">
          Create Board
        </button>
        <button className="btn_create_window" onClick={backWindow}>
          Back
        </button>
        <button className="btn_create_window" onClick={closeWindow}>
          Close
        </button>
      </form>
    </div>
  );
}

export default CreateBoard;
