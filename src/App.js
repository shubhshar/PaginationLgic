import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]); // store data in todos array
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);

  const numOfTotalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);
  const indexOfLastTodo = currentPage * todosPerPage; //if currentPage = 3 => 3*10=30
  const indexofFirstTodo = indexOfLastTodo - todosPerPage; // if currentPage = 3 => 30-10=20;
  //hence, 20->30 todos will be displayed
  const visibleTodos = todos.slice(indexofFirstTodo, indexOfLastTodo);

  return (
    <div className="App">
      <h2>Pagination example</h2>
      <div>
        {visibleTodos.map((todo) => (
          <p key={todo.id}>
            ID no.{todo.userId}. {todo.title}
          </p>
        ))}

        <p>
          <span>Prev </span>
          {pages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
            >{`${page} | `}</span>
          ))}
          <span> Next</span>
        </p>
      </div>
    </div>
  );
}
