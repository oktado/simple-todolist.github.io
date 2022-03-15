import React from "react";
import { Modal, Button } from "react-bootstrap";
import dayjs from "dayjs";

export const ModalDetail = ({
  selectedTodo,
  showModalDetail,
  closeModalDetail,
  handleDelete,
  handleEdit,
}) => {
  return (
    <Modal show={showModalDetail} onHide={closeModalDetail}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedTodo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{selectedTodo.description}</p>
        <p>Created at:</p>
        <p>{dayjs(selectedTodo.createdAt).format("YYYY MMMM DD HH.mm")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          hidden={selectedTodo.status === 1 ? true : false}
          variant="danger"
          onClick={() => handleDelete(selectedTodo)}
        >
          Delete
        </Button>
        <Button variant="success" onClick={() => handleEdit(selectedTodo)}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
