import React from "react";
import "./style.css";
import Moment from "react-moment";
import { useEffect } from "react";
import moment from "moment";

function Todo(props) {
  useEffect(() => {
    dateCheck();
  },[]);

  //BUTTONS HANDLERS
  function deleteHandler() {
    props.setTodos(props.todos.filter((el) => el.id !== props.todo.id));
  }
  const completeHandler = () => {
    props.setTodos(
      props.todos.map((mapped) => {
        if (mapped.id === props.todo.id) {
          return {
            ...mapped,
            isCompleted: !mapped.isCompleted,
          };
        }
        return mapped;
      })
    );
  };
  const priorityHandler = () => {
    props.setTodos(
      props.todos.map((mapped) => {
        if (mapped.id === props.todo.id) {
          return {
            ...mapped,
            isPrioritary: !mapped.isPrioritary,
          };
        }
        return mapped;
      })
    );
  };

  //DATE FORMAT
  let formatedDate = "";
  if (props.date !== "") {
    formatedDate = <Moment format="DD-MM-YYYY">{props.date}</Moment>;
  }

  //DATE CHECK
  let today = moment().format("YYYY-MM-DD");
  function dateCheck() {
    props.setTodos(
      props.todos.map((mapped) => {
        if (mapped.date < today && mapped.date !== "") {
          return {
            ...mapped,
            isLate: true,
          };
        }
        return mapped;
      })
    );
  }

  return (
    <div
      className={`todo-div ${props.isPrioritary ? "prioritary" : ""} ${
        props.isCompleted ? "completed" : ""
      }         ${props.todo.isLate ? "late" : ""} `}
    >
      <div className="todo-category" style={{ backgroundColor: props.color }}>
        {props.category}
      </div>
      <div className="todo-text">
        <li className="todo-name">{props.name}</li>
        <p className="todo-date">{formatedDate}</p>
      </div>

      <button className="todo-check" onClick={completeHandler}>
        <i className="fas fa-check-square"></i>
      </button>

      <button className="todo-important" onClick={priorityHandler}>
        <i className="fas fa-exclamation-triangle"></i>
      </button>

      <button className="todo-delete" onClick={deleteHandler}>
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  );
}

export default Todo;
