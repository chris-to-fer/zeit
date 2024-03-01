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
  { field: "zeit", headerName: "Arbeitszeit", width: 120, sortable: false },
  { field: "25", headerName: "25%", width: 65, sortable: false },
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
  const HOSTNAME = process.env.HOSTNAME_URL;
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

  const [rowSelectionModel, setRowSelectionModel] = useState(initialState);

  function StringToNumber(string) {
    const [HH, MM] = string.split(":");
    const H = parseInt(HH);
    console.log("H", H);
    const M = parseInt(MM);
    return new Date(1970, 1, 1, H, M, 0);
  }
  function formatDate(difference) {
    //Arrange the difference of date in days, hours, minutes, and seconds format
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours =
      hours === 0 && days === 0
        ? 24
        : days
        ? hours + 24
        : hours < 10
        ? "0" + hours
        : hours;

    minutes = minutes < 0 ? minutes : minutes <= 10 ? 0 + minutes : minutes;
    seconds = seconds < 10 ? 0 + seconds : seconds;
    if (days) {
      return hours + ":" + minutes;
    }
    return hours + ":" + minutes;
  }

  function twoFive(diff) {
    const h = parseInt(diff.slice(0, 2)) - 12;
    const m =
      parseInt(diff.slice(2, 3)) !== 0 ? parseInt(diff.slice(2, 4)) : "00";
    return h + ":" + m;
  }

  const rows = filteredTimesheets.map((e, index) => {
    return {
      ...e,
      ///important: this is how the mui table knows the _id of the timesheet. id is a fix term for that table and tied up with the checkbox event
      id: e._id,
      date: dateDisplayFormat(e.date),
      // catering: true ? "Ja" : "Nein",
      // isHome: true ? "Ja" : "Nein",
      zeit: formatDate(
        StringToNumber(e.end) -
          StringToNumber(e.break) +
          StringToNumber(e.start)
      ),
      25: twoFive(formatDate(StringToNumber(e.end) - StringToNumber(e.start))),
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
    router.refresh();
    if (response.ok) {
      alert("Ausgeführt");
      router.refresh(`/api/${userId}/projects/${proId}/approve`);
    }
  }
  // style={{ , width: "100%" }}
  return (
    <>
      <div className={styles.table} style={{ height: 500, width: "90vw" }}>
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
        {/* <Button
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
        </Button> */}
      </div>
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
    </>
  );
}
