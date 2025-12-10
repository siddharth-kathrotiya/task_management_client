import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewTaskFormComponent from "./NewTaskFormComponent";

const NavBarComponent = () => {
  const [openForm, setOpenForm] = useState(false);
  const handleClose = () => setOpenForm(false);
  return (
    <div className="bg-gray-100">
      <AppBar
        position="static"
        sx={{ backgroundColor: (theme) => theme.palette.grey[500] }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(!openForm)}
          >
            New Task
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog open={openForm} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          New Task
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <NewTaskFormComponent
            closeForm={handleClose}
            setOpenForm={setOpenForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NavBarComponent;
