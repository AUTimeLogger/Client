import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import WorkingHoursForm from "@/components/forms/working-hours-form";
import ProjectList from "@/components/project-list";
import useAxios from "@/hooks/use-axios";

export default function Home() {
  const axios = useAxios();

  const { isLoading, data: projects } = useQuery(["projects"], async () =>
    axios.get("/projects").then((res) => res.data)
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
