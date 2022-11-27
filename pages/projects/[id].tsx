import {
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { User } from "@/../mocks/types";
import Autocomplete from "@/components/autocomplete";
import Table from "@/components/table";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<User[] | null>([]);
  const [userToAdd, setUserToAdd] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const addUserMutation = useMutation(
    (userId) => {
      fetch(`/projects/${id}/users`, {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const { isLoading, data: allUsers } = useQuery(
    ["allUsers"],
    (): Promise<User[]> => fetch("/users").then((res) => res.json())
  );

  const { data: project } = useQuery(["project"], () =>
    fetch(`/projects/${id}`).then((res) => res.json())
  );

  const projectId = project?.projectId;

  const {
    status,
    fetchStatus,
    error,
    data: users,
  } = useQuery(
    ["users", projectId],
    () => fetch(`/projects/${id}/users`).then((res) => res.json()),
    {
      enabled: !!projectId,
    }
  );

  function handleRemoveUser(userId: string) {
    console.log("remove user" + userId);
  }

  function handleGoBackClick() {
    router.back();
  }

  function handleAddUserClick() {
    console.log(userToAdd);
    addUserMutation.mutate({ userToAdd });
    setUserToAdd(null);
  }

  const mappedUsers = useMemo(
    () =>
      users?.map((user: User) => ({
        id: user.userId,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        department: user.department,
        remove: (
          <Button color="error" onClick={() => handleRemoveUser(user.userId)}>
            Remove
          </Button>
        ),
      })),
    [users]
  );

  useEffect(() => {
    if (isLoading) return undefined;

    setOptions([...(allUsers ?? [])]);
  }, [open, isLoading, allUsers]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  if (error) return "Error";

  return (
    <>
      <Button onClick={handleGoBackClick} sx={{ alignItems: "center" }}>
        <ArrowBackIosIcon sx={{ mr: 1, fontSize: 12 }} />
        Go back
      </Button>
      <Typography variant="h4" sx={{ pb: 2 }}>
        {status === "loading" ? (
          <Skeleton variant="text" width="35%" />
        ) : (
          project.projectName
        )}
      </Typography>

      <Stack direction="row" sx={{ pb: 2 }}>
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={isLoading}
          isOptionEqualToValue={(option: User, value: User) =>
            option.userId === value.userId
          }
          getOptionLabel={(option: User) => option.email}
          options={options}
          value={userToAdd}
          onChange={(
            event: SyntheticEvent<Element, Event> | null,
            newValue: SetStateAction<string | null>
          ) => setUserToAdd(newValue)}
        />
        <Button
          variant="contained"
          onClick={handleAddUserClick}
          sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          disabled={!Boolean(userToAdd)}
          disableElevation
        >
          Add new user
        </Button>
      </Stack>

      <Table data={mappedUsers} />
    </>
  );
}
