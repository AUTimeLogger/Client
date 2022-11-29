import { SetStateAction, SyntheticEvent, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@/components/autocomplete";
import useAxios from "@/hooks/use-axios";
import { generateNumbersBetween } from "@/utils/helper";

type FakeYear = {
  email: string;
};

const years = generateNumbersBetween(1960, new Date().getFullYear()).map(
  (year) => ({ email: year.toString() })
);

export default function ReportsPage() {
  const axios = useAxios();
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [year, setYear] = useState<FakeYear | null>(null);

  const handleGenerateReportClick = async () => {
    setGenerating(true);
    const res = await axios
      .get(`/report/${year.email}`)
      .then((res) => res.data);

    let i;
    let arr1 = res.split("\n");
    let arr2 = [];
    for (i = 0; i < arr1.length; i++) {
      arr2[i] = arr1[i].split(";");
    }

    let csvContent =
      "data:text/csv;charset=utf-8," + arr2.map((e) => e.join(",")).join("\n");

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `report-export-year-${year.email}.csv`);
    document.body.appendChild(link);

    link.click();
    setGenerating(false);
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
            disabled={!Boolean(year) || generating}
            disableElevation
          >
            Generate report
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
