import { useState, useRef, useMemo } from "react";
import axios from "axios";
import capitalize from "lodash/capitalize";
import Table from "@/components/table";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../mocks/types";

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

const getUsers = async () => {
  return fetch("/users").then((res) => res.json());
};

const addUser = async (user: User) => {
  return axios.post("/users", JSON.stringify(user));
};

const deleteUser = async (userId: string) => {
  return axios.delete(`/users/${userId}`);
};

export default function UsersPage() {
  const inputRefs = useRef([]);
  const [notification, setNotification] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogFormError, setDialogFormError] = useState("");
  const { isError, data: users } = useQuery(["users"], getUsers);

  const queryClient = useQueryClient();

  const addUserMutation = useMutation(addUser, {
    onError: () => {
      setNotification("Could not add user. Please try again!");
    },
    onSuccess: () => {
      setNotification("New user has been added!");
      queryClient.invalidateQueries(["users"]);
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onError: () => {
      setNotification("Could not delete user. Please try again!");
    },
    onSuccess: () => {
      setNotification("User has been deleted. The table will refresh.");
      queryClient.invalidateQueries(["users"]);
    },
  });

  function isFormValid(formFields: User) {
    return !Object.entries(formFields).some(
      (formField) => formField[1].length === 0
    );
  }

  function handleRemoveUser(userId: string) {
    console.log("remove user" + userId);
    deleteUserMutation.mutate(userId);
  }

  function handleAddUserClick() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  function handleDialogFormSubmit() {
    const extractedFormValues = Object.entries(inputRefs.current).reduce<{}>(
      (acc, [key, value]) => ({ ...acc, [key]: value.value }),
      {}
    );

    if (!isFormValid(extractedFormValues)) {
      setDialogFormError("Please fill in all fields.");
      return;
    }

    addUserMutation.mutate(extractedFormValues);
    setDialogOpen(false);
    setDialogFormError("");
    console.log(extractedFormValues);
  }

  function handleSnackbarClose(
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }

    setNotification("");
  }

  const mappedUsers = useMemo(
    () =>
      users?.map((user: User) => ({
        id: user.userId,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        department: user.department,
        delete: (
          <Button color="error" onClick={() => handleRemoveUser(user.userId)}>
            Delete
          </Button>
        ),
      })),
    [users]
  );

  const mappedNotification = useMemo(
    () =>
      notification.toLocaleLowerCase().includes("try") ? "error" : "success",
    [notification]
  );

  if (isError) return null;

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ pb: 2 }}
          >
            <Typography variant="h4">Users</Typography>
            <Button
              variant="contained"
              sx={{ height: "fit-content" }}
              onClick={handleAddUserClick}
            >
              Add new
            </Button>
          </Stack>
          <Table data={mappedUsers} />
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Add new user</DialogTitle>
            <DialogContent>
              {dialogFormError && (
                <Alert severity="error">{dialogFormError}</Alert>
              )}

              {userFormFields.map((userFormField) => (
                <TextField
                  inputRef={(el) => (inputRefs.current[userFormField.id] = el)}
                  key={userFormField.id}
                  label={userFormField.label}
                  type={userFormField.type}
                  margin="dense"
                  fullWidth
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleDialogFormSubmit}
                disabled={!isFormValid}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={!!notification}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            sx={{ bottom: 120 }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={mappedNotification}
              sx={{ width: "100%" }}
            >
              <AlertTitle>{capitalize(mappedNotification)}</AlertTitle>
              {notification}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </>
  );
}
