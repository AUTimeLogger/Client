import { SetStateAction, SyntheticEvent, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@/components/autocomplete";
import { generateNumbersBetween } from "@/utils/helper";

type FakeYear = {
  email: string;
};

const years = generateNumbersBetween(1960, new Date().getFullYear()).map(
  (year) => ({ email: year.toString() })
);

export default function ReportsPage() {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState<FakeYear | null>(null);

  const handleGenerateReportClick = () => {
    console.log("Generating report...");
    console.log("Selected year: " + year?.email);
  };

  return (
    <Grid container>
      <Grid item xs={12} xl={6}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          Reports
        </Typography>
        <Typography variant="body1" sx={{ pb: 2 }}>
          Generate a new report from previous years by using the dropdown to
          select a year (or start typing the desired year), then click on the
          button.
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
            label="Select a year"
            isOptionEqualToValue={(option: FakeYear, value: FakeYear) =>
              option.email === value.email
            }
            getOptionLabel={(option: FakeYear) => option.email}
            options={years}
            value={year}
            onChange={(
              event: SyntheticEvent<Element, Event> | null,
              newValue: SetStateAction<FakeYear | null>
            ) => setYear(newValue)}
          />
          <Button
            variant="contained"
            onClick={handleGenerateReportClick}
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            disabled={!Boolean(year)}
            disableElevation
          >
            Generate report
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
