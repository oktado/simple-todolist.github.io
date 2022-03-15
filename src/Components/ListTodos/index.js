import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { ModalDetail } from "../ModalDetail";

export const ListTodos = ({
  todos,
  handleDelete,
  handleComplete,
  handleEdit,
  showModalDetail,
  setShowModalDetail,
}) => {
  const [selectedTodo, setSelectedTodo] = useState({});

  const completed = todos.filter((item) => item.status === 1);
  const unCompleted = todos.filter((item) => item.status === 0);
  const sortedCompleted = completed.sort(function (a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const sortedUncomplete = unCompleted.sort(function (a, b) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const handleOpenModalDetail = (todo) => {
    setShowModalDetail(true);
    setSelectedTodo(todo);
  };

  return (
    <>
      <Row>
        <Col xl={6} lg={6}>
          <div className="container-list">
            <h5>Completed Task</h5>
            <hr />
            {todos &&
              sortedCompleted.map((todo) => {
                return (
                  <div className="mt-2 d-flex justify-content-between todo-list">
                    <li
                      onClick={() => handleOpenModalDetail(todo)}
                      className={`title-todo ${
                        todo.status === 1 ? "completed" : ""
                      }`}
                    >
                      {todo.title}
                    </li>
                    <div>
                      <Button
                        variant="warning"
                        onClick={() => handleComplete(todo)}
                      >
                        Check
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
        <Col xl={6} lg={6}>
          <div className="container-list">
            <h5>Uncompleted Task</h5>
            <hr />
            {todos &&
              sortedUncomplete.map((todo) => {
                return (
                  <div className="mt-2 d-flex justify-content-between todo-list">
                    <li
                      onClick={() => handleOpenModalDetail(todo)}
                      className={`title-todo ${todo.status === 1 ? "" : ""}`}
                    >
                      {todo.title}
                    </li>
                    <div>
                      <Button
                        variant="warning"
                        onClick={() => handleComplete(todo)}
                      >
                        Check
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
      <ModalDetail
        selectedTodo={selectedTodo}
        showModalDetail={showModalDetail}
        closeModalDetail={() => setShowModalDetail(false)}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
};
