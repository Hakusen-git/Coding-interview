import React, { useState } from "react";
import { Button } from "@mui/material";
import AddModal from "../AddModal/AddModal";

function Header() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>ToDo List</p>
        <Button
          style={{ margin: "0", padding: "0", width: "fit-content" }}
          onClick={handleOpen}
        >
          +
        </Button>
      </div>

      <AddModal open={open} handleClose={handleOpen} />
    </div>
  );
}

export default Header;
