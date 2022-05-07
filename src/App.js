import "./App.css";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Boards from "./components/Boards/Boards";
import ListDisplay from "./components/Lists/ListDisplay";
import CardEdit from "./components/Cards/CardEdit";

//let localStorageValue;

function App() {
  const [boards, setBoards] = useState([]);
  const location = useLocation();
  const [background, setBackgroundLocation] = useState("");

  useEffect(() => {
    const localStorageValue = JSON.parse(localStorage.getItem("MY_APP"));
    const backgroundLocationLocalValue = JSON.parse(
      localStorage.getItem("BackgroundLocation")
    );
    if (localStorageValue) {
      setBoards(localStorageValue);
    }
    if (backgroundLocationLocalValue) {
      setBackgroundLocation(backgroundLocationLocalValue);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("MY_APP", JSON.stringify(boards));
  }, [boards]);
  useEffect(() => {
    if (location.state) {
      setBackgroundLocation(location.state.background);
    }
    if (!location.state && background.pathname === location.pathname) {
      setBackgroundLocation("");
    }
  }, [location]);
  useEffect(() => {
    localStorage.setItem("BackgroundLocation", JSON.stringify(background));
  }, [background]);

  const createdBoard = (boardDetail) => {
    setBoards((boardsInfo) => {
      return [...boardsInfo, boardDetail];
    });
  };
  const updateBoard = (lists, boardId) => {
    const updatedBoard = boards.map((board) =>
      board.id === boardId ? { ...board, lists: lists } : board
    );
    setBoards(updatedBoard);
  };
  const updateListToBoard = (list, boardId) => {
    const findBoard = boards.find((board) => board.id === boardId);
    findBoard.lists = [...findBoard.lists, list];
    updateBoard(findBoard.lists, boardId);
  };
  const updateCardtoBoardLists = (card, listId, boardId) => {
    const findBoard = boards.find((board) => board.id === boardId);
    const findList = findBoard.lists.find((list) => list.listid === listId);
    findList.cards = [...findList.cards, card];
    const updatedList = findBoard.lists.map((list) =>
      list.listid === listId ? { ...list, cards: findList.cards } : list
    );
    updateBoard(updatedList, boardId);
  };
  const updateEditedListNametoBoard = (listName, listId, boardId) => {
    const findBoard = boards.find((board) => board.id === boardId);
    const updatedList = findBoard.lists.map((list) =>
      list.listid === listId ? { ...list, listname: listName } : list
    );
    updateBoard(updatedList, boardId);
  };
  const deleteCardFromBoardList = (cardId, listId, boardId) => {
    const findBoard = boards.find((board) => board.id === boardId);
    const findList = findBoard.lists.find((list) => list.listid === listId);
    findList.cards.splice(
      findList.cards.findIndex((card) => card.cardid === cardId),
      1
    );
    const updatedList = findBoard.lists.map((list) =>
      list.listid === listId ? { ...list, cards: findList.cards } : list
    );
    updateBoard(updatedList, boardId);
  };
  const updateEditedCardToBoardList = (cardId, cardName, listId, boardId) => {
    const findBoard = boards.find((board) => board.id === boardId);
    const findList = findBoard.lists.find((list) => list.listid === listId);
    const updatedCard = findList.cards.map((card) =>
      card.cardid === cardId ? { ...card, cardname: cardName } : card
    );
    const updatedList = findBoard.lists.map((list) =>
      list.listid === listId ? { ...list, cards: updatedCard } : list
    );
    updateBoard(updatedList, boardId);
  };

  return (
    <div className="App">
      <Header onCreatedBoard={createdBoard} />
      <main>
        <Switch location={background || location}>
          <Route path="/boards" active>
            <Boards boarddetails={boards} />
          </Route>
          <Route path="/board-details/:boardId" exact>
            {boards.length > 0 && (
              <ListDisplay
                boarddetails={boards}
                onUpdateListToBoard={updateListToBoard}
                onUpdateCardtoBoardLists={updateCardtoBoardLists}
                onUpdateEditedListNametoBoard={updateEditedListNametoBoard}
                onDeleteCardFromBoardList={deleteCardFromBoardList}
                onUpdateEditedCardToBoardList={updateEditedCardToBoardList}
              />
            )}
          </Route>
        </Switch>
        {
          <Route
            path="/card-details/:cardId"
            children={<CardEdit details={background} />}
          />
        }
      </main>
    </div>
  );
}

export default App;
