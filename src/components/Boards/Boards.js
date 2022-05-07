import "./Boards.css";
import { useState } from "react";
import CreateBoard from "../Create/CreateBoard";
import { Link } from "react-router-dom";

function Boards(props) {
  const [isBoardCreateClicked, setIsBoardCreateClicked] = useState(false);
  const create = () => {
    setIsBoardCreateClicked(true);
  };
  return (
    <div>
      <h1>Boards page</h1>
      <div className="displayboards">
        <button className="board_create" onClick={create}>
          Create new board
        </button>
        {
          //changed from props.boarddetails to board
        }
        {props.boarddetails.map((details) => (
          <Link
            to={`/board-details/${details.id}`}
            key={details.id}
            className="board_create"
          >
            {details.name}
          </Link>
        ))}
      </div>
      {isBoardCreateClicked ? (
        <CreateBoard
        //onSubmitBoardName={submitBoardName}
        //onBackToCreate={backToCreate}
        //onTotalClose={totalClose}
        />
      ) : null}
    </div>
  );
}

export default Boards;
