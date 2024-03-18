"use client";
import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";

import { useParams } from "next/navigation";
// import Button from "@mui/material/Button";
import { useState } from "react";
import styles from "../../../../../../../../page.module.css";
import { useRouter } from "next/navigation";
import makeColumns from "@/app/lib/makeColumns";
import getWorktime from "@/app/lib/getWorktime";
// import { LinearProgress } from "@mui/material";

//defining the columns
const columns = makeColumns();

export default function WeekTable({ timesheets }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const HOSTNAME = process.env.HOSTNAME_URL;
  const router = useRouter();
  const params = useParams();
  const { userId, empId, proId, weekId } = params;

  //bring mongo-date to correct display format
  const dateDisplayFormat = (mongo) => {
    return new Date(mongo).toLocaleDateString("de-DE", options);
  };

  //filter timesheet for correct week and sort descending in date
  const filteredTimesheets = timesheets
    .filter((e) => e.weekId == weekId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  //set initial state of checkboxes to the correct approved ids
  const initialState = filteredTimesheets
    .map((e) => {
      if (e.approved === true) {
        return e._id;
      }
    })
    .filter(Boolean);

  const [rowSelectionModel, setRowSelectionModel] = useState(initialState);

  //bring ms difference of times in displayable format
  function hhmmDisplayOfDifference(a, b) {
    return new Date(1970, 0, 1, 0, 0, 0, a - b).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  //creating the rows from the timesheet information
  const rows = filteredTimesheets.map((e, index) => {
    const workTime = getWorktime(e.end, e.start, e.break);
    return {
      ...e,
      ///important: this is how the mui table knows the _id of the timesheet. id is a fix term for that table and tied up with the checkbox event
      id: e._id,
      date: dateDisplayFormat(e.date),
      zeit: hhmmDisplayOfDifference(workTime, 0),
      over:
        workTime - 36000000 <= 0
          ? ""
          : hhmmDisplayOfDifference(workTime, 36000000),

      25:
        workTime - 36000000 <= 0
          ? ""
          : workTime - 36000000 <= 7200000
          ? hhmmDisplayOfDifference(workTime, 36000000)
          : "02:00",
      60:
        workTime - 43200000 <= 0
          ? ""
          : workTime - 43200000 <= 3600000
          ? hhmmDisplayOfDifference(workTime, 43200000)
          : "01:00",
      100:
        workTime - 46800000 <= 0
          ? ""
          : hhmmDisplayOfDifference(workTime, 46800000),
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
      //   router.refresh(`/api/${userId}/projects/${proId}/approve`);
    }
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  function CustomNoRowsOverlay() {
    return <div>Hallo</div>;
  }
  // style={{ height: 500, width: "75vw" }}
  return (
    <>
      <div className={styles.table}>
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(id) => {
            setRowSelectionModel(id);
          }}
          rowSelectionModel={rowSelectionModel}
          disableColumnMenu
          disableColumnFilter
          rows={rows}
          // rowHeight={52}
          getRowHeight={() => "auto"}
          columns={columns}
          loading={rows ? false : true}
          slots={{
            toolbar: CustomToolbar,

            noRowsOverlay: CustomNoRowsOverlay,
          }}
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
      </div>
      <button
        className={styles.funcbutton}
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
      </button>
    </>
  );
}
