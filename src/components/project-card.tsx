import * as React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ProjectCardProps = {
  title: string;
  href?: string;
  disableAction?: boolean;
  handleButtonClick?: (href: string) => void;
};

export default function ProjectCard({
  title,
  href,
  disableAction,
  handleButtonClick,
}: ProjectCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ pb: 2 }}>
          <DocumentTextIcon style={{ height: 24 }} />
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      {!disableAction && (
        <CardActions>
          <Button
            size="small"
            onClick={() => (href ? handleButtonClick?.(href) : null)}
          >
            Edit
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
