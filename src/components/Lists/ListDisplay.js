import "./ListDisplay.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ListForm from "./ListForm";
import CardDisplay from "../Cards/CardDisplay";
//import Card from "../UI/Card";

function ListDisplay(props) {
  const params = useParams();
  const [listCreateClicked, setListCreateClicked] = useState(false);
  const board = props.boarddetails.find((board) => board.id === params.boardId);

  const listCreate = () => {
    setListCreateClicked(true);
  };
  const cancelListCreate = () => {
    setListCreateClicked(false);
  };
  const addList = (list) => {
    setListCreateClicked(false);
    props.onUpdateListToBoard(list, board.id);
  };
  const updateCardsToLists = (card, listId) => {
    props.onUpdateCardtoBoardLists(card, listId, board.id);
  };
  const updateEditedListName = (listName, listId) => {
    props.onUpdateEditedListNametoBoard(listName, listId, board.id);
  };
  const deleteCard = (card, listId) => {
    props.onDeleteCardFromBoardList(card, listId, board.id);
  };
  const editedCardName = (cardId, cardName, listId) => {
    props.onUpdateEditedCardToBoardList(cardId, cardName, listId, board.id);
  };

  return (
    <div>
      <h2>Board: {board.name}</h2>
      <div className="lists listdisplay">
        {board.lists.length > 0 &&
          board.lists.map((list) => (
            <CardDisplay
              key={list.listid}
              listDetails={list}
              onUpdateCardsToLists={updateCardsToLists}
              onUpdateEditedListName={updateEditedListName}
              onDeleteCard={deleteCard}
              onEditedCardName={editedCardName}
            />
          ))}
        {!listCreateClicked ? (
          <button onClick={listCreate}>Add a List</button>
        ) : (
          <ListForm onAddList={addList} onCancel={cancelListCreate} />
        )}
      </div>
    </div>
  );
}

export default ListDisplay;
