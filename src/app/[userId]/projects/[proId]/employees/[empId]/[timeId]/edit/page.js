import React from "react";
import TimeForm from "../../create/components/TimeForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function page({ params, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, empId, proId } = params;
  const defaultValue = searchParams;

  async function handleSubmit(formData) {
    "use server";
    let data = Object.fromEntries(formData);
    data = {
      ...data,

      method: "EDITTIMESHEET",
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
      revalidatePath(
        `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`
      );
      // revalidatePath(
      //   `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${weekId}`
      // );
      redirect(`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`);
    }
    if (response.status > 399) {
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
      <TimeForm
        defaultValue={defaultValue}
        params={params}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
