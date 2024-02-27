import React from "react";
import TimeForm from "./components/TimeForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function TimesheetCreatePage({ params }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;
  let trigger = null;

  async function handleSubmit(formData) {
    "use server";
    let data = Object.fromEntries(formData);
    data = {
      ...data,
      method: "CREATETIMESHEET",
      projectId: proId,
      employeeId: empId,
      start: data.start.toString(),
      end: data.end.toString(),
      travelTo: data.travelTo.toString(),
      travelBack: data.travelBack.toString(),
      break: data.break.toString(),
    };
    const response = await fetch(
      `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 200) {
      console.log("create timesheet sent:", data);
      revalidatePath(
        `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`
      );
      // revalidatePath(
      // `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${weekId}`)
      redirect(`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`);
    }
    if (response.status > 399) {
      console.log("response", response);

      // alert(
      //   "Um ein existierendes Datum zu ändern: Im Datum Bearbeiten wählen. Hier können nur Zeiten für ein neues Datum erfasst werden!"
      // );
    }
    if (response.error) {
      throw new Error(error);
    }
  }

  return (
    <>
      <div>
        <h3>Geben Sie Ihre Zeiten ein:</h3>
        <br></br>
        <TimeForm handleSubmit={handleSubmit} />
      </div>
    </>
  );
}
