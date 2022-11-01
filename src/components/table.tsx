import * as React from "react";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import capitalize from "lodash/capitalize";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import Skeleton from "@mui/material/Skeleton";

type TableProps = {
  data: [];
  sx?: {};
};

function SkeletonRow() {
  return (
    <>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </>
  );
}

function SkeletonTable() {
  return (
    <>
      <TableRow>
        <SkeletonRow />
      </TableRow>
      <TableRow>
        <SkeletonRow />
      </TableRow>
      <TableRow>
        <SkeletonRow />
      </TableRow>
      <TableRow>
        <SkeletonRow />
      </TableRow>
      <TableRow>
        <SkeletonRow />
      </TableRow>
      <TableRow>
        <SkeletonRow />
      </TableRow>
      <TableRow>
        <SkeletonRow />
      </TableRow>
      <TableRow>
        <SkeletonRow />
      </TableRow>
    </>
  );
}

export default function Table({ data, sx }: TableProps) {
  // if (isUndefined(data) || isEmpty(data)) return null;

  const loading = React.useMemo(
    () => isUndefined(data) || isEmpty(data),
    [data]
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid rgb(229, 231, 235)",
        borderRadius: 3,
        boxShadow: "0 2px 5px -4px rgba(0,0,0,0.34)",
        maxHeight: 800,
        ...sx,
      }}
    >
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead sx={{ bgcolor: "grey.100" }}>
          <TableRow>
            {loading ? (
              <SkeletonRow />
            ) : (
              Object.entries(data[0])
                .filter(([key]) => key !== "id")
                .map(([key, value]) => (
                  <TableCell key={`${data[0]["id"]}-${key}`}>
                    {capitalize(key)}
                  </TableCell>
                ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <SkeletonTable />
          ) : (
            data.map((datum, index) => (
              <TableRow
                key={datum["id"]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.entries(datum)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <TableCell key={`${datum["id"]}-${datum[key]}`}>
                      {datum[key]}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
