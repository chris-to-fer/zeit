"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "next/navigation";
import Button from "@mui/material/Button";
import { useState } from "react";
import styles from "../../../../../../page.module.css";
import { useEffect } from "react";
// import { set } from "mongoose";
// import { Fascinate_Inline } from "next/font/google";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const columns = [
  {
    field: "approved",
    headerName: "Genehmigt",
    width: 90,
    sortable: false,
    valueGetter: (params) => (params.row.approved ? "Ja" : "Nein"),
  },
  {
    field: "date",
    headerName: "Datum",
    width: 80,
    sortable: false,
  },
  { field: "start", headerName: "Start", width: 60, sortable: false },
  { field: "end", headerName: "Ende", width: 60, sortable: false },
  { field: "break", headerName: "Pause", width: 65, sortable: false },
  {
    field: "catering",
    headerName: "Catering",
    width: 75,
    sortable: false,
    valueGetter: (params) => (params.row.catering ? "Ja" : "Nein"),
  },
  { field: "travelTo", headerName: "Hinweg", width: 70, sortable: false },
  { field: "travelBack", headerName: "Rückweg", width: 88, sortable: false },
  { field: "type", headerName: "Art", width: 80, sortable: false },
  { field: "place", headerName: "Ort", width: 130, sortable: false },
  {
    field: "isHome",
    headerName: "Heim",
    width: 60,
    sortable: false,
    valueGetter: (params) => (params.row.isHome ? "Ja" : "Nein"),
  },

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
  const router = useRouter();
  const params = useParams();
  const { userId, empId, proId, weekId } = params;

  const dateDisplayFormat = (mongo) => {
    let day = mongo.slice(8, 10);
    let month = mongo.slice(5, 7);
    let year = mongo.slice(2, 4);
    return day + "." + month + "." + year;
  };

  const filteredTimesheets = timesheets
    .filter((e) => e.weekId == weekId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const initialState = filteredTimesheets
    .map((e) => {
      if (e.approved === true) {
        return e._id;
      }
    })
    .filter(Boolean);
  console.log("INST", initialState);
  const [rowSelectionModel, setRowSelectionModel] = useState(initialState);

  const rows = filteredTimesheets.map((e, index) => {
    return {
      ...e,
      ///important: this is how the mui table knows the _id of the timesheet. id is a fix term for that table and tied up with the checkbox event
      id: e._id,
      date: dateDisplayFormat(e.date),
      // catering: true ? "Ja" : "Nein",
      // isHome: true ? "Ja" : "Nein",
    };
  });

  const approvedTimes = filteredTimesheets
    .map((e) => {
      if (rowSelectionModel.length > 0) {
        if (rowSelectionModel.includes(e._id)) {
          return { ...e, approved: true };
        } else {
          return { ...e, approved: false };
        }
      } else {
        return { ...e, approved: false };
      }
    })
    .filter(Boolean);

  console.log("rsm", rowSelectionModel);
  console.log("esel", approvedTimes);

  async function handleApprove(approvedTimes) {
    if (!approvedTimes[0]) {
      return;
    }
    const data = { approvedTimes, method: "APPROVETIMESHEETS" };
    const response = await fetch(
      `/api/${userId}/projects/${proId}/employees/${empId}/week`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      alert("Ausgeführt");
      console.log("Approval sent", data);
      router.refresh();
    }
  }
  // style={{ , width: "100%" }}
  return (
    <div className={styles.table} style={{ height: 500, width: "80vw" }}>
      <DataGrid
        checkboxSelection
        onRowSelectionModelChange={(id) => {
          setRowSelectionModel(id);
        }}
        rowSelectionModel={rowSelectionModel}
        disableColumnMenu
        disableColumnFilter
        rows={rows}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 1, pageSize: 7 },
        //   },
        // }}
        // pageSize={7}
        // pageSizeOptions={[7]}
        // getRowId={getRowId}
        // getRowClassName={getRowClassName}
        // autoHeight
        autoPageSize
      />

      <Button
        className={styles.func_button}
        onClick={() => handleApprove(approvedTimes)}
        // disabled={rowSelectionModel[0] ? false : true}
      >
        {!rowSelectionModel[0] ? (
          <h3>Alle Genehmigungen zurücksetzen</h3>
        ) : rowSelectionModel.length === filteredTimesheets.length ? (
          <h3>Alle genehmigen</h3>
        ) : (
          <h3>Nur markierte genehmigen und andere nicht</h3>
        )}
      </Button>
    </div>
  );
}
