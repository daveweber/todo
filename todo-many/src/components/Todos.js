import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Todos.css';


function Todos(props) {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const newTodos = [...todos];
    const [reorderedItem] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, reorderedItem);

    setTodos(newTodos);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: String(new Date().getTime()),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    console.log(todos);
    setTodo("");
  }

  function deleteTodo(id) {
    const newTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function toggleComplete(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  function submitEdits(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.text = editingText;
    setTodos(newTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div id="todo-list">
      <h1>{props.title}</h1>

      <form className="newTodo" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div className={todos.length > 0 ? 'todos' : 'todos-empty'}  {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => {
                return (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div
                        key={todo.id}
                        className={todo.completed ? 'todo-completed' : 'todo'}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      >
                        <div className="todo-text">
                          <input
                            type="checkbox"
                            id="completed"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                          />
                          {todo.id === todoEditing ? (
                            <input
                              type="text"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                            />
                          ) : (
                            <div>
                              <div>{todos.findIndex((t) => t.id === todo.id) + 1}. {todo.text}</div>
                            </div>
                          )}
                        </div>
                        <div className="todo-actions">
                          {todo.id === todoEditing ? (
                            <button onClick={() => submitEdits(todo.id)}>Submit</button>
                          ) : (
                            <button onClick={() => { setTodoEditing(todo.id); setEditingText(todo.text) }}>Edit</button>
                          )}
                          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
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

export default Todos;