import React from "react";
import Todo from "../Todo/Todo";
import "./style.css";

function List(props) {
  const filteredTodos = props.filteredTodos


  function setColor(category) {
    const todoCategoryArray = props.categories.filter(
      (item) => item.name === category
    );
    const todoCategoryObject = todoCategoryArray[0];
    return todoCategoryObject.color;
  }

  return (
    <div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            name={todo.name}
            date={todo.date}
            category={todo.category}
            isCompleted={todo.isCompleted}
            isPrioritary={todo.isPrioritary}
            isLate={todo.isLate}
            color={setColor(todo.category)}
            todos={props.todos} setTodos={props.setTodos}
            filteredTodos={filteredTodos}
          />
        ))}
      </ul>
    </div>
  );
}

export default List;
