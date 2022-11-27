import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Project } from "@/../mocks/types";
import ProjectCard from "@/components/project-card";

type AssignedProjectsProps = {
  title: string;
  data: Project[];
};

export default function AssignedProjects({
  title,
  data,
}: AssignedProjectsProps) {
  if (!data) return null;

  return (
    <>
      {title && (
        <Typography variant="h4" sx={{ pt: 6, pb: 3 }}>
          {title}
        </Typography>
      )}
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
