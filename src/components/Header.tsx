"use client";

import { useCreateTodoMutation, useGetTodosQuery } from "@/redux/todo/todoApi";
import { Alert, Button, Collapse, TextField } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@/modules/Modal";
import { useRouter } from "next/router";

interface IHeader {
  todoPage?: boolean;
}

const Header: React.FC<IHeader> = ({ todoPage }) => {
  const [show, setShow] = useState<boolean>(false);
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const [title, setTitle] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [titleResponse, setTitleResponse] = useState<string>("");
  const router = useRouter();

  const handleGoToTodoListPage = () => {
    router.push("/todo");
  };

  const handleClose = () => {
    setShow(false);
    setAlert(false);
    setSuccess(false);
  };

  const handleCreate = async () => {
    try {
      const data = {
        userId: 1,
        title: title,
        completed: false,
      };

      const response = await createTodo(data).unwrap();

      if (response) {
        setTitle("");
        setSuccess(true);
        setTitleResponse(response?.title);
        // setDataTodos((prev: any) => [...prev, response]);
        //   refetchTodos();
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-center items-center mb-3">
        <div>
          <h2 className="text-center font-extrabold text-4xl text-sky-900">
            Todo List App
          </h2>
        </div>
      </div>
      {!todoPage ? (
        <div className="flex flex-col md:flex-row justify-center md:justify-between mb-4">
          <div>
            <p
              className="font-extrabold text-base text-sky-900 cursor-pointer"
              style={{ textDecoration: "underline" }}
              onClick={handleGoToTodoListPage}
            >
              Go To Todo List Page
            </p>
          </div>
          <div className="w-full md:w-40">
            <Button
              variant="contained"
              color="info"
              size="small"
              style={{
                backgroundColor: "#0288d1",
                textTransform: "capitalize",
              }}
              onClick={() => setShow(true)}
              fullWidth
            >
              Add Todo
            </Button>
          </div>
        </div>
      ) : null}

      <Modal
        show={show}
        handleClose={handleClose}
        loading={isLoading}
        handleSave={handleCreate}
      >
        <div className="mt-2">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </div>

        <Collapse in={success} className="mt-2">
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Success Added {titleResponse}
          </Alert>
        </Collapse>

        <Collapse in={alert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Success Added Todo List
          </Alert>
        </Collapse>
      </Modal>
    </>
  );
};

export default Header;
