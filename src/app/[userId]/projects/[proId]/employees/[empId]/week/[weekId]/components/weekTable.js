"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "next/navigation";

const columns = [
  { field: "date", headerName: "Datum", width: 80 },
  { field: "start", headerName: "Start", width: 60 },
  { field: "end", headerName: "Ende", width: 60 },
  { field: "break", headerName: "Pause", width: 55 },
  { field: "catering", headerName: "Catering", width: 70 },
  { field: "travelTo", headerName: "Hinweg", width: 70 },
  { field: "travelBack", headerName: "Rückweg", width: 70 },
  { field: "type", headerName: "Art", width: 80 },
  { field: "place", headerName: "Ort", width: 130 },
  { field: "isHome", headerName: "Heim", width: 30 },

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

export default function WeekTable({ params, timesheets }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const paramsis = useParams();
  const { userId, proId, empId } = paramsis;
  console.log("sampledate", typeof timesheets[0].date);

  const dateDisplayFormat = (mongo) => {
    let day = mongo.slice(8, 10);
    let month = mongo.slice(5, 7);
    let year = mongo.slice(2, 4);
    return day + "." + month + "." + year;
  };
  console.log("ts", timesheets);
  // const rows = [
  //   {
  //     id: 1,
  //     // date: dateDisplayFormat(timesheets.date[0]),
  //     firstName: "Jon",
  //     age: 35,
  //   },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },

  // ];
  // console.log(
  //   "date",
  //   timesheets.map((e) => dateDisplayFormat(e.date))
  // );

  const rows = timesheets.map((e, index) => {
    return {
      ...e,
      id: index,
      date: dateDisplayFormat(e.date),
      catering: true ? "Ja" : "Nein",
      isHome: true ? "Ja" : "Nein",
    };
  });

  // console.log("data", data);
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7]}
        checkboxSelection
      />
    </div>
  );
}
