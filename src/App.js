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
  const indexOfLastTodo = currentPage * todosPerPage; //if currentPage = 3 then => 3*10=30
  const indexofFirstTodo = indexOfLastTodo - todosPerPage; // if currentPage = 3 then => 30-10=20;
  //hence, 20->30 todos will be displayed
  const visibleTodos = todos.slice(indexofFirstTodo, indexOfLastTodo);
  const prevHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextHandler = () => {
    if (currentPage !== numOfTotalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <div className="App">
        <h2>Pagination example</h2>
        <div className="dropD">
          <p>Select number of items to display</p>
          <select onChange={(e) => setTodosPerPage(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
             <option value="50">50</option>
          </select>
        </div>
        <div>
          {visibleTodos.map((todo) => (
            <p key={todo.id}>
              ID no.{todo.userId}. {todo.title}
            </p>
          ))}

          <p>
            <span onClick={prevHandler}>Prev </span>
            {pages.map((page) => (
              <span
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${currentPage === page ? "active" : ""}`} //so that css can be applied
              >{`${page}  `}</span>
            ))}
            <span onClick={nextHandler}> Next</span>
          </p>
        </div>
      </div>
    </>
  );
}
