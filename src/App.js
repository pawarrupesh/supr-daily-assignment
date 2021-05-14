import React from "react";
import "./App.scss";
import Board from "./board";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardList: JSON.parse(sessionStorage.getItem("boardList")) || [],
    };
  }

  componentDidUpdate() {
    sessionStorage.setItem("boardList", JSON.stringify(this.state.boardList));
  }

  addBoardList = () => {
    const { boardList } = this.state;
    let boardTitle = prompt("Please enter your title");

    const addBoardListValue = [];
    if (!!boardTitle) {
      addBoardListValue.push({
        id: boardTitle,
        title: boardTitle,
        cardList: [],
      });

      this.setState({
        boardList: [...boardList, ...addBoardListValue],
      });
    }
  };

  removeBoardList = (value) => {
    const { boardList } = this.state;
    const filteredValue = boardList.filter((el) => el.id !== value.id);
    this.setState({
      boardList: filteredValue,
    });
  };

  addCard = (value) => {
    const { boardList } = this.state;
    let cardTitle = prompt("Please enter your title");
    let cardDesc = prompt("Please enter your description");
    if (!!cardTitle && !!cardDesc) {
      const cardList = [];
      cardList.push({
        id: cardTitle,
        title: cardTitle,
        description: cardDesc,
      });
      boardList.map((el) => {
        if (el.id === value.id) {
          el["cardList"] = [...el.cardList, ...cardList];
        }
        return el;
      });

      this.setState({
        boardList: boardList,
      });
    }
  };

  deleteCard = (value) => {
    const { boardList } = this.state;
    const filteredCardList = boardList.filter((el) => {
      let index = el.cardList.findIndex((a) => a.id === value.id);
      if (index > -1) {
        el.cardList.splice(index, 1);
      }
      return el;
    });

    this.setState({
      boardList: filteredCardList,
    });
  };

  onDragCardEnter = (endIndex, currentIndex) => {
    const { boardList } = this.state;
    let copyBoardList = JSON.parse(JSON.stringify(boardList));
    copyBoardList[endIndex.boardIndex].cardList.splice(
      endIndex.cardIndex,
      0,
      copyBoardList[currentIndex.boardIndex].cardList.splice(
        currentIndex.cardIndex,
        1
      )[0]
    );
    this.setState({
      boardList: copyBoardList,
    });
  };

  render() {
    const { boardList } = this.state;
    return (
      <div className="main-container">
        <div className="main-header">Trello Board</div>
        {boardList.length > 0 && (
          <div className="add-board-list-parent">
            <div className="add-board-list" onClick={() => this.addBoardList()}>
              Add List
            </div>
          </div>
        )}
        {boardList.length > 0 ? (
          <Board
            boardListArr={boardList}
            onDelete={(el) => this.removeBoardList(el)}
            onCardClick={(el) => this.addCard(el)}
            onCardDelete={(el) => this.deleteCard(el)}
            onCardEnter={(endIndex, currentIndex) =>
              this.onDragCardEnter(endIndex, currentIndex)
            }
          />
        ) : (
          <div className="trello-empty">
            <div style={{ paddingBottom: "100px" }}>
              Trello Board is empty Click Below button to add new LIST{" "}
            </div>
            <div className="add-board-list" onClick={() => this.addBoardList()}>
              Add List
            </div>
          </div>
        )}
      </div>
    );
  }
}
