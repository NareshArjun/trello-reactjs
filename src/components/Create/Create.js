import "./Create.css";
import { useState } from "react";
import CreateBoard from "./CreateBoard";

function Create(props) {
  const [isBoardClicked, setIsBoardClicked] = useState(false);
  const boardCreate = () => {
    setIsBoardClicked(true);
    console.log("Board clicked");
  };
  const submitBoardName = (enteredBoardData) => {
    const boardInfo = {
      ...enteredBoardData,
      id: Math.random().toString() + "-" + enteredBoardData.name,
      lists: [],
    };

    props.onSubmitBoard(boardInfo);
  };
  const closeWindow = () => {
    console.log("Close clicked");
    props.onCloseCreate();
    console.log("Close after state clicked");
  };
  const backToCreate = () => {
    setIsBoardClicked(false);
  };
  const totalClose = () => {
    //setIsBoardClicked(false);
    backToCreate();
    props.onCloseCreate();
  };
  return (
    <div className="create">
      <nav>
        <ul>
          <li>
            <button className="btn_create_window" onClick={boardCreate}>
              Create Board
            </button>
          </li>
          <li>
            <button className="btn_create_window">Create Workspace</button>
          </li>
          <li>
            <button className="btn_create_window" onClick={closeWindow}>
              Close
            </button>
          </li>
        </ul>
      </nav>
      {isBoardClicked ? (
        <CreateBoard
          onSubmitBoardName={submitBoardName}
          onBackToCreate={backToCreate}
          onTotalClose={totalClose}
        />
      ) : null}
    </div>
  );
}

export default Create;
