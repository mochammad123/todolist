import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface IModal {
  show: boolean;
  handleClose?: () => void;
  children?: React.ReactNode;
  loading?: boolean;
  handleSave?: () => void;
}

const Modal: React.FC<IModal> = ({
  show,
  handleClose,
  children,
  loading,
  handleSave,
}) => {
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">Add Todo</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {loading ? (
          <Button
            variant="outlined"
            disabled
            size="small"
            sx={{ textTransform: "capitalize" }}
            fullWidth
          >
            Loading
          </Button>
        ) : (
          <>
            <Button
              onClick={handleClose}
              color="error"
              variant="outlined"
              size="small"
              sx={{ textTransform: "capitalize" }}
              fullWidth
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              variant="contained"
              color="info"
              size="small"
              style={{
                backgroundColor: "#0288d1",
                textTransform: "capitalize",
              }}
              fullWidth
            >
              Save
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
