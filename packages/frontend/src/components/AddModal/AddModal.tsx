import React, { ReactElement, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_TODO, GET_ALL_TODO } from "../../hooks/todos/gqlCalls";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface ModalPropI {
  open: boolean;
  handleClose: () => void;
}

function AddModal(props: ModalPropI): ReactElement {
  const [title, setTitle] = useState("");

  const [createTodoItem, { error }] = useMutation(CREATE_TODO, {
    refetchQueries: [GET_ALL_TODO, "GetTodoItems"],
  });

  const handleCreate = () => {
    createTodoItem({
      variables: {
        input: {
          title: title,
          completed: false,
          createdAt: new Date(),
          completedAt: undefined,
        },
      },
    });
    setTitle("");
    props.handleClose();
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={{ ...style, width: "25%", height: "fit-content" }}>
        <h4>Add Item</h4>
        <TextField
          sx={{ width: "100%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ float: "right", marginTop: "16px" }}>
          <Button
            sx={{ width: "100px", boxShadow: "2", marginRight: "16px" }}
            onClick={props.handleClose}
          >
            Close
          </Button>
          <Button
            onClick={handleCreate}
            sx={{ width: "100px", boxShadow: "2" }}
          >
            Add
          </Button>
        </div>
        {error && <p>{error.toString()}</p>}
      </Box>
    </Modal>
  );
}

export default AddModal;
