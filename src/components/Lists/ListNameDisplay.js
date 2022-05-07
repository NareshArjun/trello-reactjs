import "./ListNameDisplay.css";
import { useState, useEffect, useRef } from "react";

function ListNameDisplay(props) {
  const [listName, setListName] = useState(props.listDetails);
  const [clickedListName, setClickedListName] = useState(false);
  const refValue = useRef(null);

  const clickedToEdit = () => {
    setClickedListName(true);
  };
  const editListName = (event) => {
    setListName(event.target.value);
  };
  const clickOutside = (event) => {
    if (refValue.current && !refValue.current.contains(event.target)) {
      if (listName !== props.listDetails) {
        props.onEditedListName(listName);
      }
      setClickedListName(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", clickOutside, true);
    return () => document.removeEventListener("click", clickOutside, true);
  }, [listName]);

  return (
    <div className="listname">
      {clickedListName && (
        <input
          ref={refValue}
          type="text"
          value={listName}
          onChange={editListName}
        />
      )}
      {!clickedListName && <h2 onClick={clickedToEdit}>{listName}</h2>}
    </div>
  );
}

export default ListNameDisplay;
