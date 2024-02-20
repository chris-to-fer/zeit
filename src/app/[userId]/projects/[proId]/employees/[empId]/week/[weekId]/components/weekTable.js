"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "date", headerName: "Datum", width: 19 },
  { field: "start", headerName: "Start", width: 130 },
  { field: "end", headerName: "Ende", width: 130 },
  { field: "break", headerName: "Pause", width: 70 },
  { field: "catering", headerName: "Catering", width: 130 },
  { field: "travelTo", headerName: "Hinreise", width: 130 },
  { field: "travelBack", headerName: "Rückreise", width: 70 },
  { field: "type", headerName: "Art", width: 130 },
  { field: "place", headerName: "Ort", width: 130 },
  { field: "isHome", headerName: "zu Hause", width: 70 },

  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
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

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7, 10]}
        checkboxSelection
      />
    </div>
  );
}
