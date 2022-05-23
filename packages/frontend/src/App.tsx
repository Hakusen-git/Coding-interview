import React from "react";
import { Box } from "@mui/material";
import "./App.css";
import Header from "./components/Header/Header";
import { TodoList } from "./components/TodoList/TodoList";

function App() {
  return (
    <div className="App">
      <Box component={"div"} sx={{ boxShadow: "6", maxHeight: "80%" }}>
        <Header />
        <TodoList />
      </Box>
    </div>
  );
}

export default App;
