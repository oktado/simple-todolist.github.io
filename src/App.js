import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { InputForm } from "./Components/Input";
import { ListTodos } from "./Components/ListTodos";
import { Title } from "./Components/Title";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [showModalDetail, setShowModalDetail] = useState(false);

  useEffect(() => {
    axios
      .get("https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list")
      .then((res) => {
        setTodos(res.data);
      });
  }, []);

  const updateTodo = (title, id, status, createdAt, description) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, status, createdAt, description } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  const addTodos = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          title: input,
          status: 0,
          description: description,
          createdAt: Date.now(),
        },
      ]);
      setInput("");
      setDescription("");
    } else {
      updateTodo(
        input,
        editTodo.id,
        editTodo.status,
        editTodo.createdAt,
        description
      );
    }
  };

  const handleEdit = ({ id }) => {
    const findTodo = todos.find((item) => item.id === id);
    setEditTodo(findTodo);
    setShowModalDetail(false);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleInputDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setShowModalDetail(false);
  };

  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, status: item.status === 0 ? 1 : 0 };
        }
        return item;
      })
    );
  };

  return (
    <div className="App">
      <Title title={"TODO - LIST"} />
      <div className="container-todos">
        <InputForm
          input={input}
          editTodo={editTodo}
          handleInput={handleInput}
          addTodos={addTodos}
          setInput={setInput}
          description={description}
          setDescription={setDescription}
          handleInputDescription={handleInputDescription}
        />
        <ListTodos
          todos={todos}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          showModalDetail={showModalDetail}
          setShowModalDetail={setShowModalDetail}
        />
      </div>
    </div>
  );
}

export default App;
