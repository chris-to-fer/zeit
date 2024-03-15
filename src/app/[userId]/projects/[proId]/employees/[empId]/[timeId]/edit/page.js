import React from "react";
import TimeForm from "../../create/components/TimeForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/app/db/connectDB";
import Time from "@/app/db/model/Time";
import { headers } from "next/headers";
import ModalServ from "@/app/lib/ModalServ";

export default function page({ params, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, empId, proId, timeId } = params;
  const defaultValue = searchParams;
  const showError = searchParams.showError;

  async function handleSubmit(formData) {
    "use server";
    const headersList = headers();
    const fullUrl = headersList.get("referer");
    // console.log("searchParams", searchParams);
    // console.log("fullUrl", fullUrl);
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

    //check date in future
    if (new Date(data.date) > new Date()) {
      redirect(`${fullUrl}&showError=true`);
    }

    await connectDB();
    //check if date exists

    console.log(data.date);
    const oldDate = searchParams.date;
    console.log(oldDate.slice(0, 10));
    if (oldDate.slice(0, 10) !== data.date) {
      const dateExists = await Time.findOne({
        employeeId: empId,
        projectId: proId,
        date: new Date(data.date),
      });
      if (dateExists) {
        redirect(`${fullUrl}&showError=true`);
      }
    }
    try {
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
      {showError && (
        <ModalServ params={params} HOSTNAME={HOSTNAME} timeId={timeId} />
      )}
      <TimeForm
        defaultValue={defaultValue}
        params={params}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
