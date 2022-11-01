import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@/components/link";
import DatePicker from "@/components/date-picker";
import ProjectCard from "@/components/project-card";
import Grid from "@mui/material/Grid";
import { Project } from "../mocks/types";
import { useQuery } from "@tanstack/react-query";

function AssignedProjects({ data }) {
  if (!data) return null;

  return (
    <>
      <Typography variant="h4" sx={{ pt: 6, pb: 3 }}>
        My projects
      </Typography>
      <Grid container spacing={2}>
        {data.map((datum: Project) => (
          <Grid key={datum.projectId} item xs={6} md={4}>
            <ProjectCard title={datum.projectName} disableAction />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default function Home() {
  const [age, setAge] = React.useState("");

  const {
    isLoading,
    error,
    data: projects,
  } = useQuery(["projects"], () =>
    fetch("/projects").then((res) => res.json())
  );

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <Typography variant="h4" sx={{ pb: 3 }}>
        Dashboard
      </Typography>
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
        <Typography variant="h6" sx={{ pb: 3 }}>
          Log working hours
        </Typography>
        <Stack spacing={3}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Project"
              onChange={handleChange}
            >
              {isLoading ? (
                <MenuItem disabled value={10}>
                  Loading...
                </MenuItem>
              ) : (
                projects.map((project: Project) => (
                  <MenuItem key={project.projectId} value={project.projectId}>
                    {project.projectName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <DatePicker />
          <DatePicker />
          <Button variant="contained">Log</Button>
        </Stack>
      </Paper>
      <AssignedProjects data={projects} />
    </>
  );
}
