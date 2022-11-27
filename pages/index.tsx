import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import WorkingHoursForm from "@/components/forms/working-hours-form";
import ProjectList from "@/components/project-list";

export default function Home() {
  const { isLoading, data: projects } = useQuery(["projects"], () =>
    fetch("/projects").then((res) => res.json())
  );

  return (
    <>
      <Typography variant="h4" sx={{ pb: 3 }}>
        Dashboard
      </Typography>
      <WorkingHoursForm projects={{ data: projects, isLoading }} />
      <ProjectList title="My projects" data={projects} />
    </>
  );
}
