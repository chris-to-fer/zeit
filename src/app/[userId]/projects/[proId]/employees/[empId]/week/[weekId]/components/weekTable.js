"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "next/navigation";
import Button from "@mui/material/Button";
import { useState } from "react";

// import styles from "../../../../../../page.module.css";

const columns = [
  { field: "date", headerName: "Datum", width: 80, sortable: false },
  { field: "start", headerName: "Start", width: 60, sortable: false },
  { field: "end", headerName: "Ende", width: 60, sortable: false },
  { field: "break", headerName: "Pause", width: 65, sortable: false },
  { field: "catering", headerName: "Catering", width: 75, sortable: false },
  { field: "travelTo", headerName: "Hinweg", width: 70, sortable: false },
  { field: "travelBack", headerName: "Rückweg", width: 75, sortable: false },
  { field: "type", headerName: "Art", width: 80, sortable: false },
  { field: "place", headerName: "Ort", width: 130, sortable: false },
  { field: "isHome", headerName: "Heim", width: 50, sortable: false },

  // //   {
  // //     field: "age",
  // //     headerName: "Age",
  // //     type: "number",
  // //     width: 90,
  // //   },
  {
    field: "comment",
    headerName: "Kommentar",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

export default function WeekTable({ timesheets }) {
  const [checkboxSelection, setCheckboxSelection] = useState(false);
  const params = useParams();
  const weekId = params.weekId;

  const dateDisplayFormat = (mongo) => {
    let day = mongo.slice(8, 10);
    let month = mongo.slice(5, 7);
    let year = mongo.slice(2, 4);
    return day + "." + month + "." + year;
  };

  const filteredTimesheets = timesheets
    .filter((e) => e.weekId == weekId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const rows = filteredTimesheets.map((e, index) => {
    return {
      ...e,
      id: index,
      date: dateDisplayFormat(e.date),
      catering: true ? "Ja" : "Nein",
      isHome: true ? "Ja" : "Nein",
    };
  });
  // className={styles.table}
  // console.log("data", data);
  console.log("CBOX", checkboxSelection);
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        // checkboxSelection={checkboxSelection}
        disableColumnMenu
        disableColumnFilter
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7]}
        checkboxSelection={checkboxSelection}
      />
    </div>
  );
}
