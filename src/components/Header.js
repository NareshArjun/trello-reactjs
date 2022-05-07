import "./Header.css";
import { useState } from "react";
import Create from "./Create/Create";
import { Link } from "react-router-dom";

function Header(props) {
  const [isClicked, setIsClicked] = useState(false);
  const create = () => {
    setIsClicked(true);
    console.log("Clicked");
  };
  const submitBoard = (boardName) => {
    const board = {
      ...boardName,
    };
    //console.log(board);
    props.onCreatedBoard(board);
  };
  const closeCreate = () => {
    setIsClicked(false);
  };
  return (
    <div>
      <header className="App-header">
        <div className="row_wrapped">
          <div className="row_inner">
            <div className="column_1_5">
              <div className="column_inner">
                <h2>Trello</h2>
              </div>
            </div>
            <div className="column_4_5">
              <div className="column_inner">
                <nav className="row_inner flex_container_align_1">
                  <Link to="/">
                    <h3>Workspaces</h3>
                  </Link>
                  <Link to="/boards">
                    <h3>Boards</h3>
                  </Link>
                  <button className="btn_create" onClick={create}>
                    <h3>Create</h3>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {isClicked ? (
          <Create onSubmitBoard={submitBoard} onCloseCreate={closeCreate} />
        ) : null}
      </header>
    </div>
  );
}

export default Header;
