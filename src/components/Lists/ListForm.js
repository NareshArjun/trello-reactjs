import "./ListForm.css";
import { useState } from "react";

function ListForm(props) {
  const [enteredInput, setEnteredInput] = useState("");
  const textInput = (event) => {
    setEnteredInput(event.target.value);
  };
  const formSubmit = (event) => {
    event.preventDefault();
    const list = {
      listid: Math.random().toString() + "-" + enteredInput,
      listname: enteredInput,
      cards: [],
    };
    props.onAddList(list);
  };
  const cancelForm = () => {
    props.onCancel();
  };

  return (
    <form onSubmit={formSubmit}>
      <div className="displayform">
        <input
          placeholder="Enter List title"
          type="text"
          value={enteredInput}
          onChange={textInput}
        />
        <div>
          <button type="submit">Add List</button>
          <button onClick={cancelForm}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

export default ListForm;
