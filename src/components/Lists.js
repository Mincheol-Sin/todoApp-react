import { data } from "autoprefixer";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

export default function Lists({ todoData, setTodoData }) {
  const handleEnd = (result) => {
    if (!result.destination) return;
    const newTodoData = todoData;

    // 1. 변경시키는 아이템을 배열에서 지워줍니다.
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);
    // 2. return 값으로 지워진 아이템을 잡아줍니다.
    newTodoData.splice(result.destination.idnex, 0, reorderedItem);

    // 원하는 자리에 reorderedItem을 삽입합니다.
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      snapshot={snapshot}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
