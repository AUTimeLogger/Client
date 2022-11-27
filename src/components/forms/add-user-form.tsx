import { useRef, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { User } from "@/../mocks/types";

const userFormFields = [
  {
    id: "username",
    label: "Username",
    type: "text",
  },
  {
    id: "firstName",
    label: "First name",
    type: "text",
  },
  {
    id: "lastName",
    label: "Last name",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "department",
    label: "Department",
    type: "text",
  },
];

type FormType = Map<string, HTMLInputElement>;

const initialInputRefValue = new Map() as FormType;

type AddUserFormProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (userObject: User) => void;
};

export default function AddUserForm({
  isOpen,
  handleClose,
  handleSubmit,
}: AddUserFormProps) {
  const inputRefs = useRef(initialInputRefValue);
  const [formError, setFormError] = useState("");

  function isFormValidBasedOnRefs(formFields: Map<string, HTMLInputElement>) {
    let isValid = true;

    formFields.forEach((input) => {
      if (input.value === "") isValid = false;
    });

    return isValid;
  }

  function handleDialogFormSubmit() {
    const emptyObject = new Map();

    inputRefs.current.forEach((input, key) => {
      emptyObject.set(key, input.value);
    });

    if (!isFormValidBasedOnRefs(inputRefs.current)) {
      setFormError("Please fill in all fields.");
      return;
    }

    handleSubmit(Object.fromEntries(emptyObject));
    setFormError("");
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add new user</DialogTitle>
      <DialogContent>
        {formError && <Alert severity="error">{formError}</Alert>}

        {userFormFields.map((userFormField) => (
          <TextField
            inputRef={(el: HTMLInputElement) =>
              inputRefs.current.set(userFormField.id, el)
            }
            key={userFormField.id}
            label={userFormField.label}
            type={userFormField.type}
            margin="dense"
            fullWidth
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleDialogFormSubmit}
          disabled={!isFormValidBasedOnRefs}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
