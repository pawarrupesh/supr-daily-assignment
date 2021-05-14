import React from "react";

function Card(props) {
  const {
    cardList,
    boardIndex,
    dragging,
    dragEnter,
    currentItem,
    dragStart,
    deleteCard,
  } = props;

  return (
    <div
      className="card-container"
      onDragEnter={
        dragging ? (e) => dragEnter(e, { boardIndex, cardIndex: 0 }) : null
      }
    >
      {cardList &&
        cardList.map((el, cardIndex) => (
          <div
            key={el.id}
            draggable="true"
            onDragStart={(e) => dragStart(e, { boardIndex, cardIndex })}
            onDragEnter={
              dragging ? (e) => dragEnter(e, { boardIndex, cardIndex }) : null
            }
            style={{
              border:
                dragging &&
                boardIndex === currentItem.boardIndex &&
                cardIndex === currentItem.cardIndex
                  ? "1px dashed black"
                  : "1px solid black",
            }}
            className="card-parent-div"
          >
            <div
              className="board-header"
              style={{ border: "none", padding: "0" }}
            >
              <span className="card-title">{el.title}</span>
              <span className="cross-icon" onClick={() => deleteCard(el)}>
                +
              </span>
            </div>
            <div className="card-desc">{el.description}</div>
          </div>
        ))}
    </div>
  );
}

export default Card;
