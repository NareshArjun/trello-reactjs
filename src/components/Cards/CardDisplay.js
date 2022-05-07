import "./CardDisplay.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CardForm from "./CardForm";
import ListNameDisplay from "../Lists/ListNameDisplay";
import deleteIcon from "../Images/icon-delete-symbol.jpg";
import editIcon from "../Images/edit-icon.jpg";

let clickedCard;

function CardDisplay(props) {
  const location = useLocation();
  const [cardCreateClicked, setCardCreateClicked] = useState(false);
  const [editCardNameClicked, setEditCardNameClicked] = useState(false);
  const [cardName, setCardName] = useState("");

  const cardCreate = () => {
    setCardCreateClicked(true);
  };
  const cancelCardCreate = () => {
    setCardCreateClicked(false);
  };
  const addCard = (card) => {
    setCardCreateClicked(false);
    props.onUpdateCardsToLists(card, props.listDetails.listid);
  };
  const editedListName = (listName) => {
    props.onUpdateEditedListName(listName, props.listDetails.listid);
  };
  const deleteCard = (event) => {
    props.onDeleteCard(event.target.name, props.listDetails.listid);
  };
  const editCard = (event) => {
    clickedCard = JSON.parse(event.target.attributes.obj.value);
    setEditCardNameClicked(true);
    setCardName(clickedCard.cardname);
  };
  const editCardName = (event) => {
    setCardName(event.target.value);
  };
  const cancelEditCardName = () => {
    setEditCardNameClicked(false);
  };
  const submitCardNameForm = (event) => {
    event.preventDefault();
    if (cardName !== clickedCard.cardname) {
      props.onEditedCardName(
        clickedCard.cardid,
        cardName,
        props.listDetails.listid
      );
    }
    setEditCardNameClicked(false);
  };

  return (
    <div className="listcomponent">
      <header>
        <ListNameDisplay
          listDetails={props.listDetails.listname}
          onEditedListName={editedListName}
        />
      </header>
      <main>
        {props.listDetails.cards.length > 0 &&
          props.listDetails.cards.map((card) => (
            <div className="cardnamedisplay">
              {editCardNameClicked ? (
                <form className="formtoedit" onSubmit={submitCardNameForm}>
                  <input
                    type="text"
                    value={cardName}
                    onChange={editCardName}
                  ></input>
                  <button type="submit">Save</button>
                  <button onClick={cancelEditCardName}>Cancel</button>
                </form>
              ) : (
                <Link
                  key={card.cardid}
                  to={{
                    pathname: `/card-details/${card.cardid}`,
                    state: { background: location },
                  }}
                  className="cardname"
                >
                  {card.cardname}
                </Link>
              )}
              <button className="custombutton editbutton" onClick={editCard}>
                <img alt="edit" src={editIcon} obj={JSON.stringify(card)}></img>
              </button>
              <button
                className="custombutton deletebutton"
                onClick={deleteCard}
              >
                <img alt="delete" src={deleteIcon} name={card.cardid}></img>
              </button>
            </div>
          ))}
      </main>
      <footer>
        {!cardCreateClicked ? (
          <button onClick={cardCreate}>Add a Card</button>
        ) : (
          <CardForm onAddCard={addCard} onCancel={cancelCardCreate} />
        )}
      </footer>
    </div>
  );
}

export default CardDisplay;
