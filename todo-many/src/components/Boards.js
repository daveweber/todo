import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Boards.css';
import Todos from './Todos';

function Boards() {
    const [boards, setBoards] = React.useState([]);
    const [board, setBoard] = React.useState("");

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const newBoards = [...boards];
        const [reorderedItem] = newBoards.splice(result.source.index, 1);
        newBoards.splice(result.destination.index, 0, reorderedItem);

        setBoards(newBoards);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newBoard = {
            id: String(new Date().getTime()),
            name: board,
        };
        setBoards([...boards].concat(newBoard));
        setBoard("");
    }

    return (
        <div id="todo-list">
            <h1>Todo Lists</h1>

            <form className="newBoard" onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setBoard(e.target.value)}
                    value={board}
                />
                <button type="submit">New Board</button>
            </form>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="boards" direction="horizontal">
                    {(provided) => (
                        <div className='boards' {...provided.droppableProps} ref={provided.innerRef}>
                            {boards.map((board, index) => {
                                return (
                                    <Draggable key={board.id} draggableId={board.id} index={index}>
                                        {(provided) => (
                                            <div className='board' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Todos id={board.id} title={board.name}/>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Boards;