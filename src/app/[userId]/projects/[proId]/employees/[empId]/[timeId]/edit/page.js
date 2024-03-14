import React from "react";
import TimeForm from "../../create/components/TimeForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/app/db/connectDB";
import Time from "@/app/db/model/Time";

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
    // const response = await fetch(
    //   `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   }
    // );

    try {
      await connectDB();
      const updateTime = await Time.findByIdAndUpdate(data.timeId, data);
      if (!updateTime) {
        throw new Error("Editing Timesheet failed.");
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      redirect(`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`);
    }
  }
  // revalidatePath(
  //   `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`
  // );
  // revalidatePath(
  //   `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${weekId}`
  // )

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
