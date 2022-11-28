import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import capitalize from "lodash/capitalize";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Project } from "@/../mocks/types";
import DatePicker from "@/components/date-picker";
import useAxios from "@/hooks/use-axios";

type WorkHoursRequestType = {
  userId: string;
  projectId: string;
  workUnit: {
    startTime: Dayjs | null;
    endTime: Dayjs | null;
    workDate: Dayjs | null;
  };
};

type WorkingHoursFormProps = {
  projects: {
    data: Project[];
    isLoading: boolean;
  };
};

export default function WorkingHoursForm({ projects }: WorkingHoursFormProps) {
  const axios = useAxios();
  const [project, setProject] = useState("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [notification, setNotification] = useState("");

  const addWorkHours = async (workHours: WorkHoursRequestType) => {
    const queryParams = new URLSearchParams({
      userId: workHours.userId,
      projectId: workHours.projectId,
    }).toString();

    return axios.post(
      `/work-hours?${queryParams}`,
      JSON.stringify(workHours.workUnit)
    );
  };

  const addWorkHoursMutation = useMutation(addWorkHours, {
    onError: () => {
      setNotification("Could not log hours. Please try again!");
    },
    onSuccess: () => {
      setNotification("Successfully logged the hours! 🥳");
      setProject("");
      setStartTime(null);
      setEndTime(null);
    },
  });

  const isFormDisabled = useMemo(() => {
    return !project || !startTime || !endTime || addWorkHoursMutation.isLoading;
  }, [project, startTime, endTime, addWorkHoursMutation.isLoading]);

  const mappedNotification = useMemo(
    () =>
      notification.toLocaleLowerCase().includes("try") ? "error" : "success",
    [notification]
  );

  const handleChange = (event: SelectChangeEvent) => {
    setProject(event.target.value as string);
  };

  const handleStartTimeChange = (newValue: Dayjs | null) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue: Dayjs | null) => {
    setEndTime(newValue);
  };

  const handleFormSubmit = () => {
    const workUnit = {
      startTime,
      endTime,
      workDate: dayjs(new Date()),
    };
    addWorkHoursMutation.mutate({
      userId: "123",
      projectId: "123",
      workUnit,
    });
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification("");
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        maxWidth: 400,
        border: "1px solid rgb(229, 231, 235)",
        borderRadius: 3,
        boxShadow: "0 2px 5px -4px rgba(0,0,0,0.34)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          pb: 3,
        }}
      >
        Log working hours
      </Typography>
      <Stack spacing={3}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={project}
            label="Project"
            onChange={handleChange}
          >
            {projects.isLoading ? (
              <MenuItem disabled value={10}>
                Loading...
              </MenuItem>
            ) : (
              projects.data.map((project: Project) => (
                <MenuItem key={project.projectId} value={project.projectId}>
                  {project.projectName}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <DatePicker
          title="Start time"
          value={startTime}
          handleChange={handleStartTimeChange}
        />
        <DatePicker
          title="End time"
          value={endTime}
          minDate={dayjs(startTime)}
          handleChange={handleEndTimeChange}
        />
        <Button
          variant="contained"
          onClick={handleFormSubmit}
          disabled={isFormDisabled}
        >
          Log
        </Button>
        <Snackbar
          open={!!notification}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          sx={{
            bottom: 120,
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={mappedNotification}
            sx={{
              width: "100%",
            }}
          >
            <AlertTitle>{capitalize(mappedNotification)}</AlertTitle>
            {notification}
          </Alert>
        </Snackbar>
      </Stack>
    </Paper>
  );
}
