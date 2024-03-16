export default function makeColumns() {
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
      width: 100,
      sortable: false,
      // valueGetter: (params) =>
      //   params.value
      //     ? params.value.toString().slice(0, 3) +
      //       (params.value.toString().length > 3 ? "..." : " ")
      //     : params.value,
    },
    { field: "start", headerName: "Start", width: 60, sortable: false },
    { field: "end", headerName: "Ende", width: 60, sortable: false },
    { field: "break", headerName: "Pause", width: 65, sortable: false },
    { field: "zeit", headerName: "Arbeitszeit", width: 87, sortable: false },
    { field: "over", headerName: "Überstunden", width: 102, sortable: false },
    { field: "25", headerName: "25%", width: 65, sortable: false },
    { field: "60", headerName: "60%", width: 65, sortable: false },
    { field: "100", headerName: "100%", width: 65, sortable: false },
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
  return columns;
}
