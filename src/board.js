import React, { useState, useRef } from "react";
import Card from "./card";

function Board(props) {
  const dragItem = useRef();
  const dragNode = useRef();
  const [dragging, setDragging] = useState(false);

  const dragStart = (e, params) => {
    dragItem.current = params;
    const target = e.target;
    dragNode.current = target;
    dragNode.current.addEventListener("dragend", dragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const dragEnd = (e) => {
    dragNode.current.removeEventListener("dragend", dragEnd);
    setDragging(false);
    dragItem.current = null;
    dragNode.current = null;
  };

  const dragEnter = (e, params) => {
    const currentItem = dragItem.current;
    if (
      e.target !== dragNode.current &&
      params.boardIndex !== currentItem.boardIndex
    ) {
      props.onCardEnter(params, currentItem);
      dragItem.current = params;
    }
  };

  const currentItem = dragItem.current;

  return (
    <div className="board-container">
      {props.boardListArr?.map((el, boardIndex) => (
        <div
          key={el.id}
          onDragEnter={
            dragging && !el?.cardList?.length
              ? (e) => dragEnter(e, { boardIndex, cardIndex: 0 })
              : null
          }
          className="board-parent-div"
        >
          <div className="board-header">
            <span>{el.title}</span>
            <span className="cross-icon" onClick={() => props.onDelete(el)}>
              +
            </span>
          </div>
          <Card
            cardList={el.cardList}
            deleteCard={(value) => props.onCardDelete(value)}
            dragStart={(e, params) => dragStart(e, params)}
            dragEnter={(e, params) => dragEnter(e, params)}
            dragging={dragging}
            currentItem={currentItem}
            boardIndex={boardIndex}
          />
          <div className="board-footer">
            <div className="add-icon" onClick={() => props.onCardClick(el)}>
              +
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
