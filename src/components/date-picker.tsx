import * as React from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function WrappedCalendarIcon() {
  return (
    <Box sx={{ color: "primary.main", height: 24, width: 24 }}>
      <CalendarIcon />
    </Box>
  );
}

type DatePickerProps = {
  title: string;
  value: Dayjs | null;
  minDate?: Dayjs | null;
  handleChange: (newValue: Dayjs | null) => void;
};

export default function DatePicker({
  title,
  value,
  minDate,
  handleChange,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={title}
        value={value}
        onChange={(event) => handleChange(event)}
        renderInput={(params) => <TextField {...params} />}
        components={{
          OpenPickerIcon: WrappedCalendarIcon,
        }}
        minDate={minDate ?? null}
      />
    </LocalizationProvider>
  );
}
