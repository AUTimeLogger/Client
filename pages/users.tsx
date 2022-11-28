import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import capitalize from "lodash/capitalize";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddUserForm from "@/components/forms/add-user-form";
import Table from "@/components/table";
import useAxios from "@/hooks/use-axios";
import { User } from "../mocks/types";

export default function UsersPage() {
  const axios = useAxios();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const queryClient = useQueryClient();

  const getUsers = async () => {
    return axios.get("/users").then((res) => res.data);
  };

  const addUser = async (user: User) => {
    return axios.post("/users", JSON.stringify(user));
  };

  const deleteUser = async (userId: string) => {
    return axios.delete(`/users/${userId}`);
  };

  const { isError, data: users } = useQuery(["users"], getUsers);

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

  function handleRemoveUser(userId: string | undefined) {
    if (!userId) return;

    console.log("remove user" + userId);
    deleteUserMutation.mutate(userId);
  }

  function handleAddUserClick() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  function handleDialogFormSubmit(userObject: User) {
    addUserMutation.mutate(userObject);
    setDialogOpen(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Grid item xs={12} xl={8}>
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
          <AddUserForm
            isOpen={dialogOpen}
            handleClose={handleDialogClose}
            handleSubmit={handleDialogFormSubmit}
          />
          <Snackbar
            open={!!notification}
            autoHideDuration={3000}
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
