import { React, useEffect, useState } from "react";
import moment from "moment";
import "./App.css";
import Category from "./components/category/Category";
import Filter from "./components/Filter/Filter";
import Form from "./components/Form/Form";
import List from "./components/List/List";

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([
    { name: "", color: "" },
    { name: "work", color: "#700505" },
    { name: "home", color: "#150f46" },
    { name: "books", color: "#0e440D" },
    { name: "study", color: "#b75901" },
  ]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //this will run once, when starting
  useEffect(() => {
    getLocalTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  //this will run when the todos state is updated
  useEffect(() => {
    saveLocalTodos();
    sortByDate();
    setTodos(todos);
  }, [todos]);

  function sortByDate() {
    todos.sort(function (todoA, todoB) {
      // const dateA = moment(a.todoDateOK, "DD/MM/YYYY").format('YYYYMMDD');
      // const dateB = moment(b.todoDateOK, "DD/MM/YYYY").format('YYYYMMDD');
      const dateA = moment(todoA.dateSort);
      const dateB = moment(todoB.dateSort);
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      // a must be equal to b
      return 0;
    });
    return todos;
  }

  function addCategory(newCategory) {
    setCategories([...categories, newCategory]);
  }

  function addTodo(newTodo) {
    if (newTodo.date === "") {
      newTodo.dateSort = "0000-01-01";
    } else {
      newTodo.dateSort = newTodo.date;
    }
    setTodos([...todos, newTodo]);
  }

  //LOCAL STORAGE
  function saveLocalTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  async function getLocalTodos() {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let array = await JSON.parse(localStorage.getItem("todos"));
      return array;
    }
  }

  return (
    <div className="App">
      <div className="interface">
        <header>
          <h1>React TodoList</h1>
          {categories.map((cat) => (
            <div
              className="header-colors"
              style={{ backgroundColor: cat.color }}
            />
          ))}
        </header>
        <main>
          <Form
            addTodo={addTodo}
            setTodos={setTodos}
            todos={todos}
            categories={categories}
          />
          <Category addCategory={addCategory} />
          <Filter
            filteredTodos={filteredTodos}
            setFilteredTodos={setFilteredTodos}
            categories={categories}
            status={status}
            setStatus={setStatus}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            todos={todos}
          />
          <List
            className="list-component"
            todos={todos}
            setTodos={setTodos}
            categories={categories}
            filteredTodos={filteredTodos}
          />
        </main>
        <footer>
          <div className="footer-text">
            <h2>Created by: João Avelino</h2>
            <h3>Using ReactJS</h3>
          </div>
          <div className="footer-stripes">
            {categories.map((cat) => (
              <div
                className="header-colors"
                style={{ backgroundColor: cat.color }}
              />
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
