import "./CardForm.css";
import { useState } from "react";

function CardForm(props) {
  const [enteredInput, setEnteredInput] = useState("");
  const textInput = (event) => {
    setEnteredInput(event.target.value);
  };
  const formSubmit = (event) => {
    event.preventDefault();
    const card = {
      cardid: Math.random().toString() + "-" + enteredInput,
      cardname: enteredInput,
    };
    props.onAddCard(card);
  };
  const cancelForm = () => {
    props.onCancel();
  };

  return (
    <form onSubmit={formSubmit}>
      <div className="displayform">
        <input
          placeholder="Enter a title for this Card"
          type="text"
          value={enteredInput}
          onChange={textInput}
        />
        <div>
          <button type="submit">Add Card</button>
          <button onClick={cancelForm}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

export default CardForm;
