import React from "react";
import { Box } from "@mui/material";
import "./App.css";
import Header from "./components/Header/Header";
import { AllTodoList } from "./hooks/todos/useGetTodos";

function App() {
  return (
    <div className="App">
      <Box component={"div"} sx={{ boxShadow: "6", maxHeight: "80%" }}>
        <Header />
        <AllTodoList />
      </Box>
    </div>
  );
}

export default App;
