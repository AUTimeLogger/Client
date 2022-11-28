import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProjectCard from "@/components/project-card";
import { Project } from "../mocks/types";

const CURRENT_PAGE_URI = "/projects";

function SkeletonGrid() {
  return (
    <>
      <Typography variant="h4" sx={{ pb: 3 }}>
        Projects
      </Typography>
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((item, index) => (
          <Grid key={index} item xs={6} sm={4} md={3}>
            <Card>
              <CardContent>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ pb: 2 }}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={30}
                    height={25}
                  />
                  <Typography gutterBottom variant="h5" width="100%">
                    <Skeleton />
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  <Skeleton variant="rounded" height={85} />
                </Typography>
              </CardContent>
              <CardActions>
                <Skeleton width="40%" sx={{ ml: 1 }} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default function ProjectsPage() {
  const { isLoading, error, data } = useQuery(["projects"], () =>
    fetch(CURRENT_PAGE_URI).then((res) => res.json())
  );
  const router = useRouter();

  function handleButtonClick(href: string) {
    router.push(`${CURRENT_PAGE_URI}/${href}`);
  }

  if (isLoading) return <SkeletonGrid />;
  if (error) return "Error";

  return (
    <>
      <Typography variant="h4" sx={{ pb: 3 }}>
        Projects
      </Typography>
      <Grid container spacing={2}>
        {data.map((datum: Project) => (
          <Grid key={datum.projectId} item xs={6} sm={4} md={3}>
            <ProjectCard
              title={datum.projectName}
              href={datum.projectId}
              handleButtonClick={handleButtonClick}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
