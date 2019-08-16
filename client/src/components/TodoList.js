import React, { useState, useEffect } from "react";
import { showToDo, deleteToDo } from "../api";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ModalEdit from "./ModalEdit";
import AddTodo from "./AddTodo";

export default function TodoList() {
  let [modalShow, setModalShow] = useState(false);
  let [todoList, setTodoList] = useState([]);
  let [selectedTodo, setSelectedTodo] = useState(null);

  function handleDelete(id) {
    console.log(id);
    deleteToDo(id).then(response => {
      console.log("message", response);
      showToDo().then(function(response) {
        console.log("message", response);
        setTodoList(response.data.result);
      });
    });
  }

  function fetchTodos() {
    showToDo().then(function(response) {
      setTodoList(response.data.result);
    });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function updateTodos() {
    fetchTodos();
  }
  return (
    <React.Fragment>
      <Container>
        <h3 class="headers">My todo list:</h3>
        <Row class="table-description">
          <Col xs={6} md={6}>
            Task description:
          </Col>
          <Col xs={1} md={1}>
            Status:
          </Col>
          <Col xs={1} md={1}>
            Priority:
          </Col>
          <Col xs={2} md={2}>
            Due date:
          </Col>
          <Col xs />
          <Col xs />
        </Row>
        {todoList.map(function(todo) {
          return (
            <Row>
              <Col xs={6} md={0}>
                {todo.task}
              </Col>
              <Col xs>{todo.status}</Col>
              <Col xs>{todo.priority}</Col>
              <Col xs>{todo.dueDate}</Col>
              <Col xs>
                <Button
                  type="submit"
                  onClick={function() {
                    setSelectedTodo(todo);
                    setModalShow(true);
                  }}
                >
                  Edit
                </Button>
                {todo && (
                  <ModalEdit
                    show={modalShow}
                    todo={selectedTodo}
                    onHide={() => setModalShow(false)}
                    updateTodos={updateTodos}
                  />
                )}
              </Col>
              <Col xs>
                <Button
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          );
        })}
      </Container>
      <AddTodo updateTodos={updateTodos} />
    </React.Fragment>
  );
}