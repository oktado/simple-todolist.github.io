import React, { useEffect } from "react";
import { FormControl, Button, Row, Col } from "react-bootstrap";

export const InputForm = ({
  addTodos,
  handleInput,
  input,
  editTodo,
  setInput,
  description,
  setDescription,
  handleInputDescription,
}) => {
  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
      setDescription(editTodo.description);
    } else {
      setInput("");
      setDescription("");
    }
  }, [setInput, editTodo]);
  return (
    <div className="container-form">
      <form onSubmit={addTodos}>
        <div className="d-flex">
          <FormControl
            type="text"
            onChange={handleInput}
            value={input}
            placeholder="Add Title.."
          />
          <FormControl
            type="text"
            onChange={handleInputDescription}
            value={description}
            placeholder="Add Description.."
          />
          <Button disabled={!input} type="submit">
            {editTodo ? "SAVE" : "ADD"}
          </Button>
        </div>
      </form>
    </div>
  );
};
